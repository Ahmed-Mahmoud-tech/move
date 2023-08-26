import styled from 'styled-components';
export const Wrapper = styled.div`
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  top: 50%;
  /* border: 1px solid #101010; */
  box-sizing: content-box;
  /* box-shadow: inset 0 15px 82px 5px #101010; */
  /* box-shadow: inset 0 15px 100px 100px #00000030; */
  .book {
    width: ${(props) => props.Width};
    margin: auto;
  }
`;
