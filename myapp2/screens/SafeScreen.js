/*1. Zona de importaciones*/

import {StyleSheet,Text,View, ScrollView,SafeAreaView
} from 'react-native';

/*2. Zona Render o main*/

export default function SafeScreen() {

  const canciones = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
  ];

  return (
    <SafeAreaView style={styles.container}>

      <Text style={styles.titulo}>
        MUSICA
      </Text>

      <View style={styles.reproductor}>
        <Text style={styles.texto}>LISTA DE SONGS</Text>
        <Text style={styles.textoSecundario}>LAS MÁS TOPS</Text>
      </View>

      <Text style={styles.subtitulo}>
        Canciones disponibles
      </Text>

      <ScrollView
        style={styles.lista}
        contentContainerStyle={styles.contenidoLista}
        showsVerticalScrollIndicator={true}
      >
        {canciones.map((item, index) => (
          <View key={index} style={styles.tarjeta}>
            <Text style={styles.textoLista}>Canción {item}</Text>
          </View>
        ))}
      </ScrollView>

    </SafeAreaView>
  );
}

/*3. Zona de estilos y posiciones*/

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#0F172A', // Azul noche oscuro (slate)
    padding: 20,
  },

  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#F8FAFC', // Blanco suave
    letterSpacing: 0.5,
  },

  reproductor: {
    backgroundColor: '#1E293B', // Tarjeta en tono azul grisáceo profundo
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
    // Sombra para dar elevación
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },

  texto: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#A855F7', // Púrpura neón vibrante
  },

  textoSecundario: {
    fontSize: 14,
    fontWeight: '600',
    color: '#94A3B8', // Gris claro sutil
    letterSpacing: 1,
  },

  subtitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 24,
    marginBottom: 12,
    textAlign: 'left',
    color: '#CBD5E1',
  },

  lista: {
    flex: 1,
  },

  contenidoLista: {
    paddingBottom: 30,
  },

  tarjeta: {
    backgroundColor: '#1E293B',
    padding: 16,
    marginBottom: 10,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#6366F1', // Borde acento índigo en el lateral
  },

  textoLista: {
    fontSize: 16,
    fontWeight: '500',
    color: '#F1F5F9',
  },

});