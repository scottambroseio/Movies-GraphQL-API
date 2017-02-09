// @flow

"use strict";

import driver from '../neoDriver';
import { v1 as neo4j } from 'neo4j-driver';

jest.unmock('../neoDriver');

const { neoAuthName, neoAuthPass } = process.env;

if (neoAuthName === undefined ||
    neoAuthPass === undefined ||
    neoAuthName === null ||
    neoAuthPass === null) {
      throw new Error("Can't find neo4j credentials");
}

describe("neoDriver", () => {
  it("should create a driver, passing the correct arguments", () => {
    expect(neo4j.driver).toHaveBeenCalledWith("bolt://localhost", neo4j.auth.basic(neoAuthName, neoAuthPass));
  });
});
