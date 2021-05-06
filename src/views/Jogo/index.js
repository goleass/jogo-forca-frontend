import { Container, Row } from 'react-bootstrap'
import './styles.css'

import Ranking from '../../components/Tables/Ranking/index'
import FormJogar from '../../components/Forms/FormJogar/index'
import Jogar from '../../components/Canvas/index'
import { useShowCanvasGame } from "../../context/ShowCanvasGame";

const Jogo = () => {
    const { showCanvasGame, setShowCanvasGame } = useShowCanvasGame()

    return (
        <Container className='container-jogo'>
            <Row className='teste' hidden={!showCanvasGame}><Jogar /></Row>
            <Row hidden={showCanvasGame}><Ranking /></Row>
            <Row hidden={showCanvasGame}><FormJogar /></Row>
        </Container>
    )
}


export default Jogo