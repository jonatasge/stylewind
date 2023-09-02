# Stailwind

Create components with [tailwindcss](https://github.com/tailwindlabs/tailwindcss) easily and quickly :)

Inspired by [styled-components](https://github.com/styled-components/styled-components).

## Installation

Stailwind is available as an [npm package](https://www.npmjs.com/package/stailwind).

npm:

```bash
npm i stailwind
```

## Settings

1. Install vscode [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) extension;
2. Add the code below to the vscode settings file at the root of your project (`~/.vscode/settings.json`):

```json
{
  "tailwindCSS.experimental.classRegex": [
    "(?:stw|stailwind)(?:|<[^>]*>)(?:|\\([^)]*\\))(?:|<[^>]*>)`((?:\\$\\{[^}]*\\}|[^$`])*?)`"
  ]
}
```

## How to use

Creation:
```tsx
import stw from "stailwind";
// or
// import { stailwind } from "stailwind";

const Button = stw("button")`
  border
  border-gray-400
  px-4
  py-2
  rounded-md
`();

const ButtonBlue = stw(Button)`
  bg-blue-500
  text-white
`();

const ButtonRed = stw(ButtonBlue)`
  bg-red-500
`();
```

Usage:

```tsx
<>
  <Button>Button</Button>
  <ButtonBlue>Button Blue</ButtonBlue>
  <ButtonRed>Button Red</ButtonRed>
</>
```

Result:

![Alt text](./site/assets/example1.png)

### Custom props

Stailwind supports custom properties in your component. Also you can filter custom properties to prevent them from being rendered in the DOM, avoiding console errors.

```tsx
const Btn = stw("button")<{
  color?: "primary" | "secondary";
}>`
  px-4
  py-2
  rounded-md
  text-white
  ${({ color }) => (color === "secondary" ? "bg-red-500" : "bg-blue-500")}
`(({ color, ...props }) => props); // filtering custom props
```

Usage:

```tsx
<>
  <Btn>Primary</Btn>
  <Btn color="secondary">Secondary</Btn>
</>
```

Result:

![Alt text](./site/assets/example2.png)

## License
This project is licensed under the terms of the [MIT license](https://github.com/jonatasge/stailwind/blob/main/LICENSE).