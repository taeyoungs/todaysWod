import { useSelector } from 'react-redux';
import { RootState } from 'store/rootReducer';
import { IUserState } from 'store/usersSlice';

export default function useUser(): IUserState {
  const user = useSelector((state: RootState) => state.usersSlice);
  // console.log(user);
  return user;
}
