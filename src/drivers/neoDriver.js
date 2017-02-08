// @flow

"use strict";

import { v1 as neo4j } from 'neo4j-driver';

const driver = neo4j.driver("bolt://localhost", neo4j.auth.basic("test", "test"));

export default driver;
