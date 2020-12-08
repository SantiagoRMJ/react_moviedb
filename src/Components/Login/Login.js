import axios from 'axios';
import React, {useState } from 'react';
import { Input } from 'antd';
import './Login.scss'
import { useHistory } from 'react-router-dom';



const LoginForm = (props) => {
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('');
    const URL = 'https://moviedb-mongo.herokuapp.com/user/login'
    const history = useHistory();
    const login = async (e) => {
        try {
            e.preventDefault();
            const post = await axios.post(URL, {email,pass})
            localStorage.setItem('token',post.data.token)
            //props.setUser(post.data.user)
            console.log(post)
            //history.push('/')
        } catch (error) {
            console.error(error)
        }
    
    }
    return (
        <form className="Login" onSubmit={login}>
            <Input type="email" onChange={e=>setEmail(e.target.value)} name="email" placeholder="Email" value={email} className="input-1"/>
            <Input type="password" onChange={e=>setPass(e.target.value)} name="password" placeholder="Contraseña" value={pass} className="input-1"/>
            <button type="submit" className="button">Enviar</button>
        </form>
    )
}


export default LoginForm;