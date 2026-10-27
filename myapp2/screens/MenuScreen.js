import { StyleSheet, View, Text, Button, Pressable } from 'react-native';
import { useState } from 'react';
import SafeScreen from './SafeScreen.js';
import TarjetasScreen from './TarjetasScreen.js';

export default function MenuScreen() {
    const [screen, setScreen] = useState('menu');
    switch (screen) {
        case 'tarjetas':
            return <TarjetasScreen onBack={() => setScreen('menu')} />;
        case 'safe':
            return <SafeScreen onBack={() => setScreen('menu')} />;
        case 'pressable':
            return (
                <View style={styles.container}>
                    <Text>Practica Pressable</Text>
                    <Pressable
                        accessibilityRole="button"
                        onPress={() => setScreen('menu')}
                        style={styles.pressable}
                    >
                        <Text style={styles.pressableText}>Volver al menú</Text>
                    </Pressable>
                </View>
            );
        case 'menu':
        default:
            return (
                <View style={styles.container}>
                    <Text>Menú de prácticas</Text>
                    <Button title="Práctica: Tarjetas" onPress={() => setScreen('tarjetas')} />
                    <Button title="Práctica: SafeAreaView" onPress={() => setScreen('safe')} />
                    <Button title="Práctica: Pressable" onPress={() => setScreen('pressable')} />
                </View>
            );
    }
}

/*Zona de estilos y posicionamiento */
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#F4F6FB',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 12,
    },
    pressable: {
        backgroundColor: '#2563EB',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 8,
    },
    pressableText: {
        color: '#FFFFFF',
        fontWeight: '600',
    },
});