import User from "@/models/User";
import bcrypt from "bcryptjs";
import connectDB from "./mongodb";

export async function authenticateUser(email: string, password: string) {
  await connectDB();

  const user = await User.findOne({ email });
  console.log("user 34353", user);
  if (!user) {
    throw new Error("Email address not registered");
  }

  const isPasswordValid = await bcrypt.compare(password || "", user.password);

  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  return user;
}
