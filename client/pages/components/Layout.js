import Navbar from './Navbar';
import styled from "styled-components";

const Layout = props => {
  return (
    <>
      <Navbar/>
      <Content className="container">
        {props.children}
      </Content>
    </>
  )
}

const Content = styled.div`
  z-index: -1;
  
  @media (max-width: 920px){
    position: absolute;
  }
`
export default Layout