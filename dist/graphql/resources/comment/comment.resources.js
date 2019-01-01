"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commentResolvers = {
    Comment: {
        user: (comment, args, { db }, info) => {
            return db.User.findById(comment.get('user'));
        },
        post: (comment, args, { db }, info) => {
            return db.Post.findById(comment.get('post'));
        },
    },
    Query: {
        commentsByPost: (parent, { postId, first = 10, offset = 0 }, { db }, info) => {
            return db.Comment
                .findAll({
                where: { post: postId },
                limit: first,
                offset: offset
            });
        }
    },
    Mutation: {
        createComment: (parent, { input }, { db }, info) => {
            return db.sequelize.transaction((t) => {
                return db.Comment.create(input, { transaction: t });
            });
        },
        updateComment: (parent, { commentId, input }, { db }, info) => {
            commentId = parseInt(commentId, 10);
            return db.sequelize.transaction((t) => {
                return db.Comment
                    .findById(commentId)
                    .then((comment) => {
                    if (!comment) {
                        throw new Error(`Comment with id ${commentId} not found`);
                    }
                    return comment.update(input, { transaction: t });
                });
            });
        },
        deleteComment: (parent, { commentId }, { db }, info) => {
            commentId = parseInt(commentId, 10);
            return db.sequelize.transaction((t) => {
                return db.Comment
                    .findById(commentId)
                    .then((comment) => {
                    if (!comment) {
                        throw new Error(`Comment with id ${commentId} not found`);
                    }
                    comment.destroy({ transaction: t })
                        .then(comment => true);
                });
            });
        }
    }
};
exports.commentResolvers = commentResolvers;
