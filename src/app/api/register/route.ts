import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { USER } from "@/types/userType";

export async function GET(request: NextRequest) {
  await connectDB();

  return NextResponse.json({ message: "Hello from API route!" });
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const {
      name,
      email,
      password,
    }: { name: string; email: string; password: string } = await req.json();

    const user: USER | null = await User.findOne({ email });

    if (user) {
      return NextResponse.json(
        { error: "User Already exists" },
        { status: 400 }
      );
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser: USER = await User.create({
      name,
      email,
      password: hashPassword,
    });

    return NextResponse.json({
      message: "User registed Successfully",
      user: newUser,
    });
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
