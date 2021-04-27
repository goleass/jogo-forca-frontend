
import React from 'react';

import { Button,Form } from 'react-bootstrap'

const UserForm = () => {
    return (
        <>
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Nome do usuário</Form.Label>
                    <Form.Control required type="email" placeholder="Leonardo Gomes Assunção" />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Usuário</Form.Label>
                    <Form.Control type="email" placeholder="leonardo.assuncao1513" />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Senha</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group>
                <Button type="submit">Submit form</Button>
                </Form.Group>
            </Form>
        </>
    );
}

export default UserForm