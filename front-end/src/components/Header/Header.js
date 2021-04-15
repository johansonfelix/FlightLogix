import { Col, Container, Row } from 'react-bootstrap';
import classes from './Header.module.css';
import Logo from './HeaderItems/Logo/Logo';
import UserIcon from './HeaderItems/UserIcon/UserIcon';

const Header = () => {
    return (
        <Container>
            <Row>
                <Col>
                    <Logo className={classes.Logo} />
                </Col>

                <Col>
                    <UserIcon />
                </Col>

            </Row>

        </Container>



    );
};


export default Header;