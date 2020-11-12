import api from 'api';
import useUser from 'hooks/useUser';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { logIn } from 'store/usersSlice';

const useUserRetrieve = () => {
  const [info, setInfo] = useState({});
  const { userId } = useUser();

  // const getUserInfo = useCallback(() => {

  // })

  useEffect(() => {
    api.user(userId).then((res) => {
      setInfo(res.data);
    });
  }, []);

  // return useCallback(() => dispatch(logIn(token)), [dispatch, token]);
  return info;
};

export default useUserRetrieve;
