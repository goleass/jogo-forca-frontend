import React, { useEffect, useState } from 'react';

import { Container, Row, Table,Button, Form, Modal } from 'react-bootstrap';
import UserModal from '../Modals/UserModal';  
import axios from '../../api/axios'
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const UserTable = () => {

    const [users, setUsers] = useState([]);
    const [show, setShow] = useState(false);
    const [inputUsername, setInputUsername] = useState();
    const [inputUser, setInputUser] = useState();
    const [inputPassword, setInputPassword] = useState();
    const [inputCodUser, setInputCodUser] = useState();

    const handleClose = () => {
        setShow(false)
    }

    const handleShow = () => setShow(true);

    const onChangeUsername = e => {
        setInputUsername(e.target.value.trim())
    }

    const onChangeUser = e => {
        setInputUser(e.target.value.trim())
    }

    const onChangePassword = e => {
        setInputPassword(e.target.value.trim())
    }

    useEffect(() => {
        getUsers()
    }, [])

    const getUsers = () => {
        axios.get('/users').then(r => {
            setUsers(r.data)
        })
    }

    const deleteUser = id => {
        // eslint-disable-next-line no-restricted-globals
        if (confirm("Deseja realmente excluir?")) {
            axios.delete(`/users/remove-user/?id=${id}`).then(r => {
                window.location.href = "https://forca-jogo.herokuapp.com/admin/usuarios"
            }).catch(e => console.log(e))
        }
    }

    const handleSaveEdit = e => {
        e.preventDefault()
        
        if (!inputUsername || !inputUser || !inputPassword) return
        
        const data = {
            "nome_usuario": inputUsername,
            "usuario": inputUser,
            "senha": inputPassword
        }

        axios.put("/users/edit-user/?id="+inputCodUser, data).then(r => {
            window.location.href="https://forca-jogo.herokuapp.com/admin/usuarios"
        }).catch(e => console.log(e))
    }

    return (
        <Container className='mt-4'>
                        <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Criar novo usuário</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formBasiUsername">
                            <Form.Label>Nome do usuário</Form.Label>
                            <Form.Control value={inputUsername} onChange={onChangeUsername} required type="text" placeholder="Leonardo Gomes Assunção" />
                        </Form.Group>

                        <Form.Group controlId="formBasicUser">
                            <Form.Label>Usuário</Form.Label>
                            <Form.Control value={inputUser} onChange={onChangeUser} required type="text" placeholder="leonardo.assuncao1513" />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Senha</Form.Label>
                            <Form.Control value={inputPassword} onChange={onChangePassword} required type="text" placeholder="Password" />
                        </Form.Group>

                        <Form.Group controlId="formBasicButtonSend">
                            <Button onClick={handleClose} variant="secondary" className='mr-1' >Cancelar</Button>
                            <Button onClick={handleSaveEdit} variant="primary">Salvar</Button>
                        </Form.Group>
                    </Form>
                </Modal.Body>

            </Modal>
            <Row className='mb-2'>
                <UserModal />
            </Row>
            <Row>
                <Table striped bordered hover >
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nome</th>
                            <th>Username</th>
                            <th>Senha</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => {
                            return ((
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{user.nome_usuario}</td>
                                    <td>{user.usuario}</td>
                                    <td>{user.senha}</td>
                                    <td>
                                        <FontAwesomeIcon onClick={() => {
                                            console.log(user)
                                            setInputCodUser(user.pk_cod_usuario)
                                            setInputUsername(user.nome_usuario)
                                            setInputUser(user.usuario)
                                            setInputPassword(user.senha)
                                            handleShow()
                                        }} icon={faEdit} />
                                        <FontAwesomeIcon onClick={() => deleteUser(user.pk_cod_usuario)} className='ml-2' icon={faTrash} />
                                    </td>
                                </tr>
                            ))
                        }
                        )}
                    </tbody>
                </Table>
            </Row>
        </Container>
    );
}

export default UserTable;