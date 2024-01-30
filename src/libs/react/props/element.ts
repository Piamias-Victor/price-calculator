
export type ElementProps<Key extends string = "element"> = {
  readonly [x in Key]: HTMLElement;
}