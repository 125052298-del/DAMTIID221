import { StyleSheet, Text, View, FlatList, SectionList, TouchableOpacity, SafeAreaView } from 'react-native';
import { useState } from 'react';

export default function PFlatListSectionList() {
  const [vistaActual, setVistaActual] = useState('flat');

  const [serviciosFlat] = useState([
    { id: '1', nombre: 'Clase de Ingles', descripcion: 'Educacion' },
    { id: '2', nombre: 'Reparacion de Pc', descripcion: 'Tecnologia' },
  ]);

  const [serviciosSection] = useState([
    {
      title: 'Educacion',
      data: [{ id: '1', nombre: 'Clase de Ingles', descripcion: 'asesorias de matematicas' }],
    },
    {
      title: 'Tecnologia',
      data: [{ id: '2', nombre: 'Reparacion de Pc', descripcion: 'redes' }],
    },
  ]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.nav}>
        <TouchableOpacity style={styles.btn} onPress={() => setVistaActual('flat')}>
          <Text style={styles.txt}>FlatList</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={() => setVistaActual('section')}>
          <Text style={styles.txt}>SectionList</Text>
        </TouchableOpacity>
      </View>

      {vistaActual === 'flat' ? (
        <View style={styles.content}>
          <Text style={styles.sub}>FlatList</Text>
          <FlatList
            data={serviciosFlat}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Text style={styles.itemTitle}>{item.nombre}</Text>
                <Text style={styles.itemDesc}>{item.descripcion}</Text>
              </View>
            )}
          />
        </View>
      ) : (
        <View style={styles.content}>
          <Text style={styles.sub}>SectionList</Text>
          <SectionList
            sections={serviciosSection}
            keyExtractor={(item, index) => item.id + index}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Text style={styles.itemTitle}>{item.nombre}</Text>
                <Text style={styles.itemDesc}>{item.descripcion}</Text>
              </View>
            )}
            renderSectionHeader={({ section: { title } }) => (
              <Text style={styles.header}>{title}</Text>
            )}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 15, 
    backgroundColor: '#f5f5f5', 
    alignItems: 'center',        
    justifyContent: 'center'     
  },
  nav: { 
    flexDirection: 'row', 
    justifyContent: 'center', 
    marginBottom: 20,
    gap: 8                       
  },
  btn: { 
    backgroundColor: '#2563eb', 
    paddingVertical: 10,
    paddingHorizontal: 16, 
    borderRadius: 6,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5
  },
  content: { 
    width: '100%',
    maxWidth: 340,               
    alignItems: 'stretch'
  },
  sub: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    marginBottom: 10,
    color: '#1f2937'
  },
  card: { 
    backgroundColor: '#ffffff',  
    padding: 12, 
    marginVertical: 4, 
    borderRadius: 6,
    shadowColor: '#000',         
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1 
  },
  header: { 
    fontSize: 15, 
    fontWeight: 'bold', 
    color: '#111827',
    backgroundColor: '#e2e8f0', // Fondo gris restaurado para la sección como en la foto
    paddingVertical: 6, 
    paddingHorizontal: 8,
    marginTop: 10,
    marginBottom: 4,
    borderRadius: 4
  },
  itemTitle: {
    fontWeight: '600',
    color: '#374151',
    fontSize: 14
  },
  itemDesc: {
    color: '#6b7280',
    fontSize: 12,
    marginTop: 2
  },
  txt: { 
    color: '#fff', 
    fontWeight: 'bold',
    fontSize: 14
  }
});