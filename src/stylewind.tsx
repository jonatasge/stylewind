import isPropValid from "@emotion/is-prop-valid";
import React, { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

import { handleValue } from "./helpers";
import { Config, PropName, Props, Styles, Target } from "./types";

export function stylewind<T extends Target>(target: T) {
  let _props: Props<T>;
  let _styles: Styles<T>[];
  let _shouldProps = {
    forward: [] as PropName<T>[],
    notForward: [] as PropName<T>[],
  };

  function styled<P>(...styles: Styles<T, P>[]) {
    _styles = styles;
    return forwardRef<T, Props<T, P>>((props, ref) => {
      _props = props;
      const Target = typeof target !== "string" ? target : props.as || target;
      return <Target ref={ref} {...handleProps()} {...handleStyles()} />;
    }) as (props: Props<T, P>) => JSX.Element;
  }

  function handleProps() {
    if (typeof target !== "string") return _props;
    const props = Object.entries(_props).filter(
      ([key]) =>
        (_shouldProps.forward.includes(key) || isPropValid(key)) &&
        !_shouldProps.notForward.includes(key)
    );
    return Object.fromEntries(props);
  }

  function handleStyles() {
    let className;
    if (_styles[0] instanceof Array && typeof _styles[0][0] === "string") {
      className = _styles[0].reduce(
        (r, style, i) => `${r}${style}${handleValue(_styles[i + 1], _props)}`,
        ""
      );
    }
    return { className: twMerge(className, _props.className) };
  }

  styled.withConfig = function withConfig<P>({ shouldProps }: Config<T, P>) {
    if (shouldProps?.forward) _shouldProps.forward = shouldProps.forward;
    if (shouldProps?.notForward)
      _shouldProps.notForward = shouldProps.notForward;

    return styled<P>;
  };

  return styled;
}

stylewind.div = stylewind("div");
stylewind.span = stylewind("span");
stylewind.p = stylewind("p");
stylewind.h1 = stylewind("h1");
stylewind.h2 = stylewind("h2");
stylewind.h3 = stylewind("h3");
stylewind.h4 = stylewind("h4");
stylewind.h5 = stylewind("h5");
stylewind.h6 = stylewind("h6");
stylewind.header = stylewind("header");
stylewind.footer = stylewind("footer");
stylewind.main = stylewind("main");
stylewind.nav = stylewind("nav");
stylewind.article = stylewind("article");
stylewind.section = stylewind("section");
stylewind.aside = stylewind("aside");
stylewind.address = stylewind("address");
stylewind.blockquote = stylewind("blockquote");
stylewind.ul = stylewind("ul");
stylewind.ol = stylewind("ol");
stylewind.li = stylewind("li");
stylewind.dl = stylewind("dl");
stylewind.dt = stylewind("dt");
stylewind.dd = stylewind("dd");
stylewind.table = stylewind("table");
stylewind.thead = stylewind("thead");
stylewind.tbody = stylewind("tbody");
stylewind.tr = stylewind("tr");
stylewind.th = stylewind("th");
stylewind.td = stylewind("td");
stylewind.caption = stylewind("caption");
stylewind.figure = stylewind("figure");
stylewind.figcaption = stylewind("figcaption");
stylewind.details = stylewind("details");
stylewind.dialog = stylewind("dialog");
stylewind.summary = stylewind("summary");
stylewind.form = stylewind("form");
stylewind.fieldset = stylewind("fieldset");
stylewind.legend = stylewind("legend");
stylewind.label = stylewind("label");
stylewind.input = stylewind("input");
stylewind.button = stylewind("button");
stylewind.select = stylewind("select");
stylewind.datalist = stylewind("datalist");
stylewind.optgroup = stylewind("optgroup");
stylewind.option = stylewind("option");
stylewind.textarea = stylewind("textarea");
stylewind.output = stylewind("output");
stylewind.progress = stylewind("progress");
stylewind.meter = stylewind("meter");
stylewind.canvas = stylewind("canvas");
stylewind.iframe = stylewind("iframe");
stylewind.embed = stylewind("embed");
stylewind.object = stylewind("object");
stylewind.param = stylewind("param");
stylewind.picture = stylewind("picture");
stylewind.source = stylewind("source");
stylewind.audio = stylewind("audio");
stylewind.video = stylewind("video");
stylewind.track = stylewind("track");
stylewind.map = stylewind("map");
stylewind.area = stylewind("area");
stylewind.a = stylewind("a");
stylewind.em = stylewind("em");
stylewind.strong = stylewind("strong");
stylewind.small = stylewind("small");
stylewind.s = stylewind("s");
stylewind.cite = stylewind("cite");
stylewind.q = stylewind("q");
stylewind.dfn = stylewind("dfn");
stylewind.abbr = stylewind("abbr");
stylewind.time = stylewind("time");
stylewind.code = stylewind("code");
stylewind.var = stylewind("var");
stylewind.samp = stylewind("samp");
stylewind.kbd = stylewind("kbd");
stylewind.sub = stylewind("sub");
stylewind.sup = stylewind("sup");
stylewind.i = stylewind("i");
stylewind.b = stylewind("b");
stylewind.u = stylewind("u");
stylewind.mark = stylewind("mark");
stylewind.ruby = stylewind("ruby");
stylewind.rt = stylewind("rt");
stylewind.rp = stylewind("rp");
stylewind.bdi = stylewind("bdi");
stylewind.bdo = stylewind("bdo");
stylewind.span = stylewind("span");
stylewind.br = stylewind("br");
stylewind.wbr = stylewind("wbr");

export const stw = stylewind;
