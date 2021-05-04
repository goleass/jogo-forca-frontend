import React from 'react'
import { Table } from 'react-bootstrap'

import './styles.css'

const ranking = [
    { nome: 'Melhor Jogador do Mundo', pontuacao: 556454 },
    { nome: 'Leonardo1513', pontuacao: 445068 },
    { nome: 'Cesar13651', pontuacao: 2505 },
    { nome: 'Felipe486415', pontuacao: 1005 },
    { nome: 'Cristiano546645', pontuacao: 500 }
]

const Ranking = () => {
    return (
        <div className='jogo-container-ranking'>
            <h1 className='table-title-ranking'>RANKING</h1>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th className='table-ranking-item'>#</th>
                        <th className='table-ranking-item'>Nome Jogador</th>
                        <th className='table-ranking-item'>Pontuação</th>
                    </tr>
                </thead>
                <tbody>
                    {ranking && ranking.map((r, i) => {
                        return (
                            <tr>
                                <td className='table-ranking-item'>{i+1}</td>
                                <td className='table-ranking-item'>{r.nome}</td>
                                <td className='table-ranking-item'>{r.pontuacao}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </div>
    )
}


export default Ranking