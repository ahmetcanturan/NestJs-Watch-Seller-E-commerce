import { Injectable } from '@nestjs/common';
import { initialize, getFormPayment } from '../payment_system/checkout';
import Iyzipay from 'iyzipay';
import moment from 'moment';
import { nanoid } from 'src/utils/hashing';
import { Observable } from 'rxjs';
moment.locale('tr');

@Injectable()
export class SaleService {
  buyerProfile(user, adress, ip) {
    return {
      name: user.name,
      surname: user.surname,
      gsmNumber: `+90${adress.phone}`,
      email: user.email,
      identityNumber: String(adress.tc),
      lastLoginDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
      registrationDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
      registrationAddress: adress.adress,
      ip: ip,
      city: adress.city,
      country: adress.country,
      zipCode: adress.zipCode,
    };
  }
  cartProfile(cart, totally) {
    const basketItems = [];
    for (const product of cart.products) {
      basketItems.push({
        id: String(product._id),
        name: product.name,
        category1: 'Time',
        category2: 'Watch',
        price: product.price,
        itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
      });
    }
    return {
      price: totally,
      paidPrice: totally,
      basketId: String(cart._id),
      basketItems,
    };
  }
  async initializeCheckoutForm(buyer, cart): Promise<any> {
    return await initialize({
      locale: Iyzipay.LOCALE.TR,
      conversationId: nanoid(),
      price: cart.price,
      paidPrice: cart.paidPrice,
      currency: Iyzipay.CURRENCY.TRY,
      installment: '1',
      basketId: cart.basketId,
      paymentChannel: Iyzipay.PAYMENT_CHANNEL.WEB,
      paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
      callbackUrl: 'http://localhost:3000/sale/checkout/complete/payment',
      enabledInstallments: [1], //? Taksit seçeneklerini biz giriyoruz
      buyer: {
        //? Kullanıcının veritabanımızdaki bilgilerini giriyoruz
        id: nanoid(),
        name: buyer.name,
        surname: buyer.surname,
        gsmNumber: buyer.phone,
        email: buyer.email,
        identityNumber: buyer.identityNumber, //? Kullanıcının TC kimlik numarası
        lastLoginDate: buyer.lastLoginDate,
        registrationDate: buyer.registrationDate,
        registrationAddress: buyer.registrationAddress,
        ip: buyer.ip,
        city: buyer.city,
        country: buyer.country,
        zipCode: buyer.zipCode,
      },
      shippingAddress: {
        contactName: buyer.name,
        city: buyer.city,
        country: buyer.country,
        address: buyer.registrationAddress,
        zipcode: buyer.zipCode,
      },
      billingAddress: {
        //? Fatura Adresi
        contactName: buyer.name,
        city: buyer.city,
        country: buyer.country,
        address: buyer.registrationAddress,
        zipcode: buyer.zipCode,
      },
      basketItems: cart.basketItems,
    })
      .then((result: { paymentPageUrl: string; token: string }) => {
        console.log(result);
        return { url: result.paymentPageUrl, token: result.token };
      })
      .catch((err) => {
        console.log(err);
        return { status: false };
      });
  }

  async saleControl(data: object) {
    const json = await getFormPayment(data);
    return json;
  }
}
