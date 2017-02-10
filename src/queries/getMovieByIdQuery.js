// @flow

"use strict";

export default `
  MATCH (m:Movie)
  WHERE ID(m) = { id }
  RETURN ID(m) as id, m.name as name
`;
