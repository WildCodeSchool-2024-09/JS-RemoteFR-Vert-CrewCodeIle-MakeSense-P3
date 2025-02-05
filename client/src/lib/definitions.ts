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

type CommentType = {
  content: string;
  firstname: string;
  lastname: string;
};

type DataUserType = {
  avatar: string;
  country_id: number;
  decision_id: number;
  email: string;
  firstname: string;
  hash_password: string;
  id: number;
  lastname: string;
  role: string;
  role_id: number;
  user_id: number;
};
