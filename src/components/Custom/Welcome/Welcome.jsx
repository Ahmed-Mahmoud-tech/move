import React from 'react';
import { Wrapper } from './Welcome.styled';
import PdfToImagesConverter from './PdfToImagesConverter/PdfToImagesConverter';

const Welcome = () => {
  return (
    <Wrapper>
      Welcome
      <div>
        <PdfToImagesConverter />
      </div>
    </Wrapper>
  );
};

export default Welcome;
