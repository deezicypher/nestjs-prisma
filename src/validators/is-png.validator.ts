import { FileValidator } from '@nestjs/common';

interface PngValidatorOptions {
  maxSize?: number;
}

export class IsPngValidator extends FileValidator {
  constructor(
    //options: PngValidatorOptions

  ) {
    super({}
        //options
    );
  }

  isValid(file: Express.Multer.File): boolean {
    const isPng = file.mimetype === 'image/png';
    // const withinLimit =
    //   !this.validationOptions.maxSize ||
    //   file.size <= this.validationOptions.maxSize;

    return isPng // && withinLimit;
  }

  buildErrorMessage(): string {
    //    if (this.validationOptions.maxSize) {
    //   return `Only PNG files up to ${
    //     this.validationOptions.maxSize
    //   } bytes are allowed`;
    // }
    return 'Only PNG files are allowed';
  }
}
