type CreateTodoResponse = {
  success: boolean;
  error: string | null;
};

const createTodoForm = async (
  prev: any,
  formData: FormData
): Promise<CreateTodoResponse> => {
  const todo = formData.get("todo") as string;
  const desc = formData.get("desc") as string;
  const id = formData.get("id") as string;

  localStorage.removeItem("update-todo");
  try {
    if (id) {
      const response = await fetch(`http://localhost:3000/api/todo/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ todo, desc }),
      });

      if (!response.ok) {
        const error = await response.json();
        return { error: error.error || "Task not Updated", success: false };
      }
      return {
        success: true,
        error: null,
      };
    } else {
      const response = await fetch("http://localhost:3000/api/create-todo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ todo, desc }),
      });

      if (!response.ok) {
        const error = await response.json();
        return { error: error.error || "Task not created", success: false };
      }
      return {
        success: true,
        error: null,
      };
    }
  } catch (err) {
    return { error: "Task created successfully", success: false };
  }
};

export default createTodoForm;
