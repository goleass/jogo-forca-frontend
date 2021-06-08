import React, { useState } from 'react';

import { Alert, Button, Form, Modal } from 'react-bootstrap'

import axios from '../../api/axios'

const base = process.env.NODE_ENV === 'production' ? 'https://forca-jogo.herokuapp.com' : 'https://forca-jogo.herokuapp.com'

const UserModal = () => {
    const [show, setShow] = useState(false);
    const [inputUsername, setInputUsername] = useState();
    const [inputUser, setInputUser] = useState();
    const [inputPassword, setInputPassword] = useState();
    const [showAlert, setShowAlert] = useState(false);
    const [textAlert, setTextAlert] = useState("erro");

    const handleClose = () => {
        setShowAlert(false)
        setInputPassword("")
        setInputUser("")
        setInputUsername("")
        setShow(false)
    }

    const handleShow = () => setShow(true);

    const onChangeUsername = e => {
        setInputUsername(e.target.value.trim())
    }

    const onChangeUser = e => {
        // setInputWord(e.target.value.toUpperCase())
        var filter_nome = /^([A-Z\d.]|\s+)+$/;

        // setLetter(e.target.value.toUpperCase())
        if (filter_nome.test(e.target.value.toUpperCase())) {
            setInputUser(e.target.value.toLowerCase().replace("[A-Zd.]+", "").trim())
        }
    }

    const onChangePassword = e => {
        setInputPassword(e.target.value.trim())
    }

    const handleCreate = async function (e) {
        e.preventDefault()

        if (!inputUsername || !inputUser || !inputPassword) return

        const user = await axios.get(`/users/get-user-name/?usuario=${inputUser.trim()}`)

        if (user.data.user && user.data.user.nome_usuario) {
            setTextAlert("Usuário já cadastrado.")
            setShowAlert(true)
            return
        }

        const data = {
            "nome_usuario": inputUsername.trim(),
            "usuario": inputUser.trim(),
            "senha": inputPassword
        }

        axios.post('/users/new-user', data).then(r => {
            window.location.href = `${base}/admin/usuarios`
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
                        <Alert show={showAlert} variant="danger">{textAlert}</Alert>
                        <Form.Group controlId="formBasiUsername">
                            <Form.Label>Nome do usuário</Form.Label>
                            <Form.Control onChange={onChangeUsername} required type="text" placeholder="Leonardo Gomes Assunção" />
                        </Form.Group>

                        <Form.Group controlId="formBasicUser">
                            <Form.Label>Usuário</Form.Label>
                            <Form.Control onChange={onChangeUser} value={inputUser} required type="text" placeholder="leonardo.assuncao1513" />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Senha</Form.Label>
                            <Form.Control onChange={onChangePassword} required type="text" placeholder="Password" />
                        </Form.Group>

                        <Form.Group controlId="formBasicButtonSend">
                            <Button onClick={handleClose} variant="secondary" className='mr-1' >Cancelar</Button>
                            <Button onClick={handleCreate} disabled={!inputUsername || !inputPassword || !inputUser} variant="primary">Criar</Button>
                        </Form.Group>
                    </Form>
                </Modal.Body>

            </Modal>
        </>
    );
}

export default UserModal