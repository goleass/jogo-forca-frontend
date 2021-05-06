import React, { useState } from 'react'
import { Button, Container, Row } from 'react-bootstrap'

import './styles.css'

import imagem6 from '../../assets/6.png'
import imagem5 from '../../assets/5.png'
import imagem4 from '../../assets/4.png'
import imagem3 from '../../assets/3.png'
import imagem2 from '../../assets/2.png'
import imagem1 from '../../assets/1.png'
import imagem0 from '../../assets/0.png'

const defaultLetters = [{ letter: 'A', status: false }, { letter: 'B', status: false }, { letter: 'C', status: false }, { letter: 'D', status: false }, { letter: 'E', status: false }, { letter: 'F', status: false }, { letter: 'G', status: false }, { letter: 'H', status: false }, { letter: 'I', status: false }, { letter: 'J', status: false }, { letter: 'K', status: false }, { letter: 'L', status: false }, { letter: 'M', status: false }, { letter: 'N', status: false }, { letter: 'O', status: false }, { letter: 'P', status: false }, { letter: 'Q', status: false }, { letter: 'R', status: false }, { letter: 'S', status: false }, { letter: 'T', status: false }, { letter: 'U', status: false }, { letter: 'V', status: false }, { letter: 'W', status: false }, { letter: 'X', status: false }, { letter: 'Y', status: false }, { letter: 'Z', status: false }]

const Canvas = () => {
    const [letters, setLetters] = useState(defaultLetters)
    const [letter, setLetter] = useState('')
    const [life, setLife] = useState(6)

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
        if (letter.length === 0 && filter_nome.test(e.target.value.toUpperCase())) {
            setLetter(e.target.value.toUpperCase().replace("[A-Z]+", ""))
        } else {
            setLetter('')
        }
    }

    return (
        <Container className='container-canvas'>
            <Row className='canvas-header'>
                <span className>Pontuação: 5</span>
                <span className>Vidas: {life}</span>
            </Row>
            <Row className='canvas-main'>
                <div id='teste' className='desenhos'>
                    {(life === 0) && <img width='200' src={imagem0} />}
                    {(life === 1) && <img width='200' src={imagem1} />}
                    {(life === 2) && <img width='200' src={imagem2} />}
                    {(life === 3) && <img width='200' src={imagem3} />}
                    {(life === 4) && <img width='200' src={imagem4} />}
                    {(life === 5) && <img width='200' src={imagem5} />}
                    {(life === 6) && <img width='200' src={imagem6} />}
                </div>
                <div className='pontilhado-palavra'>cdc</div>
                <div className='div-input-letra'>
                    <input className='input-letra' placeholder='Digite uma letra' onChange={handleLetter} value={letter} />
                    <Button onClick={() => { 
                        changeLetterStatus() 
                        if(life>0)setLife(life-1)
                    }}>Enviar</Button>
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