import React, { useState } from 'react';
import { Asset } from 'expo-asset';
import { AppLoading, registerRootComponent } from 'expo';
import * as Font from 'expo-font';
import { FontSource } from 'expo-font';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from 'store/store';
import Gate from 'navigations/Gate';

const storybook = false;

// const cacheFonts = (fonts: string | { [fontFamily: string]: FontSource }) =>
//   fonts.map((font: string | { [fontFamily: string]: FontSource }) => {
//     return Font.loadAsync(font);
//   });

// const cacheImages = (images: Array<number>) =>
//   images.map((image: number) => {
//     return Asset.fromModule(image).downloadAsync();
//   });

let App = null;
if (storybook) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  App = require('../storybook').default;
} else {
  App = (): React.ReactNode => {
    const [isReady, setIsReady] = useState(false);
    const handleFinish = (): void => setIsReady(true);
    const loadAsync = async () => {
      const fonts: string | { [fontFamily: string]: FontSource } = {
        'nanumGothic-bold': require('../assets/fonts/NanumGothic-Bold.ttf'),
        'nanumGothic-regular': require('../assets/fonts/NanumGothic-Regular.ttf'),
      };
      const images = [
        require('../assets/images/main_logo.png'),
        require('../assets/images/dark_dbell.png'),
        require('../assets/images/light_dbell.png'),
      ];

      const promisedImages = images.map((image: number | string) => {
        return Asset.fromModule(image).downloadAsync();
      });

      //
      await Promise.all<Asset | void>([
        Font.loadAsync(fonts),
        ...promisedImages,
      ]);
    };

    return isReady ? (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Gate />
        </PersistGate>
      </Provider>
    ) : (
      <AppLoading
        startAsync={loadAsync}
        onFinish={handleFinish}
        onError={console.warn}
      />
    );
  };
}

export default registerRootComponent(App);
