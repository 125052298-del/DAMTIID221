import { StyleSheet, View } from 'react-native';
import MenuScreen from './screens/MenuScreen';

export default function App() {
  return (
    <View style={styles.container}>
      <MenuScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6FB',
  },
  targeta1: {
    backgroundColor: '#FADADD',
    padding: 10,
    borderRadius: 12,
  },
  targeta2: {
    backgroundColor: '#D8F3DC',
    padding: 10,
    borderRadius: 12,
  },
  targeta3: {
    backgroundColor: '#DDEBFF',
    padding: 10,
    borderRadius: 12,
  },
});
