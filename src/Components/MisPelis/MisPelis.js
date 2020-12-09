import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import './MisPelis.scss'

 class MisPelis extends Component {
    constructor(props){
        super(props)
        this.state = {
            peliculas: []
        }
        }    
        async componentDidMount(){
            const URL = 'https://moviedb-mongo.herokuapp.com/rent/mymovies'
            const token = JSON.parse(localStorage.getItem('token'))
            console.log(token.id)
            try {
                const myMovies = await axios.post(URL, {user_id: token.id})
                const mispelis = myMovies.data
                console.log(mispelis)
                this.setState({peliculas: mispelis})
            }catch(err){
                console.log(err)
            }
        } 
        muestraPeliculas2(){
            if(this.state.peliculas[0]){
                return(
                    this.state.peliculas.map(pelicula => {
                        console.log(pelicula._id)
                        return(
                            <div key={pelicula._id}>
                            <div> id de alquiler:{pelicula._id}</div>
                            <div> id de usuario :{pelicula.user_id}</div>
                            <div> id de pelicula:{pelicula.pelicula}</div>
                            <div> fecha de creacion de pedido{pelicula.createDate}</div>
                            <div>fecha devolucion:{pelicula.returnDate}</div>
                            <br/>
                            <br/>
                            </div>
                        
                        )
                    }))         
            }else{
                return(<div>CARGANDO LOS DATOS.</div>)
            }   
        }  
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
                 <button className="pepe" onClick={()=> this.goBack()}>ATRAS</button>
                 <button className="pepe" onClick={()=> this.pasaPagina()}>SIGUIENTE</button>
                 <div>{this.muestraPeliculas2()}</div>
                 <input type="text" placeholder="Buscar"></input>
                 <button className="pepe" onClick={()=> this.goBack()}>ATRAS</button>
             </div>
             )
    }
}

export default MisPelis