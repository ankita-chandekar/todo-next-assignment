"use client";

import loginForm from "@/utils/loginForm";
import Link from "next/link";
import React, { useActionState } from "react";
import { FiLogIn } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const Login = () => {
  const [state, formAction] = useActionState(loginForm, {
    error: null,
    success: false,
  });
  const route = useRouter();
  const { t } = useTranslation();

  React.useEffect(() => {
    if (state?.success) {
      route.push("/todo");
    } else {
      toast.error(state?.error);
    }
  }, [state, route]);

  return (
    <>
      <div className="m-0 h-screen w-screen bg-sky-100 bg-linear-to-t from-white-50 to-blue-300">
        <div className="flex justify-center items-center h-screen">
          <div className="bg-sky-50 p-10 w-110 bg-linear-to-t from-white-500 to-blue-200 rounded-3xl shadow-lg">
            <div className="flex flex-col items-center">
              <div className="bg-amber-50 h-12 w-12 mb-10 rounded-2xl flex justify-center items-center">
                <FiLogIn fontSize={24} />
              </div>{" "}
              <div className="text-3xl font-bold font-sans text-center">
                {t("sign_in_with_email")}
              </div>
              <h3 className="font-sans text-2xl font-bold mt-3 mb-3">
                {t("app_title")}
              </h3>
              <div className="font-sans font-normal text-gray-500 text-sm px-5 text-center mb-6">
                {t("sign_in_desc")}
              </div>
              <form action={formAction}>
                <input
                  type="text"
                  name="email"
                  placeholder="Email"
                  className="bg-gray-100 w-full p-2 rounded-lg mb-4"
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="bg-gray-100 w-full p-2 rounded-lg mb-4"
                />
                <button
                  type="submit"
                  className="bg-black w-full rounded-2xl p-4 text-white font-sans font-bold cursor-pointer"
                >
                  {t("button_label")}
                </button>
              </form>
            </div>
            <div className="text-right pt-2">
              <Link
                className="text-gray-800 font-sans cursor-pointer mr-2 underline hover:text-gray-600"
                href="/register"
              >
                {t("not_registered")}
              </Link>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;
