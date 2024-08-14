export type IKind =
  | "row-right"
  | "row-left"
  | "row-up"
  | "row-down"
  | "people"
  | "ear-phones-alt"
  | "chart"
  | "phone"
  | "wrench"
  | "sl-eye"
  | "sl-close"

export interface IconProps {
  className: string;
  type: IKind;
  onClick?: () => void;
}
