// @flow

"use strict";

import koa from 'koa';
import mount from 'koa-mount'; // koa-mount@1.x
import graphqlHTTP from 'koa-graphql';
import schema from './schema/schema';
import resolver from './resolvers/resolver'

const createServer = () => {
  const app = koa();

  app.use(mount('/graphql', graphqlHTTP({
    schema,
    graphiql: true,//process.env.NODE_ENV === "test",
    rootValue: resolver
  })));

  return app;
};

export default createServer;
