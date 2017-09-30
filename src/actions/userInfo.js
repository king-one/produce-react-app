/**
 * Created by cg on 2017/9/1.
 */

export const CHANGE_PASSWORD = 'CHANGE_PASSWORD';
export const CHANGE_RESONCE = 'CHANGE_RESONCE';
export function handlePwModal(text) {
  return { type: CHANGE_PASSWORD, text };
}
export function handleRespone(messager) {
  return { type: CHANGE_RESONCE, messager };
}


