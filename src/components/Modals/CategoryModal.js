import React, { useState } from 'react';

import { Alert,Button, Form, Modal } from 'react-bootstrap'

import axios from '../../api/axios'

const base = process.env.NODE_ENV==='production'?'https://forca-jogo.herokuapp.com':'https://forca-jogo.herokuapp.com'

const CategoryModal = () => {
    const [show, setShow] = useState(false);
    const [inputCategory, setInputCategory] = useState();
    const [showAlert, setShowAlert] = useState(false);
    const [textAlert, setTextAlert] = useState("erro");

    const handleClose = () => {
        setShowAlert(false)
        setShow(false)
    }

    const handleShow = () => {
        setInputCategory('')
        setShow(true)
    }

    const onChangeCategory = e => {
        setInputCategory(e.target.value.toUpperCase())
    }

    const handleCreate = async function(e) {
        e.preventDefault()

        if (!inputCategory) return

        const category = await axios.get(`/categories/get-category-name/?nome_categoria=${inputCategory.trim()}`)

        if(category.data.category && category.data.category.nome_categoria){
            setTextAlert("Categoria já cadastrada.")
            setShowAlert(true)
            return
        }

        const data = {
            "nome_categoria": inputCategory.trim()
        }

        axios.post('/categories/new-category', data).then(r => {
            window.location.href=`${base}/admin/categorias`
        }).catch(e => console.log(e))
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow} type="submit">Nova Categoria</Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Criar nova Categoria</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Alert show={showAlert} variant="danger">{textAlert}</Alert>
                        <Form.Group controlId="formBasiUsername">
                            <Form.Label>Nome da Categoria</Form.Label>
                            <Form.Control onChange={onChangeCategory} value={inputCategory} required type="text" placeholder="Comidas" />
                        </Form.Group>

                        <Form.Group controlId="formBasicButtonSend">
                            <Button onClick={handleClose} variant="secondary" className='mr-1' >Cancelar</Button>
                            <Button onClick={handleCreate} disabled={!(inputCategory && inputCategory.toString().trim())} variant="primary">Criar</Button>
                        </Form.Group>
                    </Form>
                </Modal.Body>

            </Modal>
        </>
    );
}

export default CategoryModal