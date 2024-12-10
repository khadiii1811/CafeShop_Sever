import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import loginRouter from './src/routes/login.routes.js';  
import coffeBagRouter from './src/routes/coffee-page.route.js'
import registerRouter from './src/routes/register.route.js'
import forgotPasswordRouter from './src/routes/forgot.routes.js';
import cartRouter from './src/routes/cart.routes.js'
import vnpayRouter from './src/routes/vnpayPayment.route.js'
import courseRouter from './src/routes/course.routes.js'
import dotenv from 'dotenv';

const app = express();
const PORT = process.env.PORT || 3001;  

app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true, 
}));
app.use(express.json());
app.use(cookieParser());
dotenv.config();


// Route kiểm tra server
app.get('/', (req, res) => {
  res.send('Server is running!');
});

app.use('/api', loginRouter);  
app.use('/api',registerRouter)
app.use('/api',forgotPasswordRouter);
app.use('/api',coffeBagRouter);
app.use('/api',courseRouter)
app.use('/api',vnpayRouter)
app.use('/api',cartRouter);
// Khởi động server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
