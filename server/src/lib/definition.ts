type UserType = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  hashed_password: string;
  avatar: string;
  created_at: number;
  updated_at: number;
  country_id: number;
  role_id: number;
};

type Country = {
  id: number;
  label: string;
};
// //pour comparer les emails
// type Credentials = {
//   email: string;
//   hashed_password: string;
// };
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
type Category = {
  id: number;
  label: string;
  color: string;
};
