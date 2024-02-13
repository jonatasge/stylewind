export function css(
  ...values: (string | number | TemplateStringsArray | CallableFunction)[]
) {
  return values.reduce((r, val) => {
    const type = typeof val;

    if (val instanceof Array && typeof val[0] === "string")
      return val.join(" ");
    if (type === "function") return `${r} ${(val as CallableFunction)()}`;
    if (["number", "string"].includes(type)) return `${r} ${val}`;

    return r;
  }, "") as string;
}
