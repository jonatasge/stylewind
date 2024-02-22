# @stylewind

Create components with [tailwindcss](https://github.com/tailwindlabs/tailwindcss) easily and quickly :)

Inspired by [styled-components](https://github.com/styled-components/styled-components).

## Installation

@stylewind is available as an [npm package](https://www.npmjs.com/package/@stylewind/core).

npm:

```bash
npm i @stylewind/core
```

## Settings

1. Install vscode [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) extension;
2. Add the code below to the vscode settings file at the root of your project (`~/.vscode/settings.json`):

```json
{
  "tailwindCSS.experimental.classRegex": [
    "(?:stw|stylewind)(?:\\([^)]*\\)|<[^>]*>|[^`])*`([^`]*)`",
    "css`([^`]*?(?:(?:[^$]|\\$(?!\\{))*?[^`])*(?:(?:\\$\\{[^`]*?\\})?[^`]*?)*?)`"
  ]
}
```

## How to use stylewind / stw function

Creation:

```tsx
import { stw } from "@stylewind/core";
// or
// import { stylewind } from "@stylewind/core";

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

![Example 1](./site/assets/example1.png)

### Custom props

@stylewind supports custom properties in your component. Also you can filter custom properties to prevent them from being rendered in the DOM, avoiding console errors.

Creation:

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

![Example 2](./site/assets/example2.png)

## How to use css function

Creation:

```tsx
import { stw, css } from "@stylewind/core";

const commonStyles = css`
  px-6
  py-2.5
  rounded-3xl
  text-white
`;
// or
// css('...')
// css("...")
// css(`...`)

const MaterialBtn = stw('button')<{
  variation: 'elevated' | 'outlined' | 'icon';
}>`
  font-medium
  h-10
  text-sm
  
  ${({ variation }) =>
    ({
      elevated: css`
        ${commonStyles}
        bg-blue-500
        shadow
        shadow-gray-500
      `,
      outlined: css`
        ${commonStyles}
        bg-red-500
        border
        border-black
      `,
      icon: css`
        bg-green-500
        p-2
        rounded-full
        w-10
      `
    }[variation])}
`(({ variation, ...props }) => props);
```


Usage:

```tsx
<>
  <MaterialBtn variation="elevated">Elevated</MaterialBtn>
  <MaterialBtn variation="outlined">Outlined</MaterialBtn>
  <MaterialBtn variation="icon">X</MaterialBtn>
</>
```

Result:

![Example 3](./site/assets/example3.png)

## License

This project is licensed under the terms of the [MIT license](https://github.com/jonatasge/stylewind/blob/main/LICENSE).
