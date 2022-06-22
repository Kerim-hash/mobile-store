import React from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { ListItem, Badge, Text } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
const CategoryFilter = (props) => {
  return (
    <ScrollView
      horizontal={true}
      bounces={true}
      style={{ backfaceVisibility: "#f2f2f2",}}
    >
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          key={1}
          onPress={() => {
            props.categoryFilter("all"), props.setActive(-1);
          }}
        >
          <Badge
            colorScheme="info"
            solid="outline"
            rounded="full"
            w={90}
            style={[
              styles.center,
              { margin: 5 },
              props.active == -1 ? styles.active : styles.inactive,
            ]}
          >
            All
          </Badge>
        </TouchableOpacity>
        {props.categories.map((item) => {
          return (
            <TouchableOpacity
              key={item._id}
              onPress={() => {
                 props.categoryFilter(item._id),
                 props.setActive(props.categories.indexOf(item));
              }}
             
            >
              <Badge
                colorScheme="info"
                rounded="full"
                w={90}
                style={[
                  styles.center,
                  { margin: 5},
                  props.active == props.categories.indexOf(item)
                    ? styles.active
                    : styles.inactive,
                ]}
              >
                <Text>{item.name}</Text>
                {/* <Icon name={item.icon} /> */}
              </Badge>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  center: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    flexDirection: 'row',
    
  },
  Badge: {
    padding: 10,
  },
  active: {
    backgroundColor: "#03bafc",
  },
  inactive: {
    backgroundColor: "#a0e1eb",
  },
});

export default CategoryFilter;
