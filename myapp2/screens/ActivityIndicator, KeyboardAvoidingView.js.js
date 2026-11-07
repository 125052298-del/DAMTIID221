import { useState } from 'react';
import {ActivityIndicator,Button,Keyboard as Teclado,KeyboardAvoidingView,} from 'react-native';
import {StyleSheet, Switch,Text,TextInput,View,} from 'react-native';

export default function Practica({ onBack }) {
  const [cargando, setCargando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [activado, setActivado] = useState(true);

  function enviar() {
    Teclado.dismiss();
    setEnviado(false);
    setCargando(true);

    setTimeout(() => {
      setCargando(false);
      setEnviado(true);
    }, 3000);
  }

  return (
    <KeyboardAvoidingView
      behavior="padding"
      enabled={activado}
      style={estilos.contenedor}
    >
      <View style={estilos.contenido}>
        <Button title="Volver al menú" onPress={onBack} />
        <View style={estilos.fila}>
          <Text>Ajuste del teclado: {activado ? 'activado' : 'desactivado'}</Text>
          <Switch
            value={activado}
            onValueChange={setActivado}
            trackColor={{ false: '#d8d8d8', true: '#dfe4e5' }}
            thumbColor={activado ? '#73dc8d' : '#5b575a'}
          />
        </View>

        <TextInput
          placeholder="Escribe tu nombre"
          autoCapitalize="words"
          style={estilos.input}
        />
        <TextInput
          placeholder="Escribe tus apellidos"
          autoCapitalize="words"
          style={estilos.input}
        />
        <TextInput
          placeholder="Escribe tu edad"
          keyboardType="numeric"
          style={estilos.input}
        />
        <TextInput
          placeholder="Escribe tu color favorito"
          style={estilos.input}
        />
        <TextInput
          placeholder="Escribe tu comida favorita"
          autoCapitalize="words"
          style={estilos.input}
        />

        <View style={estilos.contenedorBoton}>
          <Button title="Enviar" onPress={enviar} disabled={cargando} />
        </View>

        {cargando && (
          <>
            <ActivityIndicator
              color="#1783c6"
              size="large"
              style={estilos.indicador}
            />
            <Text style={estilos.texto}>Cargando...</Text>
          </>
        )}

        {enviado && !cargando && <Text style={estilos.texto}>Listo</Text>}
      </View>
    </KeyboardAvoidingView>
  );
}

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: 'white',
  },
  contenido: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  fila: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 16,
  },
  contenedorBoton: {
    marginVertical: 16,
  },
  indicador: {
    margin: 16,
  },
  texto: {
    textAlign: 'center',
  },
});