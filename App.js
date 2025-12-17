import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.rootContainer}>
      <Text>Hello Tarkov!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
});
