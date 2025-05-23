"use client";
import React from "react";

import { ToastContainer } from "react-toastify";
import CreateTodo from "./page";
import useRequireAuth from "@/utils/useRequireAuth";
import { BiLoaderCircle } from "react-icons/bi";

const layout = () => {
  const { isAuthenticated } = useRequireAuth();

  if (!isAuthenticated)
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        <BiLoaderCircle
          size={40}
          className="animate-spin text-2xl text-gray-600 mx-auto h-full"
        />
      </div>
    );

  return (
    <div>
      <CreateTodo />
      <ToastContainer autoClose={3000} />
    </div>
  );
};

export default layout;
