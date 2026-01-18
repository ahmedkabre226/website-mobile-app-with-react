import { Image } from "expo-image";
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";

import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

// Mock product data for electronic devices and smartphones
const products = [
  {
    id: "1",
    name: "iPhone 15",
    price: "$s",
    image: require("@/assets/images/iphone15.jpg"), // Placeholder image
  },
  {
    id: "2",
    name: "Samsung Galaxy S24",
    price: "$",
    image: require("@/assets/images/SamsungGalaxyS24.jpg"), // Placeholder image
  },
  {
    id: "3",
    name: "MacBook Air M3",
    price: "$",
    image: require("@/assets/images/MacBookAirM3.jpg"), // Placeholder image
  },
  {
    id: "4",
    name: "Google Pixel 8",
    price: "$",
    image: require("@/assets/images/GooglePixel8.jpg"), // Placeholder image
  },
  {
    id: "5",
    name: "Dell XPS 13",
    price: "$",
    image: require("@/assets/images/DellXPS13.jpg"), // Placeholder image
  },
  {
    id: "6",
    name: "OnePlus 12",
    price: "$",
    image: require("@/assets/images/OnePlus12.jpg"), // Placeholder image
  },
];

export default function HomeScreen() {
  const renderProduct = ({ item }: { item: (typeof products)[0] }) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => alert(`Buy ${item.name}`)}
    >
      <Image
        source={item.image}
        style={styles.productImage}
        contentFit="contain"
      />
      <ThemedText type="subtitle" style={styles.productName}>
        {item.name}
      </ThemedText>
      <ThemedText type="defaultSemiBold" style={styles.productPrice}>
        {item.price}
      </ThemedText>
      <TouchableOpacity
        style={styles.buyButton}
        onPress={() => alert(`Added ${item.name} to cart`)}
      >
        <ThemedText style={styles.buyButtonText}>Buy Now</ThemedText>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title"></ThemedText>
        <ThemedText type="subtitle"></ThemedText>
      </ThemedView>
      <ThemedView style={styles.productsContainer}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Featured Products
        </ThemedText>
        <FlatList
          data={products}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.productList}
        />
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    alignItems: "center",
    gap: 8,
    paddingVertical: 20,
  },
  productsContainer: {
    paddingHorizontal: 16,
  },
  sectionTitle: {
    marginBottom: 16,
    textAlign: "center",
  },
  productList: {
    paddingBottom: 20,
  },
  productCard: {
    flex: 1,
    margin: 8,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productImage: {
    width: 100,
    height: 100,
    marginBottom: 8,
  },
  productName: {
    textAlign: "center",
    marginBottom: 4,
  },
  productPrice: {
    textAlign: "center",
    marginBottom: 8,
    color: "#007bff",
  },
  buyButton: {
    backgroundColor: "#007bff",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  buyButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
