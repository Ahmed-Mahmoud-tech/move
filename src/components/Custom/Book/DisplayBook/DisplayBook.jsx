import React, { useEffect, useState, useRef } from 'react';
import { Wrapper } from './DisplayBook.styled';
import BookPreparation from '../BookPreparation/BookPreparation';
import Setting from '../Setting/Setting';
import { useParams } from 'react-router-dom';

const DisplayBook = () => {
  const params = useParams();
  const [presentationInfo, setPresentationInfo] = useState();
  const presentationId = params.id;
  const [width, setWidth] = useState();
  const [height, setHeight] = useState();
  const [fHeight, setFHeight] = useState(0);
  const [fWidth, setFWidth] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [full, setFull] = useState(false);
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
    const doubleWidth = width * 2;
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

  useEffect(() => {
    (async () => {
      const response = await fetch(process.env.PUBLIC_URL + '/db.json');

      const currentPresentation = await response.json();
      const presentationData =
        currentPresentation.presentations[presentationId];
      if (!presentationData) {
        const presentationRequestData = JSON.parse(
          localStorage.getItem('currentPresentation')
        );
        const response = await window.versions.createPresentation(
          presentationRequestData
        );
      } else {
        setHeight(presentationData.height);
        setWidth(presentationData.width);
        setPresentationInfo({
          ...presentationData,
          directory:
            process.env.PUBLIC_URL +
            '/presentationsDirectory/' +
            presentationId +
            '/outputImages',
        });
      }
    })();
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [width, height]);

  return (
    <>
      <Wrapper bg={bgColor}>
        <div className="divRef" ref={divRef}>
          {fHeight > 0 && presentationInfo?.directory && (
            <BookPreparation
              rtl={presentationInfo?.direction == 'rtl'}
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
              directory={presentationInfo?.directory}
              pagesCount={presentationInfo?.pagesCount}
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
