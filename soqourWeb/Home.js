import { StatusBar } from "expo-status-bar";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { db } from "./firebase";
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
import { useEffect, useState } from "react";
export default function Home({ navigation }) {
  useEffect(() => {
    readAllWhere();
  }, []);

  const [users, setUsers] = useState([]);
  const [soqours, setSoqours] = useState([]);

  const [qId, setQId] = useState("");
  const [falconId, setFalconId] = useState("");
  const [idError, setIdError] = useState(false);
  const [falconError, setFalconError] = useState(false);

  const readAllWhere = async () => {
    const collectionRef = collection(db, "users");
    const q = query(collectionRef);
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      console.log("snapshot");
      setUsers(querySnapshot.docs.map((doc) => doc.data()));
    });

    return () => unsubscribe();
  };

  const findId = () => {
    // console.log("id ==", qId);
    const res = users.find((x) => x.qId == qId);
    res ? findFalcon() : setIdError(true);
    console.log(res);
  };

  const findFalcon = async () => {
    setIdError(false);
    const collectionRef = collection(db, "users", qId, "soqour");
    const q = query(collectionRef);
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      console.log("snapshot");
      querySnapshot.docs.map((doc) => console.log(doc.data()));
      setSoqours(querySnapshot.docs.map((doc) => doc.data()));
    });

    const res2 = soqours && soqours.find((x) => x.id == falconId);
    res2 ? go() : setFalconError(true);

    console.log("falcon looking", res2);
    return () => unsubscribe();
  };

  const go = () => {
    setFalconError(false);
    navigation.navigate("UserHome", { qId: qId, falconId: falconId });
  };
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

        {idError ? (
          <Text style={{ color: "red" }}>الرقم الشخصي غير صحيح</Text>
        ) : null}

        <View
          style={{
            flexDirection: "row-reverse",
            margin: 7,
            width: "40%",
          }}
        >
          <Text style={{ width: "30%", fontSize: 19 }}>رقم الشخصي: </Text>
          <TextInput onChangeText={setQId} value={qId} style={styles.input} />
        </View>

        {falconError ? (
          <Text style={{ color: "red" }}>الرقم غير صحيح</Text>
        ) : null}

        <View
          style={{
            flexDirection: "row-reverse",
            margin: 10,
            width: "40%",
          }}
        >
          <Text style={{ width: "30%", fontSize: 19 }}>رقم الطير: </Text>
          <TextInput
            value={falconId}
            onChangeText={setFalconId}
            style={styles.input}
          />
        </View>
        <Pressable
          style={styles.button}
          // onPress={() => navigation.navigate("UserHome")}
          onPress={findId}
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
