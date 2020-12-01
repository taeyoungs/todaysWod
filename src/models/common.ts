import { StyleProp, ViewStyle } from 'react-native';

export interface IComponentProps {
  className?: string;
  viewStyle?: StyleProp<ViewStyle>; // { a: string (or something else)}
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

export interface IWodProps {
  id: number;
  title: Record<string, string>;
  content: string;
  comment?: string;
  time?: number | null;
  rounds?: number | null;
  rest_sec?: number | null;
  round_sec?: number | null;
  box: IBoxProps;
  date: string;
}

export interface IMemebershipProps {
  id?: number;
  title?: string;
  user?: ICoachProps;
  start_term: string | null;
  end_term: string | null;
  cnt: number | null;
  hold_start: string | null;
  hold_date: string | null;
  state?: string;
}

export interface ICoachProps {
  id: number;
  last_name: string;
  username: string;
}

export interface IScheduleProps {
  id: number;
  box: number;
  coach: ICoachProps;
  start_time: string;
  end_time: string;
  reservations_count: number;
  user_limit: number;
}

export interface IReservationProps {
  date: string;
  id: number;
  schedule: IScheduleProps;
  state: string;
  user: number;
}

export interface IAlertProps {
  alert_type: string;
  box: number | null;
  content: string;
  datetime: string;
  id: number;
  title: string;
  user: number | null;
}
