import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { myOrdersStyles as styles } from "../../styles/myOrdersStyles";

export default function MyOrders() {
    const router = useRouter();
    const [orders, setOrders] = useState([]);

    const fetchOrders = async () => {
        try {
            const response = await fetch("https://6929eb4d9d311cddf34b9f00.mockapi.io/orders");
            const data = await response.json();

            // sort newest to oldest
            const sorted = data.sort((a, b) => Number(b.id) - Number(a.id));
            setOrders(sorted);
        } catch (e) {
            console.log("FETCH ORDER ERROR:", e);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="chevron-back" size={28} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>My Orders</Text>
                <View style={{ width: 28 }} />
            </View>

            {orders.length === 0 ? (
                <Text style={styles.empty}>No orders found</Text>
            ) : (
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <View style={{ width: 1050 }}>
                        {/* Table Header */}
                        <View style={styles.tableHeader}>
                            <Text style={styles.th}>Sl.No</Text>
                            <Text style={styles.th}>Order No.</Text>
                            <Text style={styles.th}>Date</Text>
                            <Text style={styles.th}>Name</Text>
                            <Text style={styles.th}>Order Amount</Text>
                            <Text style={styles.th}>Order Status</Text>
                            <Text style={styles.th}>Remarks</Text>
                        </View>

                        {/* Table Rows */}
                        {orders.map((item, index) => (
                            <View key={index} style={styles.tableRow}>
                                <Text style={styles.td}>{index + 1}</Text>

                                <TouchableOpacity
                                    onPress={() =>
                                        router.push({
                                            pathname: "/order-details",
                                            params: { order: JSON.stringify(item) },
                                        })
                                    }
                                >
                                    <Text style={[styles.td, styles.orderNo]}>{item.orderNo}</Text>
                                </TouchableOpacity>

                                <Text style={styles.td}>{item.orderDate}</Text>
                                <Text style={styles.td}>{item.customerName}</Text>
                                <Text style={styles.td}>₹{item.totalAmount}/-</Text>
                                <Text style={[styles.td, styles.status]}>{item.paymentStatus}</Text>
                                <Text style={styles.td}>-</Text>
                            </View>
                        ))}
                    </View>
                </ScrollView>
            )}
        </SafeAreaView>
    );
}
