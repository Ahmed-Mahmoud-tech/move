import React, { useEffect, useState, useRef } from 'react';
import { Wrapper } from './DisplayBook.styled';
import BookPreparation from '../BookPreparation/BookPreparation';
import Setting from '../Setting/Setting';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const DisplayBook = () => {
  const params = useParams();
  const [presentationInfo, setPresentationInfo] = useState();
  const presentationId = params.id;
  const [width, setWidth] = useState();
  const [pagesLength, setPagesLength] = useState();
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
  const [pages, setPages] = useState();
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

        // const response = await axios.post(
        //   'http://localhost:8000/createpresentation',
        //   presentationRequestData
        // );
        console.log({ response });
      } else {
        setHeight(presentationData.height);
        setWidth(presentationData.width);
        setPagesLength(presentationData.pagesCount);
        setPages(presentationData.pages);

        presentationData.bgColor && setBgColor(presentationData.bgColor);
        presentationData.bookShadow &&
          setBookShadow(presentationData.bookShadow);
        presentationData.flippingTime &&
          setFlippingTime(presentationData.flippingTime);
        presentationData.autoFlipTime &&
          setAutoFlipTime(presentationData.autoFlipTime);

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
            <>
              {console.log({ pagesLength }, '66666666666')}
              <BookPreparation
                rtl={presentationInfo?.direction == 'rtl'}
                BookWidth={fWidth}
                BookHeight={fHeight}
                full={full}
                zoom={zoom}
                bookShadow={bookShadow / 100}
                pagesLength={pagesLength}
                flippingTime={flippingTime >= 0.1 ? flippingTime * 1000 : 1}
                autoFlip={autoFlip}
                autoFlipTime={autoFlipTime}
                setAutoFlip={setAutoFlip}
                pageNumGO={pageNumGO}
                reload={reload}
                directory={presentationInfo?.directory}
                pagesCount={presentationInfo?.pagesCount}
              />
            </>
          )}
        </div>
        {pages && (
          <>
            {console.log(pages, 'pages', presentationInfo)}
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
              presentationId={presentationId}
            />
          </>
        )}
      </Wrapper>
    </>
  );
};

export default DisplayBook;
