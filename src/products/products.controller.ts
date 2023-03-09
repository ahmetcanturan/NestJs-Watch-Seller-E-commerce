import {
  Body,
  Controller,
  Post,
  Redirect,
  UploadedFile,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { diskStorage } from 'multer';
import path = require('path');
import { ProductsService } from './products.service';
import { FileInterceptor } from '@nestjs/platform-express';

export const storage = {
  storage: diskStorage({
    destination: './public/uploads',
    filename: (req, file, cb) => {
      const filename: string = `${Date.now()}_${Math.random().toString(36)}_${
        file.originalname[0]
      }.jpg`;
      const extension: string = path.parse(file.originalname).ext;

      cb(null, `${filename}${extension}`);
    },
  }),
};
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('/create')
  @UseInterceptors(FileInterceptor('image', storage))
  @Redirect('/product/create')
  uploadFile(@UploadedFile() file, @Body() body): any {
    body.img_path = file.filename;
    this.productsService.create(body);
  }
}
