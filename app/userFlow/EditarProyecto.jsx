import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ImageBackground, KeyboardAvoidingView } from 'react-native';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';

const EditarProyecto = () => {
    const router = useRouter();
    const [nombreProyecto, setNombreProyecto] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [metaRecaudacion, setMetaRecaudacion] = useState('');
    const [historia, setHistoria] = useState('');
    const [fechaHora, setFechaHora] = useState('');
    const [categoria, setCategoria] = useState('');

    const handlePress = (action) => {
        if(action === 'dashboard'){
            router.push('/dashboard');
        }
    };

    const handleUpdate = async () => {
        try {
            if (!nombreProyecto || !descripcion || !metaRecaudacion || !historia || !fechaHora || !categoria) {
                Alert.alert('Error', 'Todos los campos son obligatorios');
                return;
            }

            const response = await axios.put('http://localhost:3001/projects/update', {
                nombre: nombreProyecto,
                descripcion: descripcion,
                meta: metaRecaudacion,
                historia: historia,
                fechaHora: fechaHora,
                categoria: categoria
            });

            console.log("Actualización exitosa");
            Alert.alert('Éxito', 'Proyecto actualizado correctamente');
            router.push('/dashboard');

        } catch (error) {
            Alert.alert('Error', 'Hubo un problema al actualizar el proyecto');
            console.error(error);
        }
    };

    return(
        <View style={{flex: 1}}>
            <Stack.Screen
                options={{
                    headerShown: false, 
                }}
            >
            </Stack.Screen>
            <ImageBackground 
                source={require('../../assets/background.png')}
                style={styles.background}
            >
                <KeyboardAvoidingView
                    style={styles.containerWrapper}
                    behavior="height"
                    keyboardVerticalOffset={30}
                > 
                    <View style={styles.container}>
                        <Text
                            style={styles.titleText}
                        >
                            Editar Proyecto
                        </Text>
                        <View>
                            <TextInput   
                                style={styles.Items} 
                                placeholder="Nombre del proyecto"
                                value={nombreProyecto}
                                onChangeText={setNombreProyecto}
                            />
                            <TextInput
                                style={styles.Items} 
                                placeholder="Descripción"
                                value={descripcion}
                                onChangeText={setDescripcion}
                            />
                            <TextInput
                                style={styles.Items} 
                                placeholder="Meta de recaudación"
                                value={metaRecaudacion}
                                onChangeText={setMetaRecaudacion}
                            />
                            <TextInput
                                style={styles.textArea} 
                                placeholder="Historia del proyecto"
                                value={historia}
                                onChangeText={setHistoria}
                                multiline
                                numberOfLines={4}
                            />
                            <TextInput
                                style={styles.Items}
                                placeholder="Fecha y hora del proyecto"
                                value={fechaHora}
                                onChangeText={setFechaHora}
                            />
                            <View style={styles.Picker}>
                                <Picker
                                    style={styles.Item}
                                    mode={"dropdown"}
                                    selectedValue={categoria}
                                    onValueChange={(itemValue) => setCategoria(itemValue)}
                                >
                                    <Picker.Item label="Seleccione una categoría" value="" />
                                    {/* Añadir más opciones aquí */}
                                </Picker>
                            </View>
                        </View>
                        <TouchableOpacity
                            style={styles.Button}
                            onPress={handleUpdate}
                        >
                            <Text style={styles.buttonText}>Editar Proyecto</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.CancelButton}
                            onPress={() => handlePress('dashboard')}
                        >
                            <Text style={styles.cancelButtonText}>Cancelar y Volver</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>    
            </ImageBackground>
        </View>
    )
}

const styles = {
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        width: '80%',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center'
    },
    titleText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20
    },
    Items: {
        width: '100%',
        padding: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15
    },
    textArea: {
        width: '100%',
        padding: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15,
        height: 100,
        textAlignVertical: 'top'
    },
    Picker: {
        width: '100%',
        padding: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15
    },
    Button: {
        backgroundColor: '#007BFF',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        width: '100%',
        marginTop: 20
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold'
    },
    CancelButton: {
        backgroundColor: '#FF5733',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        width: '100%',
        marginTop: 10
    },
    cancelButtonText: {
        color: 'white',
        fontWeight: 'bold'
    }
};

export default EditarProyecto;
