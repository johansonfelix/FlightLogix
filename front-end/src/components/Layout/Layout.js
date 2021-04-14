import { Fragment } from "react";
import Header from "../Header/Header";
import classes from './Layout.module.css';
import banner1 from '../../assets/banner1.png';
const Layout = (props) => {
    return(
        <Fragment>
            <Header />
            <div className= {classes.banner}><img src={banner1}alt='banner' /></div>
            <main className={classes.main}>
                {props.children}
            </main>
        </Fragment>
    )
};


export default Layout;