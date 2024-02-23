import React, { ForwardedRef, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

import { css } from "./css";
import { Props, StwBuildHandleProps, StwStyles, Target } from "./types";

export function stylewind<T extends Target>(target: T) {
  let styles: StwStyles<T>;

  function styled<P>(...style: StwStyles<T, P>) {
    styles = style;
    return build<P>;
  }

  function build<P>(handleProps: StwBuildHandleProps<T, P> = (p) => p) {
    const Target = target;
    return forwardRef<T, Props<T, P>>((props, ref) => (
      <Target {...handle<P>(props, ref, handleProps)} />
    )) as (props: Props<T, P>) => JSX.Element;
  }

  function handle<P>(
    props: Props<T, P>,
    ref: ForwardedRef<T>,
    handle: StwBuildHandleProps<T, P>
  ) {
    const handledStyles = css(
      ...styles.map((e) => (typeof e === "function" ? () => e(props) : e))
    );
    const handledProps = handle(props);
    const className = twMerge(handledStyles, handledProps.className);
    return { ref, ...handledProps, className } as Props<T>;
  }

  return styled;
}

export const stw = stylewind;
