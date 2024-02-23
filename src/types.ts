interface ExoticComponentWithDisplayName<P extends object = {}>
  extends React.ExoticComponent<P> {
  defaultProps?: Partial<P> | undefined;
  displayName?: string | undefined;
}

type AnyComponent<P extends object = any> =
  | ExoticComponentWithDisplayName<P>
  | React.ComponentType<P>;

type KnownTarget =
  | Exclude<keyof JSX.IntrinsicElements, "symbol" | "object">
  | AnyComponent;

export type Target =
  | string // allow custom elements, etc.
  | KnownTarget;

export type Props<T, U = unknown> = (T extends KnownTarget
  ? React.ComponentPropsWithRef<T>
  : {}) &
  U;

  export type StwStyles<T, P = unknown> = (
    | string
    | number
    | TemplateStringsArray
    | ((props: Props<T, P>) => string)
  )[];
  
export type StwBuildHandleProps<T, P> = (
  props: Props<T, P>
) => Partial<Props<T, P>>;
