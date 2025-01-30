export type FormValues = {
  firstname: string;
  lastname: string;
  email: string;
  hash_password: string;
  confirmed_password: string;
  avatar: string;
};

export type Decision = {
  Id: number;
  ProfilePicture: string;
  UserName: string;
  UserFirstname: string;
  DecisionTitle: string;
  DecisionCategory: string;
};

export type DecisionDetailType = {
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
