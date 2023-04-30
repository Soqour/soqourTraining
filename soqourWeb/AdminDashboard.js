import { StatusBar } from "expo-status-bar";
import { collection, doc, getDoc, onSnapshot, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
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
  return (
    <View style={styles.container}>
      <View style={{ borderBottomWidth: 2, width: "50%", paddingBottom: 30 }}>
        <Text style={styles.title}>مركز العديد لتدريب الصقور </Text>
      </View>
      <View
        style={{
          width: "50%",
          paddingBottom: 70,
        }}
      >
        <Text style={styles.bold}>المالك</Text>
        <View style={{ marginTop: 9, flexDirection: "row-reverse" }}>
          <View
            style={{
              width: "45%",
              flexDirection: "row-reverse",
            }}
          >
            <Text style={{ width: "15%", fontSize: 19 }}>الاسم</Text>
            <TextInput value={user.name} style={styles.input} />
          </View>
          <View
            style={{
              width: "55%",
              flexDirection: "row-reverse",
            }}
          >
            <Text style={{ width: "30%", fontSize: 19 }}>الرقم الشخصي</Text>
            <TextInput value={user.qId} style={styles.input} />
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

        <Text style={styles.bold}>فترة الاقامة</Text>
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
            <Text style={{ width: "30%", fontSize: 19 }}>تاريخ الخروج </Text>
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
          <Text style={{ width: "30%", fontSize: 19 }}> اجمالي الفترة </Text>
          <TextInput style={styles.input} />
        </View>

        <View style={styles.border}></View>

        <Text style={styles.bold}> التدريبات</Text>
        <View style={{ marginTop: 15 }}>
          <DataTable>
            <DataTable.Header style={{ borderWidth: 1 }}>
              <DataTable.Cell numeric>التدريب</DataTable.Cell>
              <DataTable.Cell style={{ borderLeftWidth: 1 }} numeric>
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

            <DataTable.Row style={{ borderWidth: 1 }}>
              <DataTable.Cell numeric>طيران سفلي</DataTable.Cell>
              <DataTable.Cell style={{ borderLeftWidth: 1 }} numeric>
                2-2-2023
              </DataTable.Cell>
            </DataTable.Row>
          </DataTable>
        </View>

        <View style={styles.border}></View>

        <Text style={styles.bold}> العلاجات</Text>
        <View style={{ marginTop: 15 }}>
          <DataTable>
            <DataTable.Header style={{ borderWidth: 1 }}>
              <DataTable.Cell numeric>المبلغ</DataTable.Cell>
              <DataTable.Cell style={{ borderLeftWidth: 1 }} numeric>
                العلاج
              </DataTable.Cell>
              <DataTable.Cell style={{ borderLeftWidth: 1 }} numeric>
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
            <TextInput style={[styles.input, { marginTop: 10 }]} />
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
            <TextInput style={styles.input} />
          </View>
          <View
            style={{
              width: "50%",
              flexDirection: "row-reverse",
            }}
          >
            <Text style={{ width: "20%", fontSize: 19 }}>المتبقي </Text>
            <TextInput style={styles.input} />
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
    fontSize: 25,
  },
  bold: {
    textAlign: "right",
    fontSize: 20,
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
