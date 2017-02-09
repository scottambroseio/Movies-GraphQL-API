// @flow

"use strict";

export default `
  MATCH(m:Movie)-[:DIRECTED_BY] -> (d:Director)
  WHERE d.name = { name }
  RETURN m as movie
`;
