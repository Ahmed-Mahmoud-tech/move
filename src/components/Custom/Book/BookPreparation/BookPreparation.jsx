import React, { useState, useEffect } from 'react';
import MainBook from '../MainBook/MainBook';
import { Wrapper } from './BookPreparation.styled';
let isFirstLoad = 0;
let zoomModeVar = false;
let useMouseEventsVar = true;
let shadowIndexVar = 1;

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

  const changeStartPage = (x) => {
    setStartPage(x);
  };

  // const [isFullscreen, setIsFullscreen] = useState(full);

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
    // setZoomMode(value);
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
        console.log(
          2,
          'goToPageNum=> ',
          goToPageNum,
          'startPage=> ',
          startPage,
          '**********77'
        );
        startPageRender = rtl ? pagesLength - 1 - goToPageNum : goToPageNum;
        setStartPage(startPageRender);
      } else {
        console.log(3, goToPageNum, startPage, '**********88');

        startPageRender = startPage;
        // if (goToPageNum == undefined) {
        //   startPageRender = rtl ? pagesLength - 1 - startPage : startPage;
        // } else {
        //   // startPageRender = startPage;
        //   startPageRender = rtl ? pagesLength - 1 - startPage : startPage;
        // }
      }
    }
    console.log('********startPageRender=> ', startPageRender);
    setTimeout(() => {
      setUpdatedComp(<></>);
      setUpdatedComp(
        <MainBook
          images={images}
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
    // if (autoFlip) {
    //   if (pageNumGO != pageNumGOState) {
    //     runReload(pageNumGO - 1);
    //     setPageNumGOState(pageNumGO);
    //     pageNumGO = null;
    //   } else {
    //     if (rtl) {
    //       runReload(pagesLength - startPage - 1);
    //     } else {
    //       runReload(startPage);
    //     }
    //   }
    // } else {
    console.log('startPage=> ', startPage, '**********************--');
    runReload();
    // }
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
      // setStartPage(realNum);
      runReload(realNum);
    }
  }, [pageNumGO]);
  //*** import images
  const importAll = (r) => {
    let images = {};
    r.keys().forEach((item, index) => {
      images[item.replace('./', '')] = r(item);
    });
    return images;
  };

  console.log('************************************', directory);
  let images = importAll(
    require.context(directory, false, /\.(png|jpe?g|svg)$/)
  );

  //**** add rtl

  if (rtl) {
    const entries = Object.entries(images);
    const reversedEntries = entries.reverse();
    const reversedObject = Object.fromEntries(reversedEntries);
    images = reversedObject;
  }

  //***   if odd add more image
  if (
    (Object.keys(images).length % 2 != 0 && showCover) ||
    (Object.keys(images).length % 2 == 0 && !showCover)
  ) {
    pagesLength++;
    if (rtl) {
      images = {
        more: images[Object.keys(images)[0]],
        ...images,
      };
    } else {
      images.more = images[Object.keys(images)[Object.keys(images).length - 1]];
    }
  }

  return (
    <Wrapper Width={BookWidth + 'px'}>
      <div className="book">{updatedComp}</div>
    </Wrapper>
  );
};

export default BookPreparation;
