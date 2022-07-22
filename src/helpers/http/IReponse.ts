/* eslint-disable semi */
export interface IResponse {
  statusCode: number

  body: {
    content?: Record<any, any>
    message?: string
    error?: string
  }
}
