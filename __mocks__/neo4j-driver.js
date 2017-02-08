// @flow

"use strict";

const driver = (() => {
  const close = jest.fn();
  const session = (() => {
    const run = jest.fn(() => {

    });

    return {
      run,
    };
  })();

  return jest.fn(() => {
    return {
      close,
      session,
    };
  });
})();

const auth = (() => {
  const basic = jest.fn((name: string, password: string) => {
    return {
      scheme: "test-scheme",
      name,
      password,
    }
  });

  return {
    basic,
  };
})();

const v1 = {
  driver,
  auth,
};

export {
  v1,
}
