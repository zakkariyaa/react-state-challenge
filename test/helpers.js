// eslint-disable-next-line import/no-unresolved
import "global-jsdom/register";
import assert from "node:assert/strict";
import ReactDOM from "react-dom/client";
import { act, Simulate } from "react-dom/test-utils";
export { jsx } from "react/jsx-runtime";
export { act };

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

const DIR = process.env.DIR || "challenge";

export async function component(name) {
  const path = `../${DIR}/${name}.jsx`;
  const module = await import(path);
  assert.equal(
    typeof module.default,
    "function",
    `Default export from ${name}.jsx should be a function, but got:
    ${module.default}
  `
  );
  return module.default;
}

/**
 * Renders a React component into a <div> in the DOM.
 * Returns an unmount function to clean up.
 * @param {JSX.Element} element
 * @returns () => void
 */

export function render(element) {
  const container = document.createElement("div");
  document.body.replaceChildren(container);
  let root = ReactDOM.createRoot(container);
  act(() => root.render(element));
  return () => act(() => root.unmount());
}

/**
 * Simulates an event on an HTML element.
 * @param {keyof typeof Simulate} name
 * @param {HTMLElement} element
 * @param {import("react-dom/test-utils").SyntheticEventData} data
 */

export function event(name, element, data) {
  act(() => Simulate[name](element, data));
}

/**
 * Prints a nicely formatted DOM tree for easier debugging.
 * @param {HTMLElement} element
 * @returns string
 */

export function debug(element = document.body) {
  return pretty(element) + "\n";
}

function pretty(el, depth = 0) {
  let indent = "  ".repeat(depth);
  let name = tag(el.tagName.toLowerCase());
  let open = "<" + name + attrs(el) + ">";
  let close = el.childNodes.length ? `</${name}>` : "";
  if (!el.childElementCount) return indent + open + el.textContent + close;
  let kids = [...el.children].map((e) => pretty(e, depth + 1)).join("\n");
  return indent + open + "\n" + kids + "\n" + indent + close;
}

let attr = ({ name, value }) => ` ${key(name)}="${val(value)}"`;
let attrs = (el) => [...el.attributes].map(attr).join("");

// Print coloured output using ansi escape codes
// _very_ rudimentary syntax highlighting
let key = (s) => `\x1b[35m${s}\x1b[39m`;
let val = (s) => `\x1b[32m${s}\x1b[39m`;
let tag = (s) => `\x1b[34m${s}\x1b[39m`;
