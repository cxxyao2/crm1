import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { Line } from "recharts";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
    lineHeight: "120%",
  },
  subtitle: {
    fontSize: 16,
    margin: 12,
  },
  text: {
    margin: 12,
    fontSize: 12,
    textAlign: "justify",
  },
});

const Subtitle = ({ children, ...props }) => (
  <Text style={styles.subtitle} {...props}>
    {children}
  </Text>
);
const LineNumberOfPage = 20;
// Create Document Component
// 20 line every page
// one Text = one Line in A4
// 90 characters = one lines
const MyDocument = ({ subtitle, content, pageNumber }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Subtitle style={styles.subtitle}>Section #1</Subtitle>
        {Array.apply(null, Array(pageNumber)).map((item, index) =>
          content
            .slice(index * LineNumberOfPage, LineNumberOfPage - 1)
            .map((lineContent, index2) => (
              <Text style={styles.text}>
                {index2 + " "} {lineContent}
              </Text>
            ))
        )}
      </View>
    </Page>
  </Document>
);

export default MyDocument;
