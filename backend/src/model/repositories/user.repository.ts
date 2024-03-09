import { PrismaClient } from "../prisma/generated";
import { User } from "../user.model";
import { UserRepositoryInterface } from "./interfaces/user.repository.interface";

export class PostgreSQLUserRepository implements UserRepositoryInterface {
  private client: PrismaClient
  
  constructor(client: PrismaClient) {
    this.client = client;
  }

  async createUser(user: User): Promise<User> {
    const userEntity = await this.client.user.create({
      data: user
    });

    return userEntity;
  }

  async deleteUser(id: number): Promise<void> {
    await this.client.user.delete({
      where: { id: id }
    });
  }

  async updateUser(id: number, user: Partial<User>): Promise<User> {
    const updatedUser = await this.client.user.update({
      where: { id: id },
      data: user
    });

    return updatedUser;
  }

  async findAllUsers(): Promise<User[]> {
    const users = await this.client.user.findMany();
    return users;
  }

  async findUserById(id: number): Promise<User | null> {
    const user = await this.client.user.findFirst({
      where: { id: id }
    });

    return user;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const user = await this.client.user.findFirst({
      where: { email: email }
    });

    return user;
  }
}
