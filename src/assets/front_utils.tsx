import { Other } from './Icons/categories/svg_other';
import { Trash } from './Icons/svg_trash';
import { Coin } from './Icons/categories/svg_coin';
import { Manutention } from './Icons/categories/svg_manutention';
import { Event } from './Icons/categories/svg_event';
import { Donation } from './Icons/categories/svg_donation';
import { Material } from './Icons/categories/svg_material';

import { ArrowDown } from './Icons/svg_arrow_down';
import { ArrowUp } from './Icons/svg_arrow_up';
import { Bradesco } from './Icons/banco/svg_bradesco';


export const category_list = {
    "Verba":{color:"brown",type:"category",icon(a,b,c){return(<Coin height={a} width={b} color={c}/>)}},
    "Doação":{color:"red",type:"category",icon(a,b,c){return(<Donation height={a} width={b} color={c}/>)}},
    "Evento":{color:"green",type:"category",icon(a,b,c){return(<Event height={a} width={b} color={c}/>)}},
    "Materiais":{color:"#0080ff",type:"category",icon(a,b,c){return(<Material height={a} width={b} color={c}/>)}},
    "Reforma":{color:"#3c3c3c",type:"category",icon(a,b,c){return(<Manutention height={a} width={b} color={c}/>)}},
    "Outro":{color:"gray",type:"category",icon(a,b,c){return(<Other height={a} width={b} color={c}/>)}}
}

export const bank_list = {
    "Físico":{color:"gray",icon(a,b,c){return(<Coin height={a} width={b} color={c}/>)}},
    "Bradesco":{color:"#cc092f",icon(a,b,c){return(<Bradesco height={a} width={b} color={c}/>)}},
}

export const non_category_list = {
    "Limpar campos":{color:"black",type:"other",icon(a,b,c){return(<Trash height={a} width={b} color={c}/>)}},
    "Entrada":{color:"#32DB50",type:"other",icon(a,b,c) {return(<ArrowDown height={a} width={b} color={c}/>)}},
    "Saída":{color:"#cc0000",type:"other",icon(a,b,c) {return(<ArrowUp height={a} width={b} color={c}/>)}}
}

export const filter_colors = {
    "Categoria": "orange",
    "Ordenação": "black",
    "Usuário": "#3c3c3c",
    "Data inicial": "grey",
    "Data final": "grey"
}

