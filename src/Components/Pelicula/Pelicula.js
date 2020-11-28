import React, { Component } from 'react'
import './Pelicula.css'

export default class Pelicula extends Component {
    constructor(props){
        super(props)
        this.state = {
            peliculaElegida: {}
        }
        }
        componentDidMount(){
            let data = JSON.parse(localStorage.getItem('datosPelicula'))
            this.setState({peliculaElegida: data})
            console.log(data)
        }

        goBack(){
            this.props.history.push('/')
        }

        pintaPeli(){
            if(this.state.peliculaElegida?.id){
                return(
                    <div className="pelicula">
                        <img alt={this.state.peliculaElegida.title} src={`https://image.tmdb.org/t/p/w300${this.state.peliculaElegida.poster_path}`}></img>
                        <div className="titulo"> {this.state.peliculaElegida.title} </div>
                        <div className="fecha">Fecha de lanzamiento:{this.state.peliculaElegida.release_date} </div>
                        <div className="descripcion"> {this.state.peliculaElegida.overview} </div>
                        <div className="nota">Nota media: {this.state.peliculaElegida.vote_average}</div>
                    </div>
                )
            }else return <div>CARGANDO</div>
        }
    
    render(){
        return (
            <div className="padrePelicula">
                {this.pintaPeli()}
                <button onClick={()=> this.goBack()}>ATRAS</button>
            </div>
        )
    }
}
