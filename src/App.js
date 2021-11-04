import { React } from "react";
import { BrowserRouter, Link,Route } from "react-router-dom";

import CriarSpoiler from "./components/spoilers/CriarSpoiler";
import ListarSpoiler from "./components/spoilers/ListarSpoiler";
import EditarSpoiler from "./components/spoilers/EditarSpoiler";
import ConfirmarRemocao from "./components/spoilers/ConfirmarRemocao";


import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

function App() {
  return (
    <BrowserRouter>
        <div>
          <div className="jumbotron jumbotron-fluid">
            <div className="container">
              <Link to="/">
                <h1 className="display-4">#Spoilers</h1>
              </Link>
              <p className="lead">
                Não se preocupe, tudo aqui é brincadeira. Ou não :)
              </p>
              <Link to="/criar" className="btn btn-light">
                Criar
              </Link>
            </div>
          </div>
          <div className="container">
            <div className="row justify-content-md-center">
              <main className="col-xl-4" role="main">
                <Route path="/" exact component={ListarSpoiler} />
                <Route path="/criar/" component={CriarSpoiler} />
                <Route path="/editar/:id" component={EditarSpoiler} />
                <Route
                  path="/remover/:id"
                  component={ConfirmarRemocao}
                />
              </main>
            </div>
          </div>
        </div>
      </BrowserRouter>
  );
}

export default App;
