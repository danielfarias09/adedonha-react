import React from 'react';
import { createAppContainer } from 'react-navigation';
import LetraComponent from '../components/LetraComponent';
import CadastroComponent from '../components/CadastroComponent';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'; 

const AppNavigator = createMaterialBottomTabNavigator({
    Jogar: {
        screen: LetraComponent,
        navigationOptions:{  
            tabBarIcon: ({ tintColor }) => (  
                <Icon name="play-circle" size={25} color={tintColor} />
                ),  
        } 
    },
    Configuracoes:{ 
        screen: CadastroComponent,
        navigationOptions:{  
            tabBarIcon: ({ tintColor }) => (  
                <Icon name="cog" size={25} color={tintColor} />
                ),
       }
    }
},
{
    initialRouteName: 'Jogar',
    barStyle: { backgroundColor: '#0099ff' }
});


export default createAppContainer(AppNavigator);