import { DbConnection } from "../../../interfaces/DbConnectionInterface";
import { GraphQLResolveInfo } from "graphql";
import { UserInstance } from "../../../models/UserModel";
import { Transaction } from "sequelize";

const userResolvers = {
  User: {
    posts: (user, { first = 10, offset = 0 }, { db }: { db: DbConnection }, info: GraphQLResolveInfo) => {
      return db.Post
            .findAll({
              where: { author: user.get('id') },
              limit: first,
              offset: offset
            });
    },
  },

  Query: {
    users: (parent, { first = 10, offset = 0 }, { db }: { db: DbConnection }, info: GraphQLResolveInfo) => {
      return db.User
            .findAll({
              limit: first,
              offset: offset
            })
    },

    user: (parent, { id }, { db } : { db: DbConnection }, info: GraphQLResolveInfo ) => {
      return db.User
            .findById(id)
            .then((user: UserInstance) => {
              if(!user) {
                throw new Error(`User with id ${id} not found`)
              }

              return user;
            });
    }
  },

  Mutation: {
    createUser: (parent, args, { db }: { db: DbConnection }, info: GraphQLResolveInfo) => {
      return db.sequelize.transaction((t: Transaction) => {
        return db.User.create(args.input, { transaction: t });
      });
    },

    updateUser: (parent, { id, input }, { db }: { db: DbConnection }, info: GraphQLResolveInfo) => {
      id = parseInt(id, 10);
      return db.sequelize.transaction((t: Transaction) => {
        return db.User.findById(id)
          .then((user: UserInstance) => {
            if(!user) {
              throw new Error(`User with id ${id} not found`)
            }

            return user.update(input, { transaction: t })
          })
      });
    },

    updatePassword: (parent, { id, input }, { db }: { db: DbConnection }, info: GraphQLResolveInfo) => {
      id = parseInt(id, 10);
      return db.sequelize.transaction((t: Transaction) => {
        return db.User.findById(id)
          .then((user: UserInstance) => {
            if(!user) {
              throw new Error(`User with id ${id} not found`)
            }

            return user.update(input, { transaction: t })
                    .then((user: UserInstance) => !!user);
          })
      });
    },

    deleteUser: (parent, { id }, { db }: { db: DbConnection }, info: GraphQLResolveInfo) => {
      id = parseInt(id, 10);
      return db.sequelize.transaction((t: Transaction) => {
        return db.User.findById(id)
          .then((user: UserInstance) => {
            if(!user) {
              throw new Error(`User with id ${id} not found`)
            }

            return user.destroy({ transaction: t})
                  .then(user => true);
          })
      });
    },
  }
}

export { userResolvers };
