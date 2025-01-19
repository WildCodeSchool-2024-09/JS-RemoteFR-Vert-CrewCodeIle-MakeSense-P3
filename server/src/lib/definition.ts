type UserType = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  avatar: string;
  created_at: number;
  updated_at: number;
  role_id: number;
};

type NewUserType = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  avatar: string;
};
