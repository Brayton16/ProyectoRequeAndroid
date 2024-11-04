import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Modal, Image } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import  { Alert } from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';
import LottieView from 'lottie-react-native';

const ProjectDetail = () => {
    const { proyectID } = useLocalSearchParams();
    const [comments, setComments] = useState([])
    const [nombreProyecto, setNombreProyecto] = useState('')
    const [autor, setAutor] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [daysLeft, setDaysLeft] = useState(0)
    const [metaRecaudacion, setMetaRecaudacion] = useState(0)
    const [recaudado, setRecaudado] = useState(0)
    const [images, setImages] = useState([])
    const [showConfetti, setShowConfetti] = useState(false);
    const [loaded, setLoaded] =  useState(false)
    const confettiRef = useRef(null);
    const [loadingAnimation, setLoadingAnimation] = useState('')
    const [modalVisible, setModalVisible] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const animation1 = require('../../../assets/Animation - 1730689921443.json')
    const animation2 = require('../../../assets/Animation - 1730691443181.json')
    const animation3 = require('../../../assets/Animation - 1730691572996.json')

    const image1 = "https://images.ctfassets.net/wn7ipiv9ue5v/NwgElAZU8ZdLmW6v7812Y/41f23ac2004e4db655439c8010ba22f2/3-4_GTA--Gen_9_Vista_Reshoot_CF__3_.jpg"
    const image2 = "https://i.blogs.es/75acf7/gta-5-policia/1366_2000.jpeg"
    const image3 = "https://sm.ign.com/ign_es/news/g/gta-5-lose/gta-5-loses-steam-deck-verification-as-rockstar-claims-valve_69tc.jpg"

    
    const handleCommentSubmit = async () => {
        const storedUrl = await AsyncStorage.getItem('API_URL');
        const storedUserID = await AsyncStorage.getItem('userID')
        const url = `${storedUrl}/proyectos/ratings`
        const url2 = `${storedUrl}/proyectos/ratings?projectID=${proyectID}`
        const data = {
            projectID: proyectID,
            rating: rating,
            comment: comment,
            userID: 18
        }
        try{
            if(data.rating > 1 && data.rating < 5){
                const response = await axios.post(url, data)
                const responseComments = await axios.get(url2)
                if(responseComments.status === 200){
                    setComments(responseComments.data)
                }else{
                    Alert.alert('Error', 'No se han podido recibir los comentarios')
                }
            }else{
                Alert.alert('Error', 'No se ha ingresado ninguna estrella de valoración')
            }
        }catch (error) {
            console.error('Error al hacer la solicitud POST:', );
            Alert.alert('Error', 'Ya se ha agregado una valoración en este proyecto.');
        }
        setModalVisible(false);
        setComment('');
        setRating(0);
    };

    const handleRating = (value) => {
        setRating(value);
    };
    
    const calculateDaysLeft = (deadline) => {
        const currentDate = new Date();
        const deadlineDate = new Date(deadline);
        const differenceInTime = deadlineDate - currentDate;
        const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
        return differenceInDays;
    };

    useEffect(() => {
        const handleGetProject = async () => {
            const storedUrl = await AsyncStorage.getItem('API_URL');
            const url = `${storedUrl}/proyecto/id/?projectID=${proyectID}`
            const url2 = `${storedUrl}/proyectos/ratings?projectID=${proyectID}`
            const animations = [animation1, animation2, animation3];
            const randomIndex = Math.floor(Math.random() * animations.length);
            setLoadingAnimation(animations[randomIndex]);
            try {
                const response = await axios.get(url);
                const res = response.data[0]
                if (response.status === 200) {
                    setAutor(res.FirstName + " " + res.LastName)
                    setNombreProyecto(res.ProjectName)
                    setDescripcion(res.ProjectDescription)
                    setMetaRecaudacion(res.FundingGoal.toString())
                    setRecaudado(res.CurrentCollection.toString())
                    setDaysLeft(calculateDaysLeft(res.FundingDeadline).toString())
                    setImages([image1, image2, image3])
                }else{
                    Alert.alert('Error', 'No se han podido recibir los proyectos');
                }
                const responseComments = await axios.get(url2)
                if(responseComments.status === 200){
                    setComments(responseComments.data)
                    setLoaded(true)
                    if (res.CurrentCollection >= res.FundingGoal) {
                        setShowConfetti(true);
                    }
                }else{
                    Alert.alert('Error', 'No se han podido recibir los comentarios')
                }
            } catch (error) {
                Alert.alert('Error', 'Algo ha salido mal');
                console.error(error);
            }
        };
        handleGetProject();
    }, [proyectID]);

    useEffect(() => {
        if (showConfetti) {
            // Configura el temporizador para ocultar el confetti después de 3 segundos (3000 ms)
            const timer = setTimeout(() => {
                setShowConfetti(false);
            }, 3500);

            // Limpia el temporizador al desmontar el componente o cuando cambie showConfetti
            return () => clearTimeout(timer);
        }
    }, [showConfetti]);

    return (
        <View style={{flex: 1}}>
            {showConfetti && (
                <View style={styles.confettiContainer}>
                    <ConfettiCannon
                        count={200}
                        origin={{ x: 0, y: 0 }}
                        autoStart={true}
                        ref={confettiRef}
                        fadeOut={true}
                    />
                </View>
            )}
            {loaded ? (
                <ScrollView style={styles.container}>
                    <View style={styles.imageBanner}>
                        {images.length > 0 ? (
                            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                {images.map((image, index) => (
                                    <Image
                                        key={index}
                                        source={{ uri: image }}
                                        style={styles.image}
                                        resizeMode="cover"
                                    />
                                ))}
                            </ScrollView>
                        ) : (
                            <Image
                                source={require('../../../assets/goofycoin.png')} // Una imagen por defecto
                                style={styles.image}
                                resizeMode="cover"
                            />
                        )}
                    </View>
                    <View style={styles.projectInfoContainer}>
                        <Text style={styles.projectTitle}>{nombreProyecto}</Text>
                        <View style={styles.projectHeaderRow}>
                            <Text style={styles.projectAuthor}>Hecho por <Text style={styles.bold}>{autor}</Text></Text>
                            <Text style={styles.projectDeadline}>Quedan {daysLeft} días</Text>
                        </View>
                        <Text style={styles.projectDescription}>{descripcion}</Text>
                        <View style={styles.statsContainer}>
                            <View style={styles.statBoxPink}>
                                <Text style={styles.statLabel}>Meta</Text>
                                <Text style={styles.statValue}>${metaRecaudacion}</Text>
                            </View>
                            <View style={styles.statBoxGray}>
                                <Text style={styles.statLabel}>Recaudado</Text>
                                <Text style={styles.statValue}>${recaudado}</Text>
                            </View>
                        </View>
                    </View>
                    <Text style={styles.commentSectionTitle}>Comentarios</Text>
                    <View style={styles.commentContainer}>
                        { comments.length > 0 ? comments.map((comment, index) => (
                            <View key={index} style={styles.commentBox}>
                                <View style={styles.rateContainer}>
                                    <Text style={styles.commentAuthor}>{comment.FirstName} {comment.LastName}</Text>
                                    <View style={styles.starsContainer}>
                                        {[...Array(comment.Rating)].map((_, i) => (
                                            <Ionicons key={i} name="star" size={16} color="#FFD700" />
                                        ))}
                                </View>
                                    
                                </View>
                                <Text style={styles.commentText}>{comment.Comment}</Text>
                            </View>
                        )) : <View><Text style={{marginBottom: 10, fontFamily: 'SpaceGrotesk' }}>Aún no hay comentarios</Text></View>}
                        <View style={styles.newCommentBox}>
                            <TouchableOpacity style={styles.submitButtonActivate} onPress={() => setModalVisible(true)}>
                                <Text style={styles.submitButtonText}>Comentar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => setModalVisible(false)}
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <Text style={styles.modalTitle}>Deja tu comentario</Text>
                                <View style={styles.starsContainer}>
                                    {[1, 2, 3, 4, 5].map((value) => (
                                        <TouchableOpacity key={value} onPress={() => handleRating(value)}>
                                            <Ionicons 
                                                name={value <= rating ? "star" : "star-outline"} 
                                                size={30} 
                                                color="#FFD700" 
                                            />
                                        </TouchableOpacity>
                                    ))}
                                </View>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Escribe tu comentario..."
                                    value={comment}
                                    onChangeText={setComment}
                                />
                                <TouchableOpacity style={styles.submitButton} onPress={handleCommentSubmit}>
                                    <Text style={styles.submitButtonText}>Enviar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                                    <Text style={styles.cancelButtonText}>Cancelar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                    <TouchableOpacity style={styles.donateButton}>
                        <Text style={styles.donateButtonText}>Donar</Text>
                    </TouchableOpacity>
                </ScrollView>
            ):(
                <View style={styles.loadingContainer}>
                    <LottieView 
                        source={loadingAnimation} 
                        autoPlay 
                        loop 
                        style={styles.lottie}
                    />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        padding: 20,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    lottie: {
        width: 400,
        height: 400,
    },
    projectInfoContainer: {
        marginBottom: 20,
    },
    projectTitle: {
        fontSize: 24,
        fontFamily: 'SpaceGroteskBold',
        marginBottom: 10,
    },
    projectHeaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    projectAuthor: {
        fontSize: 16,
        color: '#333',
    },
    bold: {
        fontFamily: 'SpaceGroteskBold',
    },
    projectDeadline: {
        fontSize: 14,
        fontFamily: 'SpaceGrotesk',
        color: '#F75657',
    },
    projectDescription: {
        fontFamily: 'SpaceGrotesk',
        fontSize: 16,
        marginBottom: 20,
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    statBoxPink: {
        backgroundColor: '#F75657',
        padding: 15,
        borderRadius: 10,
        flex: 0.48,
        alignItems: 'center',
    },
    statBoxGray: {
        backgroundColor: '#1C7690',
        padding: 15,
        borderRadius: 10,
        flex: 0.48,
        alignItems: 'center',
    },
    statLabel: {
        fontSize: 14,
        fontFamily: 'SpaceGrotesk',
        color: '#ffffff',
        marginBottom: 5,
    },
    statValue: {
        fontSize: 20,
        color: '#ffffff',
        fontFamily: 'SpaceGroteskBold',
        fontWeight: 'bold',
    },
    commentSectionTitle: {
        fontSize: 18,
        fontFamily: 'SpaceGrotesk',
        marginBottom: 10,
    },
    commentContainer: {
        marginBottom: 20,
    },
    commentBox: {
        backgroundColor: '#04233B',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
    },
    commentAuthor: {
        fontSize: 14,
        color: '#ffffff',
        fontFamily: 'SpaceGrotesk',
    },
    commentText: {
        fontSize: 14,
        fontFamily: 'SpaceGrotesk',
        color: '#ffffff',
        marginBottom: 5,
    },
    starsContainer: {
        flexDirection: 'row',
    },
    newCommentBox: {
        backgroundColor: '#04233B',
        padding: 15,
        borderRadius: 10,
    },
    newCommentPrompt: {
        fontSize: 14,
        fontFamily: 'SpaceGrotesk',
        color: '#ffffff',
        marginBottom: 5,
    },
    input: {
        backgroundColor: '#ffffff',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    submitButtonActivate: {
        backgroundColor: '#F75657',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    submitButtonText: {
        color: '#ffffff',
        fontFamily: 'SpaceGrotesk',
    },
    donateButton: {
        backgroundColor: '#F75657',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 40
    },
    donateButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontFamily: 'SpaceGrotesk',
    },
    confettiContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1000,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        paddingVertical: 20,
        width: '90%',
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        fontFamily: 'SpaceGroteskBold',
        marginBottom: 15,
    },
    starsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 15,
    },
    cancelButtonText: {
        color: '#ffffff',
        fontFamily: 'SpaceGrotesk'
    },
    submitButton: {
        backgroundColor: '#F75657',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10,
        width: '80%',
    },
    input: {
        width: '80%',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
        fontFamily: 'SpaceGrotesk'
    },
    cancelButton: {
        backgroundColor: '#1C7690',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        width: '80%',
    },
    rateContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    imageBanner: {
        height: 200, // Ajusta la altura según sea necesario
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 20,
        marginTop: 30
    },
    image: {
        width: 300, // Ajusta el ancho de la imagen
        height: '100%',
        marginRight: 10, // Espacio entre las imágenes
    },
});

export default ProjectDetail;
