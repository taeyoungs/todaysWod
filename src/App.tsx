import { registerRootComponent } from 'expo';
import { StatusBar } from 'expo-status-bar';
import React, { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const storybook = true;

let App = null;
if (storybook) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  App = require('../storybook').default;
} else {
  App = (): ReactNode => {
    return (
      <View style={styles.container}>
        <Text>Open up App.tsx to start working on your app!</Text>
        <StatusBar style="auto" />
      </View>
    );
  };
}
// export default function App() {

// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

registerRootComponent(App);
export default App;
