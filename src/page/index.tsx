import { HashRouter, Routes, Route } from 'react-router-dom';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { observer } from 'mobx-react';

import * as style from './index.module.less';
import HomePage from './Home';
import { VotePage } from './Vote';
import client from '../model/client';
import metamask from '../model/metamask';

export const PageFrame = observer(() => {
    const { account } = client;
    return (
        <>
            <Navbar bg="primary" variant="dark" sticky="top" expand="sm">
                <Container>
                    <Navbar.Brand href=".">
                        <img
                            className={`${style.logo} me-2`}
                            src="https://github.com/react-bootstrap.png"
                        />
                        Let's GO
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse>
                        <div className="w-100 d-flex flex-sm-row flex-column justify-content-start justify-content-sm-between">
                            <Nav>
                                <Nav.Link className="text-white" href="#/">
                                    Home
                                </Nav.Link>
                                <Nav.Link className="text-white" href="#/vote">
                                    Vote
                                </Nav.Link>
                            </Nav>

                            <Nav>
                                <Nav.Link className="text-white" href="#">
                                    {account || (
                                        <Button
                                            variant="info"
                                            // onClick={metamask.connectMetaMask} // 以直接调用 Metamask 的方式登录
                                            onClick={() =>
                                                client.requestAccounts()
                                            }
                                        >
                                            Log in
                                        </Button>
                                    )}
                                </Nav.Link>
                            </Nav>
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <HashRouter>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/vote" element={<VotePage />} />
                </Routes>
            </HashRouter>
        </>
    );
});
