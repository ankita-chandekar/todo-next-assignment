"use client";

import registerForm from "@/utils/registerForm";
import Link from "next/link";
import React, { useActionState, useState } from "react";
import { FiLogIn } from "react-icons/fi";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const Register = () => {
  const { t } = useTranslation();
  const [state, formAction] = useActionState(registerForm, {
    error: null,
    success: false,
  });

  const [formValue, setFormValue] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  React.useEffect(() => {
    if (state?.success) {
      toast.success(t("register_success"));
      setFormValue({ name: "", email: "", password: "" });
    }

    if (state?.error) {
      console.log("error");
      toast.error(state?.error);
    }
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
              <div className="text-2xl font-bold font-sans text-center">
                {t("sign_up_with_email")}
              </div>
              <div className="font-sans font-normal text-gray-500 text-sm px-5 text-center mb-6">
                {t("sign_in_desc")}
              </div>
              <form action={formAction}>
                <input
                  type="text"
                  name="name"
                  placeholder={t("name")}
                  className="bg-gray-100 w-full p-2 rounded-lg mb-4"
                  onChange={handleChange}
                  value={formValue.name}
                />
                <input
                  type="text"
                  name="email"
                  placeholder={t("email")}
                  className="bg-gray-100 w-full p-2 rounded-lg mb-4"
                  onChange={handleChange}
                  value={formValue.email}
                />
                <input
                  type="password"
                  name="password"
                  placeholder={t("password")}
                  className="bg-gray-100 w-full p-2 rounded-lg mb-4"
                  onChange={handleChange}
                  value={formValue.password}
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
                href="/login"
              >
                {t("registed")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
