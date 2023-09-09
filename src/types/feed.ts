import { RouteProp } from '@react-navigation/native';
import { User } from './user';

export type PostTyping = {
  body: string;
  title: string;
  userId: number;
};

export type Posts = Array<PostTyping>;

export type DetailsProps = {
  route: RouteProp<
    {
      params: {
        currentUser: User;
        post?: PostTyping;
      };
    },
    'params'
  >;
};
