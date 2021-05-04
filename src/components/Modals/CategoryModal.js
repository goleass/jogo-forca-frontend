import React, { useState } from 'react';

import { Button, Form, Modal } from 'react-bootstrap'

import axios from '../../api/axios'

const base = process.env.NODE_ENV==='production'?'https://forca-jogo.herokuapp.com':'https://forca-jogo.herokuapp.com'

const CategoryModal = () => {
    const [show, setShow] = useState(false);
    const [inputCategory, setInputCategory] = useState();

    const handleClose = () => {
        setShow(false)
    }

    const handleShow = () => setShow(true);

    const onChangeCategory = e => {
        setInputCategory(e.target.value.trim())
    }

    const handleCreate = e => {
        e.preventDefault()

        if (!inputCategory) return

        const data = {
            "nome_categoria": inputCategory
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
                        <Form.Group controlId="formBasiUsername">
                            <Form.Label>Nome da Categoria</Form.Label>
                            <Form.Control onChange={onChangeCategory} required type="text" placeholder="Comidas" />
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

export default CategoryModal