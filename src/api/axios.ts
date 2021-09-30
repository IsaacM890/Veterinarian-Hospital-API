/** @format */

import axios from 'axios';

const getCurrencyAPI = async (feeInUSD: number) => {
  try {
    const currencies = await axios.get('https://open.er-api.com/v6/latest/USD');
    const { CAD, EUR } = currencies.data.rates;
    return {
      CAD: CAD * feeInUSD,
      EUR: EUR * feeInUSD,
      USD: feeInUSD,
    };
  } catch (err: any) {
    console.error('An error has occurred :', err.message);
    throw new Error(err);
  }
};

const getFoodTypeAPI = async () => {
  try {
    const result = await axios.get(
      'https://world.openfoodfacts.org/api/v0/product/737628064502.json'
    );
    const { categories } = result.data.product;
    return categories;
  } catch (err: any) {
    console.error('An error has occurred :', err.message);
    throw new Error(err);
  }
};

export { getCurrencyAPI, getFoodTypeAPI };
