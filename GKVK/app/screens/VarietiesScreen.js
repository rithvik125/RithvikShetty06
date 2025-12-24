import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../../styles/varietiesScreenStyles"; // ⬅ styles imported

export default function VarietiesScreen() {
  const router = useRouter();
  const { name, varietiesList } = useLocalSearchParams();
  const [loading, setLoading] = useState(true);

  const list = JSON.parse(
    Array.isArray(varietiesList) ? varietiesList[0] : varietiesList
  );

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const goToProduct = (item) => {
    setLoading(true);
    setTimeout(() => {
      router.push({
        pathname: "/screens/ProductDetails",
        params: {
          item: JSON.stringify(item),
          cropName: name,
          varietiesList: JSON.stringify(list),
        },
      });
    }, 300);
  };

  const goBackToHome = () => {
    setLoading(true);
    setTimeout(() => {
      router.replace("/");
    }, 300);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0047AB" />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={goBackToHome}>
          <Ionicons name="chevron-back" size={28} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Varieties</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView>
        <Text style={styles.cropName}>{name}</Text>
        <Text style={styles.varietyCount}>{list.length} varieties available</Text>

        <View style={styles.cardsContainer}>
          {list.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.card}
              onPress={() => goToProduct({ ...item, parentName: name })}
            >
              <Image
                source={{ uri: item.image || item.images?.[0] }}
                style={styles.cardImage}
              />
              <View style={styles.cardDetails}>
                <Text style={styles.cardTitle}>{`${item.name} / ${name}`}</Text>
                <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
                <Text style={styles.cardPrice}>
                  {item.price}
                  {item.pack ? ` / ${item.pack}` : ""}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
