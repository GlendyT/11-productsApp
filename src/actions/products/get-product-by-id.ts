import {testloApi} from '../../config/api/tesloApi';
import {Product} from '../../domain/entities/product';
import {TesloProduct} from '../../infrastructure/interfaces/teslo-products-responses';
import {ProductMapper} from '../../infrastructure/mappers/product.mapper';

export const getProductById = async (id: string): Promise<Product> => {
  try {
    const {data} = await testloApi.get<TesloProduct>(`/products/${id}`);
    return ProductMapper.tesloProductToEntity(data);
  } catch (error) {
    console.log(error);
    throw new Error(`Error getting product by Id: ${id}`);
  }
};
