import { Props } from "./types";

export function handleValue<T = unknown, P = unknown>(
  value: unknown,
  props?: Props<T, P>
) {
  if (typeof value === "function")
    return handleValue((value as CallableFunction)(props));
  if (["number", "string"].includes(typeof value)) return value;
  return "";
}
