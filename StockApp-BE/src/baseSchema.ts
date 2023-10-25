//GraphQL server setup
import { createSchema } from 'graphql-yoga';
import path from 'path';
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge';
const resolversArray = loadFilesSync(path.join(__dirname, './resolvers'), { extensions: ['js', 'ts'] });
const typeDefsArray = loadFilesSync(path.join(__dirname, './schemas'), { extensions: ['graphql'] });

const typeDefs = mergeTypeDefs(typeDefsArray);
const resolvers = mergeResolvers(resolversArray);

const schema = createSchema({
  typeDefs,
  resolvers,
});

export default schema;
