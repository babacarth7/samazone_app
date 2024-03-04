import React, { useEffect, useReducer, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
  Pressable,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { FontAwesome5 } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../utils/config";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, products: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

export default function AdminProductsScreen() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    loading: true,
    products: [],
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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const token = await AsyncStorage.getItem("token");
        const { data } = await axios.get(`http://${API_URL}/api/admin/products`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }
    };
    fetchProducts().then();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("Info", { product: item })}
      style={{
        backgroundColor: "#FFF",
        marginBottom: 10,
        padding: 20,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#ccc",
      }}
    >
      <Image
        source={{ uri: `http://${API_URL}/images/${item.image}` }}
        style={{
          width: "100%",
          height: 200,
          marginBottom: 10,
          borderRadius: 8,
        }}
        resizeMode="cover"
      />
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>{item.name}</Text>
      <Text>Price: ${item.price}</Text>
      <Text>Description: {item.description}</Text>
      <Text style={{ color: "#008E97", marginTop: 10, fontWeight: "bold" }}>View Details</Text>
    </TouchableOpacity>
  );

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

        <View style={{ padding: 10 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>Admin Products</Text>

          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : error ? (
            <Text style={{ color: "red" }}>{error}</Text>
          ) : (
            <FlatList data={products} renderItem={renderItem} keyExtractor={(item) => item._id} />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
