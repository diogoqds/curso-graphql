"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../../utils/utils");
const commentResolvers = {
    Comment: {
        user: (comment, args, { db }, info) => {
            return db.User.findById(comment.get('user'))
                .catch(utils_1.handleError);
        },
        post: (comment, args, { db }, info) => {
            return db.Post.findById(comment.get('post'))
                .catch(utils_1.handleError);
        },
    },
    Query: {
        commentsByPost: (parent, { postId, first = 10, offset = 0 }, { db }, info) => {
            postId = parseInt(postId, 10);
            return db.Comment
                .findAll({
                where: { post: postId },
                limit: first,
                offset: offset
            })
                .catch(utils_1.handleError);
        }
    },
    Mutation: {
        createComment: (parent, { input }, { db }, info) => {
            return db.sequelize.transaction((t) => {
                return db.Comment.create(input, { transaction: t });
            }).catch(utils_1.handleError);
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
            }).catch(utils_1.handleError);
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
            }).catch(utils_1.handleError);
        }
    }
};
exports.commentResolvers = commentResolvers;
