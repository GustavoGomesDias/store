import Mail, { MailOptions, TransporterConfig } from '@adapters/services/Mail';
import HelperCatch from '@helpers/validations/decorators/HelperCatch';
import nodemailer from 'nodemailer';

export default class NodeMailerService implements Mail {
  config: TransporterConfig;

  constructor(config: TransporterConfig) {
    this.config = config;
  }

  @HelperCatch()
  async sendMail(options: MailOptions): Promise<string> {
    const transporter = nodemailer.createTransport(this.config);
    const info = await transporter.sendMail(options);

    return info.messageId;
  }
}
