import React, { useEffect, useReducer, useState } from "react";
import { View, Text, ScrollView, ActivityIndicator, Image, TouchableOpacity, Alert } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, order: action.payload, error: "" };
    case "FETCH_FAIL":
      return {
        ...state,
        loading: false,
        error: action.payload.message || "Something went wrong",
      };
    case "PAY_REQUEST":
      return { ...state, loadingPay: true };
    case "PAY_SUCCESS":
      return { ...state, loadingPay: false, successPay: true };
    case "PAY_FAIL":
      return { ...state, loadingPay: false, errorPay: action.payload };
    case "PAY_RESET":
      return { ...state, loadingPay: false, successPay: false, errorPay: "" };
    case "DELIVER_REQUEST":
      return { ...state, loadingDeliver: true };
    case "DELIVER_SUCCESS":
      return { ...state, loadingDeliver: false, successDeliver: true };
    case "DELIVER_FAIL":
      return { ...state, loadingDeliver: false };
    case "DELIVER_RESET":
      return {
        ...state,
        loadingDeliver: false,
        successDeliver: false,
      };
    default:
      return state;
  }
}

export default function OrderConfirmationScreen({ route }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const { orderId } = route.params;

  const [{ loading, error, order, successPay, successDeliver }, dispatch] = useReducer(reducer, {
    loading: true,
    order: {},
    error: "",
  });

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const isAdminValue = await AsyncStorage.getItem("isAdmin");
        setIsAdmin(isAdminValue === "true");
      } catch (error) {
        console.error("Error checking admin status:", error);
      }
    };

    checkAdminStatus();
  }, []);

  const fetchOrder = async () => {
    try {
      dispatch({ type: "FETCH_REQUEST" });
      const token = await AsyncStorage.getItem("token");
      const { data } = await axios.get(`http://192.168.1.111:3000/api/order/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: "FETCH_SUCCESS", payload: data });
    } catch (err) {
      dispatch({ type: "FETCH_FAIL", payload: err });
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [orderId, successPay, successDeliver]);

  const handlePay = async () => {
    try {
      dispatch({ type: "PAY_REQUEST" });
      const { data } = await axios.put(`http://192.168.1.111:3000/api/order/${orderId}/pay`);
      dispatch({ type: "PAY_SUCCESS", payload: data });
      Alert.alert("Order(s) Paid", "order(s) paid successfully");
      await fetchOrder();
    } catch (err) {
      dispatch({ type: "PAY_FAIL", payload: err });
      Alert.alert("Payment Failed", "failed to pay the order(s)");
      console.log("Payment failed", err);
    }
  };

  const handleDeliver = async () => {
    try {
      dispatch({ type: "DELIVER_REQUEST" });
      const { data } = await axios.put(`http://192.168.1.111:3000/api/order/${orderId}/deliver`);
      dispatch({ type: "DELIVER_SUCCESS", payload: data });
      Alert.alert("Order(s) Delivered", "order(s) delivered successfully");
      await fetchOrder();
    } catch (err) {
      dispatch({ type: "DELIVER_FAIL", payload: err });
      Alert.alert("Deliver Failed", "failed to deliver the order(s)");
    }
  };

  const {
    shippingAddress,
    paymentMethod,
    orderItems,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    isPaid,
    paidAt,
    isDelivered,
    deliveredAt,
  } = order;

  return (
    <ScrollView style={{ flex: 1, marginTop: 55 }}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />
      ) : error ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <Text>Error: {error}</Text>
        </View>
      ) : (
        <View style={{ padding: 20 }}>
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              marginBottom: 20,
              textAlign: "center",
            }}
          >
            Order Details
          </Text>

          {/* Shipping Address and Payment Method */}
          <View style={{ marginBottom: 20, flexDirection: "row", gap: 50 }}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>Shipping Address</Text>
              <Text>{shippingAddress.fullName}</Text>
              <Text>{shippingAddress.address}</Text>
              <Text>
                {shippingAddress.city}, {shippingAddress.postalCode}
              </Text>
              <Text>{shippingAddress.country}</Text>
              <Text style={{ fontWeight: "bold" }}>
                {isDelivered ? `Delivered at ${deliveredAt.substring(0, 10)}` : "Not delivered"}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>Payment Method</Text>
              <Text>{paymentMethod}</Text>
              <Text style={{ fontWeight: "bold" }}>{isPaid ? `Paid at ${paidAt.substring(0, 10)}` : "Not paid"}</Text>
            </View>
          </View>

          {/* Order Items and Order Summary */}
          <View style={{ marginBottom: 20, flexDirection: "row", gap: 50 }}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>Order Items</Text>
              {orderItems.map((item) => (
                <View
                  key={item._id}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 10,
                  }}
                >
                  <Image
                    source={{
                      uri: `http://192.168.1.111:3000/images/${item.image}`,
                    }}
                    style={{ width: 80, height: 80, marginRight: 10 }}
                  />
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 16, fontWeight: "bold" }}>{item.name}</Text>
                    <Text style={{ fontSize: 14 }}>Price: ${item.price}</Text>
                    <Text style={{ fontSize: 14 }}>Quantity: {item.quantity}</Text>
                  </View>
                </View>
              ))}
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>Order Summary</Text>
              <Text>Items: ${itemsPrice}</Text>
              <Text>Tax: ${taxPrice}</Text>
              <Text>Shipping: ${shippingPrice}</Text>
              <Text style={{ fontWeight: "bold" }}>TOTAL: ${totalPrice}</Text>
            </View>
          </View>
        </View>
      )}

      <View>
        {/* Pay Order button */}
        {!isAdmin && !isPaid && (
          <TouchableOpacity
            onPress={handlePay}
            style={{
              backgroundColor: "#FFC72C",
              padding: 10,
              borderRadius: 5,
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>Request Pay</Text>
          </TouchableOpacity>
        )}

        {/* Deliver Order button */}
        {isAdmin && isPaid && !isDelivered && (
          <TouchableOpacity
            onPress={handleDeliver}
            style={{
              backgroundColor: "#FFC72C",
              padding: 10,
              borderRadius: 5,
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>Deliver Order</Text>
          </TouchableOpacity>
        )}

        {/* Pay Order button (for admin) */}
        {isAdmin && !isPaid && (
          <TouchableOpacity
            onPress={handlePay}
            style={{
              backgroundColor: "#FFC72C",
              padding: 10,
              borderRadius: 5,
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>Pay Order</Text>
          </TouchableOpacity>
        )}

        {/* Order Paid Successfully button */}
        {isPaid && (
          <TouchableOpacity
            disabled={true}
            style={{
              backgroundColor: "gray",
              padding: 10,
              borderRadius: 5,
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>Order Paid Successfully</Text>
          </TouchableOpacity>
        )}

        {/* Order Delivered Successfully button */}
        {isDelivered && (
          <TouchableOpacity
            disabled={true}
            style={{
              backgroundColor: "gray",
              padding: 10,
              borderRadius: 5,
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>Order Delivered Successfully</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
}
