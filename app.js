import express from 'express'
import next from 'next';
import { ApolloServer } from 'apollo-server-express'
import { schema } from './server/config/apollo'
import dotenv from 'dotenv'

dotenv.config();

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev, dir: "./client" });
const handle = nextApp.getRequestHandler();

(async () => {
  await nextApp.prepare();
  const app = express();
  const port = process.env.PORT || 9000;
  const server = new ApolloServer({
    schema,
    playground: process.env.NODE_ENV == 'development'
  });
  server.applyMiddleware({ app, path:'/playground' });
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(__dirname));
  app.use(express.json());
  app.get('*', (req, res) => handle(req, res));
  app.listen(port, (err) => {
    if (err) throw err
    console.log(`> 🚀 Ready on http://localhost:${port}`)
    console.log(`> 🚀 Playground Ready at http://localhost:${port}${server.graphqlPath}`)
  });
})();