import React, { useState, useEffect, useRef } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { Wrapper } from './MainBook.styled';

const PageCover = React.forwardRef((props, ref) => {
  return (
    <div className="page page-cover" ref={ref} data-density="hard">
      {props.children}
    </div>
  );
});

const Page = React.forwardRef((props, ref) => {
  return (
    <div className="page" ref={ref}>
      <div className="page-content">
        <div className="shadow"></div>
        {props.children}
      </div>
    </div>
  );
});

function MainBook({
  images,
  width,
  height,
  startPage,
  showCover,
  flippingTime,
}) {
  const flipBookRef = useRef(null);

  return (
    <Wrapper>
      <HTMLFlipBook
        width={width}
        height={height}
        startPage={startPage}
        showCover={showCover}
        flippingTime={flippingTime}
        maxShadowOpacity={0.3}
        ref={flipBookRef}
        useMouseEvents={true}
        size="stretch"
      >
        {Object.keys(images).map((imageName, index) => {
          if (index == 0 || index == images.length - 1) {
            return (
              <PageCover key={index}>
                <img src={images[imageName]} alt={`Image ${index + 1}`} />
              </PageCover>
            );
          } else {
            return (
              <Page key={index}>
                <img src={images[imageName]} alt={`Image ${index + 1}`} />
              </Page>
            );
          }
        })}
      </HTMLFlipBook>
    </Wrapper>
  );
}
export default MainBook;
