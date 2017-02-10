// @flow

"use strict";
const use = jest.fn();

const koa = jest.fn(() => {
  return {
    use
  }
});

export default koa;
