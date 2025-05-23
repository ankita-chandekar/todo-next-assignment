import connectDB from "@/lib/mongodb";
import Todo from "@/models/Todo";
import { Session, getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const session: Session | null = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { todo, desc }: { todo: string; desc: string } = await req.json();

    const newTodo = await Todo.create({
      completed: false,
      desc,
      todo,
      userId: session.user.id,
    });

    return NextResponse.json({
      message: "Todo created",
      todo: newTodo,
    });
  } catch (err) {
    console.log("errror", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
