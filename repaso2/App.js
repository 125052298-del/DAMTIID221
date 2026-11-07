import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  FlatList,
  Alert,
  ActivityIndicator,
  ImageBackground,
  SafeAreaView
} from 'react-native';

export default function App() {
  // Estado para controlar el SplashScreen (2 segundos)
  const [isSplash, setIsSplash] = useState(true);

  // Estados para el formulario y la lista de libros
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [genero, setGenero] = useState('');
  const [libros, setLibros] = useState([]);
  
  // Estado para controlar la carga simulada de 4 segundos
  const [cargando, setCargando] = useState(false);

useEffect(() => {
    const timer = setTimeout(() => {
      setIsSplash(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Función para agregar un libro con validación y retraso de 4 segundos
  const agregarLibro = () => {
    if (!titulo.trim() || !autor.trim() || !genero.trim()) {
      Alert.alert('Alert', 'Todos los campos son obligatorios.');
      return;
    }

    setCargando(true);

    setTimeout(() => {
      const nuevoLibro = {
        id: Date.now().toString(),
        titulo,
        autor,
        genero,
      };

      setLibros([nuevoLibro, ...libros]);
      setTitulo('');
      setAutor('');
      setGenero('');
      setCargando(false);

      Alert.alert('Alert', 'Libro guardado correctamente.');
    }, 4000); // Simulación de 4 segundos
  };

  // Pantalla de Bienvenida (SplashScreen)
  if (isSplash) {
    return (
      <ImageBackground source={require('./assets/spl.jpg')} style={styles.splashContainer}>
        <Text style={styles.splashText}>repa2</Text>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground 
      source={require('./assets/ENA.jpg')} 
      style={styles.background}
    >
      <SafeAreaView style={styles.container}>
        <Text style={styles.headerTitle}>Libreria</Text>

        {/* Formulario */}
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Título del libro"
            placeholderTextColor="#888"
            value={titulo}
            onChangeText={setTitulo}
          />
          <TextInput
            style={styles.input}
            placeholder="Autor"
            placeholderTextColor="#888"
            value={autor}
            onChangeText={setAutor}
          />
          <TextInput
            style={styles.input}
            placeholder="Género"
            placeholderTextColor="#888"
            value={genero}
            onChangeText={setGenero}
          />

          <Pressable style={styles.button} onPress={agregarLibro} disabled={cargando}>
            <Text style={styles.buttonText}>Agregar Libro</Text>
          </Pressable>
        </View>

        {/* Indicador de Carga de 4 segundos */}
        {cargando && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#ffffff" />
            <Text style={styles.loadingText}>Guardando...</Text>
          </View>
        )}

        <Text style={styles.totalText}>Total de libros: {libros.length}</Text>

        {/* Lista de Libros */}
        <FlatList
          data={libros}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.bookCard}>
              <Text style={styles.bookTitle}>{item.titulo}</Text>
              <Text style={styles.bookDetails}>Autor: {item.autor}</Text>
              <Text style={styles.bookDetails}>Género: {item.genero}</Text>
            </View>
          )}
        />
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    backgroundColor: '#1e293b',
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashText: {
    fontSize: 40,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.4)', // Oscurecer un poco el fondo para legibilidad
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginVertical: 10,
  },
  formContainer: {
    marginBottom: 10,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#1d4ed8',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  loadingText: {
    color: '#ffffff',
    marginTop: 5,
    fontWeight: '600',
  },
  totalText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  bookCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
  bookDetails: {
    fontSize: 14,
    color: '#333333',
    marginTop: 2,
  },
});