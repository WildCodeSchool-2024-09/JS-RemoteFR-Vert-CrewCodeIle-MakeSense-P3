type FormValues = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
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
type DataFormDecisionType = {
  id: number;
  title: string;
  country_id: string;
  description: string;
  context: string;
  profit: string;
  risk: string;
  min_date: Date;
  max_date: Date;
  category_id: string;
};
type CountryType = {
  id: number;
  label: string;
};
type User = {
  id: number;
  email: string;
};

type Auth = {
  credentials: User;
  token: string;
};
// category

type FormValuesCategory = {
  id: number;
  label: string;
};

type CategoryFormData = {
  id: number;
  label: string;
};

type CategoryType = {
  id: number;
  label: string;
  color: string;
};
