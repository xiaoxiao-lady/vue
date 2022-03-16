import observe from "./observe";

const obj = {
  a: {
    m: {
      n: 5,
    },
  },
  b: {
    j: {
      k: {
        l: 10,
      },
    },
  },
};

observe(obj);
