import styled from "styled-components";
import { useState } from 'react'
import { FaBars } from 'react-icons/fa';
import Router, { withRouter } from 'next/router'

const Navbar = ({ router }) => {

  const [isMobNavOpen, setMobNavOpen] = useState(false);

  const checkActive = currentTab => router.pathname == currentTab ? 'active' : '';

  const setRoutePage = pageName => Router.push({ pathname: pageName});

  return (
    <Nav>
      <NavLogo>Deshario</NavLogo>
      <HamBurgerMenu>
        <FaBars size={35} style={{color:'white'}} onClick={() => setMobNavOpen(!isMobNavOpen)}/>
      </HamBurgerMenu>
      <Menu isMobNavOpen={isMobNavOpen}>
        <MenuItem>
          <MenuLink className={checkActive('/')} onClick={() => setRoutePage('/')}>Posts</MenuLink>
        </MenuItem>
        <MenuItem>
          <MenuLink className={checkActive('/about')} onClick={() => setRoutePage('/about')}>About</MenuLink>
        </MenuItem>
        <MenuItem>
          <MenuLink className={checkActive('/contact')} onClick={() => setRoutePage('/contact')}>Contact</MenuLink>
        </MenuItem>
      </Menu>
    </Nav>
  );
};

const HamBurgerMenu = styled.div`
  display:none;

  @media (max-width: 920px){
    display:block;
  }
`;

const Nav = styled.nav`
  display: flex;
  height: 80px;
  width: 100%;
  background: #1b1b1b;
  align-items: center;
  justify-content: space-between;
  padding: 0 50px 0 100px;
  flex-wrap: wrap;

  @media (max-width: 1000px){
    padding: 0 40px 0 50px;
  }
`;

const NavLogo = styled.div`
  color: #fff;
  font-size: 35px;
  font-weight: 600;
`

const Menu = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style: none;

  @media (max-width: 920px){
    position: fixed;
    top: 80px;
    left: ${props => props.isMobNavOpen ? '0' : '-100%'};
    background: #111;
    height: 100vh;
    width: 100%;
    text-align: center;
    display: block;
    transition: all 0.3s ease;
  }
`;

const MenuItem = styled.li`
  margin: 0 5px;
  cursor:pointer;
  
  @media (max-width: 920px){
    width: 100%;
    margin: 40px 0;
  }
`;

const MenuLink = styled.a`
  color: #f2f2f2;
  text-decoration: none;
  font-size: 18px;
  font-weight: 500;
  padding: 8px 15px;
  border-radius: 5px;
  letter-spacing: 1px;
  transition: all 0.3s ease;

  //&.active, &:hover {
  &.active{
    color: #111;
    background: #fff;
  }

  @media (max-width: 920px){
    width: 100%;
    //margin-left: -100%;
    margin-left: 0;
    display: block;
    font-size: 20px;
    transition: 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);

    &.active, &:hover {
      background: none;
      color: cyan;
    }
  }
`

export default withRouter(Navbar)