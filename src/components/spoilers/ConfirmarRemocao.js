import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { services } from "../../service/spoilers";

export default function ConfirmarRemocao(props) {
    const [error, setError] = useState(null);
    const [redirect, setRedirect] = useState(false);
    const [spoiler, setSpoiler] = useState({
        espoliador: "",
        descricao: "",
        titulo: ''
    });

    async function findOne() {
        try {
            const { id } = props.match.params;
            const res = await services.getOne(id);
            setSpoiler(res.data);
        } catch (error) {
            setError(error.response);
        }

    }

    useEffect(() => {
        findOne();
    }, []);

    function exibeError() {
        if (error) {
            return (
                <div classNameName="alert alert-danger" role="alert">
                    {console.log(error)}
                    {error ? error.data.message : "Erro de conexão com o servidor"}
                </div>
            );
        }
    }

    async function handleClick(e){
        try {
            const { id } = props.match.params;
            const res = await services.remove(id);
            setRedirect(true);
        } catch (error) {
            setError(error.response);
        }
    }

    return (
        <div>
            {redirect ? <Redirect to="/" /> : null}
            {exibeError()}

            <br />
            <div className="card">
                <h5 className="card-header">{spoiler.titulo}</h5>
                <div className="card-body">
                    <p>
                        Tem certeza que deseja remover esse Spoiler? As
                        pessoas podem sentir falta dele :/
                    </p>
                    <blockquote className="blockquote text-center">
                        <p className="mb-0">
                            {spoiler.descricao}
                        </p>
                        <br />
                        <footer className="blockquote-footer">
                            {spoiler.espoliador}{" "}
                            <cite title={spoiler.titulo}>
                                {spoiler.titulo}
                            </cite>
                        </footer>
                    </blockquote>
                    <button className="btn btn-danger btn-block" onClick={handleClick}>
                        Remover
                    </button>
                </div>
            </div>
        </div>
    );
}