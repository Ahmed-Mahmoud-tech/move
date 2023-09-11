import React, { useState, useEffect } from 'react';
import MainBook from '../MainBook/MainBook';
import { Wrapper } from './BookPreparation.styled';

let isFirstLoad = 0;
let zoomModeVar = false;
let useMouseEventsVar = true;
let shadowIndexVar = 1;
let constImages = {};
// ---------- const will not change
//! if showCover false in rtl the last page it will opened and the first be cover
let showCover = true;

const BookPreparation = ({
  // ---------- come from parent one time
  pagesLength,
  rtl,
  BookHeight,
  BookWidth,
  // ---------- come from parent more than one time
  zoom,
  full,
  bookShadow,
  flippingTime,
  autoFlip,
  setAutoFlip,
  pageNumGO,
  autoFlipTime,
  reload,
  directory,
}) => {
  const [updatedComp, setUpdatedComp] = useState();
  const [startPage, setStartPage] = useState(0);
  const [pageNumGOState, setPageNumGOState] = useState(0);
  const [images, setImages] = useState({});

  const changeStartPage = (x) => {
    setStartPage(x);
  };

  //// const [isFullscreen, setIsFullscreen] = useState(full);

  const toggleFullscreen = () => {
    if (full) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen();
      } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
    runReload();
  };

  const toggleZoom = (value) => {
    //// setZoomMode(value);
    zoomModeVar = value;
    useMouseEventsVar = !value;
    shadowIndexVar = value ? 0 : 1;
    runReload();
  };

  const runReload = (goToPageNum) => {
    let startPageRender;
    if ((startPage == pagesLength - 1 || startPage == 0) && isFirstLoad == 0) {
      startPageRender = rtl ? pagesLength - 1 : 0;
      setStartPage(startPageRender);
    } else {
      if (goToPageNum >= 0 && goToPageNum < pagesLength) {
        startPageRender = rtl ? pagesLength - 1 - goToPageNum : goToPageNum;
        setStartPage(startPageRender);
      } else {
        startPageRender = startPage;
        //     // if (goToPageNum == undefined) {
        //     //   startPageRender = rtl ? pagesLength - 1 - startPage : startPage;
        //     // } else {
        //     //   // startPageRender = startPage;
        //     //   startPageRender = rtl ? pagesLength - 1 - startPage : startPage;
        //     // }
      }
    }
    setTimeout(() => {
      setUpdatedComp(<></>);
      setUpdatedComp(
        Object.keys(constImages).length != 0 && (
          <MainBook
            images={constImages}
            width={BookWidth / 2}
            height={BookHeight}
            flippingTime={flippingTime}
            startPage={startPageRender}
            showCover={showCover}
            useMouseEvents={useMouseEventsVar}
            shadowIndex={shadowIndexVar}
            zoomMode={zoomModeVar}
            changeStartPage={changeStartPage}
            bookShadow={bookShadow}
            rtl={rtl}
            autoFlip={autoFlip}
            setAutoFlip={setAutoFlip}
            pagesLength={pagesLength}
            autoFlipTime={autoFlipTime}
          />
        )
        // <>9ss99{console.log(images, 'first')}</>
      );
    }, 100);
    isFirstLoad++;
  };

  useEffect(() => {
    if (isFirstLoad != 0) toggleZoom(zoom);
  }, [zoom]);
  useEffect(() => {
    if (isFirstLoad != 0) toggleFullscreen();
  }, [full]);
  useEffect(() => {
    //     // if (autoFlip) {
    //     //   if (pageNumGO != pageNumGOState) {
    //     //     runReload(pageNumGO - 1);
    //     //     setPageNumGOState(pageNumGO);
    //     //     pageNumGO = null;
    //     //   } else {
    //     //     if (rtl) {
    //     //       runReload(pagesLength - startPage - 1);
    //     //     } else {
    //     //       runReload(startPage);
    //     //     }
    //     //   }
    //     // } else {

    console.log('startPage=> ', startPage, '**********************--');
    runReload();
    //// }
  }, [rtl, flippingTime, autoFlip, reload, bookShadow]);

  useEffect(() => {
    const realNum = parseInt(pageNumGO) - 1;
    console.log(
      'startPage==> ',
      startPage,
      '**********************1',
      'realNum=> ',
      realNum
    );
    if (realNum >= 0 && realNum < pagesLength) {
      //// setStartPage(realNum);
      runReload(realNum);
    }
  }, [pageNumGO]);

  useEffect(() => {
    setImages({
      'page-01.png': `${directory}/page-01.png`,
      'page-02.png': `${directory}/page-02.png`,
      'page-03.png': `${directory}/page-03.png`,
      'page-04.png': `${directory}/page-04.png`,
      'page-05.png': `${directory}/page-05.png`,
      'page-06.png': `${directory}/page-06.png`,
      'page-07.png': `${directory}/page-07.png`,
      'page-08.png': `${directory}/page-08.png`,
      'page-09.png': `${directory}/page-09.png`,
      'page-10.png': `${directory}/page-10.png`,
    });
    constImages = {
      'page-01.png': `${directory}/page-01.png`,
      'page-02.png': `${directory}/page-02.png`,
      'page-03.png': `${directory}/page-03.png`,
      'page-04.png': `${directory}/page-04.png`,
      'page-05.png': `${directory}/page-05.png`,
      'page-06.png': `${directory}/page-06.png`,
      'page-07.png': `${directory}/page-07.png`,
      'page-08.png': `${directory}/page-08.png`,
      'page-09.png': `${directory}/page-09.png`,
      'page-10.png': `${directory}/page-10.png`,
    };
    runReload();
  }, []);

  //**** add rtl

  if (rtl) {
    const entries = Object.entries(images);
    const reversedEntries = entries.reverse();
    const reversedObject = Object.fromEntries(reversedEntries);
    setImages(reversedObject);
  }

  //***   if odd add more image
  if (
    (Object.keys(images).length % 2 != 0 && showCover) ||
    (Object.keys(images).length % 2 == 0 && !showCover)
  ) {
    pagesLength++;
    if (rtl) {
      setImages({
        more: images[Object.keys(images)[0]],
        ...images,
      });
    } else {
      images.more = images[Object.keys(images)[Object.keys(images).length - 1]];
    }
  }

  return (
    <>
      {console.log(images, '000000000000000000')}
      <Wrapper Width={BookWidth + 'px'}>
        {Object.keys(constImages).length != 0 && (
          <div className="book">{updatedComp}</div>
        )}
      </Wrapper>
    </>
  );
};

export default BookPreparation;
