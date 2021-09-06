import React from 'react'
import { Col, Container, Row, Button } from 'react-bootstrap';

export default function MatchSelector(props) {
  const matches = props.matches
  const setMatchIndex = props.setMatchIndex
  
  return (
    <Container>
    <Row>
      {matches.length ?
        matches.map((name, index) => <Col key={name.match}><Button style={{width: "100%"}} variant="secondary" className="fw-bold" onClick={() => setMatchIndex(index)}>{name.match}</Button></Col>)
        :
        null}
    </Row>
  </Container>

  )
}
