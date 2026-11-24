import React, { useState } from 'react';
import { Alert, SafeAreaView, View, Text, StyleSheet, Pressable, Modal } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function DetalleUsuarioScreen() {
  const { id, nombre, edad } = useLocalSearchParams();
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);

  const actualizarUsuario = () => {
    router.push({
      pathname: '/actualiza',
      params: {
        id: String(id ?? ''),
        nombre: String(nombre ?? ''),
        edad: String(edad ?? ''),
      },
    });
  };

  const confirmarEliminacion = () => {
    if (id == null || id === '') {
      Alert.alert('No se pudo eliminar', 'El usuario no tiene un identificador.');
      return;
    }

    router.replace({
      pathname: '/(tabs)/consulta',
      params: { eliminarId: String(id) },
    });
    setModalVisible(false);
  };


  return (
    <SafeAreaView style={styles.container}>

      <Text style={styles.titulo}>
        Detalles del Usuario
      </Text>


      {/* TARJETA */}
      <View style={styles.card}>

        <Text style={styles.label}>
          Nombre
        </Text>

        <Text style={styles.valor}>
          {nombre}
        </Text>


        <View style={styles.linea} />


        <Text style={styles.label}>
          Edad
        </Text>

        <Text style={styles.valor}>
          {edad} años
        </Text>


        <View style={styles.linea} />

        {/* BOTONES */}
        <View style={styles.contenedorBotones}>

          {/* BOTÓN ACTUALIZAR */}
          <Pressable
            style={styles.botonActualizar}
            onPress={actualizarUsuario}
          >
            <Text style={styles.textoBotonActualizar}>
              Actualizar
            </Text>
          </Pressable>


          {/* BOTÓN ELIMINAR */}
          <Pressable
            style={styles.botonEliminar}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.textoBotonEliminar}>
              Eliminar
            </Text>
          </Pressable>

        </View>

      </View>


      {/* MODAL DE CONFIRMACIÓN */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >

        {/* FONDO OSCURO */}
        <View style={styles.modalFondo}>

          {/* CONTENIDO DEL MODAL */}
          <View style={styles.modalContenido}>

            <Text style={styles.modalTitulo}>
              Confirmar eliminación
            </Text>

            <Text style={styles.modalTexto}>
              ¿Estás seguro de que deseas eliminar al usuario {nombre}?
            </Text>


            {/* BOTONES DEL MODAL */}
            <View style={styles.modalBotones}>

              {/* CANCELAR */}
              <Pressable
                style={styles.botonCancelar}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.textoCancelar}>
                  Cancelar
                </Text>
              </Pressable>


              {/* CONFIRMAR ELIMINACIÓN */}
              <Pressable
                style={styles.botonConfirmar}
                onPress={confirmarEliminacion}
              >
                <Text style={styles.textoConfirmar}>
                  Sí, eliminar
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

    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },

  label: {
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


  // BOTONES DE LA TARJETA

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


  // ESTILOS DEL MODAL

  modalFondo: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContenido: {
    width: '85%',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 25,
    alignItems: 'center',
  },

  modalTitulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#DC2626',
    marginBottom: 15,
  },

  modalTexto: {
    fontSize: 16,
    color: '#4B5563',
    textAlign: 'center',
    marginBottom: 25,
  },

  modalBotones: {
    flexDirection: 'row',
    gap: 15,
  },

  botonCancelar: {
    backgroundColor: '#E5E7EB',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },

  textoCancelar: {
    color: '#1F2937',
    fontWeight: 'bold',
  },

  botonConfirmar: {
    backgroundColor: '#DC2626',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },

  textoConfirmar: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },

});