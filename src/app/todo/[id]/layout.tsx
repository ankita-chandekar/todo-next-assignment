import React from "react";
import TodoPage from "./page";
import { ToastContainer } from "react-toastify";

const layout = () => {
  return (
    <div>
      <TodoPage />
      <ToastContainer autoClose={3000} />
    </div>
  );
};

export default layout;
