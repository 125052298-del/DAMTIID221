/*Zona de importaciones */
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Image } from 'react-native';
import {Saludo} from './components/Saludo.js';
import {Saludo2} from './components/Saludo2.js';
import { Perfil } from './components/Perfil.js'; 
/*Zona de Render o Main*/
export default function App() {
  return (

    <View style={styles.container}>
{/*  

      <Text>Hola mundo ReactNative!</Text>
      <Image source={require('./assets/wave.png')}></Image>
      <Text>----------------------------------------------</Text>
      <Saludo></Saludo>
      <Saludo/>
      
      <Text>----------------------------------------------</Text>
      <Saludo2></Saludo2>
      <Saludo2/>
      */}

      <Text>----------------------------------------------</Text>
      <Perfil nombre="Juan" carrera="TIID" materia="APPMOVIL" cuatri="4"/>
      <Perfil nombre="Ramon" carrera="TIID" materia="APPMOVIL" cuatri="4"/>
      <Perfil nombre="papu" carrera="TIID" materia="APPMOVIL" cuatri="4"/>
      <StatusBar style="auto" />
    </View>
  );
}
/*Zona de estilos y posicionamiento */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
