// eslint-disable-next-line import/no-unresolved
import test from "node:test";
import assert from "node:assert/strict";
import { component, render, jsx, event, debug } from "./helpers.js";

test("User can filter list by changing range input", async (t) => {
  const App = await component("App");
  const unmount = render(jsx(App, {}));
  t.after(unmount);

  const range = document.querySelector("input[type='range']");
  assert.ok(range, `Expected an <input type="range">, but got:\n${debug()}`);

  range.value = "0.5";
  event("change", range);

  const ul = document.querySelector("ul");
  assert.equal(
    ul?.children?.length,
    12,
    `Expected <ul> to have 12 children after max price set to 0.5, but got ${ul?.children?.length}`
  );

  range.value = "4.25";
  event("change", range);

  const ul2 = document.querySelector("ul");
  assert.equal(
    ul2?.children?.length,
    42,
    `Expected <ul> to have 42 children after max price set to 4.25, but got ${ul2?.children?.length}`
  );
});
