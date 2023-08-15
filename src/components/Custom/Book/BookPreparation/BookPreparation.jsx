import React from 'react';
import MainBook from '../MainBook/MainBook';
import { Wrapper } from './BookPreparation.styled';

const BookPreparation = () => {
  //! if showCover false in rtl the last page it will opened and the first be cover
  const showCover = true;
  const rtl = true;
  const width = 400;
  const doubleWidth = width * 2;
  const height = 600;
  const flippingTime = 1000;
  let pagesLength = 12;
  const importAll = (r) => {
    let images = {};
    r.keys().forEach((item, index) => {
      images[item.replace('./', '')] = r(item);
    });
    return images;
  };

  let images = importAll(
    require.context('../../../../assets/book', false, /\.(png|jpe?g|svg)$/)
  );

  let fHeight;
  let fWidth;
  if (height / doubleWidth >= window.innerHeight / window.innerWidth) {
    fHeight = Math.ceil(window.innerHeight * 0.9);
    fWidth = Math.ceil((fHeight * doubleWidth) / height);
    console.log('case1', fHeight, fWidth);
  } else {
    fWidth = Math.ceil(window.innerWidth * 0.9);
    fHeight = Math.ceil((fWidth * height) / doubleWidth);
    console.log('case2', fHeight, fWidth);
  }

  if (rtl) {
    const entries = Object.entries(images);
    const reversedEntries = entries.reverse();
    const reversedObject = Object.fromEntries(reversedEntries);
    images = reversedObject;
  }
  //   if odd add more image
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
    <Wrapper minWidth={fWidth + 'px'}>
      <MainBook
        images={images}
        width={fWidth / 2}
        height={fHeight}
        flippingTime={flippingTime}
        startPage={rtl ? pagesLength - 1 : 0}
        showCover={showCover}
      />
    </Wrapper>
  );
};

export default BookPreparation;
