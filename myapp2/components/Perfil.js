import { View, Text ,Button,StyleSheet} from 'react-native';
import{useState} from 'react';


const estilos = StyleSheet.create({
  nombre:{
    fontSize:24,
    color:'#9876e2',
    fontWeight:'600',
    textTransform:'uppercase',
  },
  carrera:{
    fontSize:20,
    color:'#9824e2',
    fontWeight:'500',
    fontFamily:'roboto',
  },
  otrotexto:{
    fontSize:18,
    color:'#499990',
    fontFamily:'curier',
    fontStyle:'italic',
  },
  targetas:{
    borderWidth:3,
    borderRadius:12,
    padding:15,
    margin:10,
  },

});


export const Perfil = ({nombre,carrera,materia,cuatri,style}) => {
  const [mostrar,setMostrar] = useState(false);
  
  return (
    <View style={[estilos.targetas, style]}>
      <Text style={estilos.nombre}>{nombre}</Text>
     {mostrar && 
     <> 
      <Text style={estilos.carrera}>{carrera}</Text>
      <Text style={estilos.otrotexto}>{materia}</Text>
      <Text style={estilos.otrotexto}>{cuatri}</Text>
     </>
      }
      <Button title= "ver perfil" onPress={() => setMostrar(!mostrar)}/>
    </View>
  );
};