// eslint-disable-next-line import/no-unresolved
import test from "node:test";
import assert from "node:assert/strict";
import { component, render, jsx, debug } from "./helpers.js";

test("FilterPrice component is extracted to separate file", async (t) => {
  const FilterPrice = await component("FilterPrice");
  const el = jsx(FilterPrice, { max: 9 });
  const unmount = render(el);
  t.after(unmount);

  const legend = document.querySelector("legend");
  assert.match(
    legend?.textContent,
    /price/i,
    `<FilterPrice /> render should include <legend>Price</legend>, but got:\n${debug()}`
  );
});

test("FilterCategory component is extracted to separate file", async (t) => {
  const FilterCategory = await component("FilterCategory");
  const el = jsx(FilterCategory, { category: "all" });
  const unmount = render(el);
  t.after(unmount);

  const legend = document.querySelector("legend");
  assert.match(
    legend?.textContent,
    /category/i,
    `<FilterCategory /> render should include <legend>Category</legend>, but got:\n${debug()}`
  );
});

test("ListDishes component is extracted to separate file", async (t) => {
  const ListDishes = await component("ListDishes");
  const el = jsx(ListDishes, { category: "all", max: 9 });
  const unmount = render(el);
  t.after(unmount);

  const ul = document.querySelector("ul");
  assert.equal(
    ul?.children?.length,
    58,
    `<ListDishes /> should render a <ul> with 58 children, but got:\n${debug(
      ul
    )}`
  );
});
