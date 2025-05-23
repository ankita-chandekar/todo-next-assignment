type LoginFormResponse = {
  success: boolean;
  error: string | null;
};
import { SignInResponse, signIn } from "next-auth/react";

const loginForm = async (
  prevState: any,
  formData: FormData
): Promise<LoginFormResponse> => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const res: SignInResponse | undefined = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (!res || !res.ok) {
      return {
        error: res?.error || "Login failed",
        success: false,
      };
    }
    return { success: true, error: null };
  } catch (err) {
    console.error("Login error", err);
    return {
      error: "Unexpected error during login",
      success: false,
    };
  }
};

export default loginForm;
