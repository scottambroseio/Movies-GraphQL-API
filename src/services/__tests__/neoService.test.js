// @flow

"use strict";

import { getMovieById } from '../neoService';
import driver from '../../drivers/neoDriver';
import getMovieByIdQuery from '../../queries/getMovieByIdQuery';
import Movie from '../../domain/Movie';

jest.unmock('../neoService');
jest.unmock('../../domain/Movie');

const syncify = async (fn) => {
  try {
    const result = await fn();
    return () => { return result; };
  } catch (e) {
    return () => { throw e; };
  }
};

describe("neoService", () => {
  beforeEach(() => {
    driver.session().close.mockClear();
  });

  describe("getMovieById", () => {
    const id = 0;
    const name = "Test movie";

    const mockImplementation = async (query: string, { id }: { id : number}) => {
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

    it("should use the neo driver to run the correct query with the correct params", async () => {
      driver.session().run.mockImplementation(mockImplementation);

      await getMovieById(id);

      expect(driver.session().run).toBeCalledWith(getMovieByIdQuery, { id });
    });

    it("should return the correct movie when given a valid id", async () => {
      const expected = new Movie();
      expected.id = id;
      expected.name = name;

      driver.session().run.mockImplementation(mockImplementation);

      const movie = await getMovieById(id);

      expect(movie).toEqual(expected);
    });

    // test re throws errors and closes session

    it("should close the neo4j session after successfully finding a result", async () => {
      driver.session().run.mockImplementation(mockImplementation);

      await getMovieById(id);

      expect(driver.session().close).toHaveBeenCalledTimes(1);
    });

    it("should close the neo4j session when the neo driver throws an exception", async () => {
      driver.session().run.mockImplementation(async () => {
        throw new Error("Dummy error")
      });

      try {
        await getMovieById(id);
      } catch(e) {

      } finally {
        expect(driver.session().close).toHaveBeenCalledTimes(1);
      }
    });

    it("should rethrow any exceptions from the neo driver", async () => {
      driver.session().run.mockImplementation(async () => {
        throw new Error("Dummy error");
      });

      const fn = await syncify(getMovieById);

      expect(fn).toThrow();
    });
  });
});
