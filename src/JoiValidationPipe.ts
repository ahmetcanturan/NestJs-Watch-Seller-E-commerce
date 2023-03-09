import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { ObjectSchema } from 'joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}

  transform(value: any, metadata: ArgumentMetadata) {
    const validationOptions = {
      abortEarly: false,
    };
    const { error } = this.schema.validate(value, validationOptions);
    if (error) {
      throw new BadRequestException({
        message: 'Validation failed',
        errors: error.details,
      });
    }
    return value;
  }
}
