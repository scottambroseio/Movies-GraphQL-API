// @flow

"ust strict";

import getMovieByIdQuery from '../queries/getMovieByIdQuery';
import driver from '../drivers/neoDriver';
import Movie from '../domain/Movie';

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
}
