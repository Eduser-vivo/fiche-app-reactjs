import React, { Component } from 'react';
import { Document, Page, View,Text, StyleSheet, PDFViewer } from '@react-pdf/renderer';
import Fiche from './fiche';

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



export default class PdfFiche extends Component {
    constructor(){
        super()
        this.state = {
            location:{
                state:{
                    fiche: [],
                    referer:'',
                }
            },

        }
    }

    componentDidMount(){
        this.setState({
            location:{
                state:{
                    fiche: this.props.location.state.fiche,
                    referer: this.props.location.state.referer,
                }
            }   
        })
    }

    render() {
        const {location} = this.state;
        console.log(this.state.location.state.fiche);
        
        return (<PDFViewer>
            <Document>
                <Page size="A4" style={styles.page}>
                    <View style={styles.section}>
                        <Text>
                        {/* <Fiche location={location}/> */}
                        </Text>
                    </View>
                </Page>
            </Document>
        </PDFViewer>);
    }
}
