import express from 'express';
import cors from 'cors';
import { Config } from '../config/config';
import { BaseResolver } from './resolvers/interfaces/base.resolver.interface';
import { ApolloServer, BaseContext } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { Resolvers } from './graphql/generated/types';
import { TokenService } from '../services/token.service';

export class App {
  private config: Config;
  private app: express.Application;
  private apolloServer: ApolloServer<BaseContext>;
  private tokenService: TokenService;

  constructor(config: Config, resolvers: BaseResolver[], tokenService: TokenService) {
    this.config = config;
    this.tokenService = tokenService;

    this.app = express();
    this.initializeMiddlewares();
    this.apolloServer = this.initializeGraphQlHandler(resolvers);
  }

  private initializeMiddlewares() {
    this.app.use(express.json());

    if (this.config.nodeEnv === 'dev') {
      this.app.use(cors());
    }
  }

  private initializeGraphQlHandler(resolvers: BaseResolver[]) {
    const typeDefs: string[] = []

    const mainResolvers = resolvers.reduce((main, resolver) => {
      typeDefs.push(resolver.typeDefs);

      main.Query = {
        ...main.Query,
        ...resolver.resolvers.Query
      };
      main.Mutation = {
        ...main.Mutation,
        ...resolver.resolvers.Mutation
      };

      return main
    }, {} as Resolvers)

    return new ApolloServer<BaseContext>({
      typeDefs: typeDefs,
      resolvers: mainResolvers,
    });
  }

  public async listen() {
    await this.apolloServer.start();
    
    this.app.use('/graphql', expressMiddleware(this.apolloServer, {
      context: async ({ req }) => {
        const bearerToken = req.headers.authorization;

        if(!bearerToken) {
          return {};
        }

        const id = this.tokenService.verifyToken(bearerToken.split(' ')[1]);

        return { userId: id };
      }
    }));

    this.app.listen(
      this.config.server.port, this.config.server.host, 511, () => {
        console.log(`The application is listening on ${this.config.server.host}:${this.config.server.port}!`);
      });
  }
}
