import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { services } from "../../service/spoilers";
import robot from "../../assets/robot.png";

export default function ListarSpoiler(props) {
    const [spoilers, setSpoilers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        list();
    }, [])

    function exibeError() {
        if (error) {
            return (
                <div className="alert alert-danger" role="alert">
                    {error.response ? error.response.data.message : "Erro de conexão com o servidor"}
                </div>
            );
        }
    }

    async function list() {
        try {
            const response = await services.getAll();
            setSpoilers(response.data);
        } catch (error) {
            setError(error);
        }

    }

    return (
        <>
            <br />
            {exibeError()}
            {spoilers && spoilers.map((item) => (
                <div className="card mb-4" key={item.id}>

                    <h5 className="card-header">{item.espoliador}</h5>

                    <div className="card-body">

                        <div className="media">
                            <img src={robot} alt="Spoiler" className="mr-3" />
                            <div className="media-body">
                                <h5 className="mt-0 mb-1">{item.titulo}</h5>
                                <p>{item.descricao}</p>
                            </div>
                        </div>

                        <div className="text-right">
                            <Link to={`/remover/${item.id}`} className="btn btn-danger mr-3" role="button">Remover</Link>

                            <Link to={`/editar/${item.id}`} className="btn btn-primary" role="button">Editar</Link>
                        </div>

                    </div>

                </div>
            ))}
        </>
    )

}