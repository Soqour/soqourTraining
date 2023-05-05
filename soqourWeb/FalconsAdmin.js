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
  Block,
  // TouchableOpacity,
  Modal,
  Button,
} from "react-native";
import { DataTable } from "react-native-paper";
import { db } from "./firebase";
export default function FalconsAdmin({ route, navigation }) {
  // const { qId, falconId } = route.params;
  // console.log(qId, "and ", falconId);
  const [addModalVisible, setAddModalVisible] = useState(false);

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
            style={[styles.tab]}
          >
            <Text style={{ fontSize: 20 }}>الرئيسية</Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate("FalconsAdmin")}
            style={[styles.tab, { backgroundColor: "#709ADA" }]}
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
                onPress={() => setAddModalVisible(true)}
                style={{
                  width: 130,
                  height: 40,
                  //   borderWidth: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#CCF19C",
                  borderRadius: 5,
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
                      marginLeft: "30%",
                    }}
                    numeric
                  >
                    {x}
                  </DataTable.Cell>
                ))}
              </DataTable.Header>

              {data.map((x) => (
                <Pressable
                  onPress={() => {
                    navigation.navigate("FalconDetails");
                  }}
                >
                  <DataTable.Row key={x.id} style={{ borderWidth: 1 }}>
                    <DataTable.Cell numeric>
                      <Image
                        style={{ width: 25, height: 25 }}
                        source={require("./assets/more.png")}
                      />
                    </DataTable.Cell>

                    <DataTable.Cell
                      numeric
                      textStyle={{ fontSize: 16, paddingLeft: "35%" }}
                    >
                      {x.total}
                    </DataTable.Cell>
                    <DataTable.Cell numeric textStyle={{ fontSize: 16 }}>
                      {x.unpaid}
                    </DataTable.Cell>
                    <DataTable.Cell numeric textStyle={{ fontSize: 16 }}>
                      {x.paid}
                    </DataTable.Cell>
                    <DataTable.Cell numeric textStyle={{ fontSize: 16 }}>
                      {x.duration}
                    </DataTable.Cell>
                    <DataTable.Cell numeric textStyle={{ fontSize: 16 }}>
                      {x.number}
                    </DataTable.Cell>
                    <DataTable.Cell numeric textStyle={{ fontSize: 16 }}>
                      {x.id}
                    </DataTable.Cell>
                  </DataTable.Row>
                </Pressable>
              ))}
            </DataTable>
          </View>
        </View>
      </View>

      <Modal animationType="slide" transparent={true} visible={addModalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
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
                <TextInput style={styles.input} readOnly />
              </View>

              <View
                style={{
                  width: "55%",
                  flexDirection: "row-reverse",
                }}
              >
                <Text style={{ width: "30%", fontSize: 19 }}>الرقم الشخصي</Text>
                <TextInput style={styles.input} readOnly />
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
                <TextInput style={styles.input} />
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
                <TextInput style={styles.input} />
              </View>
              <View
                style={{
                  width: "55%",
                  flexDirection: "row-reverse",
                }}
              >
                <Text style={{ width: "30%", fontSize: 19 }}>تاريخ الخروج</Text>
                <TextInput style={styles.input} />
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
              <Text style={{ width: "30%", fontSize: 19 }}>اجمالي الفترة</Text>
              <TextInput style={styles.input} />
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "30%",
              }}
            >
              <Pressable
                onPress={() => setAddModalVisible(false)}
                style={styles.button}
              >
                <Text style={{ color: "#fff" }}>حفط</Text>
              </Pressable>
              <Pressable
                onPress={() => setAddModalVisible(false)}
                style={styles.cancelButton}
              >
                <Text style={{ color: "#fff" }}>اغلاق</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
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
    backgroundColor: "#DEEBFF",
  },

  border: {
    width: "70%",
    borderWidth: 1,
    marginTop: 50,
    marginLeft: 100,
  },
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
  },
  modalView: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: "3%",
    paddingBottom: "5%",
    borderWidth: 0.8,
    alignSelf: "center",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 10,
    width: 100,
    padding: 10,
    backgroundColor: "#4CAC3C",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "10%",
  },
  cancelButton: {
    borderRadius: 10,
    width: 100,
    padding: 10,
    backgroundColor: "#F5365C",
    alignSelf: "center",
    // marginLeft: "30%",
    alignItems: "center",
    marginTop: "10%",
  },
});
