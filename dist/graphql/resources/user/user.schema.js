"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userTypes = `
  type User {
    id: ID!
    name: String!
    email: String!
    photo: String
    createdAt: String!
    updatedAt: String!
    post(first: Int, offset: Int): [ Post! ]!
  }

  input UserCreateInput {
    name: String!
    email: String!
    photo: String
    password: String!
  }

  input UserUpdateInput {
    name: String!
    email: String!
    photo: String!
  }

  input UserUpdatePasswordInput {
    password: String!
  }
`;
exports.userTypes = userTypes;
const userQueries = `
  users(first: Int, offset: Int): [ User! ]!
  user(id: ID!): User
`;
exports.userQueries = userQueries;
const userMutations = `
  createUser(input: UserCreateInput!): User
  updateUser(id: ID!, input: UserUpdateInput!): User
  updatePassword(id: ID!, input: UserUpdatePasswordInput!): Boolean
  deleteUser(id: ID!): Boolean
`;
exports.userMutations = userMutations;
