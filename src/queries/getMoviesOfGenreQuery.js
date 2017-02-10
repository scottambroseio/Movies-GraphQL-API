// @flow

"use strict";

export default `
  MATCH(m:Movie)-[:OF_GENRE]->(g:Genre)
  WHERE g.name = { name }
  RETURN ID(m) as id, m.name as name
`;
