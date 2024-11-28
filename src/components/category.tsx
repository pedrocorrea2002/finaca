import React, {useState, Dispatch, SetStateAction, useEffect} from "react"
import {
    Text,
    StyleSheet,
    TouchableOpacity,
    TouchableOpacityProps,
    Dimensions
} from 'react-native'
import { category_list, non_category_list } from "../assets/front_utils"

type Props = {
    title: String,
    icon: React.ReactNode,
    category: String[],
    setCategory: Dispatch<SetStateAction<string>>,
    pressBehavior:  "substitute"|"add"
}

export const Category = (Props) => {
    const [onPressing, setOnPressing] = useState(false)

    const styles = StyleSheet.create({
        category:{
            width: Dimensions.get("screen").width/3.5,
            maxWidth: 110,
            aspectRatio: 1,

            padding: 5,
            margin: 5,
            
            borderWidth: 5,
            borderColor: (onPressing || Props.category.includes(Props.title) ? category_list[Props.title].color : 'white'),
            borderRadius: 15,
            backgroundColor: (onPressing || Props.category.includes(Props.title) ? 'white' : category_list[Props.title].color),
    
            alignItems: 'center',
            justifyContent: 'center'
        },
        categoryTitle: {
            fontSize: 14,
            fontWeight: 'bold',
            color: (onPressing || Props.category.includes(Props.title) ? category_list[Props.title].color : 'white'),
            textAlign: 'center'
        }
    })

    function button_action(){
        if(Props.pressBehavior == "add"){
            if(Props.category.includes(Props.title)){
                Props.setCategory(Props.category.filter(a => a != Props.title))
            }else{
                Props.setCategory([...Props.category,Props.title])
            }
        }else{
            if(Props.category.includes(Props.title)){
                Props.setCategory([])
            }else{
                Props.setCategory([Props.title])
            }
        }
    }

    const Icon = (
        Props.title == "Limpar campos" ?
            non_category_list[Props.title].icon("60%","60%",(onPressing || Props.category.includes(Props.title) ? category_list[Props.title].color : 'white'))
        :
            category_list[Props.title].icon("60%","60%",(onPressing || Props.category.includes(Props.title) ? category_list[Props.title].color : 'white'))
    )
    
    return (    
        <TouchableOpacity 
            activeOpacity={100}
            style={styles.category}
            onPressIn={() => setOnPressing(true)}
            onPressOut={() => setOnPressing(false)}
            onPress={button_action}
        >
            {Icon}
            <Text style={styles.categoryTitle}>
                {Props.title}
            </Text>
        </TouchableOpacity>
    )
}