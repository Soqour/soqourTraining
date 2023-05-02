import { StatusBar } from "expo-status-bar";
import { collection, doc, getDoc, onSnapshot, query } from "firebase/firestore";
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
export default function AdminDashboard({ route, navigation }) {
  // const { qId, falconId } = route.params;
  // console.log(qId, "and ", falconId);

  const [user, setUser] = useState({});
  useEffect(() => {
    // readUser();
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

  const tableHead = [
    "المجموع",
    "المتبقي",
    "المدفوع",
    "مدة الاقامة",
    "رقم شريحة الطير",
    "رقم الطير",
  ];
  const data = [
    {
      total: 250,
      unpaid: 50,
      paid: 200,
      duration: 28,
      number: 234561234,
      id: 600123,
    },
    {
      total: 300,
      unpaid: 100,
      paid: 200,
      duration: 20,
      number: 2654261234,
      id: 600124,
    },
  ];
  return (
    <View style={styles.container}>
      {/* -------Header---------- */}
      <View
        style={{
          borderBottomWidth: 2,
          width: "100%",
          flexDirection: "row-reverse",
          justifyContent: "space-between",
        }}
      >
        <Image
          style={{ width: 70, height: 70, marginRight: 30, marginTop: "0.5%" }}
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

      {/* ---------Body---------- */}
      <View style={styles.body}>
        {/* -------------Tabs---------------- */}
        <View style={{ width: "12%", borderLeftWidth: 1 }}>
          <Pressable
            onPress={() => navigation.navigate("AdminDashboard")}
            style={[styles.tab, { backgroundColor: "#709ADA" }]}
          >
            <Text style={{ fontSize: 20 }}>الرئيسية</Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate("FalconsAdmin")}
            style={styles.tab}
          >
            <Text style={{ fontSize: 20 }}>الطيور</Text>
          </Pressable>
        </View>
        <View
          style={{
            width: "93%",
            marginRight: "5%",
          }}
        >
          {/* -------Statistics--------- */}
          <View style={{ flexDirection: "row-reverse" }}>
            <View
              style={[
                styles.statistics,
                { backgroundColor: "#CDECC8", borderRadius: 10 },
              ]}
            >
              <Image
                style={{ width: 80, height: 80 }}
                source={require("./assets/falcon.png")}
              />
              <Text style={{ fontSize: 19, width: "40%" }}>
                اجمالي عدد الطيور لهذا الشهر
              </Text>
              <Text
                style={{ fontSize: 22, marginLeft: 20, fontWeight: "bold" }}
              >
                50
              </Text>
            </View>
            <View
              style={[
                styles.statistics,
                { backgroundColor: "#EDD0AF", borderRadius: 10 },
              ]}
            >
              <Image
                style={{ width: 65, height: 65 }}
                source={require("./assets/aidkit.png")}
              />
              <Text style={{ fontSize: 19, width: "40%" }}>
                اجمالي الحالات الطبية لهذا الشهر
              </Text>
              <Text
                style={{ fontSize: 22, marginLeft: 20, fontWeight: "bold" }}
              >
                25
              </Text>
            </View>
            <View
              style={[
                styles.statistics,
                { backgroundColor: "#91D6F4", borderRadius: 10 },
              ]}
            >
              <Image
                style={{ width: 65, height: 65 }}
                source={require("./assets/income.png")}
              />
              <Text style={{ fontSize: 20, width: "30%" }}>
                اجمالي الدخل هذا الشهر
              </Text>
              <Text
                style={{ fontSize: 22, marginLeft: 20, fontWeight: "bold" }}
              >
                2500
              </Text>
            </View>
          </View>

          {/* ---------Table------------ */}

          <View
            style={{
              marginTop: 15,
              width: "98%",
              // justifyContent:""
              marginLeft: "2%",
              alignItems: "flex-end",
              paddingHorizontal: 20,
            }}
          >
            <DataTable style={{ width: "85%" }}>
              <DataTable.Header
                style={{
                  padding: 5,
                  borderWidth: 1,
                  backgroundColor: "#3974CE",
                }}
              >
                {tableHead.map((x) => (
                  <DataTable.Cell
                    key={x}
                    textStyle={{
                      fontSize: 19,
                      color: "#fff",
                      fontWeight: "bold",
                      alignSelf: "center",
                      // justifyContent: "center",
                      marginLeft: "30%",
                    }}
                    // numeric
                  >
                    {x}
                  </DataTable.Cell>
                ))}
              </DataTable.Header>

              {data.map((x) => (
                <DataTable.Row
                  key={x.id}
                  style={{
                    borderWidth: 1,
                    alignText: "center",
                    // paddingLeft: "35%",
                    // paddingLeft: "10%",
                  }}
                >
                  <DataTable.Cell
                    textStyle={{ fontSize: 16, paddingLeft: "35%" }}
                  >
                    {x.total}
                  </DataTable.Cell>
                  <DataTable.Cell
                    textStyle={{ fontSize: 16, paddingLeft: "35%" }}
                  >
                    {x.unpaid}
                  </DataTable.Cell>
                  <DataTable.Cell
                    textStyle={{ fontSize: 16, paddingLeft: "35%" }}
                  >
                    {x.paid}
                  </DataTable.Cell>
                  <DataTable.Cell
                    textStyle={{ fontSize: 16, paddingLeft: "35%" }}
                  >
                    {x.duration}
                  </DataTable.Cell>
                  <DataTable.Cell
                    textStyle={{ fontSize: 16, paddingLeft: "35%" }}
                  >
                    {x.number}
                  </DataTable.Cell>
                  <DataTable.Cell
                    textStyle={{ fontSize: 16, paddingLeft: "35%" }}
                  >
                    {x.id}
                  </DataTable.Cell>
                </DataTable.Row>
              ))}
            </DataTable>
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
    fontSize: 26,
  },
  bold: {
    textAlign: "right",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 25,
  },
  body: {
    flexDirection: "row-reverse",
    width: "100%",
    height: "100%",
  },
  tab: {
    height: "6%",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
  },
  statistics: {
    width: "25%",
    // borderWidth: 1,
    height: 120,
    margin: 20,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row-reverse",
  },
  input: {
    width: "60%",
    height: 30,
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
  border: {
    width: "70%",
    borderWidth: 1,
    marginTop: 50,
    marginLeft: 100,
  },
});
