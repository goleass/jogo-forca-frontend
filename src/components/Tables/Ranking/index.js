import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import axios from '../../../api/axios'

import './styles.css'

const rankingDefault = [
    { nome_ranking: 'Melhor Jogador do Mundo', score: 556454, data: "20/10/1999"},
    { nome_ranking: 'Leonardo1513', score: 445068, data: "20/10/1999" },
    { nome_ranking: 'Cesar13651', score: 2505, data: "20/10/1999" },
    { nome_ranking: 'Felipe486415', score: 1005 , data: "20/10/1999"},
    { nome_ranking: 'Rodrigo2', score: 900 , data: "20/10/1999"},
    { nome_ranking: 'Fabuloso112', score: 832 , data: "20/10/1999"},
    { nome_ranking: 'Topper', score: 500 , data: "20/10/1999"},
    { nome_ranking: 'Santos', score: 259 , data: "20/10/1999"},
    { nome_ranking: 'Guilherme123', score: 129 , data: "20/10/1999"},
    { nome_ranking: 'Cristiano546645', score: 98, data: "20/10/1999" }
]

const Ranking = () => {
    const [ ranking, setRanking ] = useState(rankingDefault)

    useEffect(() => {
        getUsers()
    }, []);

    const getUsers = () => {
        axios.get('/ranking').then(r => {
            setRanking(r.data)
        })
    }

    return (
        <div className='jogo-container-ranking p-2 mt-2 mt-sm-5'>
            <h1 className='table-title-ranking'>RANKING</h1>
            <Table className="xs-font-size" striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th className='table-ranking-item'>#</th>
                        <th className='table-ranking-item'>Nome Jogador</th>
                        <th className='table-ranking-item'>Pontuação</th>
                        <th className='table-ranking-item d-none d-lg-block'>Data</th>
                    </tr>
                </thead>
                <tbody>
                    {ranking && ranking.map((r, i) => {
                        return (
                            <tr key={i}>
                                <td className='table-ranking-item'>{i+1}</td>
                                <td className='table-ranking-item'>{r.nome_ranking}</td>
                                <td className='table-ranking-item'>{r.score}</td>
                                <td className='table-ranking-item d-none d-lg-block'>{r.data}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </div>
    )
}


export default Ranking