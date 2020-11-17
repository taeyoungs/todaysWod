import React from 'react';
import Flex from 'components/molecules/Flex';
import T from 'components/atoms/T';

interface IProps {}

const Alerts: React.FC<IProps> = () => {
  return (
    <Flex>
      <T>알림</T>
    </Flex>
  );
};

export default Alerts;
