import { baseURL } from "@/lib/baseURL";

type RegisterFormResponse = {
  success: boolean;
  error: string | null;
};
const registerForm = async (
  prevState: RegisterFormResponse,
  formData: FormData
): Promise<RegisterFormResponse> => {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const response = await fetch(`${baseURL}/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      return { error: error.error || "Registration failed", success: false };
    }
    return {
      success: true,
      error: null,
    };
  } catch {
    return { error: "Something went wrong", success: false };
  }
};

export default registerForm;
