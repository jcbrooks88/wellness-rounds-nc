import express from "express";
import { ApolloServer } from "apollo-server-express";
import seedDiscussions from "./seed/seedDiscussions.js";
import seedPost from "./seed/seedPosts.js";
import connectDB from "./config/connection.js";
import userTypeDefs from "./schemas/userSchema.js";
import userResolvers from "./resolvers/userResolvers.js";
import discussionTypeDefs from "./schemas/discussionSchema.js";
import discussionResolvers from "./resolvers/discussionResolvers.js";
import { authMiddleware } from "./middleware/authMiddleware.js";
import dotenv from "dotenv";
import merge from "lodash.merge";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

// ✅ Fix CORS issue
app.use((_req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// ✅ Combine typeDefs and resolvers
const typeDefs = [userTypeDefs, discussionTypeDefs];
const resolvers = merge(userResolvers, discussionResolvers);

async function startServer() {
  try {
    await connectDB();
    console.log("✅ MongoDB Ready");

    await seedDiscussions();
    console.log("🌱 Discussions seeding completed");

    await seedPost();
    console.log("🌱 Posts seeding completed");

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: ({ req }) => authMiddleware({ req }),
    });

    await server.start();
    server.applyMiddleware({ app, path: "/graphql" });

    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}${server.graphqlPath}`);
    });
  } catch (error) {
    console.error("❌ Server startup error:", error);
  }
}

startServer();
