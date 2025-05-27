"use client";

import { TODO } from "@/types/todoTypes";
import { Params } from "next/dist/server/request/params";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { BiLoaderCircle } from "react-icons/bi";
import { toast } from "react-toastify";

const TodoPage = () => {
  const params: Params = useParams();
  const router = useRouter();
  const [task, setTask] = useState<TODO | null>(null);
  const { t } = useTranslation();

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(`/api/todo/${params.id}`);
      const response = await data.json();

      if (response) {
        setTask(response.todo);
      }
    };
    fetchData();
  }, [params.id]);

  const handleDeleteTodo = async () => {
    try {
      const deleteTodo = await fetch(`/api/todo/${params.id}`, {
        method: "DELETE",
      });
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
      const data = await fetch(`/api/todo/${params.id}`, {
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
        toast.success(t("mark_as_completed_success"));
        setTimeout(() => {
          router.push("/todo");
        }, 2000);
      } else {
        toast.error(t("mark_as_completed_error"));
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
                  {t("todo_selected")}
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
                  {t("progress")} :
                  {task?.completed ? t("completed") : t("in_progress")}
                </p>
                <div className="flex flex-row justify-between my-5">
                  <button
                    className="bg-sky-600 w-auto rounded-2xl py-4 px-8 mr-5 text-white font-sans font-bold cursor-pointer"
                    onClick={handleUpdateTodo}
                  >
                    {t("update")}
                  </button>
                  <button
                    className="bg-red-400 w-auto rounded-2xl py-4 px-8  text-white font-sans font-bold cursor-pointer"
                    onClick={handleDeleteTodo}
                  >
                    {t("delete")}
                  </button>
                </div>
                <div>
                  {!task?.completed && (
                    <button
                      className="bg-green-700 rounded-2xl py-4 px-8  text-white font-sans font-bold cursor-pointer"
                      onClick={() => handleMarkAsComplete(task)}
                    >
                      {t("mark_as_completed")}
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
