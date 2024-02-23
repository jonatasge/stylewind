import { StwStyles } from "./types";

export function css<T = unknown, P = unknown>(...styles: StwStyles<T, P>) {
  if (styles[0] instanceof Array && typeof styles[0][0] === "string") {
    return styles[0].reduce(
      (r, val, i) => `${r}${val}${handleTemplate(styles[i + 1])}`,
      ""
    );
  }
  return "";
}

function handleTemplate(value: unknown) {
  const type = typeof value;
  if (type === "function") return (value as CallableFunction)();
  if (["number", "string"].includes(type)) return value;
  return "";
}
