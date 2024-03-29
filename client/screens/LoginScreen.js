import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../utils/config";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          navigation.replace("Main");
        }
      } catch (err) {
        console.log("Error message", err);
      }
    };
    checkLoginStatus().then();
  }, []);

  const handleLogin = async () => {
    try {
      setLoading(true);
      const user = {
        email: email,
        password: password,
      };

      const response = await axios.post(`http://${API_URL}/api/auth/login`, user);
      const { token, isAdmin } = response.data;

      await AsyncStorage.setItem("token", token);
      await AsyncStorage.setItem("isAdmin", isAdmin ? "true" : "false");

      if (isAdmin) {
        navigation.replace("AdminDashboard");
      } else {
        navigation.replace("Main");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          Alert.alert("Login Error", "Invalid Email or Password");
        } else {
          Alert.alert("Login Error", "An error occurred. Please try again later.");
        }
      } else if (error.request) {
        Alert.alert("Network Error", "Could not connect to the server. Please check your internet connection.");
      } else {
        Alert.alert("Error", "An unexpected error occurred.");
      }
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>Login</Text>
      <View style={{ marginBottom: 10, width: "100%" }}>
        <TextInput
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholder="Email"
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 5,
            padding: 10,
            marginBottom: 5,
          }}
        />
      </View>

      <View style={{ marginBottom: 10, width: "100%" }}>
        <TextInput
          value={password}
          onChangeText={(text) => setPassword(text)}
          placeholder="Password"
          secureTextEntry
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 5,
            padding: 10,
            marginBottom: 5,
          }}
        />
      </View>

      <TouchableOpacity
        onPress={handleLogin}
        style={{
          backgroundColor: "#FEBE10",
          width: "100%",
          borderRadius: 6,
          marginLeft: "auto",
          marginRight: "auto",
          padding: 15,
          opacity: loading ? 0.5 : 1,
        }}
        disabled={loading}
        title="Login"
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text
            style={{
              textAlign: "center",
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            Login
          </Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Register")} style={{ marginTop: 20 }}>
        <Text style={{ color: "blue" }}>Don't have an account? Register</Text>
      </TouchableOpacity>
    </View>
  );
}
