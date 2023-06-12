// eslint-disable-next-line import/no-unresolved
import test from "node:test";
import assert from "node:assert/strict";
import { component, render, jsx, event, debug } from "./helpers.js";

test("User can filter list by selecting different category", async (t) => {
  const App = await component("App");
  const unmount = render(jsx(App, {}));
  t.after(unmount);

  const burger = document.querySelector("input[type='radio']#burger");
  assert.ok(
    burger,
    `Expected an <input type="radio" id="burger">, but got:\n${debug()}`
  );
  event("change", burger);

  const ul = document.querySelector("ul");
  assert.equal(
    ul?.children?.length,
    8,
    `Expected <ul> to have 12 children after category set to 'burger', but got ${ul?.children?.length}`
  );

  const topping = document.querySelector("input[type='radio']#topping");
  assert.ok(
    topping,
    `Expected an <input type="radio" id="topping">, but got:\n${debug()}`
  );
  event("change", topping);

  const ul2 = document.querySelector("ul");
  assert.equal(
    ul2?.children?.length,
    15,
    `Expected <ul> to have 15 children after category set to 'toppings', but got ${ul2?.children?.length}`
  );
});
