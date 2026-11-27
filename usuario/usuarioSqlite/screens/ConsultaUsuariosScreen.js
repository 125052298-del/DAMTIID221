import React from 'react';
import { SafeAreaView, View, Text, FlatList, StyleSheet, Pressable } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

const usuariosIniciales = [
  { id: '1', nombre: 'Ana García', edad: 25 },
  { id: '2', nombre: 'Carlos López', edad: 30 },
];

export default function ConsultaUsuariosScreen({ usuarios = usuariosIniciales } = {}) {
  const { eliminarId } = useLocalSearchParams();
  const router = useRouter();
  const usuariosVisibles = eliminarId
    ? usuarios.filter((usuario) => String(usuario.id) !== String(eliminarId))
    : usuarios;

  const renderTarjeta = ({ item }) => (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.cardPresionada]}
      accessibilityRole="button"
      accessibilityLabel={`Ver detalles de ${item.nombre}`}
      onPress={() =>
        router.push({
          pathname: '/detalle',
          params: {
            id: item.id,
            nombre: item.nombre,
            edad: String(item.edad),
          },
        })
      }
    >
      <Text style={styles.nombre}>{item.nombre}</Text>
      <View style={styles.linea} />
      <Text style={styles.info}>
        Edad: {item.edad} años
      </Text>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>
        Lista de Usuarios
      </Text>

      <FlatList
        data={usuariosVisibles}
        keyExtractor={(item) => item.id}
        renderItem={renderTarjeta}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={
          <Text style={styles.vacio}>
            Aún no hay usuarios registrados.
          </Text>
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
});