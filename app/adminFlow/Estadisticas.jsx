import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Stack } from "expo-router";
import axios from 'axios';
import NavBarDisplay from '../../components/navbarDisplay';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Estadisticas() {
    const [estadisticas, setEstadisticas] = useState({
        usuarios: { total: 0, ultimoMes: 0 },
        donaciones: { total: 0, ultimoMes: 0 },
        proyectos: { total: 0, ultimoMes: 0 },
        publicaciones: { total: 0, ultimoMes: 0 }
    });

    useEffect(() => {
        const obtenerEstadisticas = async () => {
            const storedUrl = await AsyncStorage.getItem('API_URL');
            try {
                const response = await axios.get(`${storedUrl}/estadisticas`);
                if (response.status === 200) {
                    setEstadisticas(response.data);
                } else {
                    Alert.alert('Error', 'No se han podido recibir las estadísticas');
                }
            } catch (error) {
                Alert.alert('Error', 'Algo ha salido mal');
                console.error(error);
            }
        };
        obtenerEstadisticas();
    }, []);

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />
            <View style={styles.contentContainer}>
                <NavBarDisplay />
                <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                    <View style={styles.statsContainer}>
                        <View style={styles.statsBox}>
                            <Text style={styles.statsTitle}>Usuarios</Text>
                            <Text style={styles.statsNumber}>{estadisticas.usuarios.total}</Text>
                            <Text style={styles.statsSubtitle}>Último mes: {estadisticas.usuarios.ultimoMes}</Text>
                        </View>
                        <View style={styles.statsBox}>
                            <Text style={styles.statsTitle}>Donaciones</Text>
                            <Text style={styles.statsNumber}>{estadisticas.donaciones.total}</Text>
                            <Text style={styles.statsSubtitle}>Último mes: {estadisticas.donaciones.ultimoMes}</Text>
                        </View>
                        <View style={styles.statsBox}>
                            <Text style={styles.statsTitle}>Proyectos</Text>
                            <Text style={styles.statsNumber}>{estadisticas.proyectos.total}</Text>
                            <Text style={styles.statsSubtitle}>Último mes: {estadisticas.proyectos.ultimoMes}</Text>
                        </View>
                        <View style={styles.statsBox}>
                            <Text style={styles.statsTitle}>Publicaciones</Text>
                            <Text style={styles.statsNumber}>{estadisticas.publicaciones.total}</Text>
                            <Text style={styles.statsSubtitle}>Último mes: {estadisticas.publicaciones.ultimoMes}</Text>
                        </View>
                    </View>
                </ScrollView>
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
    scrollView: {
        marginTop: 80,
        marginHorizontal: 30
    },
    statsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        marginBottom: 20
    },
    statsBox: {
        width: '45%',
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 15,
        marginVertical: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    statsTitle: {
        fontSize: 18,
        fontFamily: 'SpaceGrotesk',
        marginBottom: 5,
        color: '#04233B',
    },
    statsNumber: {
        fontSize: 24,
        fontFamily: 'SpaceGrotesk',
        marginBottom: 5,
        color: '#04233B',
    },
    statsSubtitle: {
        fontSize: 14,
        fontFamily: 'SpaceGrotesk',
        color: '#666',
    }
});

export default Estadisticas;
