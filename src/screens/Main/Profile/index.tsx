import React from 'react';
import Flex from 'components/molecules/Flex';
import T from 'components/atoms/T';
import Btn from 'components/atoms/Button';
import useUserActions from 'hooks/useUserActions';

interface IProps {}

const Profile: React.FC<IProps> = () => {
  const { onLogOut } = useUserActions();
  return (
    <Flex>
      <T>프로필</T>
      <Btn onPress={onLogOut}>
        <T>로그아웃</T>
      </Btn>
    </Flex>
  );
};

export default Profile;
