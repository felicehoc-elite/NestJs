import { User } from './entities/user.entity';

const userResponseSerializer = (user: User) => {
  delete user.password;
};

export default userResponseSerializer;
