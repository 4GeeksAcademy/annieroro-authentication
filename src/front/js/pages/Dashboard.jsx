import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Dashboard = () => {

    const { store, actions } = useContext(Context)

    return (
        <div className="card mt-5 m-auto " style={{width: '18rem'}}>
            <img src="https://www.cenieh.es/sites/default/files/default_images/Foto%20perfil%20anonimo.png" className="card-img-top" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title">{store.user.username}</h5>
                    <p className="card-text">{store.user.email}</p>
                </div>
        </div>
    );
};