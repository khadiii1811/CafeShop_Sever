import express from 'express';
import crypto from 'crypto';
import qs from 'qs';
import config from '../../config/default.json' assert { type: "json" };

const router = express.Router();

// Thiết lập múi giờ chính xác cho VNPay
process.env.TZ = 'Asia/Ho_Chi_Minh';

/**
 * API tạo Payment URL
 */
router.post('/create_payment_url', function (req, res) {
  try {
    const ipAddr = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const date = new Date();
    const createDate = date.toISOString().replace(/[-:T]/g, '').slice(0, 14);
    const orderId = date.getTime().toString();

    const { amount, orderDescription, orderType, language, bankCode } = req.body;

    const vnp_Params = {
      vnp_Version: '2.1.0',
      vnp_Command: 'pay',
      vnp_TmnCode: config.vnp_TmnCode,
      vnp_Locale: language || 'vn',
      vnp_CurrCode: 'VND',
      vnp_TxnRef: orderId,
      vnp_OrderInfo: orderDescription || 'Order',
      vnp_OrderType: orderType || 'billpayment',
      vnp_Amount: amount * 100,
      vnp_ReturnUrl: config.vnp_ReturnUrl,
      vnp_IpAddr: ipAddr,
      vnp_CreateDate: createDate,
    };
    
    if (bankCode) {
      vnp_Params.vnp_BankCode = bankCode; 
    }

    const sortedParams = Object.keys(vnp_Params).sort().reduce((acc, key) => {
      acc[key] = vnp_Params[key];
      return acc;
    }, {});
    console.log("Sorted Params:", sortedParams);
    const hashData = qs.stringify(sortedParams, { encode: true });
    console.log("Hash Data Stringified:", hashData);

    const hmac = crypto.createHmac('sha512', config.vnp_HashSecret);
    const secureHash = hmac.update(hashData).digest('hex');
    console.log('Generated Hash:', secureHash);

    vnp_Params.vnp_SecureHash = secureHash;

    const paymentUrl = `${config.vnp_Url}?${qs.stringify(vnp_Params, { encode: false })}`;
    console.log('Payment URL:', paymentUrl);

    res.status(200).json({ paymentUrl });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Error generating payment URL' });
  }
});

router.get('/vnpay_ipn', function (req, res) {
  try {
    const { vnp_SecureHash, ...vnp_Params } = req.query;

    const sortedParams = Object.keys(vnp_Params).sort().reduce((acc, key) => {
      acc[key] = vnp_Params[key];
      return acc;
    }, {});
    
    console.log('Sorted Params:', sortedParams);
    
    const hashData = qs.stringify(sortedParams, { encode: false });
    
    console.log('Stringified Params:', hashData);
    
    // Tạo chữ ký với secret key
    const hmac = crypto.createHmac('sha512', config.vnp_HashSecret);
    const secureHash = hmac.update(Buffer.from(hashData, 'utf-8')).digest('hex');
    
    console.log('Generated SecureHash:', secureHash);
    console.log('vnp_SecureHash received:', vnp_SecureHash);

    if (secureHash === vnp_SecureHash) {
      console.log('Checksum verified');
      res.status(200).json({ RspCode: '00', Message: 'Success' });
    } else {
      console.error('Checksum mismatch');
      res.status(400).json({ RspCode: '01', Message: 'Checksum error' });
    }
  } catch (error) {
    console.error('Error during IPN processing', error);
    res.status(500).json({ RspCode: '99', Message: 'Internal Error' });
  }
});
router.get('/vnpay_return', (req, res) => {
  try {
    console.log('Received VNPAY query:', req.query);

    let vnp_Params = { ...req.query }; // Copy query params để tránh mất dữ liệu gốc
    let secureHash = vnp_Params['vnp_SecureHash'];

    console.log('vnp_Params before deletion:', vnp_Params);

    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];

    console.log('vnp_Params after deletion:', vnp_Params);

    const sortedParams = Object.keys(vnp_Params)
      .sort()
      .reduce((acc, key) => {
        acc[key] = vnp_Params[key];
        return acc;
      }, {});

    console.log('Sorted Params:', sortedParams);

    const signData = qs.stringify(sortedParams, { encode: true });
    console.log('Stringified signData:', signData);

    const hmac = crypto.createHmac('sha512', config.vnp_HashSecret);
    const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');

    console.log('Generated hash:', signed);
    console.log('secureHash received:', secureHash);

    if (secureHash === signed) {
      console.log('Checksum verified');
      const redirectUrl = `http://localhost:3000/vnpay_return?code=${vnp_Params['vnp_ResponseCode']}&txnRef=${vnp_Params['vnp_TxnRef']}`;
      return res.redirect(redirectUrl);
    } else {
      console.error('Checksum mismatch');
      const redirectUrl = `http://localhost:3000/vnpay_return?code=97&error=Checksum mismatch`;
      return res.redirect(redirectUrl);
    }
  } catch (error) {
    console.error('Error during VNPAY return processing', error);
    const redirectUrl = `http://localhost:3000/vnpay_return?code=500&error=Internal Server Error`;
    return res.redirect(redirectUrl);
  }
});

export default router;
