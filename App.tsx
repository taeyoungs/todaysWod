import React, { useState } from 'react';
import { Asset } from 'expo-asset';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { FontSource } from 'expo-font';
import TestTemplate from 'components/templates/TestTemplate';

const storybook = false;

// const cacheFonts = (fonts: Array<string>) =>
//   fonts.map((font: string) => {
//     return Font.loadAsync(font);
//   });

// const cacheImages = (images: Array<number>) =>
//   images.map((image: number) => {
//     return Asset.fromModule(image).downloadAsync();
//   });

let App = null;
if (storybook) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  App = require('./storybook').default;
} else {
  App = (): React.ReactNode => {
    const [isReady, setIsReady] = useState(false);
    const handleFinish = (): void => setIsReady(true);
    const loadAsync = async () => {
      const fonts: string | { [fontFamily: string]: FontSource } = {
        'nanumGothic-bold': require('./assets/fonts/NanumGothic-Bold.ttf'),
        'nanumGothic-regular': require('./assets/fonts/NanumGothic-Regular.ttf'),
      };
      // const images = [require('./assets/loadingBg.jpeg')];

      // return await Font.loadAsync(fonts).then(() => {
      //   images.map((image: number) => {
      //     return Asset.fromModule(image).downloadAsync();
      //   });
      // });
      return Font.loadAsync(fonts);
    };

    return isReady ? (
      <TestTemplate />
    ) : (
      <AppLoading
        startAsync={loadAsync}
        onFinish={handleFinish}
        onError={console.warn}
      />
    );
  };
}

export default App;
