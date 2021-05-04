import React, { useEffect, useState } from 'react';

import { Container, Row, Table, Button, Form, Modal } from 'react-bootstrap';
import WordModal from '../Modals/WordModal';
import axios from '../../api/axios'
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const base = process.env.NODE_ENV === 'production' ? 'https://forca-jogo.herokuapp.com' : 'https://forca-jogo.herokuapp.com'

const dificult = ['Fácil', 'Médio', 'Difícil']

const WordTable = () => {

    const [words, setWords] = useState([]);
    const [inputWord, setInputWord] = useState([]);
    const [inputCodWord, setInputCodWord] = useState([]);
    const [show, setShow] = useState(false);
    const [categories, setCategories] = useState();
    const [inputCodCategory, setInputCodCategory] = useState();
    const [inputDificult, setInputDificult] = useState();

    const getCategories = () => {
        axios.get('/categories').then(r => {
            setCategories(r.data)
        })
    }

    const onChangeDificult = e => {
        setInputDificult(e.target.value)
    }


    const handleClose = () => {
        setShow(false)
    }

    const handleShow = () => setShow(true);

    const onChangeWord = e => {
        setInputWord(e.target.value.trim())
    }

    const onChangeCodCategoria = e => {
        setInputCodCategory(e.target.value.trim())
    }

    useEffect(() => {
        getWords()
        getCategories()
    }, [])

    const getWords = () => {
        axios.get('/words').then(r => {
            setWords(r.data)
        })
    }

    const deleteWord = id => {
        // eslint-disable-next-line no-restricted-globals
        if (confirm("Deseja realmente excluir?")) {
            axios.delete(`/words/remove-word/?id=${id}`).then(r => {
                window.location.href = `${base}/admin/palavras`
            }).catch(e => console.log(e))
        }
    }

    const handleSaveEdit = e => {
        e.preventDefault()

        if (!inputWord || !inputCodCategory || !inputCodWord || !inputDificult || inputDificult==0 || inputCodCategory==0) return
    
        const data = {
            "nome_palavra": inputWord,
            "fk_cod_categoria": inputCodCategory,
            "dificuldade": inputDificult,
        }

        axios.put("/words/edit-word/?id=" + inputCodWord, data).then(r => {
            window.location.href = `${base}/admin/palavras`
        }).catch(e => console.log(e))
    }

    return (
        <Container className='mt-4'>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Palavra</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formBasiWordEdit">
                            <Form.Label>Nome do Palavra</Form.Label>
                            <Form.Control value={inputWord} onChange={onChangeWord} required type="text" placeholder="Comidas" />
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

                        <Form.Group controlId="formBasicButtonSend11">
                            <Button onClick={handleClose} variant="secondary" className='mr-1' >Cancelar</Button>
                            <Button onClick={handleSaveEdit} variant="primary">Salvar</Button>
                        </Form.Group>
                    </Form>
                </Modal.Body>

            </Modal>
            <Row className='mb-2'>
                <WordModal />
            </Row>
            <Row>
                <Table striped bordered hover >
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nome Palavra</th>
                            <th>Difuldade</th>
                            <th>Categoria</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {words.map((word, index) => {
                            return ((
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{word.nome_palavra}</td>
                                    <td>{dificult[word.dificuldade - 1]}</td>
                                    <td>{word.nome_categoria}</td>
                                    <td>
                                        <FontAwesomeIcon onClick={() => {
                                            setInputCodWord(word.pk_cod_palavra)
                                            setInputWord(word.nome_palavra)
                                            handleShow()
                                        }} icon={faEdit} />
                                        <FontAwesomeIcon onClick={() => deleteWord(word.pk_cod_palavra)} className='ml-2' icon={faTrash} />
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

export default WordTable;