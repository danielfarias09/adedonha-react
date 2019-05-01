import React, {Component} from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

let SQLite = require('react-native-sqlite-storage');

//Connection to access the pre-populated adedonha.db
let db = SQLite.openDatabase({ name: 'adedonha.db', createFromLocation : 1});  

export default class LetraComponent extends Component {
    alphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

    constructor(props){
        super(props);
        this.state = {
          letter: '',
          selectedCategory: '',
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style= {styles.category}>{this.state.selectedCategory.name}</Text>
                <Text style= {styles.text}>{this.state.selectedCategory  === '' ? '' : 'com a letra:'}</Text>
                <View style = {styles.circle} >
                    <Text style={styles.letter}>{this.state.letter}</Text>
                </View>
                <Button style={styles.playButton} onPress = {this.getResult} title = "Jogar" color = "red" />
            </View> 
        );
    }

    componentDidMount(){
        this.initializeDB();
        this.getLetter();
    }

    getResult = () => {
        this.getCategory();
        this.getLetter();
    }

    getLetter = () => {
        let count = 0;
        let chooser = setInterval(
            () => {
                count++;
                this.setState({letter: this.getRandomObjectFromArray(this.alphabet)})
                if(count === 30){
                    clearInterval(chooser);
                }
            }, 
            100);
    }

    getRandomObjectFromArray(array){
        return array[Math.floor(Math.random() * array.length)];
    }

    initializeDB(){            
        db.transaction(function(txn){
            txn.executeSql(
              "SELECT name FROM sqlite_master WHERE type='table' AND name='adedonha'",
              [],
              function(tx, res) {
                if (res.rows.length == 0) {
                  txn.executeSql('DROP TABLE IF EXISTS adedonha', []);
                  txn.executeSql(
                    'CREATE TABLE IF NOT EXISTS adedonha(id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(20))',
                    []
                  );
                }
              }
            );
        });
    }

    getCategory(){
        db.transaction(tx => {
            tx.executeSql('select * from adedonha', [], (tx, results) => {
                let temp = [];
                for (let i = 0; i < results.rows.length; ++i) {
                    temp.push(results.rows.item(i));
                  }

                this.setState({
                    selectedCategory: this.getRandomObjectFromArray(temp),
                  });
            });
        });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    category: {
        fontSize: 30,
        fontWeight: 'bold'
    },
    text: {
        fontSize: 25,
    },
    circle: {
        width: 150,
        height: 150,
        backgroundColor: '#011c86',
        borderRadius: 150/2,
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 50,
    },
    letter: {
        color: '#ff0000',
        fontFamily: 'Stoneburg Rounded',
        fontSize: 90,
        textAlign: 'center',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 1,
        textShadowColor: 'white',
    },
    playButton: {
    }
});