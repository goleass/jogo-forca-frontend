import React, { useEffect, useState } from 'react'

import { Button, Form } from 'react-bootstrap'

import './styles.css'

const FormJogar = () => {
    const [ categoryInput, setCategoryInput ] = useState(null)
    const [ dificultInput, setDificultInput ] = useState(null)

    return (
        <div className='jogo-container-form'>
            <Form.Group>
                <h1 className='table-title-form-play'>FORCA</h1>
            </Form.Group>
            <Form.Group controlId="formBasicCategory">
                <Form.Label>Categoria</Form.Label>
                <Form.Control as="select" size="small" onChange={e => setCategoryInput(e.target.value)}>
                    <option value={0}>Selecione...</ option>
                    <option value='1' >Comidas</ option>
                    <option value='2' >Carros</ option>
                    <option value='3' >Flores</ option>
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
                <Button onClick={() => console.log('teste')} variant="primary" size="lg" block>Jogar</Button>
            </Form.Group>
        </div>
    )
}

export default FormJogar