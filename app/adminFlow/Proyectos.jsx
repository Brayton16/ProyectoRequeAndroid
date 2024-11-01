// userFlow/proyectos/Proyectos.jsx

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { Stack } from "expo-router";
// import NavContainer from '../../../components/navbarDisplay';
import NavBarDisplay from '../../components/navbarDisplay';

export default function Proyectos() {
    return (
        <View style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />
            <View style={styles.contentContainer}>
                <NavBarDisplay/>
                <Text style={styles.title}>Proyectos</Text>
                <Text style={styles.text}>Bienvenido a la pantalla de Proyectos.</Text>
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
});
