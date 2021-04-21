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
  z-index: ${props => props.isMobNavOpen ? '-1' : ''};
  
  @media (max-width: 920px){
    position: ${props => props.isMobNavOpen ? 'absolute' : ''};
    -webkit-filter: ${props => props.isMobNavOpen ? 'blur(15px)' : ''};
    -moz-filter: ${props => props.isMobNavOpen ? 'blur(15px)' : ''};
    -o-filter: ${props => props.isMobNavOpen ? 'blur(15px)' : ''};
    -ms-filter: ${props => props.isMobNavOpen ? 'blur(15px)' : ''};
    filter: ${props => props.isMobNavOpen ? 'blur(15px)' : ''};
    background-color: ${props => props.isMobNavOpen ? 'rgb(238 240 243)' : ''};
  }
`
export default Layout