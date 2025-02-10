// user
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

type UpdatedUserType = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  hash_password: string;
  avatar: string;
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

type Category = {
  id: number;
  label: string;
  color: string;
};

type Vote = {
  id: number;
  comment: string;
  state: boolean;
  user_id: string;
};

// comment
type CommentType = {
  content: string;
  user_id: number;
  decision_id: number;
};

// token

type DecodedTokenType = {
  email: string;
  iat: number;
  exp: number;
};

type PayloadType = {
  email: string;
  iat: number;
  exp: number;
};
