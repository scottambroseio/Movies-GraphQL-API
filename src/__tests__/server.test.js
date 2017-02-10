// @flow

"use strict";

import createServer from '../server';
import koa from 'koa';
import mount from 'koa-mount';
import graphqlHTTP from 'koa-graphql';
import schema from '../schema/schema';
import resolver from '../resolvers/resolver'

jest.unmock('../server');

describe("createServer", () => {
  beforeEach(() => {
    koa.mockClear();
    mount.mockClear();
    graphqlHTTP.mockClear();
  });

  it("should create a application instance using the koa function", () => {
    createServer();

    expect(koa).toHaveBeenCalledTimes(1);
  });

  it("should return the created application", () => {
    const app = createServer();

    expect(app).toEqual(koa());
  });

  it("should corectly mount the graphql endpoint", () => {
    const app = createServer();

    expect(mount).toHaveBeenCalledWith('/graphql', graphqlHTTP({
      schema,
      graphiql: true,
      rootValue: resolver
    }));
  });
});
