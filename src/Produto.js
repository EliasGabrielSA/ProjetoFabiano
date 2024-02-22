class Produto{
    _id;
    _descricao;
    _dt_validade;
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
    }
    
    get descricao() {
        return this._descricao;
    }
    set descricao(value) {
        this._descricao = value;
    }

    get dt_validade() {
        return this._dt_validade;
    }
    set dt_validade(value) {
        this._dt_validade = value;
    }

    constructor(pId, pDescricao, pDt_validade){
        this.id = pId;
        this.descricao = pDescricao;
        this.dt_validade = pDt_validade;
    }
}

export default Produto;