import { StyleSheet, View, Text, Button } from 'react-native';
import { useState } from 'react';
import SafeScreen from './SafeScreen.js';
import TarjetasScreen from './TarjetasScreen.js';
import PressableSwitch from './PressableSwitch.js';
import TextInputScreen from './TextImput&Alert.js';
import SplashScreen from './ImageBackgroung&SlapshScreen.js';
import ListaScreen from './PFlatList&SectionList.js';
import ActivityIndicatorKeyboardScreen from './ActivityIndicator, KeyboardAvoidingView.js.js';

export default function MenuScreen() {
    const [screen, setScreen] = useState('menu');
    switch (screen) {
        case 'activity-indicator-keyboard':
            return <ActivityIndicatorKeyboardScreen onBack={() => setScreen('menu')} />;
        case 'tarjetas':
            return <TarjetasScreen onBack={() => setScreen('menu')} />;
        case 'safe':
            return <SafeScreen onBack={() => setScreen('menu')} />;
        case 'pressable':
            return <PressableSwitch onBack={() => setScreen('menu')} />;
        case 'textinput-alert':
            return <TextInputScreen onBack={() => setScreen('menu')} />;
        case 'ImageBackgroung&SlapshScreen':
            return <SplashScreen onBack={() => setScreen('menu')} />;
        case 'PFlatList&SectionList':
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
                    <Button title="Práctica: ImageBackground & SplashScreen" onPress={() => setScreen('ImageBackgroung&SlapshScreen')} />
                    <Button title="Práctica: PFlatList&SectionList" onPress={() => setScreen('PFlatList&SectionList')} />
                    <Button title="Práctica: ActivityIndicator & KeyboardAvoidingView" onPress={() => setScreen('activity-indicator-keyboard')} />
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