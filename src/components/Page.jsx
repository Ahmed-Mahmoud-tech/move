// import { useEffect, useRef } from 'react';
// // import image8 from '../../assets/book/8.jpg';

// function Page(props) {
//   const ref = useRef(null);

//   useEffect(() => {
//     console.log(ref);
//   }, []);

//   return (
//     <div className="demoPage" ref={ref}>
//       {/* <h1>Page Header</h1> */}
//       <div>{props.children}</div>
//       {/* <p>Page number: {props.number}</p> */}
//     </div>
//   );
// }
// export default Page;

import React from 'react';
import image1 from '../assets/book/2.jpg';
function RefExample() {
  // Create a ref using the useRef hook
  //   const inputRef = useRef(null);

  return (
    <div className="demoPage">
      <img src={image1} />
    </div>
  );
}

export default RefExample;
