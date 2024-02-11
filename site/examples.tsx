import stw, { css } from "stailwind";

const Flex = stw("div")`
  flex
  flex-wrap
  gap-x-2
  gap-y-8
  items-start
  w-full
`();

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

const Btn = stw("button")<{
  color?: "primary" | "secondary";
}>`
  ${({ color }) => (color === "secondary" ? "bg-red-500" : "bg-blue-500")}
  px-4
  py-2
  rounded-md
  text-white
`(({ color, ...props }) => props);

const commonStyles = css`
  px-6
  py-2.5
  rounded-3xl
  text-white
`;

const MaterialBtn = stw("button")<{
  variation: "elevated" | "outlined" | "icon";
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
      `,
    }[variation])}
`(({ variation, ...props }) => props);

export default function Page() {
  return (
    <Flex className="p-4">
      <Flex>
        <Button>Button</Button>
        <ButtonBlue>Button Blue</ButtonBlue>
        <ButtonRed>Button Red</ButtonRed>
      </Flex>

      <Flex>
        <Btn>Primary</Btn>
        <Btn color="secondary">Secondary</Btn>
      </Flex>

      <Flex>
        <MaterialBtn variation="elevated">Elevated</MaterialBtn>
        <MaterialBtn variation="outlined">Outlined</MaterialBtn>
        <MaterialBtn variation="icon">Icon</MaterialBtn>
      </Flex>
    </Flex>
  );
}
