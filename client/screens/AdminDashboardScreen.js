import React, { useReducer, useEffect, useState } from "react";
import { Platform, Pressable, SafeAreaView, ScrollView, Text, View, Button } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../utils/config";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, summary: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

export default function AdminDashboardScreen() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [{ summary }, dispatch] = useReducer(reducer, {
    loading: true,
    summary: { salesData: [] },
    error: "",
  });
  const navigation = useNavigation();

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

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      navigation.replace("Login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const token = await AsyncStorage.getItem("token");
        const response = await axios.get(`http://${API_URL}/api/admin/summary`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        dispatch({ type: "FETCH_SUCCESS", payload: response.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err });
      }
    };

    fetchData();
  }, []);

  const handleDropdownPress = () => {
    setShowDropdown(!showDropdown);
  };

  const handleOptionPress = (option) => {
    switch (option) {
      case "Dashboard":
        navigation.navigate("AdminDashboard");
        break;
      case "Orders":
        navigation.navigate("AdminOrders");
        break;
      case "Products":
        navigation.navigate("AdminProducts");
        break;
      case "Users":
        navigation.navigate("AdminUsers");
        break;
      default:
        break;
    }
    setShowDropdown(false);
  };

  if (!isAdmin) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>You do not have permission to access this page.</Text>
        <Button title="Logout" onPress={handleLogout} />
      </View>
    );
  }

  return (
    <SafeAreaView
      style={{
        paddingTop: Platform.OS === "android" ? 40 : 0,
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            height: 38,
            backgroundColor: "white",
            borderRadius: 8,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 24,
              padding: 10,
            }}
          >
            admin
          </Text>
          <Pressable onPress={handleDropdownPress}>
            <Text style={{ padding: 15, fontWeight: "bold", color: "#008E97" }}>
              <FontAwesome5 name="bars" size={24} color="black" />
            </Text>
          </Pressable>
        </View>
        {showDropdown && (
          <View
            style={{
              backgroundColor: "white",
              position: "absolute",
              top: 38,
              right: 10,
              borderRadius: 8,
              elevation: 4,
              zIndex: 1,
            }}
          >
            {["Dashboard", "Orders", "Products", "Users"].map((option) => (
              <Pressable
                key={option}
                onPress={() => handleOptionPress(option)}
                style={{
                  padding: 10,
                  borderBottomWidth: 1,
                  borderBottomColor: "#ccc",
                }}
              >
                <Text>{option}</Text>
              </Pressable>
            ))}
          </View>
        )}

        <View>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              marginTop: 20,
              padding: 10,
            }}
          >
            Admin Dashboard
          </Text>
          <View>
            <View
              style={{
                backgroundColor: "#fff",
                padding: 20,
                borderRadius: 10,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
                marginBottom: 10,
                flexBasis: "48%",
              }}
            >
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: "bold",
                  marginBottom: 5,
                }}
              >
                ${summary?.ordersPrice}
              </Text>
              <Text>Sales</Text>
            </View>
            <View
              style={{
                backgroundColor: "#fff",
                padding: 20,
                borderRadius: 10,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
                marginBottom: 10,
                flexBasis: "48%",
              }}
            >
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: "bold",
                  marginBottom: 5,
                }}
              >
                {summary?.ordersCount}
              </Text>
              <Text>Orders</Text>
            </View>
            <View
              style={{
                backgroundColor: "#fff",
                padding: 20,
                borderRadius: 10,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
                marginBottom: 10,
                flexBasis: "48%",
              }}
            >
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: "bold",
                  marginBottom: 5,
                }}
              >
                {summary?.productsCount}
              </Text>
              <Text>Products</Text>
            </View>
            <View
              style={{
                backgroundColor: "#fff",
                padding: 20,
                borderRadius: 10,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
                marginBottom: 10,
                flexBasis: "48%",
              }}
            >
              <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 5 }}>{summary?.usersCount}</Text>
              <Text>Users</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
