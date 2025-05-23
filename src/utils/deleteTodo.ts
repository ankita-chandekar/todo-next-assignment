import { TODO } from "@/types/todoTypes";

export const handleDeleteTodo = async (id: string) => {
  try {
    const deleteTodo = await fetch(`http://localhost:3000/api/todo/${id}`, {
      method: "DELETE",
    });

    const deleteTodoResp: { todo: TODO } = await deleteTodo.json();
    if (deleteTodoResp) {
      return deleteTodoResp.todo._id;
    }
  } catch (err) {
    console.log("Error while deleting", err);
  }
};
