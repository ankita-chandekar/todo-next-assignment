import connectDB from "@/lib/mongodb";
import Todo from "@/models/Todo";
import { Session, getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { TODO } from "@/types/todoTypes";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const session: Session | null = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const todos: TODO[] = await Todo.find({ userId: session?.user?.id });
    return NextResponse.json({ success: true, todos: todos });
  } catch (err) {
    console.log("err", err);
    NextResponse.json({ error: "Error fetching todos" }, { status: 500 });
  }
}
