import { randomBytes, scrypt } from "crypto";

export const hash = async (password: string): Promise<string> => {
  const salt = randomBytes(16).toString("hex");
  return new Promise((resolve, reject) => {
    scrypt(password, salt, 64, (err, derivedKey) => {
      if (err) reject(err);
      resolve([salt, derivedKey.toString("hex")].join(":"));
    });
  });
};

export const verify = async (password: string, hashedPassword: string): Promise<boolean> => {
  const [salt, key] = hashedPassword.split(":");
  if (!salt) return false;
  return new Promise((resolve) => {
    scrypt(password, salt, 64, (err, derivedKey) => {
      if (err) resolve(false);
      resolve(derivedKey.toString("hex") === key);
    });
  });
};
