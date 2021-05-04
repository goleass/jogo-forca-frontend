import React, { useState, useEffect } from 'react';

import { Button, Form, Modal } from 'react-bootstrap'

import axios from '../../api/axios'

const base = process.env.NODE_ENV === 'production' ? 'https://forca-jogo.herokuapp.com' : 'http://localhost:3000'

const WordModal = () => {
    const [categories, setCategories] = useState();
    const [show, setShow] = useState(false);
    const [inputWord, setInputWord] = useState();
    const [inputCodCategory, setInputCodCategory] = useState();
    const [inputDificult, setInputDificult] = useState();

    const getCategories = () => {
        axios.get('/categories').then(r => {
            setCategories(r.data)
        })
    }

    useEffect(() => {
        const cat = getCategories()
    }, [])

    const handleClose = (e) => {
        setShow(false)
    }

    const handleShow = (e) => {
        setShow(true);
    }

    const onChangeWord = e => {
        setInputWord(e.target.value.trim())
    }

    const onChangeCodCategoria = e => {
        setInputCodCategory(e.target.value.trim())
    }

    const onChangeDificult = e => {
        setInputDificult(e.target.value)
    }

    const handleCreate = e => {
        e.preventDefault()  

        if (!inputWord || !inputDificult || !inputCodCategory || inputCodCategory==0 || inputDificult==0) return

        const data = {
            "nome_palavra": inputWord,
            "fk_cod_categoria": inputCodCategory,
            "dificuldade": inputDificult,
        }

        axios.post('/words/new-word', data).then(r => {
            window.location.href = `${base}/admin/palavras`
        }).catch(e => console.log(e))
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow} >Nova Palavra</Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Criar nova Palavra</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formBasicWord">
                            <Form.Label>Nome da Palavra</Form.Label>
                            <Form.Control onChange={onChangeWord} required type="text" placeholder="Cachorro" />
                        </Form.Group>

                        <Form.Group controlId="formBasicCategory">
                            <Form.Label>Categoria</Form.Label>
                            <Form.Control as="select" size="small" onChange={onChangeCodCategoria}>
                                <option value={0}>Selecione...</ option>
                                {categories && categories.map(category => {
                                    return (<option value={category.pk_cod_categoria} key={category.pk_cod_categoria}>{category.nome_categoria}</option>)
                                })}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="formBasicDificult">
                            <Form.Label>Dificuldade</Form.Label>
                            <Form.Control as="select" size="small" onChange={onChangeDificult}>
                                <option value={0}>Selecione...</ option>
                                <option value='1' >Fácil</ option>
                                <option value='2' >Médio</ option>
                                <option value='3' >Difícil</ option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="formBasicButtonSend10">
                            <Button onClick={handleClose} variant="secondary" className='mr-1' >Cancelar</Button>
                            <Button onClick={handleCreate} variant="primary">Criar</Button>
                        </Form.Group>
                    </Form>
                </Modal.Body>

            </Modal>
        </>
    );
}

export default WordModal