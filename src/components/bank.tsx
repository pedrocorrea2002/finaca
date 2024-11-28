import React, {useState, Dispatch, SetStateAction, useEffect} from "react"
import {
    Text,
    StyleSheet,
    TouchableOpacity,
    TouchableOpacityProps,
    Dimensions
} from 'react-native'
import { bank_list } from "../assets/front_utils"

type Props = {
    title: String,
    icon: React.ReactNode,
    bank: String[],
    setBank: Dispatch<SetStateAction<string>>,
    pressBehavior:  "substitute"|"add"
}

export const BankContainer = (Props) => {
    const [onPressing, setOnPressing] = useState(false)

    const styles = StyleSheet.create({
        bank:{
            width: Dimensions.get("screen").width/3.5,
            maxWidth: 110,
            aspectRatio: 3/2,

            padding: 5,
            margin: 5,
            
            borderWidth: 5,
            borderColor: (onPressing || Props.bank.includes(Props.title) ? bank_list[Props.title].color : 'white'),
            borderRadius: 15,
            backgroundColor: (onPressing || Props.bank.includes(Props.title) ? 'white' : bank_list[Props.title].color),
    
            alignItems: 'center',
            justifyContent: 'center'
        },
        bankTitle: {
            fontSize: 15,
            fontWeight: 'bold',
            color: (onPressing || Props.bank.includes(Props.title) ? bank_list[Props.title].color : 'white'),
            textAlign: 'center'
        }
    })

    function button_action(){
        if(Props.pressBehavior == "add"){
            if(Props.bank.includes(Props.title)){
                Props.setBank(Props.bank.filter(a => a != Props.title))
            }else{
                Props.setBank([...Props.bank,Props.title])
            }
        }else{
            if(Props.bank.includes(Props.title)){
                Props.setBank([])
            }else{
                Props.setBank([Props.title])
            }
        }
    }

    const Icon = bank_list[Props.title].icon(
        Props.title == "Físico" ? "60%" : "90%",
        Props.title == "Físico" ? "60%" : "90%",
        (onPressing || Props.bank.includes(Props.title) ? bank_list[Props.title].color : 'white')
    )
    
    return (    
        <TouchableOpacity 
            activeOpacity={100}
            style={styles.bank}
            onPressIn={() => setOnPressing(true)}
            onPressOut={() => setOnPressing(false)}
            onPress={button_action}
        >
            {Icon}
            <Text style={Props.title == "Físico" ? styles.bankTitle : {display:"none"}}>
                {Props.title}
            </Text>
        </TouchableOpacity>
    )
}