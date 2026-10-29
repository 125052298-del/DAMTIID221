/* 1. Zona de importaciones */
import { StyleSheet, View, Text, Pressable, Switch } from 'react-native';
import { useState } from 'react';

/* 2. Zona render o Main */

export default function PressableScreen() {
  const [mensaje, setMensaje] = useState('Presiona el boton');
  const [activado, setActivado] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Pressable</Text>

      <Text>{mensaje}</Text>

      <Pressable
        onPress={() => setMensaje('Boton Presionado bro')}
        onPressIn={() => { console.log('inicio de pulsacion bro') }}
        onPressOut={() => { console.log('Fin de la pulsacion bro') }}
        onLongPress={() => setMensaje('Pulsacion prolongada bro')}
        disabled={false}
        style={({ pressed }) => [
          styles.boton,
          pressed && styles.botonPresionado
        ]}
      >
        <Text style={styles.textoBoton}>Presioname</Text>
      </Pressable>
      <View style={styles.separador}/>
        <Text style={styles.titulo}>Switch</Text>
        <Text>Estado: {activado ? 'Activado' : 'Desactivado'}</Text>

        <Switch
        value={activado}
        onValueChange={setActivado}
        trackColor={{false: '#ea2424', true: '#319b80'}}
        thumbColor={activado ? '#ffffff' : '#ea2424'} 
        />
    </View>
  );
}


/* 3. Zona de estilos y posicionamientos */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  boton: {
    backgroundColor: '#319b80',
    padding: 15,
    borderRadius: 10,
    marginTop: 15,
  },
  botonPresionado: {
    backgroundColor: '#1e6655',
  },
  textoBoton: {
    color: 'white',
    fontSize: 16,
  },
  separador: {
    height: 2,
    backgroundColor: '#cccccc',
    width: '90%',
    marginVertical: 35,
  },
});