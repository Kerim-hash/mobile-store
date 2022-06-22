import React, { useState, useEffect, useContext } from "react";
import { View, StyleSheet, Text } from "react-native";
import FormContainer from "../../components/FormContainer";
import Header from "../../components/header";
import { Button, Input, Select } from "native-base";

import AuthGlobal from '../../../Context/store/AuthGlobal'
import { loginUser } from "../../../Context/actions/Auth.actions";
import Error from "../../components/Error";

const Login = (props) => {
  const context = useContext(AuthGlobal);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  console.log(context)

   useEffect(() => {
    if (context.stateUser.isAuthenticated === true) {
      props.navigation.navigate("User Profile");
    }
  }, [context.stateUser.isAuthenticated]);

  const handleSubmit = () => {
    const user = {
      email,
      password,
    };

    if (email === "" || password === "") {
      setError("Please fill in your credentials");
    } else {
      loginUser(user, context.dispatch);
    }
  };


  return (
    <>
      <Header />
      <FormContainer title={"Login"}>
      <Input
          placeholder="email"
          name="email"
          w="90%"
          size="xl"
          variant="rounded"
          value={email}
          onChangeText={(text) => setEmail(text)}
          mt={5}
          mb={5}
        />
      <Input
          placeholder="password"
          name="password"
          w="90%"
          size="xl"
          variant="rounded"
          value={password}
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
          mt={5}
          mb={5}
        />
        <View style={styles.buttonGroup}>
        {error ? <Error message={error} /> : null}

        <Button large primary onPress={() => handleSubmit()}>
          Login
        </Button>
      </View>
      <View style={[{ marginTop: 40 }, styles.buttonGroup]}>
        <Text style={styles.middleText}>Don't have an account yet?</Text>
        <Button
        large
        secondary 
        onPress={() => props.navigation.navigate("Register")}>
          <Text style={{ color: "white" }}>Register</Text>
        </Button>
      </View>
      </FormContainer>
    </>
  );
};

const styles = StyleSheet.create({
    buttonGroup: {
      width: "80%",
      alignItems: "center",
    },
    middleText: {
      marginBottom: 20,
      alignSelf: "center",
    },
  });

export default Login;
