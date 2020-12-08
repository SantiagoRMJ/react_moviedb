import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

 class MisPelis extends Component {
    constructor(props){
        super(props)
        this.state = {
            peliculas: {}
        }
        }    
        async componentDidMount(){
            const URL = 'https://moviedb-mongo.herokuapp.com/rent/mymovies'
            const token = JSON.parse(localStorage.getItem('token'))
            try {
                const myMovies = await axios.post(URL, token.id)
                const mispelis = await myMovies.data
                console.log(mispelis)
                this.setState({peliculas: mispelis})
            }catch(err){
                console.log(err)
            }
        }   
    //<div className="padreHome" >{this.muestraPeliculas()}</div>
    goBack(){
        this.props.history.push('/')
    }
    render() {
        return (
             <div className="padreButtons"> 
                 <h1 className="titulo">Movie-foo</h1>
                 <input type="text"placeholder="Buscar" ></input>
                 <Link className="link" to="/registro">Registratee</Link>
                 <Link className="link" to="/login">LOGUEATE</Link>
                 <button onClick={()=> this.atras()}>ATRAS</button>
                 <button onClick={()=> this.pasaPagina()}>SIGUIENTE</button>
                 
                 <input type="text" placeholder="Buscar"></input>
                 <button onClick={()=> this.goBack()}>ATRAS</button>
             </div>
             )
    }
}

export default MisPelis