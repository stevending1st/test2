import { HashRouter, Routes, Route } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';

import * as style from './index.module.less';
import HomePage from './Home';
import { ComponentPage } from './Component';
import { PaginationPage } from './Pagination';

export const PageFrame = () => (
    <>
        <Navbar bg="primary" variant="dark" sticky="top" expand="sm">
            <Container>
                <Navbar.Brand href=".">
                    <img
                        className={`${style.logo} me-2`}
                        src="https://github.com/react-bootstrap.png"
                    />
                    {document.title}
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse>
                    <Nav>
                        <Nav.Link className="text-white" href="#/">
                            Home
                        </Nav.Link>
                        <Nav.Link className="text-white" href="#/component">
                            Component
                        </Nav.Link>
                        <Nav.Link className="text-white" href="#/pagination">
                            Pagination
                        </Nav.Link>
                        <Nav.Link
                            className="text-white"
                            href="https://github.com/idea2app/React-MobX-Bootstrap-ts"
                        >
                            Source code
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

        <HashRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/component" element={<ComponentPage />} />
                <Route path="/pagination" element={<PaginationPage />} />
            </Routes>
        </HashRouter>
    </>
);
