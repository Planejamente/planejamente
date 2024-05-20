import React from "react";
import styles from "./psiPanel.module.css";
import SideBar from "../../components/SideBar/SideBar";
import {Link} from "react-router-dom";

import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';

const PsiPanel = () => {

    return (
        <main className={styles.mainPsiPanel}>
            <Sidebar>
                <Menu
                    menuItemStyles={{
                        button: {
                            // the active class will be added automatically by react router
                            // so we can use it to style the active menu item
                            [`&.active`]: {
                                backgroundColor: '#13395e',
                                color: '#b6c8d9',
                            },
                        },
                    }}
                >
                    <MenuItem component={<Link to="/documentation" />}> Documentation</MenuItem>
                    <MenuItem component={<Link to="/calendar" />}> Calendar</MenuItem>
                    <MenuItem component={<Link to="/e-commerce" />}> E-commerce</MenuItem>
                </Menu>
            </Sidebar>;
        </main>
    );
}

export default PsiPanel;