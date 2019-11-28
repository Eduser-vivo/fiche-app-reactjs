import React from 'react';
import FiltreForm from './filtreForm';
import {Link} from 'react-router-dom';
// import Pagination from 'react-js-pagination';

export default class Filtre extends React.Component {
    constructor() {
        super();
        this.state = {
            fiches:[],
            activePage: 1,
            totalItemsCount: 1,
            itemsCountPerPage: 1,
            date1: '',
            date2: '',
        };
    }


    handleSubmit = async(e)=>{
        const date1 = e.target.elements.date1.value;
        const date2= e.target.elements.date2.value;
        e.preventDefault();
        console.log(date1, date2);  
        const url = `/fiche-app/public/index.php/fiches/${date1}/${date2}`;
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        this.setState({ fiches: data, date1: date1, date2:date2,  });
    }
    
    render() {
       console.log(this.state.fiches);
        return (
            <React.Fragment>
                <br />
                <h2 style={{ textAlign: 'center' }}><strong><u>LISTES DES DECHARGES DE RECEPTION DE FONDS </u></strong></h2><br />
                <div className="container">
                    <FiltreForm handleSubmit={this.handleSubmit} /> 
                </div><br />
                <div className="container">
                    <table className="table table-hover">
                        <thead>
                            <tr className="table-primary">
                                <th scope="col">Signataire</th>
                                <th scope="col">adresse</th>
                                <th scope="col">Créantier</th>
                                <th scope="col">Montant</th>
                                <th scope="col">Motif</th>
                                <th scope="col">Lieu</th>
                                <th scope="col">afficher une fiche </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                            this.state.fiches.map(fiche => (
                                <tr key={fiche.id} >
                                    <td>{fiche.signataire} </td>
                                    <td>{fiche.adresse} </td>
                                    <td>{fiche.creantier} </td>
                                    <td>{fiche.montant} </td>
                                    <td>{fiche.motif} </td>
                                    <td>{fiche.lieu} </td>
                                    <td>
                                        <button className="btn btn-primary btn-sm">
                                            <Link to={{
                                                pathname: `/fiche/${fiche.id}`,
                                                state: { fiche:{ id:fiche.id,
                                                        signataire: fiche.signataire,
                                                        adresse : fiche.adresse,
                                                        creantier: fiche.creantier,
                                                        montant: fiche.montant,
                                                        motif: fiche.motif,
                                                        lieu : fiche.lieu,
                                                        date : fiche.date.date} }
                                            }}
                                                style={{ color: "white", textDecoration: "none" }}> afficher </Link>
                                        </button>
                                    </td>
                                </tr>
                            ))
                            }
                        </tbody>
                    </table >
                </div>
                <div className="container">
                </div>
            </React.Fragment>
        );
    }
}