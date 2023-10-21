import React, { useState, useEffect, useRef } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { Wrapper } from './MainBook.styled';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { current } from '@reduxjs/toolkit';

const Page = React.forwardRef((props, ref) => {
  return (
    <div className="page" ref={ref} data-density={props.density}>
      <div className="page-content">
        <div className="shadow"></div>
        <TransformWrapper
          initialScale={1}
          initialPositionX={0}
          initialPositionY={0}
        >
          {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
            <>
              {props.zoomMode && (
                <div className="tools">
                  <button onClick={() => zoomIn()}>+</button>
                  <button onClick={() => zoomOut()}>-</button>
                  <button onClick={() => resetTransform()}>x</button>
                </div>
              )}
              <TransformComponent>{props.children}</TransformComponent>
            </>
          )}
        </TransformWrapper>
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
  useMouseEvents,
  shadowIndex,
  zoomMode,
  changeStartPage,
  bookShadow,
  rtl,
  autoFlip,
  setAutoFlip,
  pagesLength,
  autoFlipTime,
}) {
  const flipBookRef = useRef(null);
  useEffect(() => {
    const handleKeyDown = (event) => {
      const currentFlip = flipBookRef.current?.getPageFlip();
      currentFlip?.getCurrentPageIndex();
      if (event.key === 'ArrowRight') {
        rtl ? currentFlip?.flipPrev() : currentFlip?.flipNext();
      } else if (event.key === 'ArrowLeft') {
        rtl ? currentFlip?.flipNext() : currentFlip?.flipPrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    let intervalFlip;
    if (autoFlip) {
      let autoFlipFun = () => {
        const currentFlip = flipBookRef.current?.getPageFlip();
        rtl ? currentFlip?.flipPrev() : currentFlip?.flipNext();
        if (rtl) {
          if (currentFlip?.getCurrentPageIndex() == 0) {
            clearInterval(intervalFlip);
            setAutoFlip(false);
          }
        } else {
          if (currentFlip?.getCurrentPageIndex() == pagesLength - 1) {
            clearInterval(intervalFlip);
            setAutoFlip(false);
          }
        }
      };
      intervalFlip = setInterval(autoFlipFun, autoFlipTime * 1000);
    }
    return () => clearInterval(intervalFlip);
  }, [autoFlip]);

  const onFlip = () => {
    const currentFlip = flipBookRef.current?.getPageFlip();
    currentFlip && changeStartPage(currentFlip?.getCurrentPageIndex());
  };
  return (
    <Wrapper shadowIndex={shadowIndex} bookShadow={bookShadow}>
      <HTMLFlipBook
        width={width}
        height={height}
        startPage={startPage}
        showCover={showCover}
        flippingTime={flippingTime}
        maxShadowOpacity={bookShadow}
        ref={flipBookRef}
        useMouseEvents={useMouseEvents}
        zoomMode={zoomMode}
        size="stretch"
        onFlip={onFlip}
      >
        {Object.keys(images).map((imageName, index) => {
          index == 0 || index == images.length - 1;
          return (
            <Page
              key={index}
              zoomMode={zoomMode}
              density={
                index == 0 || index == images.length - 1 ? 'hard' : 'soft'
              }
            >
              <img src={images[imageName]} alt={`Image ${index + 1}`} />
            </Page>
          );
        })}
      </HTMLFlipBook>
    </Wrapper>
  );
}
export default MainBook;
