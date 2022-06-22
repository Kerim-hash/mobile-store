import React, { useState, useContext, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import FormContainer from "../../../components/FormContainer";
import { Button, Input, Select } from "native-base";
import AuthGlobal from '../../../../Context/store/AuthGlobal'
import { useSelector } from "react-redux";
import Toast from "react-native-toast-message";
const countries = require("../../../../assets/data/countries.json");

const Checkout = (props) => {
  const context = useContext(AuthGlobal)

  const cartItems = useSelector(({ cartItems }) => cartItems);


  const [form, setForm] = useState({
    orderItems: "",
    address: "",
    address2: "",
    city: "",
    zip: "",
    country: "",
    phone: "",
    user: "",
    status: "3"
  });

  const handleChange = (name, text) => {
    setForm((prevState) => ({
      form: {
        ...prevState.form,
        [name]: text,
      },
    }));
  };


  const cartContent = Object.values(
    typeof cartItems.items === "object" &&  cartItems.items
  );


  useEffect(() => {
    const newOrder = cartContent.map((item) => {
      return {product: item.items[0],quantity: item.items.length, }
    })
    handleChange('orderItems', newOrder)
    if(context.stateUser.isAuthenticated) {
      handleChange('user', context.stateUser.user.sub)
    } else {
        props.navigation.navigate("Cart");
        Toast.show({
            topOffset: 60,
            type: "error",
            text1: "Please Login to Checkout",
            text1: "Please Login to Checkout",
        });
    }

    // return () => {
    //     setOrderItems();
    // }
}, [])


  const Checkout = () => {
      props.navigation.navigate("Payment", {order: form })
  }

  return (
      <FormContainer title={"Shipping Address"}>
        <Input
          placeholder="phone"
          name="phone"
          keyboardType={"numeric"}
          w="90%"
          size="xl"
          variant="rounded"
          value={form.phone}
          onChangeText={(text) => handleChange('phone', text)}
          mt={5}
          mb={5}
        />
        <Input
          placeholder="Shipping Address 1"
          w="90%"
          size="xl"
          variant="rounded"
          name={"ShippingAddress1"}
          value={form.ShippingAddress1}
          onChangeText={(text) => handleChange('ShippingAddress1', text)}
          mb={5}
        />
        <Input
          placeholder="Shipping Address 2"
          w="90%"
          size="xl"
          variant="rounded"
          name={"ShippingAddress2"}
          value={form.ShippingAddress2}
          onChangeText={(text) => handleChange('ShippingAddress2', text)}
            mb={5}
        />
        <Input
          placeholder="city"
          w="90%"
          size="xl"
          variant="rounded"
          name={"city"}
          value={form.city}
          onChangeText={(text) => handleChange('city', text)}
          mb={5}
        />
        <Input
          placeholder="Zip Code"
          keyboardType={"numeric"}
          w="90%"
          size="xl"
          variant="rounded"
          name={"zip"}
          value={form.zip}
          onChangeText={(text) => handleChange('zip', text)}
          mb={5}
        />
        <Select
          placeholder="Select your country"
          w="90%"
          name={"country"}
          onValueChange={(itemValue) =>  handleChange("country", itemValue)}
          value={form.country}
          mb={5}
        >
          {countries && countries?.map((c) => {
            return <Select.Item key={c.code} label={c.name} value={c.name} />;
          })}
        </Select>
        <Button onPress={() => Checkout()}>
            Confirm 
        </Button>
      </FormContainer>
  );
};

const styles = StyleSheet.create({});

export default Checkout;
