import React, {useEffect, useState} from "react";
import {
    Platform,
    Pressable,
    SafeAreaView,
    ScrollView,
    Text,
    View,
} from "react-native";
import ProductItem from "../components/ProductItem";
import {useNavigation} from "@react-navigation/native";
import {SliderBox} from "react-native-image-slider-box";
import {FontAwesome5} from "@expo/vector-icons";
import axios from "axios";

export default function HomeScreen() {
    const navigation = useNavigation();
    const images = [
        require("../assets/banner1.jpg"),
        require("../assets/banner2.jpg"),
    ];
    const [showDropdown, setShowDropdown] = useState(false);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(
                    "http://192.168.1.18:3000/api/products"
                );
                console.log("Products:", JSON.stringify(response.data));
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProducts().then();
    }, []);

    const handleDropdownPress = () => {
        setShowDropdown(!showDropdown);
    };

    const handleOptionPress = (option) => {
        switch (option) {
            case "Login":
                navigation.navigate("Login");
                break;
            case "Admin Dashboard":
                navigation.navigate("AdminDashboard");
                break;
            case "Order History":
                navigation.navigate("OrderHistory");
                break;
            case "Logout":
                navigation.navigate("Logout");
                break;
            default:
                break;
        }
        setShowDropdown(false);
    };

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
                        samazone
                    </Text>
                    <Pressable onPress={handleDropdownPress}>
                        <Text style={{padding: 15, fontWeight: "bold", color: "#008E97"}}>
                            <FontAwesome5 name="bars" size={24} color="black"/>
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
                        {["Login", "Admin Dashboard", "Order History", "Logout"].map(
                            (option) => (
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
                            )
                        )}
                    </View>
                )}
                <View style={{marginVertical: 10, borderRadius: 20}}>
                    <SliderBox
                        images={images}
                        autoplay
                        circleLoop
                        dotColor={"#13274F"}
                        inactiveDotColor={"#90A4AE"}
                        ImageComponentStyle={{
                            width: 400,
                            borderRadius: 20,
                            marginVertical: 10,
                        }}
                    />
                </View>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: 10,
                    }}
                >
                    {products.map((product) => (
                        <Pressable
                            key={product.slug}
                            onPress={() => navigation.navigate("Info", {product})}
                        >
                            <ProductItem product={product}></ProductItem>
                        </Pressable>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
