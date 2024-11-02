import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import { Stack } from "expo-router";
import NavBarDisplay from '../../components/navbarDisplay';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Ionicons from '@expo/vector-icons/Ionicons';

function ProjectCard({ project }) {
    return(
        <View style={styles.cardContainer}>
            <View style={styles.headerContainer}>
                <View style={styles.avatar}>
                    <Text style={styles.avatarText}>{project.ownerInitials}</Text>
                </View>
                <View style={styles.headerTextContainer}>
                    <Text style={styles.headerTitle}>{project.FirstName}</Text>
                    <Text style={styles.headerSubtitle}>{project.WorkArea.toUpperCase()}</Text>
                </View>
            </View>
            <View style={styles.imageContainer}>
                <Image
                    style={styles.image}
                    source={{ uri: project.imageUri }}
                    resizeMode="cover"
                />
            </View>
            <View style={styles.contentContainer}>
                <Text style={styles.projectTitle}>{project.ProjectName}</Text>
                <Text style={styles.projectSubtitle}>{project.Category}</Text>
                <Text style={styles.projectDescription}>{project.ProjectDescription}</Text>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Donaciones</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Editar</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default function MisProyectos() {
    const [projects, setProjects] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const handleGetProjects = async () => {
            const storedUrl = await AsyncStorage.getItem('API_URL');
            try {
                const response = await axios.get(`${storedUrl}/proyectos`);
                if (response.status === 200) {
                    setProjects(response.data);
                } else {
                    Alert.alert('Error', 'No se han podido recibir los proyectos');
                }
            } catch (error) {
                Alert.alert('Error', 'Algo ha salido mal');
                console.error(error);
            }
        };

        handleGetProjects();
    }, []);

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />
            <View style={styles.contentContainer}>
                <NavBarDisplay/>
                <ScrollView style={{marginTop: 80, marginHorizontal: 30}} showsVerticalScrollIndicator={false}>
                <View style={styles.filterContainer}>
                        <TouchableOpacity style={styles.filterButton}>
                            <Text style={styles.filterButtonText}>Categoría</Text>
                        </TouchableOpacity>                    
                        <TouchableOpacity style={styles.filterButton}>
                            <Text style={styles.filterButtonText}>Recaudado</Text>
                        </TouchableOpacity>                    
                        <TouchableOpacity style={styles.filterButton}>
                            <Text style={styles.filterButtonText}>Meta</Text>
                        </TouchableOpacity>                    
                        <TouchableOpacity style={styles.filterButton}>
                            <Text style={styles.filterButtonText}>Fecha límite</Text>
                        </TouchableOpacity>                    
                    </View>
                    <View style={styles.SearchBar}>
                        <Ionicons name="search" size={20} color="black" style={{marginRight: 10, marginLeft: 2}} />
                        <TextInput
                            style={{fontFamily: 'SpaceGrotesk', paddingHorizontal: 5, flex: 1}}
                            placeholder="Buscar proyectos"
                            placeholderTextColor={'black'}
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                            
                        />
                    </View>
                    {projects ? projects.map((project) => (
                        <ProjectCard key={project.ProjectID} project={project} />
                    )) : <Text style={styles.text}>Cargando proyectos...</Text>}
                </ScrollView>
                <TouchableOpacity style={styles.floatingButton}>
                    <Ionicons name="add" size={50} color="#ffffff" />
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
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontFamily: 'SpaceGrotesk',
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
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    avatar: {
        backgroundColor: '#6A1B9A',
        borderRadius: 25,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarText: {
        color: '#ffffff',
        fontSize: 18,
        fontFamily: 'SpaceGrotesk',
    },
    headerTextContainer: {
        marginLeft: 10,
    },
    headerTitle: {
        fontSize: 16,
        fontFamily: 'SpaceGrotesk',
    },
    headerSubtitle: {
        fontSize: 12,
        color: '#666',
    },
    imageContainer: {
        backgroundColor: '#F8BBD0', // Placeholder color
        height: 150,
        borderRadius: 10,
        marginBottom: 10,
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
    contentContainer: {
        marginBottom: 10,
    },
    projectTitle: {
        fontSize: 18,
        fontFamily: 'SpaceGrotesk',
        marginBottom: 5,
    },
    projectSubtitle: {
        fontSize: 14,
        color: '#666',
        marginBottom: 5,
        fontFamily: 'SpaceGrotesk',
    },
    projectDescription: {
        fontSize: 14,
        color: '#333',
        fontFamily: 'SpaceGrotesk',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    button: {
        backgroundColor: '#F75657',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 50,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 14,
        fontFamily: 'SpaceGrotesk',
    },
    floatingButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#F75657',
        borderRadius: 50,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        marginTop: 10,
    },
    filterButton: {
        backgroundColor: '#1C7690',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 50,
    },
    filterButtonText: {
        color: '#ffffff',
        fontSize: 14,
        fontFamily: 'SpaceGrotesk',
    },
    filterButtonActive: {
        backgroundColor: '#EF5356',
    },
    SearchBar: {
        backgroundColor: '#F3EDF7',
        borderRadius: 50,
        padding: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        flexDirection: 'row',
        alignItems: 'center',
    }
});

