import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  actualizarUsuarioPorId,
  obtenerUsuarioPorId,
} from '../services/usuariosService';

export default function ActualizarUsuarioScreen() {
  const { id: parametroId } = useLocalSearchParams();
  const id = Array.isArray(parametroId) ? parametroId[0] : parametroId;
  const router = useRouter();
  const [nombre, setNombre] = useState('');
  const [edad, setEdad] = useState('');
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let activo = true;

    const cargarUsuario = async () => {
      if (!id) {
        setError('No se recibió el identificador del usuario.');
        setCargando(false);
        return;
      }

      try {
        const usuario = await obtenerUsuarioPorId(id);
        if (activo) {
          if (usuario) {
            setNombre(usuario.nombre);
            setEdad(String(usuario.edad));
          } else {
            setError('No se encontró el usuario que deseas actualizar.');
          }
        }
      } catch (cargaError) {
        if (activo) {
          setError(
            cargaError instanceof Error
              ? cargaError.message
              : 'No se pudo cargar el usuario.'
          );
        }
      } finally {
        if (activo) {
          setCargando(false);
        }
      }
    };

    setCargando(true);
    setError('');
    cargarUsuario();

    return () => {
      activo = false;
    };
  }, [id]);

  const actualizarUsuario = async () => {
    if (!id) {
      Alert.alert('No se pudo actualizar', 'El usuario no tiene un identificador.');
      return;
    }

    try {
      setGuardando(true);
      await actualizarUsuarioPorId(id, { nombre, edad });
      router.back();
    } catch (actualizacionError) {
      setGuardando(false);
      Alert.alert(
        'No se pudo actualizar',
        actualizacionError instanceof Error
          ? actualizacionError.message
          : 'Ocurrió un error al guardar los cambios.'
      );
    }
  };

  if (cargando) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.estadoContainer}>
          <ActivityIndicator size="large" color="#2563EB" />
          <Text style={styles.estado}>Cargando usuario...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.titulo}>Actualizar Usuario</Text>
        <View style={styles.card}>
          <Text style={styles.error}>{error}</Text>
          <Pressable
            accessibilityRole="button"
            style={styles.botonVolver}
            onPress={() => router.back()}
          >
            <Text style={styles.textoBotonVolver}>Volver</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Actualizar Usuario</Text>

      <View style={styles.card}>
        <Text style={styles.etiqueta}>Nombre</Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          value={nombre}
          onChangeText={setNombre}
          autoCapitalize="words"
          editable={!guardando}
        />

        <Text style={styles.etiqueta}>Edad</Text>
        <TextInput
          style={styles.input}
          placeholder="Edad"
          value={edad}
          onChangeText={setEdad}
          keyboardType="numeric"
          editable={!guardando}
        />

        <Pressable
          accessibilityRole="button"
          disabled={guardando}
          style={[styles.boton, guardando && styles.botonDeshabilitado]}
          onPress={actualizarUsuario}
        >
          <Text style={styles.textoBoton}>
            {guardando ? 'Guardando...' : 'Guardar cambios'}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F7FA',
  },
  estadoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  etiqueta: {
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
  botonDeshabilitado: {
    opacity: 0.6,
  },
  textoBoton: {
    color: '#1F2937',
    fontSize: 16,
    fontWeight: 'bold',
  },
  estado: {
    marginTop: 12,
    color: '#4B5563',
    fontSize: 16,
    textAlign: 'center',
  },
  error: {
    marginBottom: 20,
    color: '#B91C1C',
    fontSize: 16,
    textAlign: 'center',
  },
  botonVolver: {
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#FACC15',
  },
  textoBotonVolver: {
    color: '#1F2937',
    fontWeight: 'bold',
  },
});
