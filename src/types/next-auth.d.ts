declare module "next-auth" {
  interface Session {
    user: {
      name: string;
      email: string;
      image?: string;
      id: string;
    };
    expires: string;
  }

  interface User {
    _id: string;
    name: string;
    email: string;
    password: string;
    createdAt: string;
    updatedAt: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: {
      _id: string;
      name: string;
      email: string;
      password: string;
      createdAt: string;
      updatedAt: string;
    };
  }
}
