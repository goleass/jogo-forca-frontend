import React, { useState } from 'react';

import { Button, Form, Modal } from 'react-bootstrap'

import axios from '../../api/axios'

const UserModal = () => {
    const [show, setShow] = useState(false);
    const [inputUsername, setInputUsername] = useState();
    const [inputUser, setInputUser] = useState();
    const [inputPassword, setInputPassword] = useState();

    const handleClose = () => {
        setShow(false)
    }

    const handleShow = () => setShow(true);

    const onChangeUsername = e => {
        setInputUsername(e.target.value)
    }

    const onChangeUser = e => {
        setInputUser(e.target.value)
    }

    const onChangePassword = e => {
        setInputPassword(e.target.value)
    }

    const handleCreate = e => {
        e.preventDefault()

        if (!inputUsername || !inputUser || !inputPassword) return

        const data = {
            "nome_usuario": inputUsername,
            "usuario": inputUser,
            "senha": inputPassword
        }

        axios.post('/users/new-user', data).then(r => {
            window.location.href="https://forca-jogo.herokuapp.com/admin/usuarios"
        }).catch(e => console.log(e))
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow} type="submit">Novo usuário</Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Criar novo usuário</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formBasiUsername">
                            <Form.Label>Nome do usuário</Form.Label>
                            <Form.Control onChange={onChangeUsername} required type="text" placeholder="Leonardo Gomes Assunção" />
                        </Form.Group>

                        <Form.Group controlId="formBasicUser">
                            <Form.Label>Usuário</Form.Label>
                            <Form.Control onChange={onChangeUser} required type="text" placeholder="leonardo.assuncao1513" />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Senha</Form.Label>
                            <Form.Control onChange={onChangePassword} required type="text" placeholder="Password" />
                        </Form.Group>

                        <Form.Group controlId="formBasicButtonSend">
                            <Button onClick={handleClose} variant="secondary" className='mr-1' >Cancelar</Button>
                            <Button onClick={handleCreate} variant="primary">Criar</Button>
                        </Form.Group>
                    </Form>
                </Modal.Body>

            </Modal>
        </>
    );
}

export default UserModal