import schema from './baseSchema';
import dotenv from 'dotenv';
import { createServer } from 'node:http';
import { createYoga } from 'graphql-yoga';
dotenv.config();

const yoga = createYoga({ schema });

const server = createServer(yoga);
server.listen(4000, () => {
  console.info('Server is running on http://localhost:4000/graphql');
});
