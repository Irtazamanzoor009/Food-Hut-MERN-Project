import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    padding: 20,
    fontSize: 12,
  },
  header: {
    marginBottom: 20,
    textAlign: "center",
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 5,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  userName: {
    fontSize: 16,
  },
  orderContainer: {
    marginTop: 20,
  },
  orderItem: {
    marginBottom: 10,
    padding: 10,
    border: "1px solid #ccc",
    borderRadius: 5,
  },
  orderDate: {
    backgroundColor: "#f0f0f0",
    padding: 5,
    marginBottom: 10,
    borderRadius: 5,
  },
  table: {
    display: "table",
    width: "100%",
    marginTop: 10,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCol: {
    width: "16.6%",
    padding: 5,
    textAlign: "center",
  },
  tableHeader: {
    backgroundColor: "#00bc8c",
    color: "white",
    fontWeight: "bold",
  },
  itemImage: {
    width: 50,
    height: 50,
    margin: "0 auto",
  },
  centered: {
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    flexDirection: "row",
  },
});

const calculateTotal = (order) => {
  return order.slice(1).reduce((total, item) => total + item.price, 0);
};

const PDFGenerator = ({ data, userName }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>Order Details</Text>
        <Text style={styles.userName}>Email: {userName}</Text>
      </View>
      <View style={styles.orderContainer}>
        {data.map((order, index) => {
          let total = calculateTotal(order);
          return (
            <View key={index} style={styles.orderItem}>
              <Text style={styles.orderDate}>Date: {order[0].order_date}</Text>
              <View style={styles.table}>
                <View style={[styles.tableRow, styles.tableHeader]}>
                  <Text style={styles.tableCol}></Text>
                  <Text style={styles.tableCol}>Item</Text>
                  <Text style={styles.tableCol}>Price</Text>
                  <Text style={styles.tableCol}>Quantity</Text>
                  <Text style={styles.tableCol}>Size</Text>
                  <Text style={styles.tableCol}>Total</Text>
                </View>
                {order.slice(1).map((item) => (
                  <View
                    key={item.id}
                    style={[styles.tableRow, styles.centered]}
                  >
                    <Text style={styles.tableCol}>
                      <Image style={styles.itemImage} src={item.img} />
                    </Text>
                    <Text style={styles.tableCol}>{item.name}</Text>
                    <Text style={styles.tableCol}>{item.originalPrice}</Text>
                    <Text style={styles.tableCol}>{item.qty}</Text>
                    <Text style={styles.tableCol}>{item.size}</Text>
                    <Text style={styles.tableCol}>{item.price}</Text>
                  </View>
                ))}
                <View style={[styles.tableRow, { justifyContent: "flex-end", backgroundColor:"#00bc8c" }]}>
                  <Text style={[styles.tableCol, { width: "100%", display:"flex",textAlign:"right",fontWeight:"bold",marginRight:"20px",color:"white", justifyContent:"flex-end" }]}>
                    Total: Rs. {total} /-
                  </Text>
                </View>
              </View>
            </View>
          );
        })}
      </View>
    </Page>
  </Document>
);


export default PDFGenerator;
