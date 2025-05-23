"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { BiLoaderCircle } from "react-icons/bi";
import { toast } from "react-toastify";
import { Params } from "next/dist/server/request/params";
import { TODO } from "@/types/todoTypes";

const TodoPage = () => {
  const params: Params = useParams();
  const router = useRouter();
  const [task, setTask] = useState<TODO | null>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(`http://localhost:3000/api/todo/${params.id}`);
      const response = await data.json();

      if (response) {
        setTask(response.todo);
      }
    };
    fetchData();
  }, []);

  const handleDeleteTodo = async () => {
    try {
      const deleteTodo = await fetch(
        `http://localhost:3000/api/todo/${params.id}`,
        {
          method: "DELETE",
        }
      );
      const deleteTodoResp = await deleteTodo.json();
      if (deleteTodoResp) {
        router.push("/todo");
      }
    } catch (err) {
      console.log("Error while deleting", err);
    }
  };

  const handleMarkAsComplete = async (task: TODO) => {
    try {
      const data = await fetch(`http://localhost:3000/api/todo/${params.id}`, {
        method: "PUT",
        body: JSON.stringify({
          todo: task.todo,
          desc: task.desc,
          completed: true,
        }),
      });

      if (data.ok) {
        const updatedResp: { todo: TODO } = await data.json();
        setTask(updatedResp?.todo);
        toast.success("Task marked as completed");
        setTimeout(() => {
          router.push("/todo");
        }, 2000);
      } else {
        toast.error("Task cannot be marked completed");
      }
    } catch (err) {
      console.log("Error while updating mark as complete", err);
    }
  };

  const handleUpdateTodo = async () => {
    localStorage.setItem("update-todo", JSON.stringify(task));
    router.push(`/create-todo/${params.id}`);
  };

  return (
    <div className="m-0 h-screen w-screen bg-sky-100 bg-linear-to-t from-white-50 to-blue-300">
      <div className="flex justify-center items-center h-screen">
        <div className="bg-sky-50 p-10 w-4/5 h-3/4 bg-linear-to-t from-white-500 to-blue-200 rounded-3xl shadow-lg border-0 ">
          {!task ? (
            <BiLoaderCircle
              size={40}
              className="animate-spin text-2xl text-gray-600 mx-auto h-full"
            />
          ) : (
            <>
              {" "}
              <div className="flex justify-between items-center mb-5">
                <h2 className="font-extrabold font-sans text-4xl ">
                  TODO SELECTED ITEM
                </h2>
              </div>
              <div className="flex flex-col">
                <p className="text-2xl font-bold font-sans my-5">
                  {task?.todo}
                </p>
                <p className="text-lg font-medium font-sans mb-5">
                  {task?.desc}
                </p>
                <p className="text-lg font-medium font-sans mb-5">
                  Progress : {task?.completed ? "Completed" : "In Progress"}
                </p>
                <div className="flex flex-row justify-between my-5">
                  <button
                    className="bg-sky-600 w-auto rounded-2xl py-4 px-8 mr-5 text-white font-sans font-bold cursor-pointer"
                    onClick={handleUpdateTodo}
                  >
                    Update
                  </button>
                  <button
                    className="bg-red-400 w-auto rounded-2xl py-4 px-8  text-white font-sans font-bold cursor-pointer"
                    onClick={handleDeleteTodo}
                  >
                    Delete
                  </button>
                </div>
                <div>
                  {!task?.completed && (
                    <button
                      className="bg-green-700 rounded-2xl py-4 px-8  text-white font-sans font-bold cursor-pointer"
                      onClick={() => handleMarkAsComplete(task)}
                    >
                      Mark As Complete
                    </button>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoPage;
