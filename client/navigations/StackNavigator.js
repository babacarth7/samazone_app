import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import React, {useContext} from "react";
import HomeScreen from "../screens/HomeScreen";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {Entypo} from "@expo/vector-icons";
import {AntDesign} from "@expo/vector-icons";
import {Ionicons} from "@expo/vector-icons";
import CartScreen from "../screens/CartScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ProductInfoScreen from "../screens/ProductInfoScreen";
import {Store} from "../utils/Store";
import CheckoutScreen from "../screens/CheckoutScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import LogoutScreen from "../screens/LogoutScreen";
import EditProfileScreen from "../screens/EditProfileScreen";
import ShippingScreen from "../screens/ShippingScreen";
import PlaceOrderScreen from "../screens/PlaceOrderScreen";
import PaymentMethodScreen from "../screens/PaymentScreen";
import OrderConfirmationScreen from "../screens/OrderConfirmationScreen";
import OrderHistoryScreen from "../screens/OrderHistoryScreen";
import AdminDashboardScreen from "../screens/AdminDashboardScreen";
import AdminOrdersScreen from "../screens/AdminOrdersScreen";
import AdminProductsScreen from "../screens/AdminProductsScreen";
import AdminUsersScreen from "../screens/AdminUsersScreen";
export default function StackNavigator() {
    const {state} = useContext(Store);
    const {cart} = state;
    const cartQuantity = cart.cartItems.length;
    const Stack = createNativeStackNavigator();
    const Tab = createBottomTabNavigator();

    function BottomTabs() {
        return (
            <Tab.Navigator>
                <Tab.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{
                        tabBarLabel: "Home",
                        tabBarLabelStyle: {color: "#008E97"},
                        headerShown: false,
                        tabBarIcon: ({focused}) => focused ? (<Entypo name="home" size={24} color="#008E97"/>) : (
                            <AntDesign name="home" size={24} color="black"/>),
                    }}
                />
                <Tab.Screen
                    name="Profile"
                    component={ProfileScreen}
                    options={{
                        tabBarLabel: "Profile",
                        tabBarLabelStyle: {color: "#008E97"},
                        headerShown: false,
                        tabBarIcon: ({focused}) =>
                            focused ? (
                                <Ionicons name="person" size={24} color="#008E97"/>
                            ) : (
                                <Ionicons name="person-outline" size={24} color="black"/>
                            ),
                    }}
                />
                <Tab.Screen
                    name="Cart"
                    component={CartScreen}
                    options={{
                        tabBarLabel: "Cart",
                        tabBarLabelStyle: {color: "#008E97"},
                        headerShown: false,
                        tabBarIcon: ({focused}) =>
                            focused ? (
                                <AntDesign name="shoppingcart" size={24} color="#008E97"/>
                            ) : (
                                <AntDesign name="shoppingcart" size={24} color="black"/>
                            ),
                        tabBarBadge: cartQuantity.toString(),
                    }}
                />
            </Tab.Navigator>
        );
    }

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Main"
                    component={BottomTabs}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="Info"
                    component={ProductInfoScreen}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="Checkout"
                    component={CheckoutScreen}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="Register"
                    component={RegisterScreen}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="Logout"
                    component={LogoutScreen}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="EditProfile"
                    component={EditProfileScreen}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="Shipping"
                    component={ShippingScreen}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="Payment"
                    component={PaymentMethodScreen}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="PlaceOrder"
                    component={PlaceOrderScreen}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="OrderConfirmation"
                    component={OrderConfirmationScreen}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="OrderHistory"
                    component={OrderHistoryScreen}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="AdminDashboard"
                    component={AdminDashboardScreen}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="AdminOrders"
                    component={AdminOrdersScreen}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="AdminProducts"
                    component={AdminProductsScreen}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="AdminUsers"
                    component={AdminUsersScreen}
                    options={{headerShown: false}}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
