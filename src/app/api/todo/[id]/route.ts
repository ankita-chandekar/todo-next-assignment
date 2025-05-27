import connectDB from "@/lib/mongodb";
import Todo from "@/models/Todo";
import { NextRequest, NextResponse } from "next/server";
import { isValidObjectId } from "mongoose";
import { TODO } from "@/types/todoTypes";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id }: { id: string } = await params;
    const todo: TODO | null = await Todo.findById(id);

    if (!todo) {
      return NextResponse.json({ error: "Task not found" }, { status: 400 });
    }
    return NextResponse.json({ todo: todo }, { status: 200 });
  } catch (err) {
    console.log("error", err);
    return NextResponse.json(
      { error: "Error fetching Todos" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id }: { id: string } = await params;

    const {
      todo,
      desc,
      completed,
    }: { todo: string; desc: string; completed: boolean } = await req.json();

    const updatedTodo: TODO | null = await Todo.findByIdAndUpdate(
      id,
      {
        todo,
        desc,
        completed,
      },
      { new: true }
    );

    if (!updatedTodo) {
      return NextResponse.json({ error: "Task not found" }, { status: 400 });
    }
    return NextResponse.json({ todo: updatedTodo }, { status: 200 });
  } catch (err) {
    console.log("Error while updating", err);
    return NextResponse.json(
      { error: "Error while updating Todos" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id }: { id: string } = await params;
    if (!isValidObjectId(id)) {
      return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
    }
    const deletedTodo: TODO | null = await Todo.findByIdAndDelete(id);
    if (!deletedTodo) {
      return NextResponse.json({ error: "Todo not found" }, { status: 400 });
    }
    return NextResponse.json({ todo: deletedTodo }, { status: 200 });
  } catch (err) {
    console.log("err while deleting", err);
    return NextResponse.json(
      { error: "Error while deleting Todos" },
      { status: 500 }
    );
  }
}
