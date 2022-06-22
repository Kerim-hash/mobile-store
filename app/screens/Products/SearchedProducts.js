import React from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import { Pressable } from "native-base";
// import { Content, Left, Body, ListItem, Thumbnail, Text } from "native-base";

const SearchedProducts = ({ productsFiltered , navigation}) => {
  return (
    <View> 
    {Array.isArray(productsFiltered) ? (
        productsFiltered.map((item) => (
            <TouchableOpacity style={styles.container}  onPress={() => { navigation.navigate("Product Detail", {item: item})  }}>
      <View style={styles.topContainer}>
        <Image
            source={{uri: item.image ? item.image : 'https://img.icons8.com/bubbles/2x/product.png'}}
          style={styles.avatar}
        />
        <View style={styles.metaContainer}>
          <View>
            <Text style={styles.timings}>{item.name}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
       ))) : (
        <View>
        <Text style={styles.timings}>Today @ 9PM</Text>
        <Text style={styles.description}>Let's talk about avatar!</Text>
        </View>
    )}
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#0891b2',
      paddingVertical: 16,
      paddingHorizontal: 12,
      borderRadius: 5,
      alignSelf: 'center',
      width: 375,
      maxWidth: '100%',
      marginBottom: 10
    },
    timings: {
      color: '#fff',
      fontSize: '14px'
    },
    metaContainer: {
      justifyContent: 'space-between'
    },
    topContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    avatar: {
      height: 50,
      width: 50,
      borderRadius: 100
    },
    description: {
      color: 'white',
      marginTop: 5,
      fontSize: 20
    },
    button: {
      backgroundColor: '#22d3ee',
      alignSelf: 'flex-start',
      paddingHorizontal: 12,
      paddingVertical: 4,
      borderRadius: 2
    },
    buttonText: {
      fontWeight: 'bold',
      color: 'white',
      textTransform: 'uppercase',
      fontSize: 14
    }
  });

export default SearchedProducts;
