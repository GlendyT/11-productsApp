/* eslint-disable @typescript-eslint/no-unused-vars */
import {isAxiosError} from 'axios';
import {testloApi} from '../../config/api/tesloApi';
import {Product} from '../../domain/entities/product';

//TODO: Al utilizar Partial hace a que todas las properties sean opcionales
export const updateCreateProduct = (product: Partial<Product>) => {
  product.stock = isNaN(Number(product.stock)) ? 0 : Number(product.stock);
  product.price = isNaN(Number(product.price)) ? 0 : Number(product.price);

  if (product.id && product.id !== 'new') {
    return updateProduct(product);
  }

  return createProduct(product);
};

const prepareImages = (images: string[]) => {
  //Todo: revisar los FILES

  return images.map(image => image.split('/').pop());
};

//Todo: Revisar si viene el usuario
const updateProduct = async (product: Partial<Product>) => {
  const {id, images = [], ...rest} = product;
  try {
    const checkedImages = prepareImages(images);

    const {data} = await testloApi.patch(`/products/${id}`, {
      images: checkedImages,
      ...rest,
    });
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.error(error.response?.data);
    }
    console.log(error);
    throw new Error('Error al actualizar el producto');
  }
};

const createProduct = async (product: Partial<Product>) => {
  const {id, images = [], ...rest} = product;
  try {
    const checkedImages = prepareImages(images);
    const {data} = await testloApi.post('/products/', {
      images: checkedImages,
      ...rest,
    });
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.error(error.response?.data);
    }
    throw new Error('Error al crear el producto');
  }
};
