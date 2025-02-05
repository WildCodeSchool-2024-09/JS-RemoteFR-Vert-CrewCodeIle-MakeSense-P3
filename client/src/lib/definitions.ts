// user
type UserType = {
  id: number;
  content: string;
  firstname: string;
  lastname: string;
};

type FormValues = {
  firstname: string;
  lastname: string;
  email: string;
  hash_password: string;
  confirmed_password: string;
  avatar: string;
  country_id: number;
};

// decision

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
  user_animator_id: number;
  user_expert_id: number;
  user_impacted_id: number;
};

// country

type CountryType = {
  id: number;
  label: string;
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
