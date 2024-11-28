import React from "react"
import {
    View,
    Text,
    StyleSheet
} from 'react-native'
import {dateFormat, leadingZeros, moneyFormat} from '../assets/back_utils'

import { ArrowDown } from "../assets/Icons/svg_arrow_down"
import { ArrowUp } from "../assets/Icons/svg_arrow_up"
import { Other } from "../assets/Icons/categories/svg_other"
import { category_list } from "../assets/front_utils"

type Props = {
    name: String,
    value: Number,
    date: Number,
    type: "Entrada" | "Saída",
    category: String,
    user: String
}

export const Extract_item_category = (Props) => { 
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
            width: "20%",
            aspectRatio: "1/1",
            backgroundColor: category_list[Props.category].color,
            borderBottomRightRadius: 20,
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 5,

            justifyContent: 'center',
            alignItems: 'center'
        },
        infoContainer:{
            width: "48%",
            paddingLeft: 5
        },
        name:{
            fontSize: 20,
            fontWeight: 'bold'
        },
        value:{
            fontSize: 30,
            fontWeight: 'bold'
        },
        bottomBand:{
        //   width: "100%",

          flexDirection:'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        },
        date:{
            display: Props.date ? "flex" : "none",
            fontSize: 20
        },
        user:{
            display: Props.user ? "flex" : "none"
        }
    })

    return (
        <View style={styles.container}>
            <View style={styles.iconContainer}>
                {category_list[Props.category ? Props.category : Props.type].icon()}
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.name}>{Props.category}</Text>
                <Text style={styles.value}>{moneyFormat(Props.value)}</Text>
            </View>
            <View style={[styles.iconContainer, {backgroundColor:"transparent"}]}>
                {Props.category && (
                    Props.type == "entrada" ? 
                        <ArrowDown height={50} width={50} color="green"/>
                    : <ArrowUp height={50} width={50} color="red"/>
                )}
            </View>
        </View>
    )
}