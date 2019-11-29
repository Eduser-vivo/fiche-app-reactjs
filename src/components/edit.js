import React from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import AuthService from '../auth/auth'; 

function dateInit() {
    const dateJ = new Date();
    const jour = dateJ.getDate();
    const moi = dateJ.getMonth() + 1;
    const year = dateJ.getFullYear();
    return (jour + "-" + moi + "-" + year);
}

export default class Edit extends React.Component{
    constructor(props) {
        super(props)
        const fiche = this.props.location.state.fiche;
        this.state = {
            id: fiche.id,
            signataire: fiche.signataire,
            adresse: fiche.adresse,
            creantier: fiche.creantier,
            montant: fiche.montant,
            motif: fiche.motif,
            lieu: fiche.lieu,
            date: dateInit(),
            redirection: false,
            fiches: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const isCheckbox = event.target.type === "checkbox";
        this.setState({
            [event.target.name]: isCheckbox ? event.target.checked : event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = {
            id: this.state.id,
            signataire: this.state.signataire,
            adresse: this.state.adresse,
            creantier: this.state.creantier,
            montant: parseInt(this.state.montant),
            motif: this.state.motif,
            lieu: this.state.lieu,
            date: this.state.dateF
        };
        console.log(data);

        const url = AuthService.getFiche()+this.state.id;
        axios.put(url, data)
            .then(response => {this.setState({ fiches: response.data, redirection: true })})
            .catch(error => { console.log(error) });
    }

    render(){
        console.log(this.state.id);
        const { fiches } = this.state;
        console.log(fiches);
        const { redirection } = this.state;
        if (redirection) {
            return <Redirect to={{ pathname: `/fiche/${fiches.id}`, state: { fiche: fiches } }} />
        }
        
        return (<div className="container">
            <br />
            <h2 style={{ textAlign: 'center' }}><strong><u>DECHARGE DE RECEPTION DE FONDS 1</u></strong></h2><br />
            <form onSubmit={this.handleSubmit}>
                <div className="form-group" >
                    <label>Signataire</label>
                    <input type="text"
                        name="signataire"
                        className="form-control"
                        value={this.state.signataire}
                        required
                        onChange={this.handleChange} />
                </div>
                <div className="form-group">
                    <label>Adresse</label>
                    <input type="text"
                        name="adresse"
                        className="form-control"
                        value={this.state.adresse}
                        required
                        onChange={this.handleChange} />
                </div>
                <div className="form-group">
                    <label>creantier</label>
                    <input type="text"
                        name="creantier"
                        className="form-control"
                        value={this.state.creantier}
                        required
                        onChange={this.handleChange} />
                </div>
                <div className="form-group">
                    <label>Montant</label>
                    <input type="number"
                        name="montant"
                        className="form-control"
                        value={this.state.montant}
                        onChange={this.handleChange}
                        required />
                </div>
                <div className="form-group">
                    <label>Motif</label>
                    <textarea type="text"
                        name="motif"
                        className="form-control"
                        value={this.state.motif}
                        required
                        onChange={this.handleChange} />
                </div>
                <div className="form-group">
                    <label>Lieu</label>
                    <input type="text"
                        name="lieu"
                        className="form-control"
                        value={this.state.lieu}
                        required
                        onChange={this.handleChange} />
                </div>
                <input className="btn btn-success" type="submit" value="envoyer" />
            </form><br />
        </div>);
    }
}







