import RouteNames from '@routes/RouteNames';
import { User } from '@typings/user';
import { PostTyping } from '@typings/feed';

export type NavigationMap = {
  [RouteNames.Feed]: undefined;
  [RouteNames.PostDetails]: { currentUser: User; post: PostTyping };
  [RouteNames.UserProfile]: { currentUser: User };
};
