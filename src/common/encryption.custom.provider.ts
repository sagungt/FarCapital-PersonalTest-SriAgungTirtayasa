import * as bcrypt from 'bcrypt';

export type Bcrypt = typeof bcrypt;
export default {
  provide: 'ENCRYPTION',
  useValue: bcrypt,
};
