import {UserDetail} from './user-detail';
import {UserProfile} from './userprofile';

export class User {
  id?: number;
  username: string;
  password: string;
  userDetail?: UserDetail;
  profiles: UserProfile[];
}
