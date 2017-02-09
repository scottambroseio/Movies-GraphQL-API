// @flow

"use strict";

import { getMovieById, getMoviesByDirector } from '../neoService';
import driver from '../../drivers/neoDriver';
import getMovieByIdQuery from '../../queries/getMovieByIdQuery';
import getMoviesByDirectorQuery from '../../queries/getMoviesByDirectorQuery';
import Movie from '../../domain/Movie';
import { slice } from 'lodash';

jest.unmock('../neoService');
jest.unmock('../../domain/Movie');

const syncify = async function(fn, ...args: any): Promise<Function> {
  try {
    const result = await fn(slice(arguments, 1, arguments.length));
    return () => { return result; };
  } catch (e) {
    return () => { throw e; };
  }
};

describe("neoService", () => {
  beforeEach(() => {
    driver.session().close.mockClear();
    driver.session().run.mockClear();
  });

  const throwingErrorMockImplementation = async () => {
    throw new Error("Dummy error")
  };

  describe("getMovieById", () => {
    const id = 0;
    const name = "Test movie";

    const workingMockImplementation = async (query: string, { id }: { id : number}) => {
      return {
        records: [
          {
            get(key: string) {
                if (key === "id") return id;
                if (key === "name") return name;
            }
          }
        ],
      };
    };

    const noResultMockImplementation = async () => {
      return {
        records: []
      }
    };

    it("should use the neo driver to run the correct query with the correct params", async () => {
      driver.session().run.mockImplementation(workingMockImplementation);

      await getMovieById(id);

      expect(driver.session().run).toBeCalledWith(getMovieByIdQuery, { id });
    });

    it("should return the correct movie when given a valid id", async () => {
      const expected = new Movie();
      expected.id = id;
      expected.name = name;

      driver.session().run.mockImplementation(workingMockImplementation);

      const movie = await getMovieById(id);

      expect(movie).toEqual(expected);
    });

    it("should throw an error if it finds no results", async () => {
      driver.session().run.mockImplementation(noResultMockImplementation);

      const fn = await syncify(getMovieById,id);

      expect(fn).toThrow();
    });

    it("should close the neo4j session after successfully finding a result", async () => {
      driver.session().run.mockImplementation(workingMockImplementation);

      await getMovieById(id);

      expect(driver.session().close).toHaveBeenCalledTimes(1);
    });

    it("should close the neo4j session when the neo driver throws an exception", async () => {
      driver.session().run.mockImplementation(throwingErrorMockImplementation);

      try {
        await getMovieById(id);
      } catch(e) {

      } finally {
        expect(driver.session().close).toHaveBeenCalledTimes(1);
      }
    });

    it("should rethrow any exceptions from the neo driver", async () => {
      driver.session().run.mockImplementation(throwingErrorMockImplementation);

      const fn = await syncify(getMovieById, id);

      expect(fn).toThrow();
    });
  });

  describe("getMoviesByDirector", () => {
    const name = "Test Director";
    const movieName = "Test Movie";
    const movieId = 0;

    const workingMockImplementation = async (query: string, { name }: { name : string }) => {
      return {
        records: [
          {
            get(key: string) {
                if (key === "id") return movieId;
                if (key === "name") return movieName;
            },
          }
        ],
      };
    };

    const noResultMockImplementation = async (query: string, { name }: { name : string }) => {
      return {
        records: [],
      };
    };

    it("should use the neo driver to run the correct query with the correct params", async () => {
      driver.session().run.mockImplementation(workingMockImplementation);

      await getMoviesByDirector(name);

      expect(driver.session().run).toBeCalledWith(getMoviesByDirectorQuery, { name });
    });

    it("should return the correct movies when given a valid director name", async () => {
      const expected = [new Movie()];
      expected[0].id = movieId;
      expected[0].name = movieName;

      driver.session().run.mockImplementation(workingMockImplementation);

      const movies = await getMoviesByDirector(name);

      expect(movies).toEqual(expected);
    });

    it("should return an empty list if no mives are found", async () => {
      driver.session().run.mockImplementation(noResultMockImplementation);

      const movies = await getMoviesByDirector(name);

      expect(movies).toEqual([]);
    });

    it("should rethrow any exceptions from the neo driver", async () => {
      driver.session().run.mockImplementation(throwingErrorMockImplementation);

      const fn = await syncify(getMoviesByDirector, name);

      expect(fn).toThrow();
    });

    it("should close the neo4j session after successfully finding a result", async () => {
      driver.session().run.mockImplementation(workingMockImplementation);

      await getMoviesByDirector(name);

      expect(driver.session().close).toHaveBeenCalledTimes(1);
    });

    it("should close the neo4j session when the neo driver throws an exception", async () => {
      driver.session().run.mockImplementation(throwingErrorMockImplementation);

      try {
        await getMoviesByDirector(name);
      } catch(e) {

      } finally {
        expect(driver.session().close).toHaveBeenCalledTimes(1);
      }
    });
  });
});
