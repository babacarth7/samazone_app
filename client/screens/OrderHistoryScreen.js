import React, { useEffect, useReducer, useState } from "react";
import { View, Text, ActivityIndicator, FlatList, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, orders: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

export default function OrderHistoryScreen() {
  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: true,
    orders: [],
    error: "",
  });

  const navigation = useNavigation();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get("http://192.168.1.111:3000/api/orders");

        // Retrieve user's full name from AsyncStorage
        const fullName = await AsyncStorage.getItem("fullName");

        // Filter orders based on the user's full name
        const filteredOrders = data.filter((order) => order.shippingAddress.fullName === fullName);

        dispatch({ type: "FETCH_SUCCESS", payload: filteredOrders });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }
    };
    fetchOrders().then();
  }, []);

  const renderItem = ({ item }) => (
    <View style={{ marginBottom: 10, padding: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>Order Details</Text>
      <View style={{ flexDirection: "row", marginBottom: 5 }}>
        <Text style={{ marginRight: 10, fontWeight: "bold" }}>ID:</Text>
        <Text style={{ flex: 1 }}>{item._id.substring(20, 24)}</Text>
      </View>
      <View style={{ flexDirection: "row", marginBottom: 5 }}>
        <Text style={{ marginRight: 10, fontWeight: "bold" }}>Created At:</Text>
        <Text style={{ flex: 1 }}>{item.createdAt.substring(0, 10)}</Text>
      </View>
      <View style={{ flexDirection: "row", marginBottom: 5 }}>
        <Text style={{ marginRight: 10, fontWeight: "bold" }}>Total Price:</Text>
        <Text style={{ flex: 1 }}>${item.totalPrice}</Text>
      </View>
      <View style={{ flexDirection: "row", marginBottom: 5 }}>
        <Text style={{ marginRight: 10, fontWeight: "bold" }}>Paid:</Text>
        <Text style={{ flex: 1 }}>{item.isPaid ? item.paidAt.substring(0, 10) : "Not paid"}</Text>
      </View>
      <View style={{ flexDirection: "row", marginBottom: 5 }}>
        <Text style={{ marginRight: 10, fontWeight: "bold" }}>Delivered:</Text>
        <Text style={{ flex: 1 }}>{item.isDelivered ? item.deliveredAt.substring(0, 10) : "Not delivered"}</Text>
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: "#FFC72C",
          padding: 5,
          borderRadius: 5,
          alignItems: "center",
          marginTop: 10,
        }}
        onPress={() => navigation.navigate("OrderConfirmation", { orderId: item._id })}
      >
        <Text style={{ fontSize: 14, fontWeight: "bold" }}>Detail</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView style={{ flex: 1, marginTop: 55 }}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />
      ) : error ? (
        <Text
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          Error: {error}
        </Text>
      ) : (
        <FlatList data={orders} keyExtractor={(item) => item._id} renderItem={renderItem} />
      )}
    </ScrollView>
  );
}
