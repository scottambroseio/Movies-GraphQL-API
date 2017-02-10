// @flow

"use strict";

import getMovieByIdQuery from '../queries/getMovieByIdQuery';
import getMoviesByDirectorQuery from '../queries/getMoviesByDirectorQuery';
import getMoviesFeaturingActorQuery from '../queries/getMoviesFeaturingActorQuery';
import getMoviesOfGenreQuery from '../queries/getMoviesOfGenreQuery';
import driver from '../drivers/neoDriver';
import Movie from '../domain/Movie';
import { map } from 'lodash';

const _sessionInjector = (fn: Function) => {
  const session = driver.session();

  return async function() {
    try {
      const result = await fn(session, ...arguments);

      session.close();

      return result;
    } catch(e) {
      session.close();

      throw e;
    }
  }
}

const _generateArrayFromRecords = (records): Array<Movie> => {
  const movies = map(records, (value) => {
    const movie = new Movie();

    movie.id = value.get('id');
    movie.name = value.get('name');

    return movie;
  });

  return movies;
};

const getMoviesFeaturingActor = _sessionInjector(async (session: session, name: string) => {
  const { records } = await session.run(getMoviesFeaturingActorQuery, { name });

  const movies = _generateArrayFromRecords(records);

  return movies;
});

const getMoviesByDirector = _sessionInjector(async (session: session, name: string) => {
  const { records } = await session.run(getMoviesByDirectorQuery, { name });

  const movies = _generateArrayFromRecords(records);

  return movies;
});

const getMovieById = _sessionInjector(async (session: session, id: number): Promise<?Movie> => {
  const { records } = await session.run(getMovieByIdQuery, { id });

  const movies = _generateArrayFromRecords(records);

  if (!movies.length) throw new Error("No movie found for the given id");

  return movies[0];
});

const getMoviesOfGenre = _sessionInjector(async (session: session, name: string) => {
  const { records } = await session.run(getMoviesOfGenreQuery, { name });

  const movies = _generateArrayFromRecords(records);

  return movies;
});

export {
  getMovieById,
  getMoviesByDirector,
  getMoviesFeaturingActor,
  getMoviesOfGenre,
}
