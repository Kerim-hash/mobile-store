import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"
import Products from '../screens/Admin/Products';
import Categories from '../screens/Admin/Categories';
import ProductForm from '../screens/Admin/ProductForm';
import Orders from '../screens/Admin/Order';

const Stack = createStackNavigator();

function MyStack() {
    return(
        <Stack.Navigator>
            <Stack.Screen 
                name="Products"
                component={Products}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen name="Categories" component={Categories} />
            <Stack.Screen name="Orders" component={Orders} />
            <Stack.Screen name="ProductForm" component={ProductForm} />
        </Stack.Navigator>
    )
}

export default function CartNavigator() {
    return <MyStack />
}