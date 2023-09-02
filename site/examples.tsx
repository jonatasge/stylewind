import stw from "stailwind";

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
    </Flex>
  );
}
