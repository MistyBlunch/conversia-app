import { hash } from "bcrypt";
import { UserRepositoryInterface } from "../model/repositories/interfaces/user.repository.interface";
import { User } from "../model/user.model";

export class RegisterService {
  private userRepository: UserRepositoryInterface;

  constructor(userRepository: UserRepositoryInterface) {
    this.userRepository = userRepository;
  }

  async createUser(user: User) {
    user.password = await hash(user.password, 10);
    return await this.userRepository.createUser(user);
  }

  async emailIsAvailable(email: string): Promise<boolean> {
    const user = await this.userRepository.findUserByEmail(email);
    return user? false : true;
  }
}
