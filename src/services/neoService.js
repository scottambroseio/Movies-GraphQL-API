// @flow

"ust strict";

import getMovieByIdQuery from '../queries/getMovieByIdQuery';
import getMoviesByDirectorQuery from '../queries/getMoviesByDirectorQuery';
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

const getMoviesByDirector = _sessionInjector(async (session: session, name: string) => {
  const { records } = await session.run(getMoviesByDirectorQuery, { name });

  const movies = map(records, (value) => {
    const movie = new Movie();

    movie.id = value.get('id');
    movie.name = value.get('name');

    return movie;
  });

  return movies;
});

const getMovieById = _sessionInjector(async (session: session, id: number): Promise<?Movie> => {
  const { records } = await session.run(getMovieByIdQuery, { id });

  if (!records.length) throw new Error("No movie found for the given id");

  const result = records[0];
  const movie = new Movie();

  movie.id = result.get('id');
  movie.name = result.get('name');

  return movie;
});

export {
  getMovieById,
  getMoviesByDirector,
}
