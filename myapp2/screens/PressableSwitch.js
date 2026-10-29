import { useState } from 'react';
import { Pressable, StyleSheet, Switch, Text, View } from 'react-native';

export default function PressableSwitch({ onBack }) {
  const [mensaje, setMensaje] = useState('Presiona el botón');
  const [activado, setActivado] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Práctica Pressable y Switch</Text>

      <Text style={styles.mensaje}>{mensaje}</Text>
      <Pressable
        accessibilityRole="button"
        onPress={() => setMensaje('¡Botón presionado!')}
        onLongPress={() => setMensaje('¡Mantienes presionado el botón!')}
        style={({ pressed }) => [
          styles.boton,
          pressed && styles.botonPresionado,
        ]}
      >
        <Text style={styles.textoBoton}>Presióname</Text>
      </Pressable>

      <View style={styles.filaSwitch}>
        <Text style={styles.textoSwitch}>
          Switch: {activado ? 'Activado' : 'Desactivado'}
        </Text>
        <Switch
          accessibilityLabel="Activar o desactivar switch"
          value={activado}
          onValueChange={setActivado}
        />
      </View>

      <Pressable
        accessibilityRole="button"
        onPress={onBack}
        style={styles.botonVolver}
      >
        <Text style={styles.textoBoton}>Volver al menú</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6FB',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    gap: 16,
  },
  titulo: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1E293B',
    textAlign: 'center',
  },
  mensaje: {
    fontSize: 16,
    color: '#334155',
  },
  boton: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  botonPresionado: {
    backgroundColor: '#1D4ED8',
    opacity: 0.8,
  },
  textoBoton: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  filaSwitch: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  textoSwitch: {
    fontSize: 16,
    color: '#334155',
  },
  botonVolver: {
    backgroundColor: '#475569',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
});
