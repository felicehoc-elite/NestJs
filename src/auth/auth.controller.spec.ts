import { Test } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

const mockAuthService = {
  emailExistCheck: () => false,
  registerWithEmail: () => true,
  sendForgotMail: () => null,
  sendForgotPasswordOTP: () => true,
  checkForgotPasswordOTP: () => null,
  updatePassword: () => true,
  verifyForgotPasswordOTP: () => null,
};

describe('AuthController', () => {
  let authController: AuthController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    })
      .overrideProvider(AuthService)
      .useValue(mockAuthService)
      .compile();

    authController = moduleRef.get<AuthController>(AuthController);
  });

  it('should check email is exist or not (emailExistCheck)', async () => {
    expect(
      await authController.emailExistCheck({
        email: 'example@example.com',
      }),
    ).toBe(false);
  });

  it('should return store create user with Email and User (registerWithEmail)', async () => {
    expect(
      await authController.registerWithEmail({
        email: 'example@gmail.com',
        password: 'password',
      }),
    ).toBe(true);
  });

  it('should send email to Mail (sendForgotMail)', async () => {
    const result = { message: `Email sent successfully, expire in 1h` };
    jest
      .spyOn(mockAuthService, 'sendForgotMail')
      .mockImplementation(() => result);
    expect(
      await authController.sendForgotMail({
        email: 'example@gmail.com',
      }),
    ).toStrictEqual(result);
  });

  it('should send email to Mail (updatePassword)', async () => {
    expect(
      await authController.updatePassword({
        password: 'Password@123',
        token: 'token',
      }),
    ).toBe(true);
  });
  it('should send email to Mail (updatePassword)', async () => {
    expect(
      await authController.updatePassword({
        password: 'Password@123',
        token: 'token',
      }),
    ).toBe(true);
  });

  it('should send otp to Phone (sendForgotPasswordOTP)', async () => {
    expect(
      await authController.sendForgotPasswordOTP({
        phone_no: 9090909090,
        country_code: 91,
      }),
    ).toBe(true);
  });

  it('should verify otp to Phone (verifyForgotPasswordOTP)', async () => {
    const token = 'TokenforUpdatePassword';
    jest
      .spyOn(mockAuthService, 'verifyForgotPasswordOTP')
      .mockImplementation(() => token);

    expect(
      await authController.verifyForgotPasswordOTP({
        phone_no: 9090909090,
        country_code: 91,
        otp: '123456',
      }),
    ).toBe(token);
  });
});
