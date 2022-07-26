/* eslint-disable semi */
/* eslint-disable @typescript-eslint/no-extra-semi */
export interface IRequest<UseCase = void> {
  body?: UseCase
  params?: any
  query?: any
  headers?: {
    authorization?: string
  }
}
