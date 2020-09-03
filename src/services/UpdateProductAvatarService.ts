import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import uploadConfig from '../config/upload';
import AppError from '../errors/AppError';

import Product from '../models/Product';

interface Request {
  product_id: string;
  avatarFileName: string;
}

class UpdateProductAvatarService {
  public async execute({
    product_id,
    avatarFileName,
  }: Request): Promise<Product> {
    const productRepository = getRepository(Product);

    const product = await productRepository.findOne(product_id);

    if (!product) {
      throw new AppError(
        'Nenhum usuário encontrado para registrar avatar',
        401,
      );
    }

    if (product.avatar_product) {
      //deletar avatar anterior
      const productAvatarFilePath = path.join(
        uploadConfig.directory,
        product.avatar_product,
      );

      const productAvatarFileExists = await fs.promises.stat(
        productAvatarFilePath,
      );

      if (productAvatarFileExists) {
        await fs.promises.unlink(productAvatarFilePath);
      }
    }

    product.avatar_product = avatarFileName;

    await productRepository.save(product);

    return product;
  }
}

export default UpdateProductAvatarService;
