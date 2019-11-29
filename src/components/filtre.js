import React from 'react';
import FiltreForm from './filtreForm';
import {Link} from 'react-router-dom';
import Pagination from 'react-js-pagination';

export default class Filtre extends React.Component {
    constructor() {
        super();
        this.state = {
            loading: true,
            fiches:[],
            activePage: 1,
            totalItemsCount: 30,
            itemsCountPerPage: 10,
            date1: '',
            date2: '',
        };
        this.handlePageChange = this.handlePageChange.bind(this);
    }


    handleSubmit = async(e)=>{
        const date1 = e.target.elements.date1.value;
        const date2= e.target.elements.date2.value;
        e.preventDefault();
        console.log(date1, date2);  
        const url = `http://localhost:8000/api/fiches?date[after]=${date1}&date[before]=${date2}&page=1&itemsPerPage=${this.state.itemsCountPerPage}`;
        const response = await fetch(url);
        const data = await response.json();
        const dataF = data["hydra:member"];
        console.log(dataF);
        this.setState({ fiches: dataF, date1: date1, date2:date2, loading: false});
        console.log(this.state.date2);
    }
    
    async handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
       const date1 = this.state.date1;
       const date2 = this.state.date2;
        const url = `http://localhost:8000/api/fiches?date[after]=${date1}&date[before]=${date2}&page=${pageNumber}&itemsPerPage=${this.state.itemsCountPerPage}`;
        const response = await fetch(url);
        const data = await response.json();
        const dataF = data["hydra:member"];
        this.setState({
            activePage: pageNumber,
            fiches: dataF,
            loading: false,
            totalItemsCount: data["hydra:totalItems"],
        });
        console.log(this.state.totalItemsCount);
    }

    render() {
       console.log(this.state.fiches);
        return (
            <React.Fragment>
                <br />
                <h2 style={{ textAlign:"center"}}><strong><u>LISTES DES DECHARGES DE RECEPTION DE FONDS </u></strong></h2><br />
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
                        <tbody>{this.state.loading ? (<tr><td>loading...</td></tr>) : (
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
                                                state: { fiche: fiche }
                                            }}
                                                style={{ color: "white", textDecoration: "none" }}> afficher </Link>
                                        </button>
                                    </td>
                                </tr>
                            )))}</tbody>
                    </table >
                </div>
                <div className="container">
                    {
                        this.state.loading ? ('') : (
                            <Pagination
                                activePage={this.state.activePage}
                                itemsCountPerPage={this.state.itemsCountPerPage}
                                totalItemsCount={this.state.totalItemsCount}
                                pageRangeDisplayed={5}
                                onChange={this.handlePageChange}
                                nextPageText="suivant"
                                prevPageText="précédent"
                                itemClass="page-item"
                                linkClass="page-link"
                            />
                        )
                    }
                </div>
            </React.Fragment>
        );
    }
}