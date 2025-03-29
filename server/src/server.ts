import express from "express";
import { ApolloServer } from "apollo-server-express";
import db from "./config/connection.js";
import typeDefs from "./schemas/typeDefs.js";
import resolvers from "./schemas/resolvers.js";
import { authMiddleware } from "./middleware/auth.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

async function startServer() {
  await server.start();
  server.applyMiddleware({ app });

  db().then(() => {
    app.listen(4000, () => console.log(`Server running at http://localhost:4000${server.graphqlPath}`));
  });
}

startServer();
