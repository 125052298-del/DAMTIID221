import React, { useState } from 'react';
import { Alert, Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

export default function TextInputScreen({ onBack }) {
  const [nombre, setNombre] = useState('');
  const [edad, setEdad] = useState('');
  const [password, setPassword] = useState('');
  const [comentario, setComentario] = useState('');

  const alertaSimple = () => {
    Alert.alert('Hola', 'Esta es una alerta simple');
  };

  const alertaDosBotones = () => {
    Alert.alert('Confirmar', '¿Deseas continuar?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Aceptar' },
    ]);
  };

  const mostrarNombre = () => {
    Alert.alert('Tu nombre', nombre === '' ? 'No escribiste nada' : nombre);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>TextInput y Alert</Text>
      <Text style={styles.subtitulo}>1. TextInput básico</Text>
      <TextInput
        style={styles.input}
        placeholder="Escribe tu Nombre"
        value={nombre}
        onChangeText={setNombre}
      />
      <Text>Escribiste: {nombre}</Text>

      <Text style={styles.subtitulo}>2. Teclado numérico</Text>
      <TextInput
        style={styles.input}
        placeholder="Edad"
        keyboardType="numeric"
        maxLength={3}
        value={edad}
        onChangeText={setEdad}
      />

      <Text style={styles.subtitulo}>3. Contraseña</Text>
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Text style={styles.subtitulo}>4. Varias líneas</Text>
      <TextInput
        style={[styles.input, styles.grande]}
        placeholder="Escribe un comentario"
        multiline
        numberOfLines={4}
        value={comentario}
        onChangeText={setComentario}
      />

      <Text style={styles.subtitulo}>5. Ejemplos de Alert</Text>
      <View style={styles.boton}>
        <Button title="Mostrar nombre" onPress={mostrarNombre} />
      </View>
      <View style={styles.boton}>
        <Button title="Alerta simple" onPress={alertaSimple} />
      </View>
      <View style={styles.boton}>
        <Button title="Alerta con 2 botones" onPress={alertaDosBotones} />
      </View>
      {onBack && (
        <View style={styles.boton}>
          <Button title="Volver al menú" onPress={onBack} />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    paddingTop: 60,
    backgroundColor:'#fff',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 6
  },
  input: {
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 8,
    padding: 10,
    fontSize: 16
  },
  grande: {
    minHeight: 80,
    textAlignVertical: 'top',

  },
  boton: {
    width: '100%',
    marginBottom: 19,
  },
});
