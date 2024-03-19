import React, { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Home(){
    return(
        <div style={{ 
            backgroundImage: `url("/Home-6.jpg")`,height: "100vh",backgroundRepeat:"repeat-x", backgroundPosition: "Center top", backgroundAttachment: "fixed"
          }}>
            <div className="container">
            <Container>
                <Row md={1}>
                    <Col md={6}>
                        <h1 className="display-8">Welcome to Our CTF Event</h1>
                        <p className="lead">We're thrilled to have you here!</p>
                    </Col>
                    
                </Row>
                <Row className="mt-4">
                    <Col>
                        <ol>
                            <li>You will need to Configure your metamask wallet and add Hardhat network in order to interact with blockchain.</li>
                            <li>Steps to Configure metamask wallet are given bellow.</li>
                            <li> <ul>
            <li>Click on 3 dots on the Right top corner and click on Expand View</li>
            <li>Again click on 3 dots and open settings.</li>
            <li>Click on networks</li>
            <li>Click on Add Network {">"} Add a network manually</li>
            <li>Enter the following details:
              <ol>
                <li>Network Name: CTF</li>
                <li>New RPC URL: http://127.0.0.1:8545/</li>
                <li>Chain Id: 1337</li>
                <li>Currency Symbol: ETH </li>
                <li>Block explorer URL: EMPTY</li>
              </ol>
              </li>
            <li> Click on save and swith to this new network {"("}from the top left corner in metamask {")"}</li>
            <li>After configuring your metamask, click on connect wallet.</li>
            
          </ul></li>
                        </ol>
                    </Col>
                </Row>
            </Container>
        </div>
  
            <div className="row justify-content-center">
        <div className="col-auto justify-content-center">
                    <div id="Start first level">
            <Button variant="info" href="/Level1" size="lg">
            
          Start First Level
        </Button>{' '}
        </div>
        </div>
        </div>
        </div>
        
    )

}