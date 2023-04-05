import { v4 as uuidv4 } from 'uuid';

export const getUuid = () => {
  let u_id = localStorage.getItem('uuid_token');
  if (!u_id) {
    let uuid = uuidv4();
    localStorage.setItem('uuid_token', uuid);
    return uuid
  } else {
    return u_id;
  }
}