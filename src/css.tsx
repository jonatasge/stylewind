export function css(
  ...values: (string | number | TemplateStringsArray | CallableFunction)[]
) {
  if (values[0] instanceof Array && typeof values[0][0] === "string") {
    return values[0].reduce(
      (r, val, i) => `${r}${val}${handleTemplate(values[i + 1])}`,
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
