import { Col, Container, Row } from 'react-bootstrap'
import './styles.css'

import Ranking from '../../components/Tables/Ranking/index'
import FormJogar from '../../components/Forms/FormJogar/index'
import Jogar from '../../components/Canvas/index'
import { useShowCanvasGame } from "../../context/ShowCanvasGame";

const Jogo = () => {
    const {
        showCanvasGame,
        setShowCanvasGame
    } = useShowCanvasGame()

    return (
        <Container>
            <Row>
                <Col>{showCanvasGame && <Jogar />}</Col>
            </Row>
            <Row hidden={showCanvasGame}>
                <Col className="mb-2 mb-sm-5 mb-lg-0" lg={9} sm={12} md={12}><Ranking /></Col>
                <Col className="mt-2 mt-lg-0" lg={3} sm={12} md={12}><FormJogar /></Col>
            </Row>
        </Container>
    )
}


export default Jogo