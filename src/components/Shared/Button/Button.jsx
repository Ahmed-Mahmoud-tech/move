import React from 'react';
import { Wrapper } from './Button.styled';

export default function Button({ text, action }) {
  return <Wrapper onClick={() => action()}>{text}</Wrapper>;
}
