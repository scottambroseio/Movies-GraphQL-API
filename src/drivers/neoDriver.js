// @flow

"use strict";

import { v1 as neo4j } from 'neo4j-driver';

const { neoAuthName, neoAuthPass } = process.env;

if (neoAuthName === undefined ||
    neoAuthPass === undefined ||
    neoAuthName === null ||
    neoAuthPass === null) {
      throw new Error("Can't find neo4j credentials");
}

const driver = neo4j.driver("bolt://localhost", neo4j.auth.basic(neoAuthName, neoAuthPass));

export default driver;
