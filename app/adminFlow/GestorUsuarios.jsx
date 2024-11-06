import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { Stack } from "expo-router";
import axios from 'axios';
import NavBarDisplay from '../../components/navbarDisplay';
import AsyncStorage from '@react-native-async-storage/async-storage';

function UserCard({ user }) {
    const handlePress = () => {
        Alert.alert("Usuario", `Has seleccionado a ${user.username}`);
    };

    return (
        <TouchableOpacity style={styles.cardContainer} onPress={handlePress}>
            <View style={styles.imageContainer}>
                <Image
                    style={styles.image}
                    source={{ uri: user.profileImageUri }}
                    resizeMode="cover"
                />
            </View>
            <View style={styles.contentContainer}>
                <Text style={styles.userName}>{user.username}</Text>
                <Text style={styles.userWorkArea}>{user.workArea}</Text>
            </View>
        </TouchableOpacity>
    );
}

export default function GestorUsuarios() {
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        const obtenerUsuarios = async () => {
            const storedUrl = await AsyncStorage.getItem('API_URL');
            try {
                const response = await axios.get(`${storedUrl}/usuarios`);
                if (response.status === 200) {
                    setUsuarios(response.data);
                } else {
                    Alert.alert('Error', 'No se han podido recibir los usuarios');
                }
            } catch (error) {
                Alert.alert('Error', 'Algo ha salido mal');
                console.error(error);
            }
        };

        obtenerUsuarios();
    }, []);

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />
            <View style={styles.contentContainer}>
                <NavBarDisplay />
                <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                    <Text style={styles.title}>Usuarios Registrados</Text>
                    {usuarios.length > 0 ? usuarios.map((user) => (
                        <UserCard key={user.id} user={user} />
                    )) : <Text style={styles.text}>Cargando usuarios...</Text>}
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
    cardContainer: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 15,
        marginVertical: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        flexDirection: 'row',
        alignItems: 'center',
    },
    imageContainer: {
        backgroundColor: '#F8BBD0', // Placeholder color
        width: 50,
        height: 50,
        borderRadius: 25,
        overflow: 'hidden',
        marginRight: 15,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    userName: {
        fontSize: 18,
        fontFamily: 'SpaceGrotesk',
        color: '#04233B',
    },
    userWorkArea: {
        fontSize: 14,
        color: '#666',
        fontFamily: 'SpaceGrotesk',
    }
});
