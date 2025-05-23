"use client";
import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { handleDeleteTodo } from "@/utils/deleteTodo";
import { RiProgress2Line } from "react-icons/ri";
import { TbProgressCheck } from "react-icons/tb";
import { ToastContainer, toast } from "react-toastify";
import { FaSearch } from "react-icons/fa";
import LogoutWrapper from "@/components/LogoutWrapper/LogoutWrapper";
import { TODO } from "@/types/todoTypes";

const page = () => {
  const [search, setSearch] = useState("");
  const [todos, setTodos] = useState<TODO[]>([]);
  const [allTodos, setAllTodos] = useState<TODO[]>([]);
  const router = useRouter();

  React.useEffect(() => {
    const fetchData = async () => {
      const getTodo = await fetch("http://localhost:3000/api/todo", {
        cache: "no-store",
      });
      const response = await getTodo.json();

      if (response.success) {
        setTodos(response.todos.reverse());
        setAllTodos(response.todos.reverse());
      }
    };
    fetchData();
  }, []);

  const handleUpdateTodo = (todo: TODO) => {
    localStorage.setItem("update-todo", JSON.stringify(todo));
    router.push(`/create-todo/${todo._id}`);
  };

  const handleDeleteTask = async (id: string) => {
    const deletedId: string | undefined = await handleDeleteTodo(id);
    if (deletedId) {
      setTodos((prev) => prev.filter((ele: TODO) => ele?._id !== deletedId));
      toast.success("Task deleted");
    }
  };

  React.useEffect(() => {
    const handleSearch = () => {
      const filterTodo: TODO[] = todos.filter((ele: TODO) =>
        ele.todo.toLowerCase().includes(search)
      );

      if (filterTodo.length) {
        setTodos(filterTodo);
      }
    };
    if (search === "") {
      setTodos(allTodos);
    } else {
      handleSearch();
    }
  }, [search]);

  return (
    <>
      <div className="m-0 h-screen w-screen bg-sky-100 bg-linear-to-t from-white-50 to-blue-300">
        <div className="flex justify-center items-center h-screen">
          <div className="bg-sky-50 p-10 w-4/5 h-3/4 bg-linear-to-t from-white-500 to-blue-200 rounded-3xl shadow-lg border-0 ">
            <LogoutWrapper />
            <div className="flex justify-between items-center mb-5">
              <h2 className="font-extrabold font-sans text-4xl ">TODO</h2>
              <Link
                className="bg-black w-auto rounded-2xl py-4 px-8  text-white font-sans font-bold cursor-pointer"
                href="/create-todo"
              >
                Create
              </Link>
            </div>
            <div className="mb-5 relative">
              <input
                type="text"
                name="searchbar"
                value={search}
                placeholder="Search your todo item"
                className="bg-gray-100 w-full p-4 rounded-lg "
                onChange={(e) => setSearch(e.target.value)}
              />
              <div className="h-full w-15 absolute top-0 right-0 bg-gray-400 rounded-br-lg rounded-tr-lg flex items-center justify-center ">
                <FaSearch size={24} />
              </div>
            </div>

            {/* todocard */}
            <div className="overflow-y-scroll" style={{ height: "inherit" }}>
              {todos?.length ? (
                todos?.map((element) => {
                  return (
                    <div
                      className="flex flex-row justify-between items-center py-4 px-4 bg-gray-100 my-4 rounded-lg"
                      key={element._id}
                    >
                      <Link href={`/todo/${element?._id}`}>
                        <p className="font-sans text-xl font-semibold">
                          {element?.todo}
                        </p>
                      </Link>
                      <div className="flex flex-row px-2">
                        {!element?.completed ? (
                          <RiProgress2Line
                            fontSize={24}
                            className="mx-4"
                            color="skyblue"
                          />
                        ) : (
                          <TbProgressCheck
                            fontSize={24}
                            className="mx-4"
                            color="green"
                          />
                        )}
                        <FiEdit
                          className="mx-4 cursor-pointer hover:text-blue-500"
                          fontSize={24}
                          onClick={() => handleUpdateTodo(element)}
                        />
                        <MdDeleteOutline
                          className="mx-4 cursor-pointer hover:text-red-400"
                          fontSize={26}
                          onClick={() => handleDeleteTask(element?._id)}
                        />
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="font-sans text-3xl  flex items-center justify-center">
                  No Task Added
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default page;
