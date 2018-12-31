import { makeExecutableSchema } from 'graphql-tools';

const usersMock: any[] = [
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
]

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
}

export default makeExecutableSchema({ typeDefs, resolvers });