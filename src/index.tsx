import React from "react";
import { twMerge } from "tailwind-merge";

import {
  Props,
  Target,
  StwBuildHandleProps,
  StwStyledCallbacks,
  StwStyledStyles,
} from "./types";

export function stailwind<T extends Target>(target: T) {
  const name = typeof target === "function" ? target.name : (target as string);
  let styles: string;
  let callbacks: StwStyledCallbacks<T>;

  function styled<P>(str: StwStyledStyles, ...cbs: StwStyledCallbacks<T, P>) {
    styles = str.join("");
    callbacks = cbs;
    return build<P>;
  }

  function build<P>(handleProps: StwBuildHandleProps<T, P> = (p) => p) {
    const T = target;
    return {
      [name]: (props: Props<T, P>) => <T {...handle<P>(props, handleProps)} />,
    }[name];
  }

  function handle<P>(props: Props<T, P>, handle: StwBuildHandleProps<T, P>) {
    const className = callbacks.reduce((r, cb) => `${r} ${cb?.(props)}`, "");
    return {
      ...handle(props),
      className: twMerge(styles, props.className || "", className),
    } as Props<T>;
  }

  return styled;
}

export const stw = stailwind;

export default stw;

export const css = (
  ...values: (string | number | TemplateStringsArray | CallableFunction)[]
) => {
  return values.reduce((r, val) => {
    const type = typeof val;

    if (val instanceof Array && typeof val[0] === "string")
      return val.join(" ");
    if (type === "function") return `${r} ${(val as CallableFunction)()}`;
    if (["number", "string"].includes(type)) return `${r} ${val}`;

    return r;
  }, "") as string;
};
