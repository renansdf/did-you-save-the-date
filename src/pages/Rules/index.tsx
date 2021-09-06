import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from './styles';

const Rules: React.FC = () => {
  return (
    <Container>
      <h1>Rules</h1>
      <Link to="dashboard">Start game</Link>
    </Container>
  )
};

export default Rules;
