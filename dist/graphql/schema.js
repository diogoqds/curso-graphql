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

  type Mutation {
    createUser(name: String!, email: String!): User!
  }
`;
const resolvers = {
    Query: {
        allUsers: () => usersMock
    },
    Mutation: {
        createUser: (parent, args) => {
            const newUser = Object.assign({ id: usersMock.length + 1 }, args);
            usersMock.push(newUser);
            return newUser;
        }
    }
};
exports.default = graphql_tools_1.makeExecutableSchema({ typeDefs, resolvers });