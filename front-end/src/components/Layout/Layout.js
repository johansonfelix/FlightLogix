import { Fragment } from "react";
import Header from "../Header/Header";
import classes from './Layout.module.css';
import banner1 from '../../assets/banner1.png';
import Sidebar from "../SideDrawer/SideDrawer";
import { Container, Row } from "react-bootstrap";

const Layout = (props) => {
    return (
        <Fragment>
            <Sidebar />
            <div class={classes.grid}>
                <div class={classes.sidebar}></div>
                <div class={classes.body}>
                    <Header />                    
                    <main className={classes.main}>
                        {props.children}
                    </main>

                </div>
            </div>







        </Fragment>
    )
};


export default Layout;