import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { USER } from "@/types/userType";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { email, password }: { email: string; password: string } =
      await req.json();

    const user: USER | null = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "Email address not registered" },
        { status: 401 }
      );
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const response = NextResponse.json({ user }, { status: 200 });
    return response;
  } catch (err) {
    console.log("Error while login", err);
    return NextResponse.json(
      { error: "Error while login in" },
      { status: 500 }
    );
  }
}
