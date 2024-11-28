import React, { useState,useEffect } from "react"
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SectionList,
    Image
} from 'react-native'
import database from '@react-native-firebase/database'
import { dateFormat, dataFormat_toMonth, onlyUnique, moneyFormat } from "../assets/back_utils";

import { Extract_item } from "../components/extract_item";
import { theme } from "../assets/style";
import { useNavigation } from "@react-navigation/native";

import {Reload} from "../assets/Icons/svg_reload"

export const Extract = () => {
    const navigation = useNavigation();
    const [realoading, setReloading] = useState(false)

    //? PULA PRA PRÓXIMA DATA
    function nextItem() {
        if (filteredMonths[dateIndex + 1] !== undefined) {
            setSelectedMonth(filteredMonths[dateIndex + 1])
            setDateIndex(dateIndex + 1)
        }
    }

    //? PULA PRA DATA ANTERIOR
    function previousItem() {
        if (filteredMonths[dateIndex - 1] !== undefined) {
            setSelectedMonth(filteredMonths[dateIndex - 1])
            setDateIndex(dateIndex - 1)
        }
    }

    //? LISTAS DE ENTRADAS E SAÍDAS
    const [lancamentos, setLancamentos] = useState([])
    const [saidas, setSaidas] = useState([])
    const [entradas, setEntradas] = useState([])

    //? VARIÁVEIS DE MÊS
    const [months, setMonths] = useState([])
    const [filteredMonths, setFilteredMonths] = useState([])
    const [dateIndex, setDateIndex] = useState(0)
    const [selectedMonth, setSelectedMonth] = useState("")
    
    //? PREENCHENDO ENTRADAS E SAÍDAS
    const saidasDB = database().ref('/saidas/')
    const entradasDB = database().ref('/entradas/')
    
    const [a,setA] = useState(0);

    //? buscando no firebase as entradas e saídas
    function gettingEntradasSaida(){
        setReloading(false)

        //* Pegando entradas do firebase e jogando em um array
        const listaEntradas = []
        
        // for(const indexEntrada in entradasDB){
            //     listaEntradas.push(entradasDB[indexEntrada])
            // }
        entradasDB.once('value', snapshot => {
            for(const indexEntrada in snapshot.val()){
                listaEntradas.push({...snapshot.val()[indexEntrada], itemId:indexEntrada})
            }

            setEntradas(listaEntradas)
        })
        
        
        //* Pegando saídas do firebase e jogando em um array
        const listaSaidas = []
        // for(const indexSaida in saidasDB){
        //     listaSaidas.push(saidasDB[indexSaida])
        // }
        saidasDB.once('value', snapshot => {
            for(const indexSaida in snapshot.val()){
                listaSaidas.push({...snapshot.val()[indexSaida], itemId:indexSaida})
            }

            setSaidas(listaSaidas)
        })

        setLancamentos([
            ...saidas.map(val => { return { type: "saida", ...val } }),
            ...entradas.map(val => { return { type: "entrada", ...val } })
        ])
    }

    useEffect(() => {
        gettingEntradasSaida()
    },[])

    useEffect(() => {
        setMonths(lancamentos.map(item => dataFormat_toMonth(item.date)))
    },[lancamentos])

    useEffect(() => {
        setFilteredMonths(months.filter(onlyUnique))
    },[months])

    useEffect(() => {
        setSelectedMonth(filteredMonths[0])
        setDateIndex(0)
    },[filteredMonths])

    function waitForDelection(itemId){
        // console.log("realoadingTries: ",realoadingTries)
        // console.log("itemID conteudo: ",itemId)
        // console.log("itemID: ", (lancamentos.map(b => b.itemId).includes(itemId)))
        // console.log("itemID2: ", typeof(itemId))
        // console.log("lancamentos: ", typeof(lancamentos.map(b => b.itemId)[0]))

        let reloadingTries = 0;

        // é como e mesmo após a exclusão o itemId ainda estivesse dentro de lancamentos, ou seja o segundo criterio abaixo, continua true mesmo após a exclusão
        if(reloadingTries <= 5 && lancamentos.map(b => b.itemId).includes(itemId)){
            setTimeout(() => {
                console.log("setTimeOut",reloadingTries)

                reloadingTries = reloadingTries + 1
                setReloading(false)
                gettingEntradasSaida()
                waitForDelection(itemId)
            },1000)
        }
    }

    const styles = StyleSheet.create({
        page: {
            alignItems: 'center',
            alignContent: 'space-between'
        },
        title: {
            fontSize: 30,
            fontWeight: 'bold'
        },
        dateBar: {
            marginTop: 20,
            marginBottom: 10,
            width: "100%",
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: "flex-end"
        },
        dateBar2: {
            flexDirection: 'row',
        },
        date: {
            fontSize: 25,
            fontWeight: 'bold',
        },
        leftArrow: {
            color: dateIndex == 0 || lancamentos.length == 0 ? "#bfbdbd" : "black"
        },
        rightArrow: {
            color: dateIndex == filteredMonths.length - 1 || lancamentos.length == 0 ? "#bfbdbd" : "black"
        },
        total_header: {
            width: '90%',
            borderBottomWidth: 2,
        },
        total_header_sections:{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'row'
        },
        total_header_section: {
            height: 30,

            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
            marginHorizontal: 5
        },
        total_section_rectangle: {
            width: 20,
            height: 20,

            borderRadius:7,
            marginRight: 10
        },
        total_section_value: {
            fontWeight: 'bold',
            marginLeft: 10
        },
        groupHeader: {
            minWidth: '90%',
            marginTop: 15,

            fontSize: 30,
            fontWeight: 'bold'
        },
        change_screen_button: {
            width: 30,
            height: 30
        }
    })

    function groupLancamentos(lista) {
        const groupedList = []
        lista.forEach((item) => {
            let group = groupedList.find((item2) => item2.title === dateFormat(item.date).getDate())

            if (!group) {
                groupedList.push({
                    title: dateFormat(item.date).getDate(),
                    data: [item]
                })
            } else {
                group.data.push(item)
            }
        })

        return groupedList
    }

    return (
        <View style={styles.page}>
            <View style={{flexDirection:"row", width:'100%', display:"flex", justifyContent:"center"}}>
                <TouchableOpacity style={{position:"absolute", left: 20, top: 10}} onPress={() => {gettingEntradasSaida()}}>
                    <Reload height={35} width={35} color="black"/>
                </TouchableOpacity>
                <Text style={styles.title}>Extrato</Text>
            </View>
            <View style={styles.dateBar}>
                {/* //* ABA PARA TROCAR O MÊS */}
                <View style={styles.dateBar2}>
                    <TouchableOpacity onPress={() => previousItem()} activeOpacity={dateIndex == 0 ? 100 : 0.5}>
                        <Text style={[styles.date, styles.leftArrow]}>◀</Text>
                    </TouchableOpacity>

                    <Text style={[styles.date, { width: 250, marginHorizontal: 10, textAlign: "center" }]}>{selectedMonth ? selectedMonth : "-------- / ----"}</Text>

                    <TouchableOpacity onPress={() => nextItem()} activeOpacity={dateIndex == filteredMonths.length - 1 ? 100 : 0.5}>
                        <Text style={[styles.date, styles.rightArrow]}>▶</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* //* BARRA DE FILTROS ATIVOS E ORDENAÇÃO */}
            <View style={styles.total_header}>
                {/* //* BARRA DE TOTAIS DE ENTRADA E SAÍDA */}
                <View style={styles.total_header_sections}>
                    <View style={styles.total_header_section}>
                        <View style={[styles.total_section_rectangle, {backgroundColor: theme.colors.gain}]}></View>
                        <Text>Entrada:</Text>
                        <Text style={styles.total_section_value}>
                            {
                                moneyFormat(lancamentos.filter(item => (
                                    dataFormat_toMonth(item.date) == selectedMonth && item.type == "entrada" ? 1 : 0
                                )).reduce((sum,a) => sum += a.value,0))
                            }
                        </Text>
                    </View>
                    <View style={styles.total_header_section}>
                        <View style={[styles.total_section_rectangle, {backgroundColor: theme.colors.lose}]}></View>
                        <Text>Saída:</Text>
                        <Text style={styles.total_section_value}>
                            {
                                moneyFormat(lancamentos.filter(item => (
                                    dataFormat_toMonth(item.date) == selectedMonth && item.type == "saida" ? 1 : 0
                                )).reduce((sum,a) => sum += a.value,0))
                            }
                        </Text>
                    </View>
                </View>
            </View>

            {/* //* RECARREGANDO */ }
            {realoading ? 
                <Text>Recarregando</Text>
            :
                <></>
            }

            {/* //* LISTA DE ENTRADAS E SAÍDAS */}
            <SectionList
                sections={groupLancamentos(lancamentos.filter(item => (dataFormat_toMonth(item.date) == selectedMonth ? 1 : 0)))}
                keyExtractor={(item) => String(item.id)}
                contentContainerStyle={{ width: "100%", alignItems: 'center', paddingBottom: "50%" }}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <Extract_item
                        itemId={item.itemId}
                        name={item.name}
                        value={item.value}
                        date={item.date}
                        type={item.type}
                        unnecessary={item.unnecessary}
                        category={item.category}
                        bank={item.bank}
                        user={item.user}
                        waitForDelection={waitForDelection}
                    />
                )}
                renderSectionHeader={({ section: { title } }) => (
                    <Text style={styles.groupHeader}>Dia {title}</Text>
                )}
            />
        </View>

    )
}
