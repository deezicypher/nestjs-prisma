import { FileValidator } from '@nestjs/common';

export class IsPngValidator extends FileValidator {
  constructor() {
    super({});
  }

  isValid(file: Express.Multer.File): boolean {
    return file.mimetype === 'image/png';
  }

  buildErrorMessage(): string {
    return 'Only PNG files are allowed';
  }
}
