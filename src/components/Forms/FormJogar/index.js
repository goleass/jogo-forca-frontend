import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'

import axios from '../../../api/axios'
import './styles.css'

import { useShowCanvasGame } from "../../../context/ShowCanvasGame";

const FormJogar = () => {
    const [categoryInput, setCategoryInput] = useState(null)
    const [dificultInput, setDificultInput] = useState(null)
    const [categories, setCategories] = useState([])
    const [next, setNext] = useState(false)
    const { showCanvasGame, setShowCanvasGame } = useShowCanvasGame()

    const getCategories = () => {
        axios.get('/categories').then(r => {
            setCategories(r.data)
        })
    }

    useEffect(() => {
        getCategories()
    }, [])

    useEffect(() => {
        if (categoryInput && categoryInput != 0 && dificultInput && dificultInput != 0) { setNext(true) }
        else setNext(false)
    }, [categoryInput, dificultInput])

    return (
        <div className='jogo-container-form'>
            <Form.Group>
                <h1 className='table-title-form-play'>FORCA</h1>
            </Form.Group>
            <Form.Group controlId="formBasicCategory">
                <Form.Label>Categoria</Form.Label>
                <Form.Control as="select" size="small" onChange={e => setCategoryInput(e.target.value)}>
                    <option value={0}>Selecione...</ option>
                    {categories && categories.map(c => {
                        return (
                            <option key={c.pk_cod_categoria} value={c.pk_cod_categoria} >{c.nome_categoria}</ option>
                        )
                    })}

                </Form.Control>
            </Form.Group>

            <Form.Group controlId="formBasicDificult">
                <Form.Label>Dificuldade</Form.Label>
                <Form.Control as="select" size="small" onChange={e => setDificultInput(e.target.value)}>
                    <option value={0}>Selecione...</ option>
                    <option value='1' >Fácil</ option>
                    <option value='2' >Médio</ option>
                    <option value='3' >Difícil</ option>
                </Form.Control>
            </Form.Group>

            <Form.Group>
                {console.log(showCanvasGame)}
                <Button onClick={() => setShowCanvasGame(true)} variant="primary" disabled={!next} size="lg" block>Jogar</Button>
            </Form.Group>
        </div>
    )
}

export default FormJogar