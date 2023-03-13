import Iyzipay from 'iyzipay';
const config = {
  apiKey: process.env.API_KEY_IYZI,
  secretKey: process.env.SECRET_KEY_IYZI,
  uri: process.env.URI_IYZI,
};
const iyzipay = new Iyzipay(config);

export default iyzipay;
