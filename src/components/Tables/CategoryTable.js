import React, { useEffect, useState } from 'react';

import { Container, Row, Table, Button, Form, Modal, Alert } from 'react-bootstrap';
import UserModal from '../Modals/CategoryModal';
import axios from '../../api/axios'
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const base = process.env.NODE_ENV === 'production' ? 'https://forca-jogo.herokuapp.com' : 'https://forca-jogo.herokuapp.com'

const CategoryTable = () => {

    const [categories, setCategories] = useState([]);
    const [inputCategory, setInputcategory] = useState([]);
    const [inputCodCategory, setInputCodcategory] = useState([]);
    const [show, setShow] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [textAlert, setTextAlert] = useState("erro");

    const handleClose = () => {
        setShowAlert(false)
        setShow(false)
    }

    const handleShow = () => setShow(true);

    const onChangeCategory = e => {
        setInputcategory(e.target.value.toUpperCase())
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

    const handleSaveEdit = async function(e) {
        e.preventDefault()

        if (!inputCategory) return

        const category = await axios.get(`/categories/get-category-name/?nome_categoria=${inputCategory.trim()}`)
        console.log(category.data.category);
        if(category.data.category && category.data.category.nome_categoria && (category.data.category.pk_cod_categoria!=inputCodCategory)){
            setTextAlert("Categoria já cadastrada.")
            setShowAlert(true)
            return
        }

        const data = {
            "nome_categoria": inputCategory.trim()
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
                        <Alert show={showAlert} variant="danger">{textAlert}</Alert>
                        <Form.Group controlId="formBasiUsername">
                            <Form.Label>Nome do Categoria</Form.Label>
                            <Form.Control onChange={onChangeCategory} value={inputCategory} required="true" type="text" placeholder="Comidas" />
                        </Form.Group>

                        <Form.Group controlId="formBasicButtonSend">
                            <Button onClick={handleClose} variant="secondary" className='mr-1' >Cancelar</Button>
                            <Button onClick={handleSaveEdit} disabled={!(inputCategory && inputCategory.toString().trim())} variant="primary">Salvar</Button>
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