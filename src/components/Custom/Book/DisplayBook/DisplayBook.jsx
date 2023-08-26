import React, { useEffect, useState, useRef } from 'react';
import { Wrapper } from './DisplayBook.styled';
import BookPreparation from '../BookPreparation/BookPreparation';
import Setting from '../Setting/Setting';

const DisplayBook = ({ width = 400, height = 600 }) => {
  const doubleWidth = width * 2;
  const [fHeight, setFHeight] = useState(0);
  const [fWidth, setFWidth] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [full, setFull] = useState(false);
  const [rtl, setRtl] = useState(true);
  const [bookShadow, setBookShadow] = useState(50);
  const [flippingTime, setFlippingTime] = useState(0.9);
  const [pageNumGO, setPageNumGO] = useState();
  const [pageNumInput, setPageNumInput] = useState();
  const [reload, setReload] = useState(0);
  const [bgColor, setBgColor] = useState('#000');
  const [autoFlip, setAutoFlip] = useState(false);
  const [autoFlipTime, setAutoFlipTime] = useState(1); //per second
  const divRef = useRef();
  const handleResize = () => {
    const divElement = divRef.current;
    if (
      divElement &&
      height / doubleWidth >= divElement.clientHeight / divElement.clientWidth
    ) {
      setFHeight(Math.ceil(divElement.clientHeight * 0.9));
      setFWidth(
        Math.ceil((divElement.clientHeight * 0.9 * doubleWidth) / height)
      );
    } else {
      setFWidth(Math.ceil(divElement.clientWidth * 0.9));
      setFHeight(
        Math.ceil((divElement.clientWidth * 0.9 * height) / doubleWidth)
      );
    }
  };
  useEffect(() => {
    // you can change any settings
    //***  auto resize
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const pages = [
    {
      num: 1,
      title: 'page1',
    },
    {
      num: 4,
      title: 'page4',
    },
    {
      num: 7,
      title: 'page7',
    },
    {
      num: 12,
      title: 'page12',
    },
  ];
  return (
    <>
      <Wrapper bg={bgColor}>
        <div className="divRef" ref={divRef}>
          {fHeight > 0 && (
            <BookPreparation
              rtl={rtl}
              BookWidth={fWidth}
              BookHeight={fHeight}
              full={full}
              zoom={zoom}
              bookShadow={bookShadow / 100}
              pagesLength={12}
              flippingTime={flippingTime >= 0.1 ? flippingTime * 1000 : 1}
              autoFlip={autoFlip}
              autoFlipTime={autoFlipTime}
              setAutoFlip={setAutoFlip}
              pageNumGO={pageNumGO}
              reload={reload}
            />
          )}
        </div>

        <Setting
          setFull={setFull}
          full={full}
          setZoom={setZoom}
          zoom={zoom}
          setAutoFlipTime={setAutoFlipTime}
          autoFlipTime={autoFlipTime}
          setAutoFlip={setAutoFlip}
          autoFlip={autoFlip}
          setPageNumInput={setPageNumInput}
          pageNumInput={pageNumInput}
          setPageNumGO={setPageNumGO}
          setBgColor={setBgColor}
          bgColor={bgColor}
          bookShadow={bookShadow}
          setBookShadow={setBookShadow}
          flippingTime={flippingTime}
          setFlippingTime={setFlippingTime}
          pages={pages}
          setReload={setReload}
          reload={reload}
          handleResize={handleResize}
        />
      </Wrapper>
    </>
  );
};

export default DisplayBook;
