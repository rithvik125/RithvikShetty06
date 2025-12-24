import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../../styles/orderSummaryStyles";

const USER_URL = "https://691c2daa3aaeed735c8fd1bb.mockapi.io/GKVK";

export default function OrderSummary() {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const DELIVERY_CHARGE = 500;

  useEffect(() => {
    fetchUser();
    fetchCart();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await fetch(USER_URL);
      const data = await res.json();
      setUser(data[0]);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const fetchCart = async () => {
    const storedCart = await AsyncStorage.getItem("cart");
    setCartItems(storedCart ? JSON.parse(storedCart) : []);
  };

  const calculateTotal = () => {
    const productTotal = cartItems.reduce(
      (sum, item) => sum + Number(item.price.toString().replace(/[^0-9]/g, "")) * item.qty,
      0
    );
    return productTotal + DELIVERY_CHARGE;
  };

  const handleConfirmOrder = async () => {
    try {
      let existingOrders = JSON.parse((await AsyncStorage.getItem("orders")) || "[]");
      const orderNo = existingOrders.length + 1;

      let totalAmount = 0;
      const products = cartItems.map((item, index) => {
        const rate = Number(item.price.toString().replace(/[^0-9]/g, ""));
        const amount = rate * item.qty;
        totalAmount += amount;
        return {
          slNo: index + 1,
          crop: item.name,
          variety: item.variety || item.name,
          quantity: item.qty,
          rate,
          amount,
        };
      });

      totalAmount += DELIVERY_CHARGE;

      if (!user) return;

      const formattedDate = new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });

      const orderData = {
        orderNo,
        customerName: user.fullName,
        contact: user.mobile,
        address: user.address,
        pinCode: user.pincode,
        products,
        deliveryCharges: DELIVERY_CHARGE,
        totalAmount,
        paymentStatus: "PENDING",
        orderDate: formattedDate,
        createdAt: new Date().toISOString(),
      };

      existingOrders.push(orderData);
      await AsyncStorage.setItem("orders", JSON.stringify(existingOrders));

      router.replace({
        pathname: "/order-details",
        params: { order: JSON.stringify(orderData) },
      });
    } catch (e) {
      console.log("ORDER ERROR:", e);
    }
  };

  if (loading) return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order Summary</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* USER DETAILS */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Order Details</Text>
          {renderField("Name", user?.fullName)}
          {renderField("Phone", user?.mobile)}
          {renderField("Address", user?.address)}
          {renderField("PIN Code", user?.pincode)}
          {renderField("Order Date", new Date().toDateString())}
          {renderField("Payment Status", "Pending")}
        </View>

        {/* PRODUCTS */}
        {cartItems.map((item, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.sectionTitle}>Product {index + 1}</Text>
            {renderField("Product Name", item.name)}
            {renderField("Quantity", item.qty.toString())}
            {renderField("Rate", `₹${item.price}`)}
            {renderField(
              "Amount",
              `₹${Number(item.price.toString().replace(/[^0-9]/g, "")) * item.qty}`
            )}
          </View>
        ))}

        {/* BILL */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Bill</Text>
          {renderField("Postal + Packaging", `₹${DELIVERY_CHARGE}`)}
          <View style={styles.line} />
          {renderField("Total Amount", `₹${calculateTotal()}`, true)}
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.button} onPress={handleConfirmOrder}>
        <Text style={styles.buttonText}>Confirm Order</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

// ✨ renderField OUTSIDE component — JS format (Option A)
const renderField = (label, value, bold = false) => (
  <View style={styles.fieldContainer}>
    <Text style={[styles.fieldLabel, bold && { fontWeight: "700", fontSize: 16 }]}>{label}:</Text>
    <Text style={[styles.fieldValue, bold && { fontWeight: "700", fontSize: 16 }]}>{value}</Text>
  </View>
);
