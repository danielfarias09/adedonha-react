import React, {Component} from 'react';
import { View, StyleSheet, Text, FlatList, Alert } from "react-native";
import { Input, ListItem, Button  } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';

let SQLite = require('react-native-sqlite-storage');

//Connection to access the pre-populated adedonha.db
let db = SQLite.openDatabase({ name: 'adedonha.db', createFromLocation : 1});

export default class CadastroComponent extends Component {

    constructor(props){
        super(props);
        this.state = {
            categories: [],
        }

      }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style= {styles.textHeader}>{'Cadastrar Categorias'}</Text>
                </View>
                <View>
                
                    <FlatList data={this.state.categories} extraData={this.state} keyExtractor={ (item,index) => index.toString() } renderItem={({item}) => (
                        <View style={styles.itemList}>
                            <ListItem style={styles.name} key={item.id} title={item.name.toUpperCase()}/>
                            <Button style={styles.deleteButton}  icon={{name: 'trash', type: 'font-awesome', color: 'white'}} />
                        </View>
                    )} />

                </View>
            </View> 
        );
    }

    componentDidMount(){
        this.getCategories();
    }

    save = () => {
        const { categoryValue }  = this.state ;

        if(categoryValue){
            db.transaction(function(tx) {
                tx.executeSql(
                  'INSERT INTO adedonha (name) VALUES (?)',
                  [categoryValue],
                  (tx, results) => {
                    console.log('Results', results.rowsAffected);
                    if (results.rowsAffected > 0) {
                        this.getCategories();
                        Alert.alert(
                            'Sucesso!',
                            'Categoria Salva com Sucesso',
                            [
                            {
                                text: 'Ok'
                            },
                            ],
                            { cancelable: false }
                        );
                    } else {
                      alert('Erro ao Salvar!');
                    }
                  }
                );
              });
        }else{
            alert('Preencha o campo antes de salvar!');
        }

    }

    getCategories(){
        db.transaction(tx => {
            tx.executeSql('select * from adedonha', [], (tx, results) => {
                let temp = [];
                for (let i = 0; i < results.rows.length; ++i) {
                    temp.push(results.rows.item(i));
                  }

                this.setState({
                    categories: temp,
                  });
            });
        });
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        height: 10,
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        backgroundColor: '#0099ff',
    },
    textHeader: {
        color: 'white',
        fontSize: 16,
    },
    label: {
        textAlign: 'left',
    },
    saveButton: {
        flex: 1
    },
    input: {
        flex: 2
    },
    itemList: {
        flex: 1,
        flexDirection: 'row',
    },
    name: {
        flex: 2
    },
    deleteButton: {
        flex: 1
    }
});