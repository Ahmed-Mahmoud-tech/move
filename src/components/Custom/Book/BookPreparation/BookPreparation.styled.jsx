import styled from 'styled-components';
export const Wrapper = styled.div`
  min-width: ${(props) => props.minWidth};
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  top: 50%;
  border: 1px solid #101010;
  box-sizing: content-box;
  box-shadow: inset 0 15px 82px 5px #101010;
`;
