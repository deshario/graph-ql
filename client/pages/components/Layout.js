import Navbar from './Navbar';
import styled from "styled-components";

const Layout = props => {
  return (
    <>
      <Navbar/>
      <Content>
        {props.children}
      </Content>
    </>
  )
}

const Content = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  text-align: center;
  z-index: -1;
`
export default Layout