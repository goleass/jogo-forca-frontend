import React, { useState, useEffect } from 'react';

import { Alert,Button, Form, Modal } from 'react-bootstrap'

import axios from '../../api/axios'

const base = process.env.NODE_ENV === 'production' ? 'https://forca-jogo.herokuapp.com' : 'https://forca-jogo.herokuapp.com'

const WordModal = () => {
    const [categories, setCategories] = useState();
    const [show, setShow] = useState(false);
    const [inputWord, setInputWord] = useState();
    const [inputCodCategory, setInputCodCategory] = useState();
    const [inputDificult, setInputDificult] = useState();
    const [showAlert, setShowAlert] = useState(false);
    const [textAlert, setTextAlert] = useState("erro");

    const getCategories = () => {
        axios.get('/categories').then(r => {
            setCategories(r.data)
        })
    }

    useEffect(() => {
        const cat = getCategories()
    }, [])

    const handleClose = (e) => {
        setShowAlert(false)
        setInputCodCategory("")
        setInputDificult("")
        setShow(false)
    }

    const handleShow = (e) => {
        setShow(true);
        setInputWord('')
    }

    const onChangeWord = e => {
        // setInputWord(e.target.value.toUpperCase())
        var filter_nome = /^([A-Z-_]|\s+)+$/;

        // setLetter(e.target.value.toUpperCase())
        if (filter_nome.test(e.target.value.toUpperCase())) {
            setInputWord(e.target.value.toUpperCase().replace("[A-Z]+", ""))
        }
    }

    const onChangeCodCategoria = e => {
        setInputCodCategory(e.target.value.trim())
    }

    const onChangeDificult = e => {
        setInputDificult(e.target.value)
    }

    const handleCreate = async function(e) {
        e.preventDefault()
        if (!inputWord || !inputDificult || !inputCodCategory || inputCodCategory==0 || inputDificult==0) {
            return
        }

        const word = await axios.get(`/words/get-word-name/?nome_palavra=${inputWord}`)

        if(word.data.word && word.data.word.nome_palavra){
            setTextAlert("Palavra já cadastrada.")
            setShowAlert(true)
            return
        }

        const data = {
            "nome_palavra": inputWord.trim(),
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
                        <Alert show={showAlert} variant="danger">{textAlert}</Alert>
                        <Form.Group controlId="formBasicWord">
                            <Form.Label>Nome da Palavra</Form.Label>
                            <Form.Control onChange={onChangeWord} value={inputWord} required type="text" placeholder="Cachorro" />
                        </Form.Group>

                        <Form.Group controlId="formBasicCategory">
                            <Form.Label>Categoria</Form.Label>
                            <Form.Control as="select" size="small" onChange={onChangeCodCategoria}>
                                <option value={0}>Selecione...</ option>
                                {categories && categories.map(category => {
                                    return (
                                        <option 
                                            value={category.pk_cod_categoria} 
                                            key={category.pk_cod_categoria}>
                                                {category.nome_categoria}
                                        </option>)
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
                            <Button onClick={handleCreate} disabled={!(inputWord && inputWord.trim()) || inputCodCategory==0 || !inputCodCategory || inputDificult==0 || !inputDificult} variant="primary">Criar</Button>
                        </Form.Group>
                    </Form>
                </Modal.Body>

            </Modal>
        </>
    );
}

export default WordModal