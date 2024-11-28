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
    setCategory: Dispatch<SetStateAction<string>>
}

export const Clean_Buttton = (Props) => {
    const [onPressing, setOnPressing] = useState(false)

    const styles = StyleSheet.create({
        category:{
            width: Dimensions.get("screen").width/3.5,
            maxWidth: 110,
            aspectRatio: 1,

            padding: 5,
            margin: 5,
            
            borderWidth: 5,
            borderColor: (onPressing ? category_list["Limpar campos"].color : 'white'),
            borderRadius: 15,
            backgroundColor: (onPressing ? 'white' : category_list["Limpar campos"].color),
    
            alignItems: 'center',
            justifyContent: 'center'
        },
        categoryTitle: {
            fontSize: 15,
            fontWeight: 'bold',
            color: (onPressing ? category_list["Limpar campos"].color : 'white'),
            textAlign: 'center'
        }
    })

    function button_action(){
        Props.setCategory([])
    }

    const Icon = non_category_list[Props.title].icon("60%","60%",(onPressing ? non_category_list["Limpar campos"].color : 'white'))
    
    return (    
        <TouchableOpacity 
            activeOpacity={100}
            style={styles.category}
            onPressIn={() => setOnPressing(true)}
            onPressOut={() => setOnPressing(false)}
            onPress={button_action}
        >
            {Icon}
            <Text
                style={styles.categoryTitle}
            >
                {Props.title}
            </Text>
        </TouchableOpacity>
    )
}