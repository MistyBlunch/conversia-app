import { Resolvers } from "../../graphql/generated/types";

export interface BaseResolver {
  typeDefs: string,
  resolvers: Resolvers
}