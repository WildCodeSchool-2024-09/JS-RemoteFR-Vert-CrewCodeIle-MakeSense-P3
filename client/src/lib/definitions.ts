type FormValues = {
  firstname: string;
  lastname: string;
  email: string;
  hash_password: string;
  confirmed_password: string;
  avatar: string;
  country_id: number;
};

type DecisionDetailType = {
  id: number;
  title: string;
  min_date: Date;
  max_date: Date;
  description: string;
  context: string;
  profit: string;
  risk: string;
  step: string;
  country: string;
  lastname: string;
  firstname: string;
};

type CountryType = {
  id: number;
  label: string;
};

type ProfileFormValues = {
  firstname: string;
  lastname: string;
  email: string;
  avatar?: string;
  hash_password: string;
  confirmed_password: string;
};

type UpdateFormValues = {
  firstname?: string;
  lastname?: string;
  email?: string;
  avatar?: string;
  new_password?: string;
  confirmed_password?: string;
  country_id: number;
  role_id: number;
};
