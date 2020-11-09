import { Alert } from 'react-native';

export function CalculateBox(
  targetArr: [number, number?, number?, number?]
): string {
  let resultArr: [number, number, number, number] = [
    targetArr[0],
    targetArr[0],
    targetArr[0],
    targetArr[0],
  ];

  if (targetArr.length === 2) {
    if (targetArr[1] !== undefined)
      resultArr = [targetArr[0], targetArr[1], targetArr[0], targetArr[1]];
  } else if (targetArr.length === 3) {
    if (targetArr[1] !== undefined && targetArr[2] !== undefined)
      resultArr = [targetArr[0], targetArr[1], targetArr[2], targetArr[1]];
  } else if (targetArr.length === 4) {
    if (
      targetArr[1] !== undefined &&
      targetArr[2] !== undefined &&
      targetArr[3] !== undefined
    )
      resultArr = [targetArr[0], targetArr[1], targetArr[2], targetArr[3]];
  }

  return `${resultArr.toString().replace(/,/gi, 'px ')}px`;
}

export enum MPB {
  Margin = 'margin',
  Padiing = 'padding',
  Border = 'border',
}

export function CalculateBlock(
  targetArr: [number, number?, number?, number?],
  styleType: MPB
): Record<string, number> {
  let resultArr: [number, number, number, number] = [
    targetArr[0],
    targetArr[0],
    targetArr[0],
    targetArr[0],
  ];

  if (targetArr.length === 2) {
    if (targetArr[1] !== undefined)
      resultArr = [targetArr[0], targetArr[1], targetArr[0], targetArr[1]];
  } else if (targetArr.length === 3) {
    if (targetArr[1] !== undefined && targetArr[2] !== undefined)
      resultArr = [targetArr[0], targetArr[1], targetArr[2], targetArr[1]];
  } else if (targetArr.length === 4) {
    if (
      targetArr[1] !== undefined &&
      targetArr[2] !== undefined &&
      targetArr[3] !== undefined
    )
      resultArr = [targetArr[0], targetArr[1], targetArr[2], targetArr[3]];
  }

  let styleProps: Record<string, number> = {};

  if (styleType === MPB.Margin) {
    styleProps = {
      marginTop: resultArr[0],
      marginRight: resultArr[1],
      marginBottom: resultArr[2],
      marginLeft: resultArr[3],
    };
  } else if (styleType === MPB.Padiing) {
    styleProps = {
      paddingTop: resultArr[0],
      paddingRight: resultArr[1],
      paddingBottom: resultArr[2],
      paddingLeft: resultArr[3],
    };
  } else if (styleType === MPB.Border) {
    styleProps = {
      borderTopWidth: resultArr[0],
      borderRightWidth: resultArr[1],
      borderBottomWidth: resultArr[2],
      borderLeftWidth: resultArr[3],
    };
  }

  return styleProps;
}

export const validateEmail = (email: string): boolean => {
  const regExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  // console.log(regExp.test(email));

  return regExp.test(email);
};

export const createOneButtonAlert = (errorMsg: string): void => {
  return Alert.alert(
    '',
    `${errorMsg}`,
    [{ text: '확인', onPress: () => null }],
    { cancelable: false }
  );
};
