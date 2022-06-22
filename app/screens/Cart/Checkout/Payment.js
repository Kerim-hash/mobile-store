import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Text,  Select, Button } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";

const methods = [
  { name: "Cash on Delivery", value: 1 },
  { name: "Bank Transfer", value: 2 },
  { name: "Card Payment", value: 3 },
];

const paymentCards = [
  { name: "Wallet", value: 1 },
  { name: "Visa", value: 2 },
  { name: "MasterCard", value: 3 },
  { name: "Other", value: 4 },
];

const Payment = (props) => {
  const order = props.route.params;

  const [selected, setSelected] = useState();
  const [card, setCard] = useState();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose your payment method</Text>
      <View>
        {methods.map((item) => {
          return (
            <TouchableOpacity
              style={styles.selected}
              key={item.name}
              onPress={() => setSelected(item.value)}
            >
              <View>
                <Text style={styles.selectedText}>{item.name}</Text>
              </View>
              <View>
               {selected === item.value && <Icon name="check" color="white" size={23}/>}
              </View>
            </TouchableOpacity>
          );
        })}
        {selected == 3 ? (
          <Select placeholder="choose a payment system" selectedValue={card} onValueChange={(x) => setCard(x)}>
            {paymentCards.map((c, index) => {
              return <Select.Item key={c.name} label={c.name} value={c.name} />;
            })}
          </Select>
        ) : null}
        <View style={{ marginTop: 60, alignSelf: "center" }}>
          <Button
            onPress={() => props.navigation.navigate("Confirm", { order })}
          >  Confirm</Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
    paddingTop: 20,
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: 270,
    marginBottom: 20,
  },
  selected: {
    backgroundColor: "#778899",
    padding: 10,
    marginBottom: 10,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  selectedText: {
    color: "#fff",
    fontSize: 19
  },
  container: {
      padding: 20
  }
});

export default Payment;
