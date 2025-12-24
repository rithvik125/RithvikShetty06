import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    Image,
    ImageBackground,
    TextInput,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";
import Swiper from "react-native-swiper";
import { getFeaturedSeeds } from "../../api/seedsApi";
import { router } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import LoadingScreen from "../../components/LoadingScreen";
import { styles } from "../../styles/homeStyles";   // ⬅ importing separated styles

export default function HomeScreen() {
    const [seeds, setSeeds] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadSeeds();
    }, []);

    const loadSeeds = async () => {
        const data = await getFeaturedSeeds();
        setSeeds(data);
    };

    // reset loading when coming from varieties screen
    useFocusEffect(
        React.useCallback(() => {
            setLoading(false);
        }, [])
    );

    if (loading) return <LoadingScreen />;

    return (
        <ImageBackground
            source={require("../../assets/images/bg.png")}
            style={styles.background}
            resizeMode="cover"
        >
            <BlurView intensity={110} tint="light" style={StyleSheet.absoluteFill} />

            <ScrollView contentContainerStyle={styles.scrollContainer}>

                {/* Header */}
                <View style={styles.headerContainer}>
                    <Image
                        source={require("../../assets/images/logo.png")}
                        style={styles.leftLogo}
                        resizeMode="contain"
                    />

                    <View style={styles.headerTextContainer}>
                        <Text style={styles.universityName}>
                            UNIVERSITY OF AGRICULTURAL SCIENCES
                        </Text>
                        <Text style={styles.subText}>
                            BANGALORE AICRP on Seed (Crops), UAS, GKVK, Bengaluru-560065
                        </Text>
                    </View>

                    <Image
                        source={require("../../assets/images/logo2.png")}
                        style={styles.rightLogo}
                        resizeMode="contain"
                    />
                </View>

                {/* Search Bar */}
                <View style={styles.searchContainer}>
                    <Ionicons name="search-outline" size={20} color="#555" />
                    <TextInput
                        placeholder="Search seed and plant seeds"
                        placeholderTextColor="#666"
                        style={styles.searchInput}
                    />
                </View>

                {/* Slider */}
                <View style={styles.sliderContainer}>
                    <Swiper autoplay autoplayTimeout={3} dotColor="#ccc" activeDotColor="#0047AB" height={180}>
                        <Image source={require("../../assets/images/slider1.png")} style={styles.sliderImage} />
                        <Image source={require("../../assets/images/slider2.png")} style={styles.sliderImage} />
                        <Image source={require("../../assets/images/slider3.png")} style={styles.sliderImage} />
                        <Image source={require("../../assets/images/slider4.png")} style={styles.sliderImage} />
                    </Swiper>
                </View>

                <Text style={styles.sectionTitle}>Featured Seeds</Text>

                {/* Featured Cards */}
                <View style={styles.cardsContainer}>
                    {seeds.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.card}
                            onPress={() => {
                                setLoading(true);
                                setTimeout(() => {
                                    router.push({
                                        pathname: "/screens/VarietiesScreen",
                                        params: {
                                            name: item.name,
                                            varietiesList: JSON.stringify(item.varietiesList),
                                        },
                                    });
                                }, 700);
                            }}
                        >
                            <Image source={{ uri: item.image }} style={styles.cardImage} />
                            <View style={styles.cardContent}>
                                <Text style={styles.cardTitle}>{item.name}</Text>
                                <Text style={styles.cardSubtitle}>Varieties : {item.varieties}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </ImageBackground>
    );
}
