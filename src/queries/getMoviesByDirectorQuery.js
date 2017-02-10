// @flow

"use strict";

export default `
  MATCH(m:Movie)-[:DIRECTED_BY] -> (d:Director)
  WHERE d.name = { name }
  RETURN ID(m) as id, m.name as name
`;
