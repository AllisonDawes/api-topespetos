import { getRepository } from 'typeorm';
import Product from '../models/Product';

import AppError from '../errors/AppError';

interface Request {
  title: string;
  description: string;
  price: number;
  category: string;
}

class CreateProductService {
  public async execute({
    title,
    description,
    price,
    category,
  }: Request): Promise<Product> {
    const productRepository = getRepository(Product);

    const checkExists = await productRepository.findOne({
      where: { title },
    });

    if (checkExists) {
      throw new AppError('Título do produto já existe na base de dados!');
    }

    const product = productRepository.create({
      title,
      description,
      price,
      category,
    });

    await productRepository.save(product);

    return product;
  }
}

export default CreateProductService;
