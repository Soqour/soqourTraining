import { StatusBar } from "expo-status-bar";
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
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
      <ImageBackground
        style={{ width: "100%", height: "120%" }}
        source={{
          // uri: "https://www.almrsal.com/wp-content/uploads/2017/08/%D8%B5%D9%82%D8%B1-1.jpg",
          uri: "https://www.sobranews.com/wp-content/uploads/2020/12/DST_1464635_2184843_75_1_2020120823385462.jpg",
        }}
      >
        <View>
          <Pressable onPress={() => navigation.navigate("Login")}>
            <Text
              style={{
                textAlign: "right",
                marginTop: 50,
                marginRight: 200,
                color: "white",
              }}
            >
              Log in
            </Text>
          </Pressable>
        </View>
        <View style={{ width: "40%", marginTop: 200 }}>
          <Text style={styles.title}>مركز العديد لتدريب الصقور </Text>
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
              width: "65%",
              // borderWidth: 1,
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
              width: "65%",
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
            <Text style={{ color: "white" }}>بحث</Text>
          </Pressable>
        </View>
      </ImageBackground>
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
    fontSize: 50,
    color: "#fff",
  },
  body: {
    height: "30%",
    width: "35%",
    borderWidth: 2,
    marginTop: 90,
    marginLeft: 120,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    // opacity: 0.8,
  },
  input: {
    width: "70%",
    height: 30,
    // borderWidth: 1,
    backgroundColor: "#ead9c7",
  },
  button: {
    marginTop: 10,
    width: 80,
    height: 30,
    backgroundColor: "#331a00",
    justifyContent: "center",
    alignItems: "center",
  },
});
