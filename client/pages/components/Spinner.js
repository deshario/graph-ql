import styled, { keyframes } from "styled-components";

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  animation: ${rotate360} 1s linear infinite;
  transform: translateZ(0);
  border-top: 2px solid grey;
  border-right: 2px solid grey;
  border-bottom: 2px solid grey;
  border-left: 4px solid black;
  background: transparent;
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const SpinnerHolder = styled.div`
  display: flex;
  background: white;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  cursor: pointer;
  padding: 15px;
  border-radius: 2px;
  justify-content:center;
  align-items:center;

  position: absolute;
  margin: auto;
  width: auto;
  left: ${(props) => props.marginLeft ?  props.marginLeft : "0"};
  right: ${(props) => props.marginLeft ?  props.marginLeft : "0"};
`

const Loader = ({ mL, mR }) => {
  return (
    <SpinnerHolder marginLeft={mL} marginRight={mR}>
      <Spinner></Spinner>
    </SpinnerHolder>
  )
}

export default Loader;