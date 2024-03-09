import { compare } from "bcrypt";
import { UserRepositoryInterface } from "../model/repositories/interfaces/user.repository.interface";
import { User } from "../model/user.model";

export class LoginService {
  private userRepository: UserRepositoryInterface;

  constructor(userRepository: UserRepositoryInterface) {
    this.userRepository = userRepository;
  }

  async login(email: string, password: string): Promise<User | undefined> {
    const user = await this.userRepository.findUserByEmail(email);

    if(!user) {
      return undefined;
    }

    if(await compare(password, user.password)) {
      return user;
    } else {
      return undefined;
    }
  }

  async updateRefresh(id: number, token: string) {
    return await this.userRepository.updateUser(id, {
      refreshToken: token
    });
  }

  async findUserById(id: number) {
    return await this.userRepository.findUserById(id);
  }
}
