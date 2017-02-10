// @flow

import { getMovieById, getMoviesByDirector, getMoviesFeaturingActor, getMoviesOfGenre } from '../services/neoService';

"use strict";

//TODO: Add error handling etc
const resolver = {
  getMovieById: async ({ id }: { id: number}) => {
    return await getMovieById(id);
  },
  getMoviesByDirector: async ({ name }: {name: string}) => {
    return await getMoviesByDirector(name);
  },
  getMoviesFeaturingActor: async ({ name }: {name: string}) => {
    return await getMoviesFeaturingActor(name);
  },
  getMoviesOfGenre: async ({ name }: {name: string}) => {
    return await getMoviesOfGenre(name);
  },
};

export default resolver;
