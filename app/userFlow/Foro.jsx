import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import NavBarDisplay from '../../components/navbarDisplay';
import { useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';

export default function Forum() {
    const [forums, setForums] = useState([]);

    const forumPosts = [
        {
            id: 1,
            title: "Soluciones completas de exámenes bancarios",
            user: "Vinnu Kumar",
            time: "Hace 3 horas",
            description: "Mientras se produce la mayor parte de la documentación...",
            comments: 235,
        },
        {
            id: 2,
            title: "¿Cómo resuelvo preguntas de razonamiento lógico?",
            user: "Vinnu Kumar",
            time: "Hace 3 horas",
            description: "Las etapas de implementación de este tipo de problemas...",
            comments: 180,
        }
    ];

    return (
        <ScrollView style={styles.container}>
            <NavBarDisplay/>
            <View style={styles.header}>
                <Ionicons name="create-outline" size={24} color="#0B538A" />
                <TextInput
                    style={styles.startDiscussionInput}
                    placeholder="Iniciar una discusión"
                    placeholderTextColor="#666"
                />
            </View>
            <View style={styles.filterContainer}>
                <Text style={styles.filterText}>Foros</Text>
            </View>
            {forumPosts.map((post) => (
                <View key={post.id} style={styles.postContainer}>
                    <Text style={styles.postTitle}>{post.title}</Text>
                    <View style={styles.userInfoContainer}>
                        <Image
                            style={styles.avatar}
                            source={{ uri: 'https://surgassociates.com/wp-content/uploads/610-6104451_image-placeholder-png-user-profile-placeholder-image-png-1-286x300.jpg' }}
                        />
                        <View>
                            <Text style={styles.userName}>{post.user}</Text>
                            <Text style={styles.timeText}>{post.time}</Text>
                        </View>
                    </View>
                    <Text style={styles.description}>{post.description}</Text>
                    <View style={styles.actionContainer}>
                        <TouchableOpacity style={styles.commentButton}>
                            <Ionicons name="chatbubble-outline" size={18} color="#666" />
                            <Text style={styles.commentText}>{post.comments}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Ionicons name="star-outline" size={18} color="#666" />
                        </TouchableOpacity>
                    </View>
                </View>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingHorizontal: 15,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f4f6fc',
        borderRadius: 10,
        padding: 10,
        marginTop: 80,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    startDiscussionInput: {
        fontSize: 16,
        marginLeft: 10,
        color: '#333',
        flex: 1,
    },
    filterContainer: {
        marginBottom: 10,
        borderBottomWidth: 1,
        borderColor: '#ddd',
        paddingBottom: 5,
    },
    filterText: {
        fontSize: 14,
        color: '#666',
    },
    postContainer: {
        backgroundColor: '#f4f6fc',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    tagContainer: {
        backgroundColor: '#0B538A',
        paddingVertical: 3,
        paddingHorizontal: 10,
        borderRadius: 15,
        alignSelf: 'flex-start',
        marginBottom: 8,
    },
    tagText: {
        color: '#ffffff',
        fontSize: 12,
    },
    postTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#04233B',
        marginBottom: 8,
    },
    userInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    userName: {
        fontSize: 14,
        color: '#04233B',
        fontWeight: 'bold',
    },
    timeText: {
        fontSize: 12,
        color: '#999',
    },
    description: {
        fontSize: 14,
        color: '#333',
        marginBottom: 10,
    },
    actionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderColor: '#ddd',
        paddingTop: 8,
    },
    commentButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    commentText: {
        marginLeft: 5,
        color: '#666',
        fontSize: 14,
    }
});
