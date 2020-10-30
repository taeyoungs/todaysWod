export interface IComponentProps {
  className?: string;
  style?: Record<string, unknown>; // { a: string (or something else)}
  margin?: [number, number?, number?, number?];
  padding?: [number, number?, number?, number?];
}
