import React, { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Alert,
} from 'react-native';
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import {
  eliminarUsuarioPorId,
  obtenerUsuarioPorId,
} from '../services/usuariosService';

export default function DetalleUsuarioScreen() {
  const { id: parametroId } = useLocalSearchParams();
  const id = Array.isArray(parametroId) ? parametroId[0] : parametroId;
  const router = useRouter();
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const [confirmacionVisible, setConfirmacionVisible] = useState(false);
  const [eliminando, setEliminando] = useState(false);

  useFocusEffect(
    useCallback(() => {
      let activo = true;

      const cargarUsuario = async () => {
        setCargando(true);
        setError('');
        setUsuario(null);

        if (!id) {
        if (activo) {
          setError('No se recibió el identificador del usuario.');
          setCargando(false);
          }
        return;
        }

        try {
        const resultado = await obtenerUsuarioPorId(id);
        if (activo) {
          if (resultado) {
            setUsuario(resultado);
          } else {
            setError('No se encontró el usuario solicitado.');
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

      cargarUsuario();

      return () => {
        activo = false;
      };
    }, [id])
  );

  const confirmarEliminacion = async () => {
    if (!id) {
      Alert.alert('No se pudo eliminar', 'El usuario no tiene un identificador.');
      return;
    }

    try {
      setEliminando(true);
      await eliminarUsuarioPorId(id);
      setConfirmacionVisible(false);
      router.replace('/consulta');
    } catch (eliminacionError) {
      Alert.alert(
        'Error',
        eliminacionError instanceof Error
          ? eliminacionError.message
          : 'No se pudo eliminar el usuario.'
      );
    } finally {
      setEliminando(false);
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

  if (error || !usuario) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.titulo}>Detalles del Usuario</Text>
        <View style={styles.card}>
          <Text style={styles.error}>{error || 'No se encontró el usuario.'}</Text>
          <Pressable
            accessibilityRole="button"
            style={styles.botonVolver}
            onPress={() => router.replace('/consulta')}
          >
            <Text style={styles.textoBotonVolver}>Volver al listado</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Detalles del Usuario</Text>

      <View style={styles.card}>
        <Text style={styles.etiqueta}>Nombre</Text>
        <Text style={styles.valor}>{usuario.nombre}</Text>

        <View style={styles.linea} />

        <Text style={styles.etiqueta}>Edad</Text>
        <Text style={styles.valor}>{usuario.edad} años</Text>

        <View style={styles.linea} />

        <View style={styles.contenedorBotones}>
          <Pressable
            accessibilityRole="button"
            style={styles.botonActualizar}
            onPress={() =>
              router.push({
                pathname: '/actualiza',
                params: { id: String(usuario.id) },
              })
            }
          >
            <Text style={styles.textoBotonActualizar}>Actualizar</Text>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            style={styles.botonEliminar}
            onPress={() => setConfirmacionVisible(true)}
          >
            <Text style={styles.textoBotonEliminar}>Eliminar</Text>
          </Pressable>
        </View>
      </View>

      <Modal
        visible={confirmacionVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setConfirmacionVisible(false)}
      >
        <View style={styles.fondoModal}>
          <View style={styles.modal}>
            <Text style={styles.tituloModal}>Confirmar eliminación</Text>
            <Text style={styles.mensajeModal}>
              ¿Estás seguro de que deseas eliminar al usuario {usuario.nombre}?
            </Text>
            <View style={styles.accionesModal}>
              <Pressable
                accessibilityRole="button"
                disabled={eliminando}
                style={styles.botonCancelar}
                onPress={() => setConfirmacionVisible(false)}
              >
                <Text style={styles.textoBotonCancelar}>Cancelar</Text>
              </Pressable>
              <Pressable
                accessibilityRole="button"
                disabled={eliminando}
                style={styles.botonConfirmar}
                onPress={confirmarEliminacion}
              >
                <Text style={styles.textoBotonConfirmar}>
                  {eliminando ? 'Eliminando...' : 'Sí, eliminar'}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
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
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 25,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1F2937',
    marginBottom: 25,
  },
  etiqueta: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 5,
  },
  valor: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  linea: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 18,
  },
  contenedorBotones: {
    marginTop: 25,
    alignItems: 'center',
    gap: 10,
  },
  botonActualizar: {
    backgroundColor: '#FACC15',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    width: 140,
  },
  textoBotonActualizar: {
    color: '#1F2937',
    fontSize: 14,
    fontWeight: 'bold',
  },
  botonEliminar: {
    backgroundColor: '#DC2626',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    width: 140,
  },
  textoBotonEliminar: {
    color: '#FFFFFF',
    fontSize: 14,
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
  fondoModal: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: '85%',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 25,
    alignItems: 'center',
  },
  tituloModal: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#DC2626',
    marginBottom: 15,
  },
  mensajeModal: {
    fontSize: 16,
    color: '#4B5563',
    textAlign: 'center',
    marginBottom: 25,
  },
  accionesModal: {
    flexDirection: 'row',
    gap: 15,
  },
  botonCancelar: {
    backgroundColor: '#E5E7EB',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  textoBotonCancelar: {
    color: '#1F2937',
    fontWeight: 'bold',
  },
  botonConfirmar: {
    backgroundColor: '#DC2626',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  textoBotonConfirmar: {
    color: '#FFFFFF',
    fontWeight: 'bold',
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
