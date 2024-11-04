import { useState } from "react";
import { Navbar, Nav, Modal, Button, Tooltip, OverlayTrigger } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Header.css";

function Header() {
    const [showDeveloperInfo, setShowDeveloperInfo] = useState<boolean>(false);

    // Handlers for opening/closing the modals
    const toggleDeveloperInfo = () => setShowDeveloperInfo(!showDeveloperInfo);

    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg" className="p-3">
                {/* Centered Navbar Brand */}
                <div className="d-flex w-100 justify-content-center position-relative">
                    <Navbar.Brand href="#" className="font-weight-bold text-center mx-auto">
                        PagerDuty  Insights  Dashboard
                    </Navbar.Brand>

                    {/* Right-aligned Nav items */}
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

                        {/* User Dropdown */}
                        {/* <NavDropdown
                            title={
                                <img
                                    src="/Users/shubhamdeepakpawar/Downloads/IMG_8104.HEIC"
                                    alt="User"
                                    className="rounded-circle"
                                />
                            }
                            id="user-dropdown"
                            className="mx-2"
                            align="start"
                        >
                            <NavDropdown.Item disabled>User Name</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={() => alert("Profile clicked")}>
                                Profile
                            </NavDropdown.Item>
                            <NavDropdown.Item onClick={() => alert("Log Out clicked")}>
                                Sign Out
                            </NavDropdown.Item>
                        </NavDropdown> */}
                    </Nav>
                </div>
            </Navbar>

            {/* Developer Info Modal */}
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