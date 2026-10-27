/*Zona de importaciones */
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, ScrollView, SafeAreaView } from 'react-native';
import { Perfil } from '../components/Perfil.js';

export default function TarjetasScreen({ onBack }) {
  return (
    <SafeAreaView style={styles.container}>
      <Button title="Volver al menú" onPress={onBack} />
      <ScrollView
        style={styles.cardScroller}
        horizontal
        contentContainerStyle={styles.cards}
        showsHorizontalScrollIndicator
      >
        <Perfil style={styles.targeta1} nombre="Juan" carrera="TIID" materia="APPMOVIL" cuatri="4" />
        <Perfil style={styles.targeta2} nombre="Ramon" carrera="TIID" materia="APPMOVIL" cuatri="4" />
        <Perfil style={styles.targeta3} nombre="papu" carrera="TIID" materia="APPMOVIL" cuatri="4" />
      </ScrollView>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6FB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardScroller: {
    flex: 1,
    alignSelf: 'stretch',
  },
  cards: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    gap: 8,
  },
  targeta1: {
    backgroundColor: '#FADADD',
    padding: 10,
    borderRadius: 12,
    width: 220,
  },
  targeta2: {
    backgroundColor: '#D8F3DC',
    padding: 10,
    borderRadius: 12,
    width: 220,
  },
  targeta3: {
    backgroundColor: '#DDEBFF',
    padding: 10,
    borderRadius: 12,
    width: 220,
  },
});
