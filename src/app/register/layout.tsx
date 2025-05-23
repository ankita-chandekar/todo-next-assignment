import React from "react";
import Register from "./page";
import { ToastContainer } from "react-toastify";

const layout = () => {
  return (
    <div>
      <Register />
      <ToastContainer autoClose={3000} />
    </div>
  );
};

export default layout;
