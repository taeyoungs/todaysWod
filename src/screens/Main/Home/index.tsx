import React from 'react';
import Flex from 'components/molecules/Flex';
import T from 'components/atoms/T';

interface IProps {}

const Home: React.FC<IProps> = () => {
  return (
    <Flex>
      <T>홈</T>
    </Flex>
  );
};

export default Home;
