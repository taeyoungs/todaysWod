import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  logIn,
  logOut,
  enrollBox,
  updateRState,
  setUser,
  setHasNewAlert,
  ILoginProps,
} from 'store/usersSlice';
import { IUserProps } from 'models/common';

const useUserActions = () => {
  const dispatch = useDispatch();

  const onLogIn = useCallback((form: ILoginProps) => dispatch(logIn(form)), [
    dispatch,
  ]);

  const onLogOut = useCallback(() => dispatch(logOut()), [dispatch]);

  const onEnrollBox = useCallback(
    (form: Record<string, string>) => dispatch(enrollBox(form)),
    [dispatch]
  );

  const onSetUser = useCallback((user: IUserProps) => dispatch(setUser(user)), [
    dispatch,
  ]);

  const onUpdateRState = useCallback(
    (form: Record<string, string>) => dispatch(updateRState(form)),
    [dispatch]
  );

  const onSetHasNewAlert = useCallback(
    (b: boolean) => dispatch(setHasNewAlert(b)),
    [dispatch]
  );

  return {
    onLogIn,
    onLogOut,
    onEnrollBox,
    onSetUser,
    onUpdateRState,
    onSetHasNewAlert,
  };
};

export default useUserActions;
