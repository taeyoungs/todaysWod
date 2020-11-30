import { useSelector } from 'react-redux';
import { RootState } from 'store/rootReducer';
import { IAlertState } from 'store/alertsSlice';

const useAlert = (): IAlertState => {
  const alert = useSelector((state: RootState) => state.alertsSlice);

  return alert;
};

export default useAlert;
