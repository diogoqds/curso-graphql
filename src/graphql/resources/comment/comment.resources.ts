import { GraphQLResolveInfo } from "graphql";
import { DbConnection } from "../../../interfaces/DbConnectionInterface";
import { Transaction } from "sequelize";
import { CommentInstance } from "../../../models/CommentModel";
import { handleError } from "../../../utils/utils";

const commentResolvers = {

  Comment: {
    user: (comment, args, { db } : { db: DbConnection }, info: GraphQLResolveInfo ) => {
      return db.User.findById(comment.get('user'))
            .catch(handleError);
    },
    post: (comment, args, { db } : { db: DbConnection }, info: GraphQLResolveInfo ) => {
      return db.Post.findById(comment.get('post'))
            .catch(handleError);
    },
  },

  Query: {
    commentsByPost: (parent, { postId, first = 10, offset = 0 }, { db } : { db: DbConnection }, info: GraphQLResolveInfo) => {
      postId = parseInt(postId, 10)
      return db.Comment
            .findAll({
              where: { post: postId },
              limit: first,
              offset: offset
            })
            .catch(handleError);
    }
  },

  Mutation: {
    createComment: (parent, { input }, { db }: { db: DbConnection }, info: GraphQLResolveInfo) => {
      return db.sequelize.transaction((t: Transaction) => {
        return db.Comment.create(input, { transaction: t });
      }).catch(handleError);
    },

    updateComment: (parent, { commentId, input }, { db }: { db:DbConnection }, info: GraphQLResolveInfo) => {
      commentId = parseInt(commentId,10)
      return db.sequelize.transaction((t: Transaction) => {
        return db.Comment
                .findById(commentId)
                .then((comment: CommentInstance) => {
                  if(!comment) {
                    throw new Error(`Comment with id ${commentId} not found`)
                  }
                  return comment.update(input, { transaction: t })
                })
      }).catch(handleError);
    },

    deleteComment: (parent, { commentId }, { db }: { db:DbConnection }, info: GraphQLResolveInfo) => {
      commentId = parseInt(commentId,10)
      return db.sequelize.transaction((t: Transaction) => {
        return db.Comment
                .findById(commentId)
                .then((comment: CommentInstance) => {
                  if(!comment) {
                    throw new Error(`Comment with id ${commentId} not found`)
                  }
                  comment.destroy({ transaction: t})
                  .then(comment => true)
                })
      }).catch(handleError);
    }
  }
}

export { commentResolvers };
