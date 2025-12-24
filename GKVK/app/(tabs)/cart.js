import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    FlatList,
    Image,
    TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import { styles } from "../../styles/cartStyles";   // 👈 IMPORT SEPARATE STYLES

export default function CartScreen() {
    const [cart, setCart] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteIndex, setDeleteIndex] = useState(null);

    const router = useRouter();
    const params = useLocalSearchParams();

    useFocusEffect(
        React.useCallback(() => {
            loadCart();
        }, [])
    );

    const loadCart = async () => {
        const data = await AsyncStorage.getItem("cart");
        if (data) setCart(JSON.parse(data));
    };

    const saveCart = async (updatedCart) => {
        setCart(updatedCart);
        await AsyncStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    const increaseQty = (index) => {
        let updatedCart = [...cart];
        updatedCart[index].qty += 1;
        saveCart(updatedCart);
    };

    const decreaseQty = (index) => {
        let updatedCart = [...cart];
        if (updatedCart[index].qty > 1) {
            updatedCart[index].qty -= 1;
            saveCart(updatedCart);
        }
    };

    const deleteItem = (index) => {
        setDeleteIndex(index);
        setShowDeleteModal(true);
    };

    const clearCart = () => {
        setCart([]);
        AsyncStorage.removeItem("cart");
    };

    const extractNumber = (value) => {
        const cleaned = value.replace(/[^0-9]/g, "");
        return parseFloat(cleaned);
    };

    const totalAmount = cart.reduce(
        (sum, item) => sum + extractNumber(item.price) * item.qty,
        0
    );

    return (
        <View style={{ flex: 1, backgroundColor: "#fff", paddingTop: 30 }}>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => {
                        if (params?.fromProduct === "true") router.back();
                        else router.push("/(tabs)/home");
                    }}
                >
                    <Ionicons name="chevron-back" size={28} color="#000" />
                </TouchableOpacity>

                <Text style={styles.title}>Cart</Text>
                <View style={{ width: 28 }} />
            </View>

            {cart.length === 0 ? (
                <View style={styles.emptyView}>
                    <Text style={styles.emptyText}>Your cart is empty</Text>
                </View>
            ) : (
                <>
                    <FlatList
                        data={cart}
                        keyExtractor={(_, i) => i.toString()}
                        renderItem={({ item, index }) => (
                            <View style={styles.card}>
                                <Image source={{ uri: item.image }} style={styles.image} />

                                <View style={{ flex: 1 }}>
                                    <Text style={styles.itemName}>{item.name}</Text>
                                    <Text style={styles.priceText}>{item.price}</Text>

                                    <View style={styles.qtyRow}>
                                        <TouchableOpacity onPress={() => decreaseQty(index)}>
                                            <Text style={styles.qtyBtn}>-</Text>
                                        </TouchableOpacity>

                                        <Text style={styles.qtyValue}>{item.qty}</Text>

                                        <TouchableOpacity onPress={() => increaseQty(index)}>
                                            <Text style={styles.qtyBtn}>+</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                <TouchableOpacity onPress={() => deleteItem(index)}>
                                    <Ionicons name="trash" size={28} color="#0047AB" />
                                </TouchableOpacity>
                            </View>
                        )}
                    />

                    <TouchableOpacity style={styles.addMore} onPress={() => router.push("/(tabs)/home")}>
                        <Text style={styles.addMoreText}>Add more +</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.clearCartBtn} onPress={clearCart}>
                        <Text style={styles.clearText}>Clear Cart</Text>
                    </TouchableOpacity>

                    <View style={styles.totalRow}>
                        <Text style={styles.totalLabel}>Total Amount</Text>
                        <Text style={styles.totalValue}>Rs. {totalAmount}/-</Text>
                    </View>

                    <TouchableOpacity
                        style={styles.orderBtn}
                        onPress={() =>
                            router.push(`/screens/OrderSummary?cart=${encodeURIComponent(JSON.stringify(cart))}`)
                        }
                    >
                        <Text style={styles.orderText}>Order Now</Text>
                    </TouchableOpacity>
                </>
            )}

            {showDeleteModal && (
                <View style={styles.modalOverlay}>
                    <View style={styles.modalBox}>
                        <Text style={styles.modalTitle}>Are you sure?</Text>
                        <Text style={styles.modalText}>Do you want to delete this item?</Text>

                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={styles.modalButtonYES}
                                onPress={() => {
                                    let updatedCart = cart.filter((_, i) => i !== deleteIndex);
                                    saveCart(updatedCart);
                                    setShowDeleteModal(false);
                                }}
                            >
                                <Text style={styles.btnText}>Yes</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.modalButtonNO}
                                onPress={() => setShowDeleteModal(false)}
                            >
                                <Text style={styles.btnText}>No</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            )}
        </View>
    );
}
