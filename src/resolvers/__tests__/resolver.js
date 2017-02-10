// @flow

"use strict";

import resolver from '../resolver';
import { getMovieById, getMoviesByDirector, getMoviesFeaturingActor, getMoviesOfGenre } from '../../services/neoService';
import Movie from '../../domain/Movie';

jest.unmock('../resolver')
jest.unmock('../../domain/Movie')

describe("resolver", () => {
  beforeEach(() => {
    getMovieById.mockClear();
    getMoviesByDirector.mockClear();
    getMoviesFeaturingActor.mockClear();
    getMoviesOfGenre.mockClear();
  });

  describe("getMovieById", () => {
    const id = 0;

    it("should call the correct service method with the correct arguments", async () => {
      await resolver.getMovieById({ id });

      expect(getMovieById).toHaveBeenCalledWith(id);
    });

    it("should return ther result from the service", async () => {
      const expected = new Movie();
      expected.id = id;

      getMovieById.mockImplementation(async () => {
        return expected;
      });

      const result = await resolver.getMovieById({ id });

      expect(result).toBe(expected);
    });
  });

  describe("getMoviesByDirector", () => {
    const name = "Test Director";

    it("should call the correct service method with the correct arguments", async () => {
      await resolver.getMoviesByDirector({ name });

      expect(getMoviesByDirector).toHaveBeenCalledWith(name);
    });

    it("should return ther esult from the service", async () => {
      const movie = new Movie();
      movie.name = "Test Movie";

      const expected = [movie];

      getMoviesByDirector.mockImplementation(async () => {
        return expected;
      });

      const result = await resolver.getMoviesByDirector({ name });

      expect(result).toBe(expected);
    });
  });

  describe("getMoviesFeaturingActor", () => {
    const name = "Test Actor";

    it("should call the correct service method with the correct arguments", async () => {
      await resolver.getMoviesFeaturingActor({ name });

      expect(getMoviesFeaturingActor).toHaveBeenCalledWith(name);
    });

    it("should return ther esult from the service", async () => {
      const movie = new Movie();
      movie.name = "Test Movie";

      const expected = [movie];

      getMoviesFeaturingActor.mockImplementation(async () => {
        return expected;
      });

      const result = await resolver.getMoviesFeaturingActor({ name });

      expect(result).toBe(expected);
    });
  });

  describe("getMoviesOfGenre", () => {
    const name = "Test Genre";

    it("should call the correct service method with the correct arguments", async () => {
      await resolver.getMoviesOfGenre({ name });

      expect(getMoviesOfGenre).toHaveBeenCalledWith(name);
    });

    it("should return ther esult from the service", async () => {
      const movie = new Movie();
      movie.name = "Test Movie";

      const expected = [movie];

      getMoviesOfGenre.mockImplementation(async () => {
        return expected;
      });

      const result = await resolver.getMoviesOfGenre({ name });

      expect(result).toBe(expected);
    });
  });
});
