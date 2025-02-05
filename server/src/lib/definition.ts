type UserType = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  hash_password: string;
  avatar: string;
  created_at: number;
  updated_at: number;
  country_id: number;
  role_id: number;
};

type NewUserType = {
  firstname: string;
  lastname: string;
  email: string;
  hash_password: string;
  avatar: string;
  country_id: string;
};

type Country = {
  id: number;
  label: string;
};

type UpdatedUserType = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  hash_password: string;
  avatar: string;
};
