import React, { useEffect, useState } from 'react';

import { Container, Row, Table, Button, Form, Modal } from 'react-bootstrap';
import UserModal from '../Modals/CategoryModal';
import axios from '../../api/axios'
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const base = process.env.NODE_ENV === 'production' ? 'https://forca-jogo.herokuapp.com' : 'http://localhost:3000'

const CategoryTable = () => {

    const [categories, setCategories] = useState([]);
    const [inputCategory, setInputcategory] = useState([]);
    const [inputCodCategory, setInputCodcategory] = useState([]);
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false)
    }

    const handleShow = () => setShow(true);

    const onChangeCategory = e => {
        setInputcategory(e.target.value.trim())
    }

    useEffect(() => {
        getCategories()
    }, [])

    const getCategories = () => {
        axios.get('/categories').then(r => {
            setCategories(r.data)
        })
    }

    const deleteCategory = id => {
        // eslint-disable-next-line no-restricted-globals
        if (confirm("Deseja realmente excluir?")) {
            axios.delete(`/categories/remove-category/?id=${id}`).then(r => {
                window.location.href = `${base}/admin/categorias`
            }).catch(e => console.log(e))
        }
    }

    const handleSaveEdit = e => {
        e.preventDefault()

        if (!inputCategory) return

        const data = {
            "nome_categoria": inputCategory
        }

        axios.put("/categories/edit-category/?id=" + inputCodCategory, data).then(r => {
            window.location.href = `${base}/admin/categorias`
        }).catch(e => console.log(e))
    }

    return (
        <Container className='mt-4'>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Categoria</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formBasiUsername">
                            <Form.Label>Nome do Categoria</Form.Label>
                            <Form.Control value={inputCategory} onChange={onChangeCategory} required type="text" placeholder="Comidas" />
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
                            <th>Nome Categoria</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((category, index) => {
                            return ((
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{category.nome_categoria}</td>
                                    <td>
                                        <FontAwesomeIcon onClick={() => {
                                            setInputCodcategory(category.pk_cod_categoria)
                                            setInputcategory(category.nome_categoria)
                                            handleShow()
                                        }} icon={faEdit} />
                                        <FontAwesomeIcon onClick={() => deleteCategory(category.pk_cod_categoria)} className='ml-2' icon={faTrash} />
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

export default CategoryTable;