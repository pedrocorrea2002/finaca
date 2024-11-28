import React, { Dispatch, SetStateAction, useState } from "react"
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Modal,
    TouchableOpacity
} from 'react-native'
import database from '@react-native-firebase/database'
import {Menu, MenuTrigger, MenuOptions, MenuOption} from 'react-native-popup-menu'
import {dateFormat, leadingZeros, moneyFormat} from '../assets/back_utils'

import { bank_list, category_list, non_category_list } from "../assets/front_utils"

type Props = {
    itemId: String,
    name: String,
    value: Number,
    date: Number,
    type: "Entrada" | "Saída",
    category: String,
    user: String,
    gettingEntradasSaida: Dispatch<SetStateAction<null>>
}

export const Extract_item = (Props) => {
    const [confirmationPopUp, setConfirmationPopUp] = useState(false)
    const [thisSize, setThisSize] = useState(0);

    function showConfirmationPopUp(){
        setConfirmationPopUp(true)
    }

    function deletarItem(){
        let defaultPath = Props.type == 'entrada' ? '/entradas/' : '/saidas/'

        //! MODAL DE CONFIRMAÇÃO
        database().ref(defaultPath).child(Props.itemId).remove()/*.then(() => {
            teste = "updated"
        })*/

        //! RECARREGAR LISTA
        Props.waitForDelection(Props.itemId)
    }

    //TROCAR POR STYLED COMPONENT
    const styles = StyleSheet.create({
        container:{
            minWidth:'90%',
            maxWidth: '90%',
            marginBottom: 5,

            borderColor: category_list[Props.category].color,
            borderWidth: 5.5,
            borderRadius: 20,

            flexDirection: 'row'
        },
        iconContainer:{
            width: "100%",
            aspectRatio: "1/1",
            backgroundColor: category_list[Props.category].color,
            borderBottomRightRadius: 20,
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 5,

            justifyContent: 'center',
            alignItems: 'center'
        },
        infoContainer:{
            width: (Dimensions.get("screen").width * 0.9) - 133,
            paddingLeft: 5
        },
        name:{
            fontSize: 20,
            fontWeight: 'bold'
        },
        value:{
            fontSize: 25,
            fontWeight: 'bold'
        },
        bottomBand:{
          width: "90%",
          flexDirection:'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          
          position: 'absolute',
          bottom: 0
        },
        date:{
            display: Props.date ? "flex" : "none",
            fontSize: 15
        },
        user:{
            display: Props.user ? "flex" : "none"
        },

        // OPÇÕES DE AÇÃO POR ITEM
        optionsButtonText: {
            fontSize: 30
        },

        // MODO DE CONFIRMAÇÃO DE EXCLUSÃO
        confirmationPopUpContainer:{
            backgroundColor: category_list[Props.category].color,
            height:thisSize,
            flexDirection: "column"
        },
        confirmationPopUpPiece1:{
            width:"auto",
            height: "50%"
        },
        confirmationPopUpText:{
            fontSize:20,
            color: "white",
            fontWeight: "bold"
        },
        confirmationPopUpPiece2:{
            height:"50%",
            flexDirection:"row",
            justifyContent:"space-evenly"
        },
        confirmationPopUpBottom:{
            width: "40%"
        },
        confirmationPopUpBottomText:{
            textAlign:"center",
            fontSize:25,
            fontWeight:"bold",
            color: "white"
        }
    })

    return (
        <>  
            {!confirmationPopUp ? 
                <View style={styles.container} onLayout={(a) => setThisSize(a.nativeEvent.layout.height)}>
                    <View style={{display:"flex", flexDirection:"column",width:"20%"}}>
                        <View style={styles.iconContainer}>
                            {category_list[Props.category ? Props.category : Props.type].icon(35,35,"white")}
                        </View>
                        {
                            Props.bank == null || Props.category == null ?
                                <></>
                            :
                              <View style={[
                                  styles.iconContainer,{
                                      backgroundColor: bank_list[Props.bank].color,
                                      aspectRatio: 3/2,
                                      borderTopEndRadius: 20,
                                      borderBottomLeftRadius: 14,
                                      borderTopLeftRadius:5
                                  }
                              ]}>
                                  {bank_list[Props.bank].icon("50%","50%","white")}
                              </View> 
                        }
                    </View>
                    <View style={styles.infoContainer}>
                        <Text style={styles.name}>{Props.name + (Props.unnecessary ? " (Fútil)" : "")}</Text>
                        <Text style={styles.value}>{moneyFormat(Props.value)}</Text>
                        <View style={styles.bottomBand}>
                            <Text style={styles.date}>{Props.date ? leadingZeros(dateFormat(Props.date).getHours(),2)+":"+leadingZeros(dateFormat(Props.date).getMinutes(),2) : ""}</Text>
                            <Text style={styles.user}>{Props.user}</Text>
                        </View>
                    </View>
                    <View style={[styles.iconContainer, {backgroundColor:"transparent", width:50, alignSelf:"center", position:"absolute", right:0}]}>
                        {Props.category && (
                            Props.type == "entrada" ? 
                                non_category_list["Entrada"].icon(50,50,"green")
                                : 
                                non_category_list["Saída"].icon(50,50,"red")
                        )}
                        <Menu>
                            <MenuTrigger>
                                <Text style={styles.optionsButtonText}>㊂</Text>
                            </MenuTrigger>
                            <MenuOptions>
                                <MenuOption onSelect={() => showConfirmationPopUp()}>
                                    <Text>Deletar</Text>
                                </MenuOption>
                            </MenuOptions>
                        </Menu>
                    </View>
                </View>
            :
                <View style={[styles.container, styles.confirmationPopUpContainer]}>
                    <View style={styles.confirmationPopUpPiece1}>
                        <Text style={styles.confirmationPopUpText}> Deseja mesmo excluir?</Text>
                    </View>
                    <View style={styles.confirmationPopUpPiece2}>
                        <TouchableOpacity style={styles.confirmationPopUpBottom} onPress={() => deletarItem()}>
                            <Text style={[styles.confirmationPopUpBottomText]}>Sim</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.confirmationPopUpBottom} onPress={() => setConfirmationPopUp(false)}>
                            <Text style={[styles.confirmationPopUpBottomText]}>Não</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            }
        </>
    )
}