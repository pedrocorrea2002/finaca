import React, {useState} from "react"
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Alert
} from 'react-native'
import database from '@react-native-firebase/database'
import BouncyCheckBox from 'react-native-bouncy-checkbox'

import { Input } from "../components/input";
import { Category } from "../components/category";
import { Button } from "../components/button";

import { theme } from "../assets/style";
import {Plus} from "../assets/Icons/svg_plus"
import { InputDateTime } from "../components/inputDateTime";
import { just_date, just_time } from "../assets/back_utils";
import { BankContainer } from "../components/bank";

export const Outcomings = () => {
    const [name,setName] = useState("")
    const [value,setValue] = useState(0)
    const [bank,setBank] = useState([])// para transferencias entre bancos meus
    const [category,setCategory] = useState([])
    const [date, setDate] = useState(new Date(Date.now()))
    const [futil, setFutil] = useState(false)
    
    const saidas = database().ref('/saidas/')

    function insertValues(){


        if(!(name && value && category[0] && bank[0])){
            Alert.alert("Você deve preencher um nome, um valor e escolher um local e uma categoria!")
            return
        }else{        
            saidas.push({
                user: "gabriel",
                id: Date.now(),
                name: name,
                value: value/100,
                date: date.getTime(),
                unnecessary: futil,
                bank: bank[0],
                category: category[0]
            })

            setName("")
            setValue(0)
            setCategory([])
            setBank([])
            setDate(new Date(Date.now()))
        }
    }

    return (
        <ScrollView 
            contentContainerStyle={{ paddingBottom: "25%" }}
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.page}>
                <Text style={styles.title}>Nova saída</Text>
                <Input 
                    text="Nome"
                    display={name}
                    value={name}
                    placeholder="Digite o nome da saída"
                    onChangeText={setName}
                />
                <Input 
                    text="Valor"
                    value={value.toString()} /* //! QUANDO VOLTA A 0, O RESTANTE DO TEXTO MANTEM */
                    display={(Number(value)/100).toLocaleString("pt-BR", {style:"currency", currency:"BRL"})}
                    placeholder="Digite o valor da saída"              
                    onChangeText={a => {setValue(Number(a))}}
                    keyboardType="decimal-pad"
                />
                <View style={{flexDirection:'row'}}>
                    <InputDateTime 
                        text="Data"
                        side="left"
                        date={date}
                        setDate={setDate}
                        mode="date"
                        content={just_date(date)}
                    />
                    <InputDateTime
                        text="Hora"
                        side="right"
                        date={date}
                        setDate={setDate}
                        mode="time"
                        content={just_time(date)}
                    />
                </View>
                <View style={{width:"90%", flexDirection:"row", borderColor: 'black', borderWidth: 2, borderRadius: 15, padding:10, marginVertical:5}}>
                    <Text style={[styles.label,{marginRight:20}]}>Fútil:</Text>
                    <BouncyCheckBox onPress={(isChecked:boolean) => setFutil(isChecked)} fillColor="black"/>
                </View>
                <Text style={styles.subtitle}>Local:</Text>
                <View style={[styles.category_container, {marginBottom:0}]}>
                    <BankContainer
                        title="Físico"
                        bank={bank}
                        setBank={setBank}
                        pressBehavior={"substitute"}
                    />
                    <BankContainer
                        title="Bradesco"
                        bank={bank}
                        setBank={setBank}
                        pressBehavior={"substitute"}
                    />
                </View>
                <Text style={styles.subtitle}>Categoria:</Text>
                <View style={styles.category_container}>
                    <Category
                        title="Reforma"
                        category={category}
                        setCategory={setCategory}
                        pressBehavior={"substitute"}
                    />
                    <Category
                        title="Materiais"
                        category={category}
                        setCategory={setCategory}
                        pressBehavior={"substitute"}
                    />
                    <Category
                        title="Outro"
                        category={category}
                        setCategory={setCategory}
                        pressBehavior={"substitute"}
                    />
                </View>
                <Button
                    color={theme.colors.gain}
                    title="Adicionar"
                    icon={<Plus width={"25%"} height={"50%"} color={"white"}/>}
                    height={80}
                    onPress={() => insertValues()}
                />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    page:{
        alignItems: 'center',
        alignContent: 'space-between'
    },
    title:{
        fontSize:30,
        fontWeight: 'bold'
    },
    label:{
        fontSize:20,
        fontWeight:"bold"
    },
    subtitle:{
        width: '90%',
        marginTop: 20,

        fontSize:30,
        fontWeight: 'bold'
    },
    category_container:{
        marginHorizontal:10,

        flexDirection:'row',
        flexWrap: 'wrap',
    }
  });