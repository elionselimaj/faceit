export type User = {
  image: string;
  firstName: string;
  lastName: string;
  id: number;
  address: { address: string; city: string };
  email: string;
  phone: string;
  username: string;
  company: { title: string };
};

export type Users = Array<User>;
