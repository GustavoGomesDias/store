/* eslint-disable @typescript-eslint/no-extra-semi */
/* eslint-disable semi */
export type TransporterConfig = {
  host: string
  port: number
  secure?: boolean
  auth: {
    user: string
    pass: string
  }
}

export type MailOptions = {
  from: string
  to: string
  subject: string
  text: string
  html: string
};

export default interface Mail {
  config: TransporterConfig
  sendMail(options: MailOptions): Promise<string>
}
