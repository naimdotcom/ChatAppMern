import bcrypt from "bcrypt";

const generateHash = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(Number(process.env.passSalt));
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

const comparePassword = async (
  password: string,
  hash: string
): Promise<boolean> => {
  const isMatch = await bcrypt.compare(password, hash);
  return isMatch;
};

export { generateHash, comparePassword };
