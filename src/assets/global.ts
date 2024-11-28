import React, {useState} from "react"


class teste{
    situacao: string;
    
    constructor(situacaoBase){
        this.situacao = situacaoBase
    }

    atualizaSituacao(novaSituacao){
        this.situacao = novaSituacao
    }
}

var teste2 = new teste("estável")

export default teste2