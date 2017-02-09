// @flow

"use strict";

export default `
  MATCH(m:Movie)<-[:STARRED_IN]-(a:Actor)
  WHERE a.name = { name }
  RETURN m as movie
`;
