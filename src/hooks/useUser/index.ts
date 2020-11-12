import { useSelector } from 'react-redux';
import { RootState } from 'store/rootReducer';

interface IState {
  isLoggedIn: boolean;
  token: string | null;
  userId: string | null;
  boxId: string | null;
}

export default function useUser(): IState {
  const user = useSelector((state: RootState) => state.usersSlice);
  return user;
}
