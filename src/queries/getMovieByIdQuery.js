// @flow

"use strict";

export default `
  MATCH (m:Movie)
  WHERE ID(m) = { id }
  RETURN m as movie
`;
