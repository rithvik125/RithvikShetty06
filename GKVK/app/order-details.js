import React, { useState } from "react";
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../styles/orderDetailsStyles"; // ⬅️ styles imported

export default function OrderDetails() {
    const router = useRouter();
    const { order } = useLocalSearchParams();
    const orderData = JSON.parse(Array.isArray(order) ? order[0] : order);

    const [showPayPopup, setShowPayPopup] = useState(false);
    const [loading, setLoading] = useState(false);

    const handlePayment = async () => {
        try {
            setLoading(true);

            const response = await fetch(
                "https://6929eb4d9d311cddf34b9f00.mockapi.io/orders",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(orderData),
                }
            );

            const savedOrder = await response.json();
            console.log("ORDER SAVED IN MOCKAPI:", savedOrder);

            await AsyncStorage.removeItem("cart");
            setShowPayPopup(false);
            router.replace("/(tabs)/home");
        } catch (error) {
            console.log("ORDER SAVE ERROR:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            {/* HEADER */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="chevron-back" size={28} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Order Details</Text>
                <View style={{ width: 28 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                {/* ORDER STATUS */}
                <View style={styles.statusCard}>
                    <View style={styles.statusTopBar}>
                        <Text style={styles.statusTopText}>Order Status</Text>
                    </View>
                    <View style={styles.statusBottom}>
                        <Text style={styles.statusPending}>PAYMENT PENDING</Text>
                    </View>
                </View>

                {/* ORDER INFORMATION */}
                <View style={styles.card}>
                    <Text style={styles.title}>Order Information</Text>
                    <View style={styles.separator} />
                    <View style={styles.row}>
                        <Text style={styles.label}>Order No:</Text>
                        <Text style={styles.value}>{orderData.orderNo}</Text>
                    </View>
                    <View style={styles.separator} />
                    <View style={styles.row}>
                        <Text style={styles.label}>Payment Status:</Text>
                        <Text style={styles.value}>PENDING</Text>
                    </View>
                </View>

                {/* BILLING & SHIPPING */}
                <View style={styles.card}>
                    <Text style={styles.title}>Billing & Shipping</Text>
                    <View style={styles.separator} />
                    <View style={styles.row}>
                        <Text style={styles.label}>Billing Name:</Text>
                        <Text style={styles.value}>{orderData.customerName}</Text>
                    </View>
                    <View style={styles.separator} />
                    <View style={styles.row}>
                        <Text style={styles.label}>Contact No.:</Text>
                        <Text style={styles.value}>{orderData.contact}</Text>
                    </View>
                    <View style={styles.separator} />
                    <View style={styles.row}>
                        <Text style={styles.label}>Shipping Address:</Text>
                        <Text style={styles.value}>{orderData.address}</Text>
                    </View>
                    <View style={styles.separator} />
                    <View style={styles.row}>
                        <Text style={styles.label}>PIN Code:</Text>
                        <Text style={styles.value}>{orderData.pinCode}</Text>
                    </View>
                </View>

                {/* PRODUCT TABLE */}
                <View style={styles.card}>
                    <Text style={styles.title}>Products Ordered</Text>
                    <View style={styles.separator} />
                    <ScrollView horizontal>
                        <View>
                            <View style={styles.productHeader}>
                                <Text style={styles.cellHead}>Sl.No.</Text>
                                <Text style={styles.cellHead}>Crop</Text>
                                <Text style={styles.cellHead}>Variety</Text>
                                <Text style={styles.cellHead}>Quantity</Text>
                                <Text style={styles.cellHead}>Rate</Text>
                                <Text style={styles.cellHead}>Amount</Text>
                            </View>

                            {orderData.products.map((item, index) => (
                                <View key={index} style={styles.productRow}>
                                    <Text style={styles.cell}>{item.slNo}</Text>
                                    <Text style={styles.cell}>{item.crop}</Text>
                                    <Text style={styles.cell}>{item.variety}</Text>
                                    <Text style={styles.cell}>{item.quantity}</Text>
                                    <Text style={styles.cell}>₹{item.rate}</Text>
                                    <Text style={styles.cell}>₹{item.amount}</Text>
                                </View>
                            ))}
                        </View>
                    </ScrollView>
                </View>

                {/* TOTAL */}
                <View style={styles.card}>
                    <Text style={styles.title}>Charges</Text>
                    <View style={styles.separator} />
                    <View style={styles.row}>
                        <Text style={styles.label}>Postal & Packaging:</Text>
                        <Text style={styles.value}>₹{orderData.deliveryCharges}/-</Text>
                    </View>
                    <View style={styles.totalBox}>
                        <Text style={styles.totalLabel}>Total Amount:</Text>
                        <Text style={styles.totalValue}>₹{orderData.totalAmount}/-</Text>
                    </View>
                </View>
            </ScrollView>

            {/* PAY BUTTON */}
            <TouchableOpacity style={styles.payBtn} onPress={() => setShowPayPopup(true)}>
                <Text style={styles.payText}>Pay ₹{orderData.totalAmount}/-</Text>
            </TouchableOpacity>

            {/* CONFIRM POPUP */}
            {showPayPopup && (
                <View style={styles.popupOverlay}>
                    <View style={styles.popupBox}>
                        <Text style={styles.popupTitle}>Confirm Payment</Text>
                        <Text style={styles.popupMsg}>You are about to pay ₹{orderData.totalAmount}/-.</Text>
                        <Text style={styles.popupMsg}>Order: {orderData.orderNo}</Text>
                        <Text style={styles.popupMsg}>Customer: {orderData.customerName}</Text>
                        <Text style={styles.popupMsg}>Contact: {orderData.contact}</Text>
                        <Text style={[styles.popupMsg, { marginTop: 8 }]}>Proceed with payment?</Text>

                        <View style={styles.popupBtnRow}>
                            <TouchableOpacity style={styles.cancelBtn} onPress={() => setShowPayPopup(false)}>
                                <Text style={styles.cancelBtnText}>Cancel</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.payNowBtn} onPress={handlePayment}>
                                <Text style={styles.payNowText}>Pay Now</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            )}

            {/* LOADER */}
            {loading && (
                <View style={styles.loaderOverlay}>
                    <View style={styles.loaderBox}>
                        <ActivityIndicator size="large" color="#0047FF" />
                        <Text style={{ marginTop: 10, fontSize: 16, fontWeight: "600" }}>
                            Processing Payment...
                        </Text>
                    </View>
                </View>
            )}
        </SafeAreaView>
    );
}
