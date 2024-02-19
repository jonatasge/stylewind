import React, { ForwardedRef, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

import {
  Props,
  StwBuildHandleProps,
  StwStyledCallbacks,
  StwStyledStyles,
  Target,
} from "./types";

export function stylewind<T extends Target>(target: T) {
  const name = typeof target === "function" ? target.name : (target as string);
  let styles: string;
  let callbacks: StwStyledCallbacks<T>;

  function styled<P>(str: StwStyledStyles, ...cbs: StwStyledCallbacks<T, P>) {
    styles = str.join("");
    callbacks = cbs;
    return build<P>;
  }

  function build<P>(handleProps: StwBuildHandleProps<T, P> = (p) => p) {
    const Target = target;
    return {
      [name]: forwardRef<any, Props<T, P>>((props, ref) => (
        <Target {...handle<P>(props, ref, handleProps)} />
      )),
    }[name];
  }

  function handle<P>(
    props: Props<T, P>,
    ref: ForwardedRef<any>,
    handle: StwBuildHandleProps<T, P>
  ) {
    const className = callbacks.reduce((r, cb) => `${r} ${cb?.(props)}`, "");
    
    return {
      ...handle(props),
      ref,
      className: twMerge(styles, className, props.className || ""),
    } as Props<T>;
  }

  return styled;
}

export const stw = stylewind;
