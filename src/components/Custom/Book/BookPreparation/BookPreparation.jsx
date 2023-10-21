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
  directory,
  pagesCount,
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
}) => {
  const [updatedComp, setUpdatedComp] = useState();
  const [startPage, setStartPage] = useState(0);
  const [pageNumGOState, setPageNumGOState] = useState(0);
  const [images, setImages] = useState({});

  const changeStartPage = (x) => {
    setStartPage(x);
  };

  //// const [isFullscreen, setIsFullscreen] = useState(full);

  const setImagesState = (object) => {
    setImages(object);
    constImages = object;
  };
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

    runReload();
    //// }
  }, [rtl, flippingTime, autoFlip, reload, bookShadow]);

  useEffect(() => {
    const realNum = parseInt(pageNumGO) - 1;

    if (realNum >= 0 && realNum < pagesLength) {
      //// setStartPage(realNum);
      runReload(realNum);
    }
  }, [pageNumGO]);

  function generatePageName(pageNumber, totalDigits) {
    // Ensure the pageNumber is within the valid range
    if (pageNumber < 1 || pageNumber > Math.pow(10, totalDigits) - 1) {
      throw new Error('Page number is out of range.');
    }

    // Convert the pageNumber to a string
    let pageName = pageNumber.toString();

    // Calculate the number of leading zeros needed
    const leadingZeros = totalDigits - pageName.length;

    // Add the leading zeros to the pageName
    if (leadingZeros > 0) {
      pageName = '0'.repeat(leadingZeros) + pageName;
    }
    return 'page-' + pageName + '.png';
  }

  useEffect(() => {
    const theImages = {};
    const totalDigits = pagesCount.length;
    for (let index = 1; index <= pagesCount; index++) {
      let pageNewName = generatePageName(index, totalDigits);
      theImages[pageNewName] = `${directory}/${pageNewName}`;
    }
    setImagesState(theImages);
  }, []);

  //**** add rtl

  if (rtl) {
    const entries = Object.entries(images);
    const reversedEntries = entries.reverse();
    const reversedObject = Object.fromEntries(reversedEntries);
    setImagesState(reversedObject);
  }

  //***   if odd add more image
  if (
    (Object.keys(images).length % 2 != 0 && showCover) ||
    (Object.keys(images).length % 2 == 0 && !showCover)
  ) {
    pagesLength++;
    if (rtl) {
      setImagesState({
        more: images[Object.keys(images)[0]],
        ...images,
      });
    } else {
      images.more = images[Object.keys(images)[Object.keys(images).length - 1]];
    }
  }

  return (
    <>
      <Wrapper bookWidth={BookWidth + 'px'}>
        {Object.keys(constImages).length != 0 && (
          <div className="book">{updatedComp}</div>
        )}
      </Wrapper>
    </>
  );
};

export default BookPreparation;
