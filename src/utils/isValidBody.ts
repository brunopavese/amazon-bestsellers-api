import { UpdateData } from './types'

export function isValidBody(body: unknown): body is UpdateData {
  if (
    body &&
    Array.isArray((body as UpdateData).bestSellers) &&
    typeof (body as UpdateData).updateDate === 'string'
  ) {
    return true
  }
  return false
}
