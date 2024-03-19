import React from 'react';
import { Container, Row, Col, Card, Button, Accordion } from 'react-bootstrap';

const TroubleShooting = () => {
    return (
        <Container className="mt-5">
            <Row>
                <Col>
                    <h1>Troubleshooting</h1>
                    <p>If you're experiencing issues, here are some common solutions:</p>
                </Col>
            </Row>
            <Row className="mt-3">
                <Col md={6}>
                    <Card>
                    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Cannot Connect To Metamask Wallet</Accordion.Header>
        <Accordion.Body>
          <ul>
            <li>Check that you have entered correct chainId = 1337</li>
            <li>Clear transection history from the metamask wallet.</li>
            <li>Make sure you have switched to right network</li>
            <li>Remove hardhat network and add it again</li>
            
          </ul>
        </Accordion.Body>
      </Accordion.Item>
      </Accordion>
                    </Card>
                </Col>
                <Col md={6}>
                    <Card>
                    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>While making transection, remix giving error regarding GAS</Accordion.Header>
        <Accordion.Body>
          <ul>
            <li>Check the code, make sure if you are calling a contract function then you have mentioned that in itnerface</li>
            <li>If you are sending ethers with the function call, make sure you are sending the exact amount.</li>
            <li>If you are using remix, make sure you are using Injected metamask or a proper network</li>
            <li>Try to adjust gas while sending transection through metamask, mostly this will not be needed</li>
            <li> If everything is correct and still getting error, check the next card.</li>
            
          </ul>
        </Accordion.Body>
      </Accordion.Item>
      </Accordion>
                    </Card>
                </Col>
            </Row>
            <Row className="mt-3">
                <Col md={6}>
                    <Card>
                    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>If you are doing everything right and it is not working</Accordion.Header>
        <Accordion.Body>
          <ul>
            <li>MAke it completely sure that the attack code is perfect and there are no errors from your end</li>
            <li>If you are using metamask to sign your transections, there are high chances that transections are failing</li>
            <li>Go to metamask settings == {">"} Advanced Settings == {">"} click on "Clear activity tab"</li>
            <li>This should mostly clear the error. If it still doesnt work and you are 100% confident on your code,Then ={">"}</li>
            <li>In remix, change the network to Dev hardhat network. Try the transection again, this will clear any errors due to metamask</li>

          </ul>
        </Accordion.Body>
      </Accordion.Item>
      </Accordion>
                    </Card></Col>
            </Row>
        </Container>
    );
}

export default TroubleShooting;