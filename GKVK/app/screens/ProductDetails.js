import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";
import LoginRequiredModal from "../../components/LoginRequiredModal";
import styles from "../../styles/productDetailsStyles";

export default function ProductDetails() {
  const { item, cropName, varietiesList } = useLocalSearchParams();
  const router = useRouter();
  const seed = item ? JSON.parse(item) : {};

  const images = seed.images || (seed.image ? [seed.image] : []);
  const [selectedImage, setSelectedImage] = useState(images[0] || "");
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  useEffect(() => {
    const checkCart = async () => {
      const data = await AsyncStorage.getItem("cart");
      const cart = data ? JSON.parse(data) : [];
      setAdded(cart.some((c) => c.name === seed.name));
    };
    checkCart();
  }, []);

  const handleAddToCart = async () => {
    const user = await AsyncStorage.getItem("userData");
    if (!user) {
      setShowLoginPopup(true);
      return;
    }

    const saved = await AsyncStorage.getItem("cart");
    let cart = saved ? JSON.parse(saved) : [];
    const index = cart.findIndex((x) => x.name === seed.name);

    if (index !== -1) cart[index].qty += qty;
    else cart.push({ name: seed.name, image: selectedImage, price: seed.price, qty });

    await AsyncStorage.setItem("cart", JSON.stringify(cart));
    setAdded(true);
  };

  const goBackToVarieties = () => {
    router.push({
      pathname: "/screens/VarietiesScreen",
      params: { name: cropName, varietiesList: varietiesList },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Global login popup */}
      <LoginRequiredModal
        visible={showLoginPopup}
        onClose={() => setShowLoginPopup(false)}
        from="addToCart"
      />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={goBackToVarieties}>
          <Ionicons name="chevron-back" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{cropName || "Product Details"}</Text>
        <Ionicons name="share-social-outline" size={24} color="#000" />
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: added ? 110 : 20 }}>
        {images.length > 1 ? (
          <Swiper
            style={styles.swiper}
            loop={false}
            autoplay={false}
            dotStyle={styles.dot}
            activeDotStyle={styles.activeDot}
            onIndexChanged={(i) => setSelectedImage(images[i])}
          >
            {images.map((img, index) => (
              <Image key={index} source={{ uri: img }} style={styles.mainImage} />
            ))}
          </Swiper>
        ) : (
          <Image source={{ uri: selectedImage }} style={styles.mainImage} />
        )}

        <View style={styles.thumbnailContainer}>
          {images.map((img, index) => (
            <TouchableOpacity key={index} onPress={() => setSelectedImage(img)}>
              <Image
                source={{ uri: img }}
                style={[styles.thumbnail, img === selectedImage && styles.selectedThumbnail]}
              />
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.productName}>{seed.name}</Text>
        <Text style={styles.priceText}>
          {seed.price} {seed.pack ? `/ ${seed.pack}` : ""}
        </Text>

        <View style={styles.detailsContainer}>
          <Text style={styles.sectionTitle}>Description:</Text>
          <Text style={styles.sectionContent}>
            {seed.description || "No description available."}
          </Text>

          <Text style={styles.sectionTitle}>Recommended Month(s):</Text>
          {seed.recommendedMonths?.length > 0 ? (
            <View style={styles.monthsTagContainer}>
              {seed.recommendedMonths.map((month, index) => (
                <View key={index} style={styles.monthTag}>
                  <Text style={styles.monthText}>{month}</Text>
                </View>
              ))}
            </View>
          ) : (
            <Text style={styles.sectionContent}>No recommended months</Text>
          )}

          <View style={styles.rowContainer}>
            <View style={styles.qtyContainer}>
              <TouchableOpacity onPress={() => qty > 1 && setQty(qty - 1)}>
                <Text style={styles.qtyBtn}>-</Text>
              </TouchableOpacity>
              <Text style={styles.qtyValue}>{qty}</Text>
              <TouchableOpacity onPress={() => setQty(qty + 1)}>
                <Text style={styles.qtyBtn}>+</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[styles.addCartBtn, added && styles.addedToCartBtn]}
              onPress={!added ? handleAddToCart : undefined}
            >
              <Text style={[styles.addCartText, added && styles.addedCartText]}>
                {added ? "Added to Cart" : "Add to Cart"}
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.stockText}>
            Available Stock: {seed.stock || "Not Available"}
          </Text>

          <View style={styles.blueBox}>
            <Text style={styles.blueBoxText}>
              {seed.pack} ({seed.price}/Packs)
            </Text>
          </View>

          {seed.recommendedStates && (
            <View style={{ marginTop: 18 }}>
              <Text style={styles.sectionTitle}>Recommended States</Text>
              {(Array.isArray(seed.recommendedStates)
                ? seed.recommendedStates
                : seed.recommendedStates.split(",")
              ).map((state, index) => (
                <Text key={index} style={styles.stateText}>
                  {index + 1}. {state.trim()}
                </Text>
              ))}
            </View>
          )}
        </View>
      </ScrollView>

      {added && (
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={styles.bottomCartBtn}
            onPress={() => router.push("/cart")}
          >
            <Text style={styles.bottomCartText}>View Cart →</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}
