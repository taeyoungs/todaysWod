import { IWodProps } from 'models/common';
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
  BorderRadius = 'borderRadius',
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
  } else {
    styleProps = {
      borderTopLeftRadius: resultArr[0],
      borderBottomLeftRadius: resultArr[1],
      borderTopRightRadius: resultArr[2],
      borderBottomRightRadius: resultArr[3],
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

export const cancelReservationAlert = (
  date: string,
  startTime: string,
  endTime: string,
  onP: () => void
): void => {
  return Alert.alert(
    '정말 취소하시겠습니까?',
    `${date} ${startTime} - ${endTime}`,
    [
      {
        text: '취소',
        onPress: () => console.log('Cancel Pressed'),
      },
      { text: '삭제', onPress: onP, style: 'cancel' },
    ],
    { cancelable: false }
  );
};

export const createTwoButtonAlert = (
  onP: () => void,
  title: string,
  content: string,
  cancelMsg: string,
  okMsg: string,
  onCancleP?: () => void
): void => {
  return Alert.alert(
    `${title}`,
    `${content}`,
    [
      {
        text: cancelMsg,
        onPress: onCancleP ? onCancleP : () => console.log('Cancel Pressed'),
      },
      { text: okMsg, onPress: onP, style: 'cancel' },
    ],
    { cancelable: false }
  );
};

export function formatDate(num: number): string {
  if (num < 10) {
    return `0${num}`;
  } else {
    return `${num}`;
  }
}

export const checkTodayIdx = (wods: Array<IWodProps>): number => {
  const date: Date = new Date();
  const fullDate = `${date.getFullYear()}-${formatDate(
    date.getMonth() + 1
  )}-${formatDate(date.getDate())}`;
  // wods.forEach((wod, index) => {
  //   console.log(wod.date);
  //   console.log(wod.date === fullDate);
  // });
  return wods.findIndex((wod) => wod.date === fullDate);
};

export const wait = (timeout: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

export const dayOfTheWeek = (d: string): string => {
  const date = new Date(d);
  const day = date.getDay();
  let result = '';
  switch (day) {
    case 0:
      result = '일';
      break;
    case 1:
      result = '월';
      break;
    case 2:
      result = '화';
      break;
    case 3:
      result = '수';
      break;
    case 4:
      result = '목';
      break;
    case 5:
      result = '금';
      break;
    case 6:
      result = '토';
      break;
    default:
      break;
  }
  return result;
};

export const formatTime = (time: string): string => {
  const sliceTime = time.split(':');
  if (parseInt(sliceTime[0]) > 12) {
    const t = parseInt(sliceTime[0]) - 12;
    if (t.toString().length === 1) {
      return `오후 0${t}:${sliceTime[1]}`;
    } else {
      return `오후 ${t}:${sliceTime[1]}`;
    }
  } else {
    return `오전 ${sliceTime[0]}:${sliceTime[1]}`;
  }
};

export const isPassDate = (date: string): boolean => {
  const d = new Date(date);
  const now = new Date();
  const exceptTime = new Date(
    `${now.getFullYear()}-${formatDate(now.getMonth() + 1)}-${formatDate(
      now.getDate()
    )}`
  );

  return d >= exceptTime;
};

export function daysInMonth(iMonth: number, iYear: number): number {
  return 32 - new Date(iYear, iMonth, 32).getDate();
}
