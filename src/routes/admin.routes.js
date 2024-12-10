import express from 'express';
const router = express.Router();
import adminUserRouter from './admin/customer.routes.js'; 
import adminCoffeeBagRouter from './admin/product/coffeAdmin.routes.js'
import adminCourseRouter from './admin/product/courseAdmin.routes.js'
import adminOrderRouter from './admin/adminOrder.routes.js'
import adminDashboardRouter from './admin/adminDashboard.routes.js'








router.use('/admin/customers',adminUserRouter);
router.use('/admin/coffeBag',adminCoffeeBagRouter);
router.use('/admin/courses',adminCourseRouter);
router.use('/admin/order',adminOrderRouter);
router.use('/admin/dashboard',adminDashboardRouter);
export default router;