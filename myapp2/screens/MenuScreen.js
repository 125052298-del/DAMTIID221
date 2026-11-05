import { StyleSheet, View, Text, Button } from 'react-native';
import { useState } from 'react';
import SafeScreen from './SafeScreen.js';
import TarjetasScreen from './TarjetasScreen.js';
import PressableSwitch from './PressableSwitch.js';
import TextInputScreen from './TextImput&Alert.js';
import PerfilScreen from './PerfilScreen.js';
import ListaScreen from './PFlatList&SectionList.js';

export default function MenuScreen() {
    const [screen, setScreen] = useState('menu');
    switch (screen) {
        case 'tarjetas':
            return <TarjetasScreen onBack={() => setScreen('menu')} />;
        case 'safe':
            return <SafeScreen onBack={() => setScreen('menu')} />;
        case 'pressable':
            return <PressableSwitch onBack={() => setScreen('menu')} />;
        case 'textinput-alert':
            return <TextInputScreen onBack={() => setScreen('menu')} />;
        case 'perfil':
            return <PerfilScreen onBack={() => setScreen('menu')} />;
        case 'lista':
            return <ListaScreen onBack={() => setScreen('menu')} />;
        case 'menu':
        default:
            return (
                <View style={styles.container}>
                    <Text>Menú de prácticas</Text>
                    <Button title="Práctica: Tarjetas" onPress={() => setScreen('tarjetas')} />
                    <Button title="Práctica: SafeAreaView" onPress={() => setScreen('safe')} />
                    <Button title="Práctica: Pressable y Switch" onPress={() => setScreen('pressable')} />
                    <Button title="Práctica: TextInput & Alert" onPress={() => setScreen('textinput-alert')} />
                    <Button title="Práctica: Perfil" onPress={() => setScreen('perfil')} />
                    <Button title="Práctica: Lista" onPress={() => setScreen('lista')} />
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
});