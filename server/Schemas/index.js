const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} = graphql;
const userData = require("../MOCK_DATA.json");
const UserType = require("./TypeDefs/UserType");

const getId = () => {
  let isUnique = false;
  let randomId;

  while (!isUnique) {
    randomId = Math.floor(Math.random() * 1000000) + 1;
    const exists = userData.some((user) => user.id === randomId);

    if (!exists) isUnique = true;
  }

  return randomId;
};

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getAllUsers: {
      type: new GraphQLList(UserType),
      args: { id: { type: GraphQLInt } },
      resolve(parent, args) {
        return userData;
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createUser: {
      type: UserType,
      args: {
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve(parent, args) {
        userData.push({
          id: getId(),
          firstName: args.firstName,
          lastName: args.lastName,
          email: args.email,
          password: args.password,
        });
        return args;
      },
    },
    deleteUser: {
      type: UserType,
      args: {
        id: { type: GraphQLInt },
      },
      resolve(parent, args) {
        const userIndex = userData.findIndex((user) => user.id === args.id);
        if (userIndex === -1) throw new Error("User not found");
        const [deletedUser] = userData.splice(userIndex, 1);
        return deletedUser;
      },
    },
  },
});

module.exports = new GraphQLSchema({ query: RootQuery, mutation: Mutation });
