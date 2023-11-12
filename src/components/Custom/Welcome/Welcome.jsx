import React from 'react';
import { Wrapper } from './Welcome.styled';
import PdfToImagesConverter from './PdfToImagesConverter/PdfToImagesConverter';
import SelectPresentation from './SelectPresentation/SelectPresentation';

const Welcome = () => {
  return (
    <Wrapper>
      Welcome
      <div>
        <PdfToImagesConverter />
        <SelectPresentation />
      </div>
    </Wrapper>
  );
};

export default Welcome;
