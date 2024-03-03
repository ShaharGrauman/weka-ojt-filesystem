// Footer.js
import React from "react";
import { Container } from "react-bootstrap";

function Footer() {
  return (
    <footer className="footer mt-auto py-3 bg-light">
      <Container className="text-center">
        <div>
          <span className="text-muted">
            © 2024 CloudStore. All rights reserved.
          </span>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
