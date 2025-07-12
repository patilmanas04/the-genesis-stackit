import React, { useState } from "react";
import styled from "styled-components";
import { FiBell, FiUser, FiMenu, FiX } from "react-icons/fi";
import { BsMoon } from "react-icons/bs";
import { IoMdAdd } from "react-icons/io";
import { FaTags, FaTrophy } from "react-icons/fa";
import { AiOutlineHome } from "react-icons/ai";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <Nav>
        <LeftSection>
          <Logo>
            <LogoIcon>✨</LogoIcon>
            <span>StackIt</span>
          </Logo>

          <DesktopNavLinks>
            <NavItem><AiOutlineHome /> Home</NavItem>
            <NavItem><FaTags /> Tags</NavItem>
            <NavItem><FaTrophy /> Leaderboard</NavItem>
          </DesktopNavLinks>
        </LeftSection>

        <SearchInput placeholder="Search questions..." />

        <RightSection>
          <DesktopIcons>
            <IconButton><BsMoon /></IconButton>
            <AskButton><IoMdAdd /> Ask Question</AskButton>
            <Notification><FiBell /><Badge>3</Badge></Notification>
            <IconButton><FiUser /></IconButton>
          </DesktopIcons>

          <Hamburger onClick={() => setMenuOpen(true)}>
            <FiMenu size={22} />
          </Hamburger>
        </RightSection>
      </Nav>

      {/* Mobile Slide-Out Drawer */}
      <DrawerOverlay open={menuOpen} onClick={() => setMenuOpen(false)} />
      <Drawer open={menuOpen}>
        <DrawerHeader>
          <Logo>
            <LogoIcon>✨</LogoIcon>
            <span>StackIt</span>
          </Logo>
          <FiX size={24} onClick={() => setMenuOpen(false)} style={{ cursor: "pointer" }} />
        </DrawerHeader>

        <DrawerContent>
          <NavItem><AiOutlineHome /> Home</NavItem>
          <NavItem><FaTags /> Tags</NavItem>
          <NavItem><FaTrophy /> Leaderboard</NavItem>

          <SearchInput placeholder="Search..." style={{ marginTop: "14px" }} />

          <AskButton full><IoMdAdd /> Ask Question</AskButton>

          <DrawerIcons>
            <IconButton><BsMoon /></IconButton>
            <IconButton><FiBell /></IconButton>
            <IconButton><FiUser /></IconButton>
          </DrawerIcons>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Navbar;

// Styled Components
const Nav = styled.nav`
  background: #fff;
  padding: 10px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 4px 12px rgba(0,0,0,0.06);
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  font-size: 20px;
  font-weight: 700;
  color: #14b884;
  gap: 8px;
`;

const LogoIcon = styled.div`
  background: #14b884;
  color: white;
  padding: 6px;
  font-size: 18px;
  border-radius: 12px;
`;

const DesktopNavLinks = styled.div`
  display: flex;
  gap: 12px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  background: #f5f5f5;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 500;
  color: #111;
  cursor: pointer;
`;

const SearchInput = styled.input`
  background: #f5f7fa;
  padding: 10px 14px;
  border-radius: 12px;
  border: none;
  font-size: 14px;
  max-width: 400px;
  flex: 1;
  margin: 0 16px;
  outline: none;

  @media (max-width: 768px) {
    display: none;
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const DesktopIcons = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Hamburger = styled.div`
  display: none;
  cursor: pointer;
  @media (max-width: 768px) {
    display: block;
  }
`;

const IconButton = styled.div`
  background: #f5f5f5;
  padding: 10px;
  border-radius: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AskButton = styled.button`
  background: #14b884;
  color: white;
  padding: 10px 18px;
  border: none;
  border-radius: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  width: ${(props) => (props.full ? "100%" : "auto")};
`;

const Notification = styled.div`
  position: relative;
  background: #f5f5f5;
  padding: 10px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const Badge = styled.span`
  position: absolute;
  top: 0px;
  right: 0px;
  background-color: #f47ca0;
  color: white;
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 50%;
`;

// Drawer Styles

const Drawer = styled.div`
  position: fixed;
  top: 0;
  right: ${(props) => (props.open ? "0" : "-100%")};
  height: 100%;
  width: 260px;
  background: #fff;
  box-shadow: -4px 0 12px rgba(0,0,0,0.1);
  transition: right 0.3s ease-in-out;
  z-index: 1500;
  padding: 16px;
  display: flex;
  flex-direction: column;

  @media (min-width: 769px) {
    display: none;
  }
`;

const DrawerOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: ${(props) => (props.open ? "100%" : "0")};
  height: 100vh;
  background: rgba(0,0,0,0.2);
  z-index: 1400;
  overflow: hidden;
`;

const DrawerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const DrawerContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const DrawerIcons = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 10px;
`;
