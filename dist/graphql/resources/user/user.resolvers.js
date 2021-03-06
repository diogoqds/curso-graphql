"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../../utils/utils");
const userResolvers = {
    User: {
        posts: (user, { first = 10, offset = 0 }, { db }, info) => {
            return db.Post
                .findAll({
                where: { author: user.get('id') },
                limit: first,
                offset: offset
            })
                .catch(utils_1.handleError);
        },
    },
    Query: {
        users: (parent, { first = 10, offset = 0 }, { db }, info) => {
            return db.User
                .findAll({
                limit: first,
                offset: offset
            })
                .catch(utils_1.handleError);
        },
        user: (parent, { id }, { db }, info) => {
            id = parseInt(id, 10);
            return db.User
                .findById(id)
                .then((user) => {
                if (!user) {
                    throw new Error(`User with id ${id} not found`);
                }
                return user;
            })
                .catch(utils_1.handleError);
        }
    },
    Mutation: {
        createUser: (parent, args, { db }, info) => {
            return db.sequelize.transaction((t) => {
                return db.User.create(args.input, { transaction: t });
            }).catch(utils_1.handleError);
        },
        updateUser: (parent, { id, input }, { db }, info) => {
            id = parseInt(id, 10);
            return db.sequelize.transaction((t) => {
                return db.User.findById(id)
                    .then((user) => {
                    if (!user) {
                        throw new Error(`User with id ${id} not found`);
                    }
                    return user.update(input, { transaction: t });
                });
            }).catch(utils_1.handleError);
        },
        updatePassword: (parent, { id, input }, { db }, info) => {
            id = parseInt(id, 10);
            return db.sequelize.transaction((t) => {
                return db.User.findById(id)
                    .then((user) => {
                    if (!user) {
                        throw new Error(`User with id ${id} not found`);
                    }
                    return user.update(input, { transaction: t })
                        .then((user) => !!user);
                });
            }).catch(utils_1.handleError);
        },
        deleteUser: (parent, { id }, { db }, info) => {
            id = parseInt(id, 10);
            return db.sequelize.transaction((t) => {
                return db.User.findById(id)
                    .then((user) => {
                    if (!user) {
                        throw new Error(`User with id ${id} not found`);
                    }
                    return user.destroy({ transaction: t })
                        .then(user => true);
                });
            }).catch(utils_1.handleError);
        },
    }
};
exports.userResolvers = userResolvers;
