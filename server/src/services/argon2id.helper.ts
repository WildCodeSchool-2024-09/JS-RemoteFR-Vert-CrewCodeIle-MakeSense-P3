import argon2 from "argon2";

const hashingOptions = {
  memoryCost: 19 * 2 ** 10 /* 19 Mio en kio (19 * 1024 kio) */,
  timeCost: 2,
  parallelism: 1,
};

export const hashPasswordHelper = async (password: string) => {
  return await argon2.hash(password, hashingOptions);
};

export const verifyPasswordHelper = async (
  hash_password: string,
  dbpassword: string,
) => {
  return await argon2.verify(hash_password, dbpassword);
};
