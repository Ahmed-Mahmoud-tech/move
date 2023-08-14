import React from 'react';
import { Wrapper } from './Preloader.styled';

const Preloader = (props) => {
  const { show = false } = props;

  return (
    <>
      {show && (
        <Wrapper>
          <div className="loader">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </Wrapper>
      )}
    </>
  );
};

export default Preloader;
