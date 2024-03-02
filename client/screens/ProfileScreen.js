import React from "react";
import { View, Text, TouchableOpacity, SafeAreaView, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ProfileScreen() {
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await axios.get("http://192.168.1.111:3000/api/auth/logout");
      Alert.alert("Logout successfully", "You can log in again");
      await AsyncStorage.removeItem("token");
      navigation.replace("Login");
    } catch (error) {
      console.error("Logout failed:", error);
      Alert.alert("Logout Failed", "Failed to logout. Please try again.");
    }
  };

  return (
    <SafeAreaView
      style={{
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
      }}
    >
      <Text style={{ fontSize: 24, fontWeight: "bold", padding: 10 }}>Profile</Text>
      <FontAwesome name="user-circle" size={128} color="black" />
      <View style={{ flexDirection: "row", marginTop: 20 }}>
        {/* Pass user information to EditProfileScreen */}
        <TouchableOpacity onPress={() => navigation.navigate("EditProfile")} style={{ marginRight: 10 }}>
          <Text style={{ color: "blue" }}>Edit Profile</Text>
        </TouchableOpacity>
        <Text style={{ color: "gray" }}>|</Text>
        <TouchableOpacity onPress={handleLogout} style={{ marginLeft: 10 }}>
          <Text style={{ color: "blue" }}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
