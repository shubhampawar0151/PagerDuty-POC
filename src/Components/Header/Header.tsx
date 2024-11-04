import { useState } from "react";
import { Navbar, Nav, Modal, Button, Tooltip, OverlayTrigger } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function Header() {
    const [showDeveloperInfo, setShowDeveloperInfo] = useState<boolean>(false); // developer info popup variable


    const toggleDeveloperInfo = () => setShowDeveloperInfo(!showDeveloperInfo); // open / clsoe developer info popup code

    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg" className="p-3">
                {/* Heading / title */}
                <div className="d-flex w-100 justify-content-center position-relative">
                    <Navbar.Brand href="#" className="font-weight-bold text-center mx-auto">
                        PagerDuty  Insights  Dashboard
                    </Navbar.Brand>

                    {/* Buttons - login/ sign up/ developed by */}
                    <Nav className="ml-auto position-absolute" style={{ right: 0 }}>
                        <OverlayTrigger
                            placement="bottom"
                            delay={{ show: 250, hide: 400 }}
                            overlay={<Tooltip id="button-tooltip">Under Development !!!</Tooltip>}
                        >
                            <Button variant="primary" className="mx-2">Log In</Button>
                        </OverlayTrigger>

                        <OverlayTrigger
                            placement="bottom"
                            delay={{ show: 250, hide: 400 }}
                            overlay={<Tooltip id="button-tooltip">Under Development !!!</Tooltip>}
                        >
                            <Button variant="primary" className="mx-2">Sign Up</Button>
                        </OverlayTrigger>

                        <Button variant="outline-light" onClick={toggleDeveloperInfo} className="mx-2">
                            Developed By
                        </Button>

                    </Nav>
                </div>
            </Navbar>

            {/* Developer Info Popup */}
            <Modal show={showDeveloperInfo} onHide={toggleDeveloperInfo}>
                <Modal.Header closeButton>
                    <Modal.Title>Developer Info</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Name: Shubham Pawar</p>
                    <p>Email: Spawar3@calstatela.edu</p>
                    <p>Phone: (626) 601-8813</p>
                    <p>
                        LinkedIn:{" "}
                        <a href="https://www.linkedin.com/in/shubhampawar21/" target="_blank" rel="noopener noreferrer">
                            linkedin.com/in/shubhampawar21/
                        </a>
                    </p>
                </Modal.Body>
            </Modal>
        </header>
    );
}

export default Header;