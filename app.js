import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { schema } from './server/config/apollo'

require('dotenv').config()

const server = new ApolloServer({
  schema,
  playground: process.env.NODE_ENV == 'development'
});

(async () => {
  const app = express();
  const port = process.env.PORT || 9000;
  server.applyMiddleware({ app, path:'/playground' });
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.listen(port, (err) => {
    if (err) throw err
    console.log(`> 🚀 Ready on http://localhost:${port}`)
    console.log(`> 🚀 Playground Ready at http://localhost:${port}${server.graphqlPath}`)
  });
})();