import React, { useState } from 'react';
import { Alert, SafeAreaView, View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function ActualizarUsuarioScreen() {
  const usuario = useLocalSearchParams();
  const router = useRouter();
  const [nombre, setNombre] = useState(String(usuario.nombre ?? ''));
  const [edad, setEdad] = useState(String(usuario.edad ?? ''));

  const actualizarUsuario = () => {
    if (usuario.id == null || usuario.id === '') {
      Alert.alert('No se pudo actualizar', 'El usuario no tiene un identificador.');
      return;
    }

    router.replace({
      pathname: '/detalle',
      params: {
        id: String(usuario.id),
        nombre: nombre.trim(),
        edad: edad.trim(),
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>

      <Text style={styles.titulo}>
        Actualizar Usuario
      </Text>

      <View style={styles.card}>

        <Text style={styles.label}>
          Nombre
        </Text>

        <TextInput
          style={styles.input}
          value={nombre}
          onChangeText={setNombre}
          placeholder="Nombre"
        />

        <Text style={styles.label}>
          Edad
        </Text>

        <TextInput
          style={styles.input}
          value={edad}
          onChangeText={setEdad}
          placeholder="Edad"
          keyboardType="numeric"
        />

        <Pressable
          style={styles.boton}
          onPress={actualizarUsuario}
        >
          <Text style={styles.textoBoton}>
            Guardar cambios
          </Text>
        </Pressable>

      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    padding: 20,
  },

  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1F2937',
    marginBottom: 25,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 25,
    elevation: 5,
  },

  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 8,
  },

  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
  },

  boton: {
    backgroundColor: '#FACC15',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },

  textoBoton: {
    color: '#1F2937',
    fontSize: 16,
    fontWeight: 'bold',
  },

});