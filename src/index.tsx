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
  let styles: StwStyledStyles;
  let callbacks: StwStyledCallbacks<T>;

  function styled<P>(str: StwStyledStyles, ...cbs: StwStyledCallbacks<T, P>) {
    styles = str;
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
    const className = callbacks.reduce(
      (r, cb) => `${r} ${(cb instanceof Array ? cb[0] : cb)?.(props)}`,
      ""
    );
    return {
      ...handle(props),
      className: twMerge(styles[0], props.className || "", className),
    } as Props<T>;
  }

  return styled;
}

export default stailwind;