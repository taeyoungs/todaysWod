export interface IComponentProps {
  className?: string;
  style?: Record<string, unknown>; // { a: string (or something else)}
  margin?: [number, number?, number?, number?];
  padding?: [number, number?, number?, number?];
}

export interface IBoxProps {
  name?: string;
  address?: string;
  coach?: Array<number>;
  owner?: number;
  id?: number;
}

export interface IUserProps {
  box?: IBoxProps;
  email?: string;
  first_name?: string;
  last_name?: string;
  gender?: string;
  has_new_alert?: boolean;
  id?: number;
  registration_state?: string;
  username?: string;
}
