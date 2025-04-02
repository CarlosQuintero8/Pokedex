import React from 'react';
import { FaGithub } from 'react-icons/fa';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const MyFooter = () => {
	return (
		<footer style={{ background: 'linear-gradient(45deg, #ff4040, #a940a9 100%)' }}>
			<Container fluid className="py-3 d-flex justify-content-center">
				<Row>
					<Col xs={12} md={12} className="text-center">
						<a href="https://github.com/CarlosQuintero8" target="_blank" rel="noreferrer" className="mx-3">
							<FaGithub size={32} color="#fff" />
						</a>
					</Col>
				</Row>
			</Container>
		</footer>
	);
};

export default MyFooter;
