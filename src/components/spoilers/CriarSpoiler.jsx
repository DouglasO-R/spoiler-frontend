import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import { services } from "../../service/spoilers";



export default function CriarSpoiler(props) {

    const [spoiler, setSpoiler] = useState({
        espoliador: "",
        descricao: "",
        titulo: ''
    });
    const [error, setError] = useState(null);
    const [redirect, setRedirect] = useState(false);

    function handleInputChange(e) {
        const { name, value } = e.target;
        setSpoiler({ ...spoiler, [name]: value });
    }

    function exibeError() {
        if (error) {
            return (
                <div className="alert alert-danger" role="alert">
                    {error.response.data.message}
                </div>
            );
        }
    }

    async function handleSubmit(e) {
        try {
            setError(null);
            e.preventDefault();
            const res = await services.create(spoiler);
            setRedirect(true);
            return res;
        } catch (error) {
            setError(error);
        }
    }

    return (
        <>
            {redirect ? <Redirect to="/" /> : null}
            <form onSubmit={handleSubmit}>
                {exibeError()}
                <fieldset>
                    <legend>Criar spoiler</legend>

                    <div className="form-group">
                        <label htmlFor="espoliador">Espoliador</label>
                        <input type="text"
                            className="form-control"
                            id="espoliador"
                            name="espoliador"
                            placeholder="espoliador"
                            minLength="2"
                            maxLength="30"
                            value={spoiler.espoliador}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="titulo">Titulo</label>
                        <input type="text"
                            className="form-control"
                            id="titulo"
                            name="titulo"
                            placeholder="titulo"
                            minLength="2"
                            maxLength="30"
                            value={spoiler.titulo}
                            onChange={handleInputChange}
                        />
                        <small id="tituloAjuda" className="form-text text-mutated">
                            Um titulo pode ser um filme serie livro
                        </small>
                    </div>

                    <div className="form-group">
                        <label htmlFor="descricao">Descricao</label>
                        <input type="text"
                            className="form-control"
                            id="descricao"
                            name="descricao"
                            placeholder="descricao"
                            minLength="2"
                            maxLength="30"
                            value={spoiler.descricao}
                            onChange={handleInputChange}
                        />
                    </div>
                    <br />
                    <button type="submit" className="btn btn-primary">
                        Enviar
                    </button>

                </fieldset>
            </form>
        </>
    )
}