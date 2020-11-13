import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { logIn, logOut, enrollBox, updateRState } from 'store/usersSlice';

const useUserActions = () => {
  const dispatch = useDispatch();

  const onLogIn = useCallback(
    (form: Record<string, string>) => dispatch(logIn(form)),
    [dispatch]
  );
  const onLogOut = useCallback(() => dispatch(logOut()), [dispatch]);
  const onEnrollBox = useCallback(
    (form: Record<string, string>) => dispatch(enrollBox(form)),
    [dispatch]
  );
  const onUpdateRState = useCallback(
    (form: Record<string, string>) => dispatch(updateRState(form)),
    [dispatch]
  );

  return { onLogIn, onLogOut, onEnrollBox, onUpdateRState };
};

export default useUserActions;
