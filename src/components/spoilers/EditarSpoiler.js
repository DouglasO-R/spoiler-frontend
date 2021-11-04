import React, { useState,useEffect } from "react";
import { Redirect } from "react-router-dom";
import { services } from "../../service/spoilers";




export default function EditarSpoiler(props) {
    
    const [spoiler, setSpoiler] = useState({
        espoliador: "",
        descricao: "",
        titulo: ''
    });
    const [error, setError] = useState(null);
    const [redirect,setRedirect] = useState(false);

    useEffect(() => {
        findOne()
    },[]);
 
    async function findOne() {
        const { id } = props.match.params;
        const res = await services.getOne(id);
        setSpoiler(res.data);
    }

    function exibeError() {
        if (error) {
            return (
                <div className="alert alert-danger" role="alert">
                    {console.log(error.response)}
                    {error.response ? error.response.data.message : "Erro de conexão com o servidor"}
                </div>
            );
        }
    }

    function handleInputChange(e) {
        const { name, value } = e.target;
        setSpoiler({ ...spoiler, [name]: value });
    }

    async function handleSubmit(e) {
        try {
            setError(null);
            e.preventDefault();
            const { id } = props.match.params;
            const res = await services.update(id, spoiler);
            setRedirect(true);
            return res;
        } catch (error) {
            setError(error);
        }
    }

    return (
        <div>
            {redirect ? <Redirect to="/" /> : null}

            <form onSubmit={handleSubmit}>
                {exibeError()}
                
                <fieldset>
                    <legend>Editar Spoiler</legend>
                    <div className="form-group">
                        <label htmlFor="espoliador">Espoliador</label>
                        <input
                            type="text"
                            className="form-control-plaintext"
                            id="espoliador"
                            name="espoliador"
                            placeholder="zededeus"
                            minLength="2"
                            maxLength="40"
                            value={spoiler.espoliador}
                            onChange={handleInputChange}
                            disabled
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="titulo">Título</label>
                        <input
                            type="text"
                            className="form-control"
                            id="titulo"
                            name="titulo"
                            aria-describedby="tituloAjuda"
                            placeholder="Hereditário"
                            minLength="2"
                            maxLength="255"
                            value={spoiler.titulo}
                            onChange={handleInputChange}
                        />
                        <small id="tituloAjuda" className="form-text text-muted">
                            Um título pode ser um filme, série, livro...
                        </small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="descricao">Descrição</label>
                        <textarea
                            className="form-control"
                            id="descricao"
                            name="descricao"
                            placeholder="Charlie é Paimon"
                            minLength="2"
                            maxLength="255"
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
        </div>
    );
}