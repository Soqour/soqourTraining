import { StatusBar } from "expo-status-bar";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
} from "react-native";
import { DataTable } from "react-native-paper";
import { db } from "./firebase";
export default function UserHome({ route, navigation }) {
  // const { qId, falconId } = route.params;
  const qId = "29812345678";
  const falconId = "600123";
  console.log(qId, "and ", falconId);

  const [user, setUser] = useState({});
  const [falcon, setFalcon] = useState({});
  const [treatments, setTreatments] = useState([]);
  const [training, setTraining] = useState([]);

  useEffect(() => {
    readUser();
    readFalcon();
    readTraining();
    readTreatments();
  }, []);
  const readUser = async () => {
    const docRef = doc(db, "users", qId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setUser(docSnap.data());
    } else {
      console.log("No such document!");
    }
  };

  const readFalcon = async () => {
    console.log("falconnnnnn");
    const docRef = doc(db, "users", qId, "soqour", falconId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Falcon data:", docSnap.data());
      setFalcon(docSnap.data());
    } else {
      console.log("No such document!");
    }
  };

  //Training
  const readTraining = async () => {
    const q = query(
      collection(db, "users", qId, "soqour", falconId, "training")
    );
    let temp = [];
    const docs = await getDocs(q);
    docs.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });
  };
  //Treatments
  const readTreatments = async () => {
    const q = query(
      collection(db, "users", qId, "soqour", falconId, "treatments")
    );
    const docs = await getDocs(q);
    docs.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });
  };
  return (
    <View style={styles.container}>
      {/* -------Top---------- */}
      <View
        style={{
          borderBottomWidth: 2,
          width: "100%",
          flexDirection: "row-reverse",
          justifyContent: "space-between",
        }}
      >
        <Image
          style={{ width: 100, height: 100, marginRight: 30 }}
          source={{
            uri: "https://c0.klipartz.com/pngpicture/738/452/gratis-png-logotipo-del-aguila-calva-halcon.png",
          }}
        />
        <View style={{ width: "80%" }}>
          <Text style={styles.title}>مركز العديد لتدريب الصقور </Text>
        </View>

        <Pressable
          onPress={() => navigation.navigate("Home")}
          style={{ flexDirection: "row-reverse", margin: 30 }}
        >
          <Text style={{ width: 30, marginHorizontal: 5 }}>تسجيل خروج</Text>
          <Image
            style={{ width: 30, height: 30 }}
            source={require("./assets/log-out.png")}
          />
        </Pressable>
      </View>

      <View
        style={{
          width: "60%",
          padding: 20,
          paddingBottom: 70,
        }}
      >
        <View style={{ flexDirection: "row-reverse", marginBottom: 15 }}>
          <Image
            style={{
              width: 50,
              height: 50,
              marginLeft: 15,
              marginTop: 15,
            }}
            source={require("./assets/owner.png")}
          />
          <Text style={styles.bold}>المالك</Text>
        </View>

        <View style={{ marginTop: 9, flexDirection: "row-reverse" }}>
          <View
            style={{
              width: "45%",
              flexDirection: "row-reverse",
            }}
          >
            <Text style={{ width: "15%", fontSize: 19 }}>الاسم</Text>
            <TextInput value={user.name} style={styles.input} readOnly />
          </View>

          <View
            style={{
              width: "55%",
              flexDirection: "row-reverse",
            }}
          >
            <Text style={{ width: "30%", fontSize: 19 }}>الرقم الشخصي</Text>
            <TextInput value={user.qId} style={styles.input} readOnly />
          </View>
        </View>

        <Text style={styles.bold}>معلومات الاتصال</Text>
        <View
          style={{
            marginTop: 9,
            flexDirection: "row-reverse",
          }}
        >
          <View
            style={{
              width: "55%",
              flexDirection: "row-reverse",
            }}
          >
            <Text style={{ width: "30%", fontSize: 19 }}>رقم الجوال</Text>
            <TextInput value={user.phone} style={styles.input} />
          </View>
        </View>

        <View style={styles.border}></View>

        <View style={{ flexDirection: "row-reverse", marginBottom: 15 }}>
          <Image
            style={{
              width: 50,
              height: 50,
              marginLeft: 15,
              marginTop: 15,
            }}
            source={require("./assets/date.png")}
          />
          <Text style={styles.bold}>فترة الاقامة</Text>
        </View>
        <View style={{ marginTop: 9, flexDirection: "row-reverse" }}>
          <View
            style={{
              width: "45%",
              flexDirection: "row-reverse",
            }}
          >
            <Text style={{ width: "30%", fontSize: 19 }}>تاريخ الدخول</Text>
            <TextInput value={falcon.entryDate} style={styles.input} />
          </View>
          <View
            style={{
              width: "55%",
              flexDirection: "row-reverse",
            }}
          >
            <Text style={{ width: "30%", fontSize: 19 }}>تاريخ الخروج </Text>
            <TextInput value={falcon.exitDate} style={styles.input} />
          </View>
        </View>

        <View
          style={{
            width: "55%",
            flexDirection: "row-reverse",
            marginTop: 40,
            alignContent: "center",
            marginHorizontal: 120,
          }}
        >
          <Text style={{ width: "30%", fontSize: 19 }}> اجمالي الفترة </Text>
          <TextInput style={styles.input} />
        </View>

        <View style={styles.border}></View>

        <View style={{ flexDirection: "row-reverse", marginBottom: 15 }}>
          <Image
            style={{
              width: 50,
              height: 50,
              marginLeft: 15,
              marginTop: 15,
            }}
            source={require("./assets/training.png")}
          />
          <Text style={styles.bold}> التدريبات</Text>
        </View>
        <View style={{ marginTop: 15 }}>
          <DataTable>
            <DataTable.Header
              style={{
                padding: 10,
                borderWidth: 1,
                backgroundColor: "#3974CE",
              }}
            >
              <DataTable.Cell
                numeric
                textStyle={{ fontSize: 22, color: "#fff" }}
              >
                التدريب
              </DataTable.Cell>
              <DataTable.Cell
                textStyle={{ fontSize: 22, color: "#fff" }}
                style={{ borderLeftWidth: 1 }}
                numeric
              >
                التاريخ
              </DataTable.Cell>
            </DataTable.Header>

            <DataTable.Row style={{ borderWidth: 1 }}>
              <DataTable.Cell numeric>طيران سفلي</DataTable.Cell>
              <DataTable.Cell style={{ borderLeftWidth: 1 }} numeric>
                2-2-2023
              </DataTable.Cell>
            </DataTable.Row>

            <DataTable.Row style={{ borderWidth: 1 }}>
              <DataTable.Cell numeric>طيران سفلي</DataTable.Cell>
              <DataTable.Cell style={{ borderLeftWidth: 1 }} numeric>
                2-2-2023
              </DataTable.Cell>
            </DataTable.Row>
          </DataTable>
        </View>

        <View style={styles.border}></View>

        <View style={{ flexDirection: "row-reverse", marginBottom: 15 }}>
          <Image
            style={{
              width: 50,
              height: 50,
              marginLeft: 15,
              marginTop: 15,
            }}
            source={require("./assets/treatments.png")}
          />
          <Text style={styles.bold}> العلاجات</Text>
        </View>
        <View style={{ marginTop: 15 }}>
          <DataTable>
            <DataTable.Header
              style={{
                padding: 10,
                borderWidth: 1,
                backgroundColor: "#3974CE",
              }}
            >
              <DataTable.Cell
                textStyle={{ fontSize: 22, color: "#fff" }}
                numeric
              >
                المبلغ
              </DataTable.Cell>
              <DataTable.Cell
                textStyle={{ fontSize: 22, color: "#fff" }}
                style={{ borderLeftWidth: 1 }}
                numeric
              >
                العلاج
              </DataTable.Cell>
              <DataTable.Cell
                textStyle={{ fontSize: 22, color: "#fff" }}
                style={{ borderLeftWidth: 1 }}
                numeric
              >
                التاريخ
              </DataTable.Cell>
            </DataTable.Header>

            <DataTable.Row style={{ borderWidth: 1 }}>
              <DataTable.Cell numeric>150 </DataTable.Cell>
              <DataTable.Cell style={{ borderLeftWidth: 1 }} numeric>
                علاج جناح
              </DataTable.Cell>
              <DataTable.Cell style={{ borderLeftWidth: 1 }} numeric>
                2-2-2023
              </DataTable.Cell>
            </DataTable.Row>

            <DataTable.Row style={{ borderWidth: 1 }}>
              <DataTable.Cell numeric>150 </DataTable.Cell>
              <DataTable.Cell style={{ borderLeftWidth: 1 }} numeric>
                علاج جناح
              </DataTable.Cell>
              <DataTable.Cell style={{ borderLeftWidth: 1 }} numeric>
                2-2-2023
              </DataTable.Cell>
            </DataTable.Row>
          </DataTable>
        </View>

        <View style={styles.border}></View>

        <View style={{ marginTop: 9, flexDirection: "row-reverse" }}>
          <View
            style={{
              width: "45%",
              flexDirection: "row-reverse",
              marginHorizontal: 150,
            }}
          >
            <Text
              style={{
                width: "40%",
                fontSize: 20,
                fontWeight: "bold",
                marginTop: 10,
              }}
            >
              المبلغ الاجمالي
            </Text>
            <TextInput
              value={falcon.totalPrice}
              style={[styles.input, { marginTop: 10 }]}
            />
          </View>
        </View>

        <View style={{ marginTop: 30, flexDirection: "row-reverse" }}>
          <View
            style={{
              width: "50%",
              flexDirection: "row-reverse",
            }}
          >
            <Text style={{ width: "20%", fontSize: 19 }}>المدفوع</Text>
            <TextInput value={falcon.paid} style={styles.input} />
          </View>
          <View
            style={{
              width: "50%",
              flexDirection: "row-reverse",
            }}
          >
            <Text style={{ width: "20%", fontSize: 19 }}>المتبقي </Text>
            <TextInput value={falcon.unpaid} style={styles.input} />
          </View>
        </View>
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
  },
  title: {
    marginTop: 25,
    fontSize: 35,
  },
  bold: {
    textAlign: "right",
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 25,
  },
  body: {
    height: "50%",
    width: "60%",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: "60%",
    height: 30,
    backgroundColor: "#DEEBFF",
  },
  button: {
    marginTop: 10,
    width: 80,
    height: 30,
    backgroundColor: "lightblue",
    justifyContent: "center",
    alignItems: "center",
  },
  border: {
    width: "70%",
    borderWidth: 0.7,
    marginTop: 50,
    marginLeft: 100,
  },
});
