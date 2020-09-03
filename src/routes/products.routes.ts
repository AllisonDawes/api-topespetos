import { Router } from 'express';
import { getRepository } from 'typeorm';
import multer from 'multer';
import { classToClass } from 'class-transformer';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import Product from '../models/Product';

import CreateProductService from '../services/CreateProductService';
import UpdateProductAvatarService from '../services/UpdateProductAvatarService';
import UpdateProductService from '../services/UpdateProductService';
import DeleteProductService from '../services/DeleteProductService';

import uploadConfig from '../config/upload';

const upload = multer(uploadConfig);

const productsRouter = Router();

productsRouter.get('/find_skewers/:category', async (request, response) => {
  const { category } = request.params;

  const findSkewersProducts = getRepository(Product);

  const products = await findSkewersProducts.find({
    where: { category },
  });

  return response.json(classToClass(products));
});

productsRouter.use(ensureAuthenticated);

productsRouter.post('/', async (request, response) => {
  const { title, description, price, category } = request.body;

  const createProduct = new CreateProductService();

  const product = await createProduct.execute({
    title,
    description,
    price,
    category,
  });

  return response.json(product);
});

productsRouter.patch(
  '/avatar_product/:product_id',
  upload.single('avatar_product'),
  async (request, response) => {
    try {
      const { product_id } = request.params;

      const updateProductAvatar = new UpdateProductAvatarService();

      const product = await updateProductAvatar.execute({
        product_id,
        avatarFileName: request.file.filename,
      });

      return response.json(product);
    } catch {
      console.log('erro!');
    }
  },
);

productsRouter.put('/update_product/:product_id', async (request, response) => {
  const { product_id } = request.params;
  const { title, description, price, category } = request.body;

  const updateProduct = new UpdateProductService();

  const product = await updateProduct.execute({
    product_id,
    title,
    description,
    price,
    category,
  });

  return response.json(product);
});

productsRouter.delete(
  '/remove_product/:product_id',
  async (request, response) => {
    const { product_id } = request.params;

    const deleteProduct = new DeleteProductService();

    await deleteProduct.execute({ product_id });

    return response.status(200).json();
  },
);

export default productsRouter;
