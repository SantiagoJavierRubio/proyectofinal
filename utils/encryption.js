import bcrypt from 'bcrypt';

export const encrypt = (input) => {
  return bcrypt.hashSync(input, bcrypt.genSaltSync(10));
};

export const compare = (input, value) => {
  return bcrypt.compareSync(input, value);
};
