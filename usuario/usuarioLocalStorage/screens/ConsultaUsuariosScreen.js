import React, { useState, useCallback } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  View,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
} from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { obtenerUsuarios } from '../services/usuariosService';

export default function ConsultaUsuariosScreen() {
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  const cargarUsuarios = useCallback(async () => {
    setCargando(true);
    setError('');

    try {
      const lista = await obtenerUsuarios();
      setUsuarios(lista);
    } catch (cargaError) {
      setError(
        cargaError instanceof Error
          ? cargaError.message
          : 'No se pudieron cargar los usuarios.'
      );
    } finally {
      setCargando(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      cargarUsuarios();
    }, [cargarUsuarios])
  );

  const renderTarjeta = ({ item }) => (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.cardPresionada]}
      accessibilityRole="button"
      accessibilityLabel={`Ver detalles de ${item.nombre}`}
      onPress={() =>
        router.push({
          pathname: '/detalle',
          params: {
            id: String(item.id),
            nombre: String(item.nombre),
            edad: String(item.edad),
          },
        })
      }
    >
      <Text style={styles.nombre}>{item.nombre}</Text>
      <View style={styles.linea} />
      <Text style={styles.info}>Edad: {item.edad} años</Text>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Lista de Usuarios</Text>

      {error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.error}>{error}</Text>
          <Pressable
            accessibilityRole="button"
            style={styles.botonReintentar}
            onPress={cargarUsuarios}
          >
            <Text style={styles.textoReintentar}>Reintentar</Text>
          </Pressable>
        </View>
      ) : null}

      <FlatList
        data={usuarios}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderTarjeta}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.lista,
          usuarios.length === 0 && styles.listaVacia,
        ]}
        ListEmptyComponent={
          cargando ? (
            <ActivityIndicator size="large" color="#2563EB" />
          ) : !error ? (
            <Text style={styles.vacio}>Aún no hay usuarios registrados.</Text>
          ) : null
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    padding: 20,
  },
  lista: {
    paddingBottom: 20,
  },
  listaVacia: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1F2937',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 18,
    marginBottom: 15,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
  cardPresionada: {
    opacity: 0.75,
  },
  nombre: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2563EB',
  },
  linea: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 10,
  },
  info: {
    fontSize: 16,
    color: '#4B5563',
  },
  vacio: {
    color: '#6B7280',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 24,
  },
  errorContainer: {
    marginBottom: 16,
    padding: 14,
    borderRadius: 10,
    backgroundColor: '#FEE2E2',
  },
  error: {
    color: '#B91C1C',
    fontSize: 14,
  },
  botonReintentar: {
    alignSelf: 'flex-start',
    marginTop: 10,
    paddingVertical: 6,
  },
  textoReintentar: {
    color: '#1D4ED8',
    fontSize: 15,
    fontWeight: 'bold',
  },
});