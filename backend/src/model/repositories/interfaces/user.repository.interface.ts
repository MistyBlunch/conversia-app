import { User } from "../../user.model";

export interface UserRepositoryInterface {
  createUser(user: User): Promise<User>
  deleteUser(id: number): Promise<void>
  updateUser(id: number, user: Partial<User>): Promise<User>
  findAllUsers(): Promise<User[]>
  findUserById(id: number): Promise<User | null>
  findUserByEmail(email: string): Promise<User | null>
}
