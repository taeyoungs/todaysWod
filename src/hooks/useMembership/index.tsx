import api from 'api';
import useUser from 'hooks/useUser';
import { IMemebershipProps } from 'models/common';
import { useEffect, useState } from 'react';

const useMemebership = (): IMemebershipProps => {
  const [membership, setMembership] = useState({});
  const { userId, token } = useUser();

  useEffect(() => {
    api.getMembership(token, userId).then((res) => {
      setMembership(res.data);
    });
  }, []);

  return membership;
};

export default useMemebership;
