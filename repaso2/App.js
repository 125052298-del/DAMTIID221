import { StatusBar } from 'expo-status-bar';
import { 
    StyleSheet,
    Text,
    View,
    TextInput,
    Alert,
    ActivityIndicator,
    ImageBackground,
    Pressable,
    FlatList,
    SafeAreaView
   } from 'react-native';
import { useEffect, useState } from 'react';

export default function App() {
  //control para el splash al incio de app
  const[isSplash,setIsSplash] = useState(true);

  //Estado para el formulario y la lista de libros
  const [titulo,setTitulo] = useState('');
  const [autor,setAutor] = useState('');
  const [genero,setGenero] = useState('');
  const [libros,setLibros] = useState([]);

//Estado de control de carga simulada
const [cargando,setCargando] = useState(false);
useEffect(() => {
  // Simular una carga de 2 segundos
  const timer = setTimeout(() => {
    setIsSplash(false);
  }, 2000);
  return () => clearTimeout(timer);
}, []);

  //Funcio para agregar un nuevp libro con una validacion y un retraso de 4segs
  const AgregarLibro = () =>{
    if(!titulo.trim() || !autor.trim() || !genero.trim()){
      Alert.alert('Campos incompletos','Debes llenar todos los campos');
      return;
    }
    setCargando(true);
    setTimeout(() => {
      const nuevoLibro = {
        id: Date.now().toString(),
        titulo,
        autor,
        genero
      };
      setLibros([...libros,nuevoLibro]);
      setTitulo('');
      setAutor('');
      setGenero('');
      setCargando(false);
      Alert.alert('','Libro agregado correctamente');
    }, 4000);

  };
  // Pantalla de bienvenida

if(isSplash){
  return(
    <View style={styles.container}>
      <ImageBackground source={require('./assets/spl.jpg')} style={styles.backgroundImage}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={styles.splashText}>Bienvenido a la Biblioteca</Text>
      </ImageBackground>
    </View>
  );
} 

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Librería</Text>
      <TextInput
        style={styles.input}
        placeholder="Título del libro"
        placeholderTextColor="#999"
        value={titulo}
        onChangeText={setTitulo}
      />
      <TextInput
        style={styles.input}
        placeholder="Autor del libro"
        placeholderTextColor="#999"
        value={autor}
        onChangeText={setAutor}
      />
      <TextInput
        style={styles.input}
        placeholder="Género del libro"
        placeholderTextColor="#999"
        value={genero}
        onChangeText={setGenero}
      />
      <Pressable style={styles.button} onPress={AgregarLibro}>
        <Text style={styles.buttonText}>Agregar Libro</Text>
      </Pressable>
      {cargando && <ActivityIndicator size="large" color="#0000ff" />}
      <FlatList
        data={libros}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.libroItem}>
            <Text style={styles.libroTitulo}>{item.titulo}</Text>
            <Text>{item.autor}</Text>
            <Text>{item.genero}</Text>
          </View>
        )}
      />
    </SafeAreaView>
    
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
