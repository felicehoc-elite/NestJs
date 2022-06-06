import { AuthModule } from '../../src/auth/auth.module';
import * as request from 'supertest';
import { getTestServer } from '../utils/moduleCreation';
import { MAIL_HOST, MAIL_PORT } from '../utils/constants';

describe('Auth user (e2e)', () => {
  const mail = `http://${MAIL_HOST}:${MAIL_PORT}`;

  let server: unknown;

  const random = Date.now();
  const userDto = {
    email: `use-${random}@gmail.com`,
    password: 'Password@123',
  };

  beforeAll(async () => {
    server = await getTestServer([AuthModule]);
  }, 50000);

  describe('User auth e2e', () => {
    it('should check for Email existing: /api/v1/auth/email/exist-check (POST)', async () => {
      await request(server)
        .post('/api/v1/auth/email/exist-check')
        .send({ email: userDto.email })
        .expect(200);

      await request(server)
        .post('/api/v1/auth/email/exist-check')
        .send({ email: 'example' })
        .expect(422);
    }, 10000);

    it('Register with Email: /api/v1/auth/email/register-with-email (POST)', async () => {
      await request(server)
        .post('/api/v1/auth/email/register-with-email')
        .send(userDto)
        .expect(200);

      await request(server)
        .post('/api/v1/auth/email/register-with-email')
        .send({ email: userDto.email, password: '123456789' })
        .expect(422);
    });

    it('Send Forgot Mail: /api/v1/auth/email/send-forgot-mail (POST)', () => {
      return request(server)
        .post('/api/v1/auth/email/send-forgot-mail')
        .send({ email: userDto.email })
        .expect(200);
    });

    it('update Password: /api/v1/auth/update-forgot-password (POST)', async () => {
      const email = await request(mail)
        .get('/email')
        .then(({ body }) => {
          const email = body.find(
            (letter) =>
              letter.to[0].address.toLowerCase() ===
                userDto.email.toLowerCase() &&
              /.*password\-change\/(\w+).*/g.test(letter.text),
          );
          return {
            hash: email?.text.replace(/.*password\-change\/(\w+).*/g, '$1'),
            id: email.id,
          };
        });

      await request(server)
        .post('/api/v1/auth/update-forgot-password')
        .send({
          password: 'Password@123',
          token: email.hash,
        })
        .expect(204);

      await request(mail).delete(`/email/${email.id}`);
    });
  });
});
