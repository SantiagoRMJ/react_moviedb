import React, { Component } from 'react'
import './Home.css'
import axios from 'axios'

 class Home extends Component {
    constructor(props){
        super(props)

        this.state = {
            peliculas: [],
            page: 1
        }
        }
        pasaPagina = ()=>{
                this.setState(prevState => ({page: prevState.page + 1}))            
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

        muestraPeliculas(){
            if(this.state.peliculas[0]){
                return(
                    this.state.peliculas.map(pelicula => {
                        console.log(pelicula.title)
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
    render() {
        return (
             <div> 
                 <div className="padreHome" >{this.muestraPeliculas()}</div>
                <button onClick={()=> this.pasaPagina()}>SIGUIENTE</button>
             </div>
             )
    }
}
export default Home