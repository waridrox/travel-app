const { dateDiffInDays } = require("../src/client/JS/dates");

test("calculates diff in dates", () => {
  const a = new Date("04/27/2020");
  const diff = dateDiffInDays(a);
  expect(diff).toBe(10);
});
