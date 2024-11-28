import React, {useState} from "react"
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Alert
} from 'react-native'
import database from '@react-native-firebase/database'

import { Input } from "../components/input";
import { InputDateTime } from "../components/inputDateTime";
import { Category } from "../components/category";
import { Button } from "../components/button";

import { theme } from "../assets/style";
import {Plus} from "../assets/Icons/svg_plus"

import { just_date, just_time } from "../assets/back_utils";
import { BankContainer } from "../components/bank";

export const Incomings = () => {
    const [name,setName] = useState("")
    const [value,setValue] = useState(0)
    const [category,setCategory] = useState([])
    const [bank,setBank] = useState([])
    const [date, setDate] = useState(new Date(Date.now()))
    
    const entradas = database().ref('/entradas/')

    function insertValues(){
        if(name && value && category[0] && bank[0]){
            entradas.push({
                category: category[0],
                bank: bank[0],
                date: date.getTime(),
                id: Date.now(),
                name: name,
                user: "gabriel",
                value: value/100
            })
            
            setName("")
            setValue(0)
            setCategory([])
            setBank([])
            setDate(new Date(Date.now()))
        }else{
            Alert.alert("Você deve preencher um nome, um valor e escolher um local e uma categoria!")
        }
    }

    return (
        <ScrollView
            contentContainerStyle={{ paddingBottom: "25%" }}
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.page}>
                <Text style={styles.title}>Nova entrada</Text>
                <Input 
                    text="Nome"
                    display={name}
                    value={name}
                    placeholder="Digite o nome da entrada"
                    onChangeText={setName}
                />
                <Input 
                    text="Valor"
                    value={value.toString()}
                    display={(Number(value)/100).toLocaleString("pt-BR", {style:"currency", currency:"BRL"})}                    
                    placeholder="Digite o valor da entrada"    
                    onChangeText={a => setValue(Number(a))}
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
                        title="Verba"
                        category={category}
                        setCategory={setCategory}
                        pressBehavior={"substitute"}
                    />
                    <Category
                        title="Doação"
                        category={category}
                        setCategory={setCategory}
                        pressBehavior={"substitute"}
                    />
                    <Category
                        title="Evento"
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