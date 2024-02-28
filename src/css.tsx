import { handleValue } from "./helpers";
import { Styles } from "./types";

export function css(...styles: Styles[]) {
  if (styles[0] instanceof Array && typeof styles[0][0] === "string") {
    return styles[0].reduce(
      (r, val, i) => `${r}${val}${handleValue(styles[i + 1])}`,
      ""
    );
  }
  return "";
}
