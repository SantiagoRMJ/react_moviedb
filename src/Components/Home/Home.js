import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import './Home.css'
import axios from 'axios'

 class Home extends Component {
    constructor(props){
        super(props)

        this.state = {
            peliculas: [],
            page: 1,
            busqueda: [],
            valorBusqueda: ""
        }
        }
        pasaPagina = ()=>{
                this.setState(prevState => ({page: prevState.page + 1}), ()=>{
                    this.componentDidMount(this.state.page)  
                })          
        }
        atras = ()=>{
            this.setState(prevState => ({page: prevState.page - 1}), ()=>{
                this.componentDidMount(this.state.page)  
            })          
    }
        async componentDidMount(){
            try {
                const allMovies = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=b5138e06a3a9125b8c326498bbeae997&language=es-ES&page=${this.state.page}`)
                console.log(allMovies.data.results)
                this.setState({peliculas: allMovies.data.results})
            }catch(err){
                console.log(err)
            }
        }   
        muestraBusqueda(){
            if(this.state.busqueda[0]){
                return(
                    this.state.busqueda.map(pelicula => {
                        return(
                            <div className="home" key={pelicula.id}>
                                {pelicula.title}
                                <img alt={pelicula.title} src={`https://image.tmdb.org/t/p/w300${pelicula.poster_path}`} onClick={()=>this.clickElementoSeleccionado(pelicula)}></img>
                            </div>
                        
                        )
                    }))         
            }else{
                return(<div>CARGANDO LOS DATOS.</div>)
            }   
        }
        muestraPeliculas(){
            if(this.state.peliculas[0]){
                return(
                    this.state.peliculas.map(pelicula => {
                        return(
                            <div className="home" key={pelicula.id}>
                                {pelicula.title}
                                <img alt={pelicula.title} src={`https://image.tmdb.org/t/p/w300${pelicula.poster_path}`} onClick={()=>this.clickElementoSeleccionado(pelicula)}></img>
                            </div>
                        
                        )
                    }))         
            }else{
                return(<div>CARGANDO LOS DATOS.</div>)
            }   
        }
        clickElementoSeleccionado(pelicula){
            console.log(this.props)
            this.props.history.push('/pelicula');
            localStorage.setItem('datosPelicula', JSON.stringify(pelicula));
        }
        buscador(e){
            this.setState({valorBusqueda: e.target.value}, ()=> {
                const data = this.state.peliculas.filter(item => item.title.toLowerCase().includes(this.state.valorBusqueda.toLowerCase()))
                this.setState({busqueda: data})
            })
        }

    render() {
        return (
             <div className="padreButtons"> 
                 <h1 className="titulo">Movie-foo</h1>
                 <input className="perico "type="text"placeholder="Buscar" onChange={e => this.buscador(e)} ></input>
                 <Link className="link" to="/mispelis">Mis peliculas</Link>
                 <Link className="link" to="/registro">Registratee</Link>
                 <Link className="link" to="/login">LOGUEATE</Link>
                 <button onClick={()=> this.atras()}>ATRAS</button>
                 <button onClick={()=> this.pasaPagina()}>SIGUIENTE</button>
                 <div className="padreHome" >{this.muestraPeliculas()}</div>
                 <input type="text" placeholder="Buscar"></input>
                 <button onClick={()=> this.atras()}>ATRAS</button>
                 <button onClick={()=> this.pasaPagina()}>SIGUIENTE</button>
             </div>
             )
    }
}

export default Home