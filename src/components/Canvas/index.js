import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap'

import axios from '../../api/axios'

import './styles.css'

import imagem6 from '../../assets/6.png'
import imagem5 from '../../assets/5.png'
import imagem4 from '../../assets/4.png'
import imagem3 from '../../assets/3.png'
import imagem2 from '../../assets/2.png'
import imagem1 from '../../assets/1.png'
import imagem0 from '../../assets/0.png'
import { useShowCanvasGame } from '../../context/ShowCanvasGame'

const defaultLetters = [{ letter: 'A', status: false }, { letter: 'B', status: false }, { letter: 'C', status: false }, { letter: 'D', status: false }, { letter: 'E', status: false }, { letter: 'F', status: false }, { letter: 'G', status: false }, { letter: 'H', status: false }, { letter: 'I', status: false }, { letter: 'J', status: false }, { letter: 'K', status: false }, { letter: 'L', status: false }, { letter: 'M', status: false }, { letter: 'N', status: false }, { letter: 'O', status: false }, { letter: 'P', status: false }, { letter: 'Q', status: false }, { letter: 'R', status: false }, { letter: 'S', status: false }, { letter: 'T', status: false }, { letter: 'U', status: false }, { letter: 'V', status: false }, { letter: 'W', status: false }, { letter: 'X', status: false }, { letter: 'Y', status: false }, { letter: 'Z', status: false }]
const wordTest = {
    word: "LEONARDO",
    splitWord: [
        { letter: 'L', show: false },
        { letter: 'E', show: false },
        { letter: 'O', show: false },
        { letter: 'N', show: false },
        { letter: 'A', show: false },
        { letter: 'R', show: false },
        { letter: 'D', show: false },
        { letter: 'O', show: false }
    ]
}

const base = process.env.NODE_ENV === 'production' ? 'https://forca-jogo.herokuapp.com' : 'https://forca-jogo.herokuapp.com'


const Canvas = () => {
    const [letters, setLetters] = useState(defaultLetters)
    const [letter, setLetter] = useState('')
    const [life, setLife] = useState(6)
    const [score, setScore] = useState(0)
    const [show, setShow] = useState(false)
    const [word, setWord] = useState(wordTest)
    const [nameRanking, setNameRanking] = useState("")
    const { category, dificult } = useShowCanvasGame()

    useEffect(() => {
        getWord()
    }, [])

    useEffect(() => {
        if (isWinner()) {
            setScore(score + (dificult * 100))
        }
        else if (isDead()) {
            let sum = 0
            word.splitWord.forEach(w => {
                if (w.show) sum = sum + 5
            })

            setScore(score + sum)

            setShow(true)
        }
    }, [word])

    const split_word = word => {
        let split = []
        for (let index = 0; index < word.length; index++) {
            split.push(word[index])
        }
        return split
    }

    const getWord = () => {
        axios.get(`/words/get-word/?dificuldade=${dificult}&categoria=${category}`)
            .then(r => {
                const w = {
                    word: r.data,
                    splitWord: split_word(r.data).map(v => {
                        console.log(`letra: ${v}`)
                        if (v == ' ' || v == '-') {
                            return { letter: v, show: true }
                        } else {
                            return { letter: v, show: false }
                        }

                    })
                }

                setWord(w)
                console.log(word)
            })
    }

    const changeLetterStatus = () => {
        let lett = letters.map(l => {
            if (
                l.letter.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase() ===
                letter.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase()) {
                return { letter: l.letter, status: true }
            }
            return l
        })

        setLetters(lett)
    }

    const isSent = () => {
        let result = false

        letters.map(l => {
            if (l.letter.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase() ===
                letter.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase()) {
                result = l.status
            }
        })

        return result
    }

    const backAndSetRanking = () => {
        newRanking()
        window.location.href = `${base}`
    }

    const newRanking = () => {

        if (!nameRanking || !score) return

        const data = {
            "nome_ranking": nameRanking,
            score
        }

        axios.post('/ranking/new-ranking', data).then(r => {

        }).catch(e => console.log(e))
    }

    const jogar = () => {

        if (life > 0) { // verifica se tem vidas ainda

            if (letter && letter !== ' ' && !isSent()) { // verifica se a letra não foi enviada

                const result = isRight()
                if (!result) {
                    setLife(life - 1)
                }

            }
            changeLetterStatus()
        }

        if (isWinner()) {
            newWord()
        }
        setLetter('')
    }

    const newWord = () => {
        setLetters(defaultLetters)
        getWord()
    }

    const isRight = () => {
        let result = false

        const w = word.splitWord.map(l => {
            if (l.letter.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase() ===
                letter.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase()) {
                l.show = true
                result = true
            }
            return l
        })

        setWord({ word: word.word, splitWord: w })

        return result
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

    const isDead = () => {
        if (life == 0) {
            return true
        }

        return false
    }

    const isWinner = () => {
        let count = 0
        word.splitWord.forEach(l => {
            if (l.show) count++
        })

        return count == word.splitWord.length
    }

    const handleClose = (e) => {
        setShow(false)
    }

    return (
        <Container className='container-canvas'>
            <Row className='canvas-header'>
                <span className>Pontuação: {score}</span>
                <span className>Vidas: {life}</span>
            </Row>
            <Row className='canvas-main'>
                <Col>

                    <Row className="justify-content-center"><div id='teste' className='desenhos'>
                        {(life === 0) && <img width='200' src={imagem0} />}
                        {(life === 1) && <img width='200' src={imagem1} />}
                        {(life === 2) && <img width='200' src={imagem2} />}
                        {(life === 3) && <img width='200' src={imagem3} />}
                        {(life === 4) && <img width='200' src={imagem4} />}
                        {(life === 5) && <img width='200' src={imagem5} />}
                        {(life === 6) && <img width='200' src={imagem6} />}
                    </div>
                    </Row>
                    <Row className="justify-content-center"><div className='pontilhado-palavra'>
                        {word && word.splitWord.map(l => {
                            if (l.show) {
                                return (<span className='letra-que-aparece'>{l.letter}</span>)
                            } else return (<span className='letra-que-aparece'>&nbsp;_&nbsp;</span>)
                        })}
                    </div>
                    </Row>
                    <Row className="justify-content-center">  <div className='div-input-letra'>
                        <input className='input-letra' placeholder='Digite uma letra' onChange={handleLetter} value={letter} />
                        <Button onClick={() => jogar()}>Enviar</Button>
                    </div>
                    </Row>


                </Col>
            </Row>
            <Row className='canvas-footer'>
                {letters && letters.map((l, i) => {
                    return (
                        <span key={i} className={l.status && 'selected'}>&nbsp;{l.letter}&nbsp;</span>
                    )
                })}
            </Row>
            <Modal backdrop="static" show={show}>
                <Modal.Header closeButton>
                    <Modal.Title>Você perdeu !</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formBasicWord">
                            <Form.Label>Seu nome para o ranking</Form.Label>
                            <Form.Control onChange={e => setNameRanking(e.target.value)} value={nameRanking} required type="text" placeholder="O melhor do mundo" />
                        </Form.Group>

                        <Form.Group>
                            <Button onClick={() => window.location.href = `${base}`} variant="secondary" className='mr-2'>Sair</Button>
                            <Button onClick={() => backAndSetRanking()}>Salvar</Button>
                        </Form.Group>
                    </Form>
                </Modal.Body>

            </Modal>
        </Container>

    )
}

export default Canvas