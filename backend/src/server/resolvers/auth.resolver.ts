import { readFileSync } from "fs";
import { LoginService } from "../../services/login.service";
import { RegisterService } from "../../services/register.service";
import { TokenService } from "../../services/token.service";
import { Resolvers, User, UserCredentials, UserWithId } from "../graphql/generated/types";
import { BaseResolver } from "./interfaces/base.resolver.interface";
import { GraphQLError } from "graphql";

export class AuthResolver implements BaseResolver {
  resolvers: Resolvers;
  typeDefs: string;
  
  private registerService: RegisterService;
  private loginService: LoginService;
  private tokenService: TokenService;

  constructor(registerService: RegisterService, loginService: LoginService, tokenService: TokenService) {
    this.registerService = registerService;
    this.loginService = loginService;
    this.tokenService = tokenService;

    this.typeDefs = readFileSync('./src/server/graphql/auth.graphql', 'utf-8');
    this.resolvers = {
      Query: {
        login: this.login,
        emailIsAvailable: this.emailIsAvailable,
        refreshAccessToken: this.refreshAccessToken
      },
      Mutation: {
        register: this.register
      },
    }
  }

  login = async (_: any, { credentials }: { credentials: UserCredentials }): Promise<UserWithId> => {
    const refreshToken = this.tokenService.createRefreshToken();
    const userEntity = await this.loginService.login(credentials.email, credentials.password);
    if(!userEntity) {
      throw new GraphQLError("Invalid email or password");
    }

    const accessToken = this.tokenService.createAccessToken(userEntity.id || -1, userEntity.name);
    await this.loginService.updateRefresh(userEntity.id || -1, refreshToken);

    return {
      id: userEntity.id || -1,
      name: userEntity.name,
      accessToken: accessToken,
      refreshToken: refreshToken
    };
  }

  register = async (_: any, { user }: { user: User }): Promise<UserWithId> => {
    const refreshToken = this.tokenService.createRefreshToken();
    const userEntity = await this.registerService.createUser({
      name: user.name,
      email: user.email,
      password: user.password,
      refreshToken: refreshToken
    });
    const accessToken = this.tokenService.createAccessToken(userEntity.id || -1, userEntity.name);

    return {
      id: userEntity.id || -1,
      name: userEntity.name,
      accessToken: accessToken,
      refreshToken: refreshToken
    };
  }

  emailIsAvailable = async (_: any, { email }: { email: string }): Promise<boolean> => {
    return await this.registerService.emailIsAvailable(email);
  }

  refreshAccessToken = async (_: any, { id, refreshToken }: { id: number, refreshToken: string }): Promise<string> => {
    const userEntity = await this.loginService.findUserById(id);
    if(!userEntity) {
      throw new GraphQLError("Invalid user id");
    }

    if(userEntity.refreshToken != refreshToken) {
      throw new GraphQLError("Invalid refresh token");
    }

    return this.tokenService.createAccessToken(userEntity.id || -1, userEntity.name);
  }
}