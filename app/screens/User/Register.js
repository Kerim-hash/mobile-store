import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import FormContainer from "../../components/FormContainer";
import { Button, Input, Select } from "native-base";
import Header from "../../components/header";
import baseURL from "../../../assets/common/baseUrl";
import Toast from "react-native-toast-message";
import axios from 'axios';

const Register = (props) => {

  const [form, setForm] = useState({
    email: "",
    name: "",
    phone: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (name, text) => {
    setForm((prevState) => ({
      form: {
        ...prevState.form,
        [name]: text,
      },
    }));
  };

  const register = () => {
    if (form.email === "" || form.name === "" || form.phone === "" || form.password === "") {
      setError("Please fill in the form correctly");
    }

    let user = {
      name: form.form.name,
      email: form.form.email,
      password: form.form.password,
      phone: form.form.phone,
      isAdmin: false,
    };

    axios
      .post(`${baseURL}users/`, user)
      .then((res) => {
        if (res.status == 201) {
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "Registration Succeeded",
            text2: "Please Login into your account",
          });
          setTimeout(() => {
            props.navigation.navigate("Login");
          }, 500);
        }
      })
      .catch((error) => {
        Toast.show({
          topOffset: 60,
          type: "error",
          text1: error.message,
          text2: "Please try again",
        });
        console.log(error)
      });
  };


  return (
    <View style={styles.container}>
      {/* <Header /> */}
      <FormContainer title={"Register"}>
        <Input
          placeholder="email"
          name="email"
          w="90%"
          size="xl"
          variant="rounded"
          value={form.email}
          onChangeText={(text) => handleChange("email", text)}
          mt={5}
          mb={5}
        />
        <Input
          placeholder="name"
          name="name"
          w="90%"
          size="xl"
          variant="rounded"
          value={form.name}
          onChangeText={(text) => handleChange("name", text)}
          mt={5}
          mb={5}
        />
        <Input
          placeholder="phone"
          name="phone"
          w="90%"
          size="xl"
          variant="rounded"
          keyboardType={"numeric"}
          value={form.phone}
          onChangeText={(text) => handleChange("phone", text)}
          mt={5}
          mb={5}
        />
        <Input
          placeholder="password"
          name="password"
          w="90%"
          size="xl"
          variant="rounded"
          secureTextEntry={true}
          value={form.password}
          onChangeText={(text) => handleChange("password", text)}
          mt={5}
          mb={5}
        />
        <View style={styles.buttonGroup}>
          <Button large primary onPress={() => register()}>
            <Text style={{ color: "white" }}>Register</Text>
          </Button>
        </View>
        <View>
          <Button
            large
            secondary
            onPress={() => props.navigation.navigate("Login")}
          >
            <Text style={{ color: "white" }}>Back to Login</Text>
          </Button>
        </View>
      </FormContainer>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    buttonGroup: {
        width: "80%",
        margin: 10,
        alignItems: "center",
      },
});

export default Register;
