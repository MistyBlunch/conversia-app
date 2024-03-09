import convict from 'convict';
import dotenv from 'dotenv';

import { App } from "./server/app";
import { configSchema } from './config/config';
import { AuthResolver } from './server/resolvers/auth.resolver';
import { RegisterService } from './services/register.service';
import { LoginService } from './services/login.service';
import { TokenService } from './services/token.service';
import { PostgreSQLUserRepository } from './model/repositories/user.repository';
import { PrismaClient } from './model/prisma/generated';
import { ContactResolver } from './server/resolvers/contact.resolver';
import { ContactService } from './services/contact.service';
import { PostgreSQLContactRepository } from './model/repositories/contact.repository';

async function main() {
  dotenv.config();

  const prismaClient = new PrismaClient();

  const config = convict(configSchema).getProperties();

  const userRepository = new PostgreSQLUserRepository(prismaClient);
  const contactRepository = new PostgreSQLContactRepository(prismaClient);

  const registerService = new RegisterService(userRepository);
  const loginService = new LoginService(userRepository);
  const tokenService = new TokenService(config);
  const contactService = new ContactService(contactRepository)

  const authResolver = new AuthResolver(registerService, loginService, tokenService);
  const contactResolver = new ContactResolver(contactService)

  const app = new App(config, [
    authResolver,
    contactResolver
  ], tokenService);

  app.listen();
}

main()