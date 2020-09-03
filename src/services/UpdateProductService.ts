import { getRepository } from 'typeorm';

import Product from '../models/Product';

import AppError from '../errors/AppError';

interface IRequest {
  product_id: string;
  title: string;
  description: string;
  price: number;
  category: string;
}

class UpdateProductService {
  public async execute({
    product_id,
    title,
    description,
    price,
    category,
  }: IRequest): Promise<Product> {
    const productRepository = getRepository(Product);

    const product = await productRepository.findOne(product_id);

    if (!product) {
      throw new AppError('Product not found.');
    }

    product.title = title;
    product.description = description;
    product.price = price;
    product.category = category;

    await productRepository.save(product);

    return product;
  }
}

export default UpdateProductService;
