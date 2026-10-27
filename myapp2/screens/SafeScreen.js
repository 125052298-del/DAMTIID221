/* Zona de importaciones */
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SafeScreen({}) {
  const canciones = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7'
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.titulo}>Musica</Text>
      
      <View>
        <Text style={styles.reproductor}>
          lista de musica
        </Text>
        <Text> la musica mas escuchada  </Text>
      </View>
      
      <Text style={styles.subtitulo}>canciones disponibles</Text>
      
      <ScrollView 
        style={styles.lista}
        contentContainerStyle={styles.contenidoLista}
        showsVerticalScrollIndicator={true}
      >
        {canciones.map((item, index) => (
          <View key={index} style={styles.tarjeta}>
            <Text style={styles.textolista}>  
              {item}
            </Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F4F6FB',
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  reproductor: {
    fontSize: 16,
    padding: 10,
    borderRadius: 8,
  },
  texto: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  lista: {
    flex: 1,
  },
  contenidoLista: {
    paddingBottom: 20,
  },
  tarjeta: {
    backgroundColor: '#FFFFFF',
    padding: 10,  
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',  
  },
  textolista: {
    fontSize: 16,
    textAlign: 'center',
  },
});