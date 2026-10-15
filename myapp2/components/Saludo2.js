import {Text,Image,Button,View} from 'react-native';
export  const Saludo2=() => {
    return(
        <View>
        <Image source={require('../assets/wave.png')}></Image>
        <Button title="Presionar para saludar"></Button>
        <Text>Hola, soy un componente propio!</Text>
    </View>
    )
}