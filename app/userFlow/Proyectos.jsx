// userFlow/proyectos/Proyectos.jsx

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Stack } from "expo-router";
import NavBarDisplay from '../../components/navbarDisplay';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Proyectos() {
    const [projects, setProjects] = useState([]);

    const handleGetProjects = async () => {
        const storedUrl = await AsyncStorage.getItem('API_URL');
        
        try {
            // para probar desde el expo go se usa el ipv4 local en las routes
            // const response = await axios.post('http://192.168.100.29:3001/users/login', {
            // desde la web se usa localhost en las routes

            const response = await axios.get(`${storedUrl}/proyectos`);
    
            if (response.status === 200) {
                console.log("Proyectos obtenidos: \n", response.data)
                setProjects(response.data);
            } else {
                Alert.alert('Error', 'No se han podido recibir los proyectos');
            }
        } catch (error) {
            Alert.alert('Error', 'Algo ha salido mal');
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />
            <View style={styles.contentContainer}>
                <NavBarDisplay />
                <Text style={styles.title}>Proyectos</Text>
                <Text style={styles.text}>Bienvenido a la pantalla de Proyectos.</Text>
                <TouchableOpacity style={styles.button} onPress={handleGetProjects}>
                    <Text style={styles.buttonText}>Prueba pruebita</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    title: {
        fontSize: 24,
        fontFamily: 'SpaceGrotesk',
        marginBottom: 20,
        color: '#04233B',
    },
    text: {
        fontSize: 16,
        fontFamily: 'SpaceGrotesk',
        color: 'black',
    },
    button: {
        marginTop: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#007bff',
        borderRadius: 5,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
    },
});
