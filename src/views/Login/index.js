import React, { useState } from 'react'
import { Alert, Button, Container, Form, Row } from 'react-bootstrap'

import axios from '../../api/axios'

import './styles.css'

const base = process.env.NODE_ENV==='production'?'https://forca-jogo.herokuapp.com':'https://forca-jogo.herokuapp.com'

const Login = () => {
    const [user, setUser] = useState();
    const [pass, setPass] = useState();
    const [show, setShow] = useState(false);

    const handleUser = e => {
        setUser(e.target.value)
    }

    const handlePass = e => {
        setPass(e.target.value)
    }

    const handleSubmit = () => {
        
        const data = {
            "usuario": user,
            "senha": pass
        }

        axios.post('/authenticate/auth', data).then(r => {
            if(r.data && r.data.token){
                const token = r.data.token
                localStorage.setItem('app-token', token)
                window.location.href=`${base}/admin/`
            }else {
                setShow(true)
            }

        }).catch(e => console.log(e))
    }

    return (
        <Container>
            <Row className="justify-content-center">
                <Form.Group>
                    <h2 className="mt-5">Login</h2>
                    <Form.Control onChange={handleUser} value={user} placeholder="usuário" className=""/>
                    <Form.Control onChange={handlePass} value={pass} placeholder="senha" className="mt-2"/>
                    <Button disabled={!user || !pass} onClick={() => handleSubmit()} block className="mt-2">login</Button>
                    <Alert className="mt-2" show={show} variant="danger">Usuário ou senha incorretos.</Alert>
                </Form.Group>
            </Row>
        </Container>
    )
}


export default Login