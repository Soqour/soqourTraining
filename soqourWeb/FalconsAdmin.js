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
export default function FalconsAdmin({ route, navigation }) {
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
    "المزيد",
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

      {/* ---------Body---------- */}
      <View style={styles.body}>
        {/* -------------Tabs---------------- */}
        <View style={{ width: "17%", borderLeftWidth: 1 }}>
          <Pressable
            onPress={() => navigation.navigate("AdminDashboard")}
            style={styles.tab}
          >
            <Text style={{ fontSize: 25 }}>الرئيسية</Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate("FalconsAdmin")}
            style={[styles.tab, { backgroundColor: "#709ADA" }]}
          >
            <Text style={{ fontSize: 25 }}>الطيور</Text>
          </Pressable>
        </View>

        <View style={{ width: "83%" }}>
          {/* -------Statistics--------- */}
          <View
            style={{
              alignItems: "flex-end",
              //   padding: 10,
            }}
          >
            <View
              style={{
                width: "81%",
                margin: 30,
                marginBottom: 0,
                alignItems: "flex-end",
                flexDirection: "row-reverse",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontSize: 35 }}>جميع الطيور </Text>
              <Pressable
                style={{
                  width: 130,
                  height: 40,
                  //   borderWidth: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#CCF19C",
                }}
              >
                <Text style={{ fontSize: 19 }}>اضافة طير</Text>
              </Pressable>
            </View>
          </View>

          {/* ---------Table------------ */}
          <View
            style={{
              marginTop: 15,
              width: "100%",
              // justifyContent:""
              alignItems: "flex-end",
              paddingHorizontal: 20,
            }}
          >
            <DataTable style={{ width: "85%", borderWidth: 1 }}>
              <DataTable.Header
                style={{
                  padding: 10,
                  borderWidth: 1,
                  backgroundColor: "#3974CE",
                }}
              >
                {tableHead.map((x) => (
                  <DataTable.Cell
                    key={x}
                    textStyle={{ fontSize: 22, color: "#fff" }}
                    numeric
                  >
                    {x}
                  </DataTable.Cell>
                ))}
              </DataTable.Header>

              {data.map((x) => (
                <DataTable.Row key={x.id} style={{ borderWidth: 1 }}>
                  <DataTable.Cell textStyle={{ fontSize: 16 }} numeric>
                    <Pressable
                      style={{ width: "100%" }}
                      onPress={() => navigation.navigate("FalconDetails")}
                    >
                      <Image
                        style={{ width: 25, height: 25 }}
                        source={require("./assets/more.png")}
                      />
                    </Pressable>
                  </DataTable.Cell>
                  <DataTable.Cell textStyle={{ fontSize: 16 }} numeric>
                    {x.total}
                  </DataTable.Cell>
                  <DataTable.Cell textStyle={{ fontSize: 16 }} numeric>
                    {x.unpaid}
                  </DataTable.Cell>
                  <DataTable.Cell textStyle={{ fontSize: 16 }} numeric>
                    {x.paid}
                  </DataTable.Cell>
                  <DataTable.Cell textStyle={{ fontSize: 16 }} numeric>
                    {x.duration}
                  </DataTable.Cell>
                  <DataTable.Cell textStyle={{ fontSize: 16 }} numeric>
                    {x.number}
                  </DataTable.Cell>
                  <DataTable.Cell textStyle={{ fontSize: 16 }} numeric>
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
    fontSize: 35,
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
    height: "10%",
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
