"use client";

import { TODO } from "@/types/todoTypes";
import createTodoForm from "@/utils/createTodoForm";
import { useRouter } from "next/navigation";
import React, { useActionState, useState } from "react";
import { FiLogIn } from "react-icons/fi";
import { toast } from "react-toastify";

const CreateTodo = () => {
  const [state, formAction] = useActionState(createTodoForm, {
    error: null,
    success: false,
  });

  const [formValue, setFormValue] = useState({
    todo: "",
    desc: "",
    id: "",
  });

  const [isEditMode, setIsEditMode] = useState(false);

  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setFormValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  React.useEffect(() => {
    const savedTodo = localStorage.getItem("update-todo");
    if (savedTodo) {
      const prefilledValue: TODO = JSON.parse(savedTodo);
      const { todo, desc, _id } = prefilledValue;
      setFormValue({ todo, desc, id: _id });
      setIsEditMode(true);
      localStorage.removeItem("update-todo");
    }
  }, []);

  React.useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (state?.success) {
      if (isEditMode) {
        toast.success("Task Updated successfully");
      } else {
        toast.success("Task created successfully");
      }

      timeout = setTimeout(() => {
        router.push("/todo");
      }, 2000);
    }

    if (state?.error) {
      toast.error(state?.error);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [state]);

  return (
    <>
      <div className="m-0 h-screen w-screen bg-sky-100 bg-linear-to-t from-white-50 to-blue-300">
        <div className="flex justify-center items-center h-screen">
          <div className="bg-sky-50 p-10 w-100 bg-linear-to-t from-white-500 to-blue-200 rounded-3xl shadow-lg">
            <div className="flex flex-col items-center">
              <div className="bg-amber-50 h-12 w-12 mb-10 rounded-2xl flex justify-center items-center">
                <FiLogIn fontSize={24} />
              </div>{" "}
              <div className="text-2xl font-bold font-sans">Add new task</div>
              <div className="font-sans font-normal text-gray-500 text-sm px-5 text-center mb-6">
                Add, update, delete and maintian your todo list in one go...
              </div>
              <form action={formAction}>
                {isEditMode && (
                  <input type="hidden" name="id" value={formValue?.id} />
                )}
                <input
                  type="text"
                  name="todo"
                  placeholder="Title"
                  className="bg-gray-100 w-full p-2 rounded-lg mb-4"
                  onChange={handleChange}
                  value={formValue.todo}
                />
                <textarea
                  rows={4}
                  name="desc"
                  placeholder="Description.."
                  className="bg-gray-100 w-full p-2 rounded-lg mb-4"
                  onChange={handleChange}
                  value={formValue.desc}
                />
                <button
                  type="submit"
                  className="bg-black w-full rounded-2xl p-4 text-white font-sans font-bold cursor-pointer"
                >
                  {isEditMode ? "Update Task" : "Create Task"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateTodo;
