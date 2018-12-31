"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tools_1 = require("graphql-tools");
const usersMock = [
    {
        id: 1,
        name: "Diogo",
        email: "diogo@email.com"
    },
    {
        id: 2,
        name: "Teste",
        email: "teste@teste.com"
    }
];
const typeDefs = `
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Query {
    allUsers: [ User! ]!
  }
`;
const resolvers = {
    Query: {
        allUsers: () => usersMock
    }
};
exports.default = graphql_tools_1.makeExecutableSchema({ typeDefs, resolvers });
