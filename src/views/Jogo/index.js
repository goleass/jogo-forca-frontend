import React from 'react'
import { Container, Row } from 'react-bootstrap'
import './styles.css'

import Ranking from '../../components/Tables/Ranking/index'
import FormJogar from '../../components/Forms/FormJogar/index'

const Jogo = () => {
    return (
        <Container className='container-jogo'>
            <div className='container-jogo'>
                <Row>
                    <Ranking />
                </Row>
                <Row>
                    <FormJogar />
                </Row>
            </div>
        </Container>
    )
}


export default Jogo