import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { logIn, logOut } from 'store/usersSlice';

const useUserActions = () => {
  const dispatch = useDispatch();

  const onLogIn = useCallback(
    (form: Record<string, string>) => dispatch(logIn(form)),
    [dispatch]
  );
  const onLogOut = useCallback(() => dispatch(logOut()), [dispatch]);

  return { onLogIn, onLogOut };
};

export default useUserActions;
