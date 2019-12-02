import React, { Component } from 'react';
import { Document, Page, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#E4E4E4'
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    }
});

const MyDocument = () => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.section}>
            </View>
        </Page>
    </Document>
);


export default class PdfFiche extends Component {
    render() {
        return (<PDFViewer>
            <MyDocument />
        </PDFViewer>);
    }
}
