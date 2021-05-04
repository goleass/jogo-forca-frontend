import React from 'react'
import { Container, Row, Table } from 'react-bootstrap'
import './styles.css'

const Jogo = () => {
    return (
        <Container className='container-jogo'>
            <div className='container-jogo'>
                <Row>
                    <div className='jogo-container-ranking'>
                        <h1 className='table-title'>RANKING</h1>
                        <Table striped bordered hover size="sm" className='table-ranking'>
                            <thead>
                                <tr>
                                    <th className='table-ranking-item'>#</th>
                                    <th className='table-ranking-item'>Nome Jogador</th>
                                    <th className='table-ranking-item'>Pontuação</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className='table-ranking-item'>1</td>
                                    <td className='table-ranking-item'>Melhor Jogador Do Mundo</td>
                                    <td className='table-ranking-item'>5.135.153</td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                </Row>
                <Row>
                    <div className='jogo-container-form'></div>
                </Row>
            </div>
        </Container>
    )
}


export default Jogo