import { getRepository } from 'typeorm';

import Product from '../models/Product';

import AppError from '../errors/AppError';

interface IRequest {
  product_id: string;
}

class DeleteProductService {
  public async execute({ product_id }: IRequest): Promise<void> {
    const productRepository = getRepository(Product);

    const product = await productRepository.findOne(product_id);

    if (!product) {
      throw new AppError('Product not found.');
    }

    await productRepository.remove(product);
  }
}

export default DeleteProductService;
