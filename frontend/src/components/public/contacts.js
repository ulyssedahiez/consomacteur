import React, { Component } from 'react';
import { NavLink } from "react-router-dom";

export default class Contacts extends React.Component {

    lastNameInput = React.createRef();
    firstNameInput = React.createRef();
    emailInput = React.createRef();
    objectInput = React.createRef();
    messageInput = React.createRef();

    state={
        lastName:null,
        firstName:null,
        email:null,
        object:null,
        message:null
    }

    handleSubmit(event) {}

    render() {
		return (
            <div className='layoutForm'>
            <div className="container">
            <div className="titleForm">
                <a>Formulaire de contact</a>
                </div>
                <form className="inscriptionForm" onSubmit={event => this.handleSubmit(event)} method='GET'>
                    <div className="row">
                        <div className="col-25">
                            <label htmlFor="lastName">Nom </label>
                        </div> 
                        <div className="col-75">
                            <input required type="text" id="lastName" ref={this.LastName} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-25">
                            <label htmlFor="firstName">Prénom </label>
                        </div>
                        <div className="col-75">
                            <input required type="text" id="firstName" ref={this.firstName} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-25">
                            <label htmlFor="email">Email </label>
                        </div>
                        <div className="col-75">
                            <input required type="email" id="email" ref={this.email} />
                        </div>
                    </div>
                    <div className="row">   
                        <div className="col-25">
                            <label htmlFor="object">Objet du message </label>
                        </div>
                        <div className="col-75">
                            <input required type="text" id="object" ref={this.object} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-25">
                            <label htmlFor="message">Corps du message </label>
                        </div>
                        <div className="col-75">
                            <textarea id="message" type="text" placeholder="Bonjour, je vous contacte car...." ref={this.message}></textarea>
                        </div>
                    </div>
                    
                    <div className="row">
                        <button type="submit">Envoyer</button>
                    </div>
                </form>
            </div>
            </div>
        )
    }
}