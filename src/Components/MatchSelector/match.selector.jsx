import React from 'react'
import { Col, Container, Row, Button } from 'react-bootstrap';

export default function MatchSelector(props) {
  const matches = props.matches
  const setMatchIndex = props.setMatchIndex
  const selectMatch = props.selectMatch
  
  return (
    <Container>
    <Row>
      {matches.length ?
        matches.map((name, index) => <Col key={name.match + index}><Button style={{width: "100%"}} variant="secondary" className="fw-bold" onClick={() => {setMatchIndex(index); selectMatch(index)}}>{name.match}</Button></Col>)
        :
        null}
    </Row>
  </Container>

  )
}
