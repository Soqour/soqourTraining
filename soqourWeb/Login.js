import { StatusBar } from "expo-status-bar";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { db, auth } from "./firebase";
import {
  doc,
  query,
  getDocs,
  getDoc,
  addDoc,
  collection,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";

export default function Login({ navigation }) {
  const [loggedIn, setLoggedIn] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [signedIn, setSignedIn] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passError, setPassError] = useState("");

  const handleLogin = () => {
    if (email == "") {
      setEmailError("الرجاء ادخال الايميل");
      return;
    } else if (password == "") {
      setEmailError("");
      setPassError("الرجاء ادخال كلمة السر");
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        console.log("Logged in");
        setSignedIn(true);
        navigation.replace("AdminDashboard");
      })
      .catch((error) => {
        setPassError("");
        console.log(error.message);
        setEmailError("البريد او كلمة السر غير صحيحة");
        setSignedIn(false);
      });
  };
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  });
  return (
    <View style={styles.container}>
      <View style={{ borderBottomWidth: 2, width: "50%", paddingBottom: 30 }}>
        <Text style={styles.title}>مركز العديد لتدريب الصقور </Text>
      </View>
      <View style={{ width: "50%" }}>
        <Pressable onPress={() => navigation.navigate("Home")}>
          <Text style={{ textAlign: "right", marginTop: 20 }}>Home</Text>
        </Pressable>
      </View>
      <View style={styles.body}>
        <Text style={{ fontSize: 23, marginBottom: 20 }}>Login</Text>

        <Text style={{ color: "red" }}>
          {emailError ? emailError : passError ? passError : ""}
        </Text>

        <View
          style={{
            flexDirection: "row",
            margin: 10,
            width: "40%",
          }}
        >
          <Text style={{ width: "30%", fontSize: 19 }}>Email: </Text>

          <TextInput
            onChangeText={setEmail}
            value={email}
            style={styles.input}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            margin: 7,
            width: "40%",
          }}
        >
          <Text style={{ width: "30%", fontSize: 19 }}>Passowrd: </Text>
          <TextInput
            secureTextEntry
            onChangeText={setPassword}
            value={password}
            style={styles.input}
          />
        </View>
        <Pressable onPress={handleLogin} style={styles.button}>
          <Text>Login</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: 40,
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
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
  },
});
