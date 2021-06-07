import React from 'react'
import { Button, Container, Form, Row } from 'react-bootstrap'

import './styles.css'

const Login = () => {
    return (
        <Container>
            <Row className="justify-content-center">
                <Form.Group>
                    <h2 className="mt-5">Login</h2>
                    <Form.Control placeholder="usuário" className=""/>
                    <Form.Control placeholder="senha" className="mt-2"/>
                    <Button block className="mt-2">login</Button>
                </Form.Group>
            </Row>
        </Container>
    )
}


export default Login