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
    const spy = jest.spyOn(NodeMailerService.prototype, 'sendMail').mockImplementationOnce(jest.fn());

    const infos = {
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'user', // generated ethereal user
        pass: 'pass', // generated ethereal password
      },
    };

    const mailService = new NodeMailerService(infos);
    await mailService.sendMail(mailMock);

    expect(spy).toHaveBeenCalledWith(mailMock);
  });
});
