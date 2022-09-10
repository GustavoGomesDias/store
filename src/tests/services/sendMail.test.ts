import { validateMail } from '@helpers/validations';
import NodeMailerService from '@services/NodemailerService';

describe('Nodemailer service', () => {
  const mailMock = {
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: 'bar@example.com, baz@example.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world?', // plain text body
    html: '<b>Hello world?</b>', // html body
  };

  test('Should call send mail with correct values', async () => {
    const infos = {
      host: 'smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: 'be1032f7208009',
        pass: '81bfa90702fdb7',
      },
    };

    const mailService = new NodeMailerService(infos);
    const id = await mailService.sendMail(mailMock);

    expect(validateMail(id.replace('<', '').replace('>', ''))).toBeTruthy();
  });
});
