import  express   from 'express';
const router = express.Router();
import productController from '../controller/productController.js';
const { getProducts, getProductById } = productController;
router.route('/').get(getProducts);
router.route('/:id').get(getProductById);
export default router;