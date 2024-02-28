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
  : {}) & {
  as?: keyof JSX.IntrinsicElements;
} & U;

export type Styles<T = unknown, P = unknown> =
  | string
  | number
  | TemplateStringsArray
  | ((props: Props<T, P>) => string | Partial<Props<T, P>>);

export type Config<T, P = unknown> = {
  shouldProps?: {
    forward?: PropName<T, P>[];
    notForward?: PropName<T, P>[];
  };
};

export type PropName<T, P = unknown> = keyof Props<T, P>;
