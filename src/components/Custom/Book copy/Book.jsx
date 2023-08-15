/* eslint-disable react/display-name */

// import React from 'react';
// import HTMLFlipBook from 'react-pageflip';
// import image1 from '../../../assets/book/1.jpg';
// import image2 from '../../../assets/book/2.jpg';
// import image3 from '../../../assets/book/3.jpg';
// import image4 from '../../../assets/book/4.jpg';
// import image5 from '../../../assets/book/5.jpg';
// import image6 from '../../../assets/book/6.jpg';
// import image7 from '../../../assets/book/7.jpg';
// import image8 from '../../../assets/book/8.jpg';
// import video1 from '../../../assets/book/video.mp4';
// import { Wrapper } from './Book.styled';

// const Page = React.forwardRef((props, ref) => {
//   return (
//     <div className="demoPage" ref={ref}>
//       {/* <h1>Page Header</h1> */}
//       {props.children}
//       {/* <p>Page number: {props.number}</p> */}
//     </div>
//   );
// });

// const Book = () => {
//   return (
//     <Wrapper>
//       {/* <div className="middle"></div> */}
//       <HTMLFlipBook
//         width={300}
//         height={500}
//         drawShadow={true}
//         maxShadowOpacity={1}
//         // startZIndex={5}
//         // maxShadowOpacity={1}
//         // flippingTime={1000}
//       >
//         <Page>
//           <img src={image1} />
//         </Page>
//         <Page>
//           <img src={image2} />
//           <div className="videoCont">
//             <video width="200" height="100" controls>
//               <source src={video1} type="video/mp4"></source>
//               Your browser does not support the video tag.
//             </video>
//           </div>
//         </Page>
//         <Page>
//           <img src={image3} />
//         </Page>
//         <Page>
//           <img src={image4} />
//         </Page>
//         <Page>
//           <img src={image5} />
//         </Page>
//         <Page>
//           <img src={image6} />
//         </Page>
//         <Page>
//           <img src={image7} />
//         </Page>
//         <Page>
//           <img src={image8} />
//         </Page>
//       </HTMLFlipBook>
//     </Wrapper>
//   );
// };

// export default Book;

// import React from 'react';
// import HTMLFlipBook from 'react-pageflip';
// // import './app.scss';

// const PageCover = React.forwardRef((props, ref) => {
//   return (
//     <div className="page page-cover" ref={ref} data-density="hard">
//       <div className="page-content">
//         <h2>{props.children}</h2>
//       </div>
//     </div>
//   );
// });

// const Page = React.forwardRef((props, ref) => {
//   return (
//     <div className="page" ref={ref}>
//       <div className="page-content">
//         <h2 className="page-header">Page header - {props.number}</h2>
//         <div className="page-image"></div>
//         <div className="page-text">{props.children}</div>
//         <div className="page-footer">{props.number + 1}</div>
//       </div>
//     </div>
//   );
// });

// class DemoBook extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       page: 0,
//       totalPage: 0,
//       screeHt: 1,
//     };
//   }

//   nextButtonClick = () => {
//     this.flipBook.getPageFlip().flipNext();
//   };

//   prevButtonClick = () => {
//     this.flipBook.getPageFlip().flipPrev();
//   };

//   onPage = (e) => {
//     this.setState({
//       page: e.data,
//     });
//   };

//   componentDidMount() {
//     this.setState({
//       totalPage: this.flipBook.getPageFlip().getPageCount(),
//     });
//     this.setState({
//       screeHt: window.innerHeight,
//     });
//   }

//   render() {
//     return (
//       <div>
//         <HTMLFlipBook
//           width={550}
//           height={733}
//           minWidth={315}
//           maxWidth={1000}
//           minHeight={420}
//           maxHeight={1350}
//           size="stretch"
//           maxShadowOpacity={0.5}
//           showCover={true}
//           mobileScrollSupport={false}
//           onFlip={this.onPage}
//           onChangeOrientation={this.onChangeOrientation}
//           onChangeState={this.onChangeState}
//           className="demo-book"
//           ref={(el) => (this.flipBook = el)}
//         >
//           <PageCover>BOOK TITLE</PageCover>
//           <Page number={1}>Lorem ipsum...</Page>
//           <Page number={2}>Lorem ipsum...</Page>
//           <PageCover>THE END</PageCover>
//         </HTMLFlipBook>
//       </div>
//     );
//   }
// }

// export default function App() {
//   return <DemoBook />;
// }

import React, { useState, useEffect, useRef } from 'react';
import HTMLFlipBook, { PageFlip } from 'react-pageflip';
import { Wrapper } from './Book.styled';
// import './app.scss';
import image1 from '../../../assets/book/1.jpg';
import image2 from '../../../assets/book/2.jpg';
import image3 from '../../../assets/book/3.jpg';
import image4 from '../../../assets/book/4.jpg';
import image5 from '../../../assets/book/5.jpg';
import image6 from '../../../assets/book/6.jpg';
import image7 from '../../../assets/book/7.jpg';
import image8 from '../../../assets/book/8.jpg';
import video1 from '../../../assets/book/video.mp4';
const PageCover = React.forwardRef((props, ref) => {
  return (
    <div className="page page-cover" ref={ref} data-density="hard">
      {/* <div className="page-content">
        <h2>{}</h2>
      </div> */}
      {props.children}
    </div>
  );
});
const Page = React.forwardRef((props, ref) => {
  return (
    <div className="page" ref={ref}>
      <div className="page-content">
        <div className="shadow"></div>
        {/* <h2 className="page-header">Page header - {props.number}</h2>
        <div className="page-image"></div>
        <div className="page-text">{props.children}</div>
        <div className="page-footer">{props.number + 1}</div> */}
        {props.children}
      </div>
    </div>
  );
});

function DemoBook() {
  const [page, setPage] = useState(0);
  const [startPage, setStartPage] = useState();
  const [totalPage, setTotalPage] = useState();
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);
  const flipBookRef = useRef(null);

  const nextButtonClick = () => {
    // flipBookRef.current.getPageFlip().flipNext();
  };

  const prevButtonClick = () => {
    flipBookRef.current.getPageFlip().flipPrev();
  };

  const onPage = (e) => {
    setPage(e.data);
  };

  useEffect(() => {
    setTimeout(() => {
      setStartPage(5);
    }, 1000);

    if (flipBookRef.current) {
      const x = flipBookRef.current.getPageFlip();

      // x.props.startPage = 5;
      console.log(x, '555', x.getPageCount());

      setTimeout(() => {
        // x.turnToPage(5);
        x.flip(5);
      }, 2000);
    }
  }, []);

  return (
    <Wrapper>
      {startPage && (
        <div className="rtl">
          <HTMLFlipBook
            width={400}
            height={600}
            startPage={startPage}
            // minWidth={315}
            // maxWidth={1000}
            // minHeight={420}
            // maxHeight={1350}
            // size="stretch"
            maxShadowOpacity={0.3}
            showCover={true}
            mobileScrollSupport={false}
            onFlip={onPage}
            className="demo-book"
            ref={flipBookRef}
            currentPage={10}
            flippingTime={1000}
            // clickEventForward={true}
            useMouseEvents={true}
            // swipeDistance={10}

            // onChangeOrientation={this.onChangeOrientation}
            // onChangeState={this.onChangeState}
          >
            <PageCover>
              {/* <div style={{ height: '100%', width: '100%' }}></div> */}
              <img src={image8} />
            </PageCover>
            {/* <Page number={1}>Lorem ipsum...</Page>
          <Page number={2}>Lorem ipsum...</Page> */}

            <Page>
              <img src={image8} />
            </Page>
            {/* 
          <Page>
            <div style={{ height: '100%', width: '100%' }}></div>
          </Page>
          <Page>
            <div style={{ height: '100%', width: '100%' }}></div>
          </Page>
          <Page>
            <div style={{ height: '100%', width: '100%' }}></div>
          </Page> */}

            <Page>
              <img src={image3} />
            </Page>

            <Page>
              <img src={image4} />
            </Page>

            <Page>
              <img src={image5} />
            </Page>
            <Page>
              <img src={image2} />
              <div className="videoCont">
                <a href="https://google.com/" target="_blank" rel="noreferrer">
                  click here
                </a>
                <video width="200" height="100" controls>
                  <source src={video1} type="video/mp4"></source>
                  Your browser does not support the video tag.
                </video>
              </div>
            </Page>
            <Page>
              <img src={image6} />
            </Page>

            <Page>
              <img src={image7} />
            </Page>

            <Page>
              <img src={image8} />
            </Page>
            <Page>
              <img src={image3} />
            </Page>

            <Page>
              <img src={image4} />
            </Page>

            <Page>
              <img src={image5} />
            </Page>

            <Page>
              <img src={image6} />
            </Page>

            <Page>
              <img src={image7} />
            </Page>

            <Page>
              <img src={image8} />
            </Page>
            <Page>
              <img src={image3} />
            </Page>

            <Page>
              <img src={image4} />
            </Page>

            <Page>
              <img src={image5} />
            </Page>

            <Page>
              <img src={image6} />
            </Page>

            <Page>
              <img src={image7} />
            </Page>

            <Page>
              <img src={image8} />
            </Page>
            <PageCover>
              <img src={image5} />
            </PageCover>
          </HTMLFlipBook>
        </div>
      )}
    </Wrapper>
  );
}

export default function App() {
  return <DemoBook />;
}
