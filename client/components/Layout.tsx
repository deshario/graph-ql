import Navbar from './Navbar';
import styled from "styled-components";
import { useState } from "react"
import { LayoutInterface } from '../components/interface';

const Layout = (props:LayoutInterface) => {
  const [isMobNavOpen, setMobNavOpen] = useState(false);
  return (
    <Root>
      <Navbar isMobNavOpen={isMobNavOpen} setMobNavOpen={setMobNavOpen}/>
      <Content className="container-fluid" isMobNavOpen={isMobNavOpen}>
        {props.children}
      </Content>
    </Root>
  )
}

const Root = styled.div`
  background:rgb(241,241,241);
  min-height:100vh;
  height:100%;
`
const Content = styled.div<LayoutInterface>`
  z-index: -1;
  
  @media (max-width: 920px){
    position: ${props => props.isMobNavOpen ? 'absolute' : ''}
  }
`
export default Layout