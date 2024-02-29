// Import necessary dependencies
import React from "react";
import { View, Button, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

export default function LogoutScreen() {
  const navigation = useNavigation();
  const handleLogout = async () => {
    try {
      await axios.get("http://192.168.1.18:3000/api/auth/logout");
      Alert.alert("Logout successfully", "You can log in again")
      await AsyncStorage.removeItem("token");
      navigation.replace("Login");
    } catch (error) {
      console.error("Logout failed:", error);
      Alert.alert("Logout Failed", "Failed to logout. Please try again.");
    }
  };


  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

