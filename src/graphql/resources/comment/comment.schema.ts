const commentTypes = `
  type Comment {
    id: ID!
    comment: String!
    user: User!
    post: Post!
    createdAt: String!
    updatedAt: String!
  }

  input CommentInput {
    comment: String!
    user: Int!
    post: Int!
  }
`;

const commentQueries = `
  commentsByPost(postId: ID!, first: Int, offset: Int): [ Comment! ]!
`;

const commentMutations = `
  createComment(input: CommentInput!): Comment
  updateComment(commentId: ID!, input: CommentInput!): Comment
  deleteComment(commentId: ID!): Boolean
`;

export { commentTypes, commentQueries, commentMutations };
