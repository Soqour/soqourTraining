import { StatusBar } from "expo-status-bar";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={{ borderBottomWidth: 2, width: "50%", paddingBottom: 30 }}>
        <Text style={styles.title}>مركز العديد لتدريب الصقور </Text>
      </View>
      <View style={{ width: "50%" }}>
        <Pressable onPress={() => navigation.navigate("Login")}>
          <Text style={{ textAlign: "right", marginTop: 20 }}>Log in</Text>
        </Pressable>
      </View>
      <View style={styles.body}>
        <Text style={{ fontSize: 23, marginBottom: 20 }}>
          الرجاء ادخال رقم الطير والرقم الشخصي
        </Text>
        <View
          style={{
            flexDirection: "row-reverse",
            margin: 10,
            width: "40%",
          }}
        >
          <Text style={{ width: "30%", fontSize: 19 }}>رقم الطير: </Text>
          <TextInput style={styles.input} />
        </View>
        <View
          style={{
            flexDirection: "row-reverse",
            margin: 7,
            width: "40%",
          }}
        >
          <Text style={{ width: "30%", fontSize: 19 }}>رقم الشخصي: </Text>
          <TextInput style={styles.input} />
        </View>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate("UserHome")}
        >
          <Text>بحث</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    backgroundColor: "#fff",
    alignItems: "center",
    // justifyContent: "center",
  },
  title: {
    fontSize: 25,
  },
  body: {
    height: "50%",
    width: "60%",
    // borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: "70%",
    height: 30,
    // borderWidth: 1,
    backgroundColor: "lightgrey",
  },
  button: {
    marginTop: 10,
    width: 80,
    height: 30,
    backgroundColor: "lightblue",
    justifyContent: "center",
    alignItems: "center",
  },
});
