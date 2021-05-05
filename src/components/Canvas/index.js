import React, { useState } from 'react'
import { Button, Container, Row } from 'react-bootstrap'

import './styles.css'

const defaultLetters = [{ letter: 'A', status: false }, { letter: 'B', status: false }, { letter: 'C', status: false }, { letter: 'D', status: false }, { letter: 'E', status: false }, { letter: 'F', status: false }, { letter: 'G', status: false }, { letter: 'H', status: false }, { letter: 'I', status: false }, { letter: 'J', status: false }, { letter: 'K', status: false }, { letter: 'L', status: false }, { letter: 'M', status: false }, { letter: 'N', status: false }, { letter: 'O', status: false }, { letter: 'P', status: false }, { letter: 'Q', status: false }, { letter: 'R', status: false }, { letter: 'S', status: false }, { letter: 'T', status: false }, { letter: 'U', status: false }, { letter: 'V', status: false }, { letter: 'W', status: false }, { letter: 'X', status: false }, { letter: 'Y', status: false }, { letter: 'Z', status: false }]

const Canvas = () => {
    const [letters, setLetters] = useState(defaultLetters)
    const [letter, setLetter] = useState('')
    const [life, setLife] = useState(5)

    const word = 'Leonardo'

    const changeLetterStatus = () => {
        let lett = letters.map(l => {
            if (l.letter === letter) {
                return { letter: l.letter, status: true }
            }
            return l
        })

        setLetters(lett)
    }

    const handleLetter = e => {
        var filter_nome = /^([A-Z]|\s+)+$/;
        
        // setLetter(e.target.value.toUpperCase())
        if(letter.length === 0 && filter_nome.test(e.target.value.toUpperCase())){
            setLetter(e.target.value.toUpperCase().replace("[A-Z]+",""))
        }else{
            setLetter('')
        }
    }

    return (
        <Container className='container-canvas'>
            <Row className='canvas-header'>
                <span className>Pontuação: 5</span>
                <span className>Vidas: 5</span>
            </Row>
            <Row className='canvas-main'>
                <div className='desenhos'>cdd</div>
                <div className='pontilhado-palavra'>cdc</div>
                <div className='div-input-letra'>
                    <input className='input-letra' placeholder='Digite uma letra' onChange={handleLetter} value={letter} />
                    <Button onClick={() => changeLetterStatus()}>Enviar</Button>
                </div>
            </Row>
            <Row className='canvas-footer'>
                {letters && letters.map(l => {
                    return (
                        <span className={l.status && 'selected'}>&nbsp;{l.letter}&nbsp;</span>
                    )
                })}
            </Row>
        </Container>

    )
}

export default Canvas