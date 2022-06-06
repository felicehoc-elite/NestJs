import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: true })
export class IsValidPasswordConstraint implements ValidatorConstraintInterface {
  validate(value: string, args: ValidationArguments) {
    return (
      typeof value === 'string' &&
      value.length >= 8 &&
      /\d/.test(value) &&
      /[a-z]/.test(value) &&
      /[A-Z]/.test(value) &&
      /[!@#$%^&*]/.test(value)
    );
  }
}

export function IsValidPassword(validationOptions?: ValidationOptions) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: { message: 'Enter a Valid Password', ...validationOptions },
      constraints: [],
      validator: IsValidPasswordConstraint,
    });
  };
}
