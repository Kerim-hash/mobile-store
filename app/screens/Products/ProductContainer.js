import React, { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  FlatList,
  ScrollView,
  RefreshControl,
  Dimensions,
} from "react-native";
import Header from "../../components/header";
import ProductList from "./ProductList";
import { Input, Icon, Spinner, Container, Item } from "native-base";
import { EvilIcons } from "@expo/vector-icons";
import SearchedProducts from "./SearchedProducts";
import Banner from "../../components/Banner";
import CategoryFilter from "./categoryFilter";
import axios from "axios";
import baseURL from "../../../assets/common/baseUrl";
const data = require("../../../assets/data/products.json");
const ctg = require("../../../assets/data/categories.json");

var { height } = Dimensions.get("window");

const ProductContainer = (props) => {
  const [products, setProducts] = useState([]);
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [focus, setFocus] = useState();
  const [loading, setLoading] = useState(true);
  const [productsCtg, setProductsCtg] = useState([]);
  const [categories, setCategories] = useState([]);
  const [active, setActive] = useState();
  const [initialState, setInitialState] = useState([]);

  const getItem = () => {
    axios
      .get(`http://localhost:5000/api/products`)
      .then(({ data }) => {
        setProducts(data.data);
        setProductsFiltered(data.data);
        setProductsCtg(data.data);
        setInitialState(data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };
  useFocusEffect(
    useCallback(() => {
      getItem();
      axios
        .get(`http://localhost:5000/api/category`)
        .then(({ data }) => {
          setCategories(data.data);
        })
        .catch((error) => {
          console.log(error);
        });

      setFocus(false);
      setActive(-1);
      return () => {
        setProducts([]);
        setProductsFiltered([]);
        setFocus();
      };
    }, [])
  );

  const searchProduct = (text) => {
    setProductsFiltered(
      products.filter((i) => i.name.toLowerCase().includes(text.toLowerCase()))
    );
  };
  const openList = () => {
    setFocus(true);
  };

  const onBLur = () => {
    setFocus(false);
  };

  // ctg
  // Categories
  const changeCtg = (ctg) => {
    {
      ctg === "all"
        ? [setProductsCtg(initialState), setActive(true)]
        : [
            setProductsCtg(
              products.filter((i) => i.category?._id === ctg),
              setActive(true)
            ),
          ];
    }
  };

  return (
    <>
      {loading ? (
        <View style={styles.loading}>
          <Spinner color="indigo.500" size="lg" />
        </View>
      ) : (
        <>
          <Header />
          <View style={{ marginLeft: "auto", marginRight: "auto", margin: 10 }}>
            <Input
              placeholder="Search"
              onFocus={openList}
              onChangeText={(text) => searchProduct(text)}
              InputLeftElement={
                <Icon
                  as={<EvilIcons name="search" size={24} color="black" />}
                  size={5}
                  ml="2"
                  color="muted.400"
                />
              }
              InputRightElement={
                focus && (
                  <Icon
                    onPress={onBLur}
                    as={<EvilIcons name="close" size={24} color="black" />}
                    size={5}
                    ml="2"
                    color="muted.400"
                  />
                )
              }
              w="90%"
              size="xl"
              variant="rounded"
            />
          </View>
          {focus === true ? (
            <SearchedProducts
              productsFiltered={productsFiltered}
              navigation={props.navigation}
            />
          ) : (
            <ScrollView
              refreshControl={
                <RefreshControl refreshing={loading} onRefresh={getItem} />
              }
            >
              <View>
                <View>
                  <Banner />
                </View>
                <View>
                  <CategoryFilter
                    categories={categories}
                    categoryFilter={changeCtg}
                    productsCtg={productsCtg}
                    active={active}
                    setActive={setActive}
                  />
                </View>
                  {productsCtg.length > 0 ? (
                    <View style={styles.listContainer}>
                      {productsCtg.map((item, index) => {
                        return (
                          <ProductList
                            key={item.name}
                            item={item}
                            navigation={props.navigation}
                          />
                        );
                      })}
                    </View>
                  ) : (
                    <View style={[styles.center, { height: height / 2 }]}>
                      <Text>No products found</Text>
                    </View>
                  )}
              </View>
            </ScrollView>
          )}
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  listContainer: {
    // height: height,
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    flexWrap: "wrap",
    backgroundColor: "gainsboro",
  },
  container: {
    flexWrap: "wrap",
    backgroundColor: "gainsboro",
  },
  loading: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    flex: 1,
  },
});

export default ProductContainer;
