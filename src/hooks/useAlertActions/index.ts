import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { IAlertActionProps, increasePage, setAlerts } from 'store/alertsSlice';

const useAlertActions = () => {
  const dispatch = useDispatch();

  const onSetAlerts = useCallback(
    (form: IAlertActionProps) => dispatch(setAlerts(form)),
    [dispatch]
  );

  const onIncreasePage = useCallback(() => dispatch(increasePage()), [
    dispatch,
  ]);

  return { onSetAlerts, onIncreasePage };
};

export default useAlertActions;
