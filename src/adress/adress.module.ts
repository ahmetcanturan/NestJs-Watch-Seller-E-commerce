import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdressController } from './adress.controller';
import { AdressRepository } from './adress.repository';
import { AdressService } from './adress.service';
import { Adress, AdressSchema } from './schemas/adress.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Adress.name, schema: AdressSchema }]),
  ],
  controllers: [AdressController],
  providers: [AdressService, AdressRepository],
})
export class AdressModule {}
