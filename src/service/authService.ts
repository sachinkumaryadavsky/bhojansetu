import { userRepository } from "../persistance/userRepository";

import bcrypt from "bcrypt";

export const authService = {
  async register(data: any) {
    const existing = await userRepository.findUserByEmail(data.email);
    if (existing) throw new Error("User already exists");

    const hashed = await  bcrypt.hash(data.password, 10);

    const id = await userRepository.createUser({
      ...data,
      password: hashed
    });

    return { id };
  },

  async login(email: string, password: string) {
    const user = await userRepository.findUserByEmail(email);
    if (!user) throw new Error("Invalid credentials");

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error("Invalid credentials");
    return ({
      id: user.id,
      role: user.role
    });
  }
};
