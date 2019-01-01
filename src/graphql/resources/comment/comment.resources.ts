import { GraphQLResolveInfo } from "graphql";
import { DbConnection } from "../../../interfaces/DbConnectionInterface";

const commentResolvers = {

  Comment: {
    user: (comment, args, { db } : { db: DbConnection }, info: GraphQLResolveInfo ) => {
      return db.User.findById(comment.get('user'))
    },
    post: (comment, args, { db } : { db: DbConnection }, info: GraphQLResolveInfo ) => {
      return db.Post.findById(comment.get('post'))
    },
  },

  Query: {
    Comment: {
      commentsByPost: (parent, { postId, first = 10, offset = 0 }, { db } : { db: DbConnection }, info: GraphQLResolveInfo) => {
        return db.Comment
              .findAll({
                where: { post: postId },
                limit: first,
                offset: offset
              })
      }
    }
  },

  Mutation: {

  }
}