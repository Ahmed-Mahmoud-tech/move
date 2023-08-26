import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`

:root{
    --hugFont:3rem;
    --bigFont:1.5rem;
    --mainColor: purple;
    --secondColor: green;
    --thirdColor: orange;
    --darkBg: #1e1e1e;
}



/* width */
::-webkit-scrollbar {
  width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1; 
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: #888; 
  border-radius: 100px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555; 
}


*{
    box-sizing: border-box;
    margin: 0;
    font-family: sans-serif;
}

body{
    min-height: 100vh;
    position: relative;
    display: grid;
}
img{
    max-width: 100%;
}
`;

export default GlobalStyles;

// arrow for close

// overlap sidebar ** stand alone sidebar
// icon fullScreen li toggle
// icon zoom li toggle
// icon autoFlip li toggle
// just input with place holder goToPage number
// input color backGround
// book shadow effect slider

// flipping time ===> tooltip of flipping page
// autoFlip time ===> tooltip time for each page before flip
