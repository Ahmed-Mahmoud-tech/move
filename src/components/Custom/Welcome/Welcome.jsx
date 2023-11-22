import React from 'react';
import { Wrapper } from './Welcome.styled';
import PdfToImagesConverter from './PdfToImagesConverter/PdfToImagesConverter';
import SelectPresentation from './SelectPresentation/SelectPresentation';

const Welcome = () => {
  return (
    <Wrapper>
      <div className="appWrapper p-[5%] max-w-[100vw]">
        <div className="logo text-5xl text-mainColor font-bold mb-4">MOVE</div>
        <div className="flex flex-wrap">
          <PdfToImagesConverter />
          <SelectPresentation />
        </div>
      </div>
    </Wrapper>
  );
};

export default Welcome;
