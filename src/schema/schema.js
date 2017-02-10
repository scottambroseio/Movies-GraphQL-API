// @flow

"use strict";

import { buildSchema } from 'graphql';

const schema = buildSchema(`
    # The root query type
    type Query {
      # Gets the movie for a specified id
      getMoviesFeaturingActor(name: String!): [Movie]
      getMoviesByDirector(name: String!): [Movie]
      getMovieById(id: Int!): Movie
      getMoviesOfGenre(name: String!): [Movie]
    }

    # The Movie type
    type Movie {
      id: Int!
      name: String!
    }
`);

export default schema;
