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

const prepareImages = async (images: string[]) => {
  //Todo: revisar los FILES
  const fileImages = images.filter(image => image.includes('file://'));
  const currentImages = images.filter(image => !image.includes('file://'));

  if (fileImages.length > 0) {
    const uploadPromises = fileImages.map(uploadImage);
    const uploadedImages = await Promise.all(uploadPromises);
    currentImages.push(...uploadedImages);
  }
  return currentImages.map(image => image.split('/').pop());
};

const uploadImage = async (image: string) => {
  const formData = new FormData();
  formData.append('file', {
    uri: image,
    type: 'image/jpeg',
    name: image.split('/').pop(),
  });

  const {data} = await testloApi.post<{image: string}>(
    '/files/product',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return data.image;
};

//Todo: Revisar si viene el usuario
const updateProduct = async (product: Partial<Product>) => {
  const {id, images = [], ...rest} = product;
  try {
    const checkedImages = await prepareImages(images);

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
    const checkedImages = await prepareImages(images);
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
