import { StyleSheet, Text, View } from "react-native";

interface DetailScreenProps {}

const DetailScreen: React.FC<DetailScreenProps> = () => {
  return (
    <View style={styles.screenContainer}>
      <Text>DetailScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: { flex: 1 },
});

export default DetailScreen;
