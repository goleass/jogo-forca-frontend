import { Button,Navbar,Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const base = process.env.NODE_ENV==='production'?'https://forca-jogo.herokuapp.com':'https://forca-jogo.herokuapp.com'


function Header() {
    const logout = () => {
        localStorage.removeItem("app-token")
        window.location.href=`${base}/login`
    }

    return (
        <>
            <Navbar bg="dark navbar-dark" expand="lg">
                <Navbar.Brand href="#home">JOGO FORCA</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        {/* <Nav.Link><Link to='/admin'>Home</Link></Nav.Link> */}
                        <Nav.Link><Link to='/admin/usuarios'>Usuários</Link></Nav.Link>
                        <Nav.Link><Link to='/admin/categorias'>Categorias</Link></Nav.Link>
                        <Nav.Link><Link to='/admin/palavras'>Palavras</Link></Nav.Link>
                    </Nav>
                    <Nav>
                        <Button onClick={() => logout()} className='btn' >Sair</Button>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    )
}

export default Header;