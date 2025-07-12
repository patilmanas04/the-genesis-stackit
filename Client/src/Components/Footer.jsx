import React from "react";
import styled from "styled-components";

const Footer = () => {
  return (
    <FooterContainer>
      <ContentWrapper>
        <Left>
          <Logo>S</Logo>
          <Text>StackIt – Collaborative Q&A Platform</Text>
        </Left>

        <Right>
          <FooterLink href="#">About</FooterLink>
          <FooterLink href="#">Help</FooterLink>
          <FooterLink href="#">Terms</FooterLink>
          <FooterLink href="#">Privacy</FooterLink>
        </Right>
      </ContentWrapper>
    </FooterContainer>
  );
};

export default Footer;

// Styled Components

const FooterContainer = styled.footer`
  background: #fdfefe;
  border-top: 1px solid #e5e7eb;
  padding: 16px 24px;
  font-family: 'Segoe UI', sans-serif;
  font-size: 14px;
  color: #6b7280;
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  @media (max-width: 768px) {
    flex-direction: row;
    align-items: center;
  }
`;

const Logo = styled.div`
  background-color: #14b884;
  color: white;
  font-weight: bold;
  padding: 6px 10px;
  border-radius: 6px;
  font-size: 14px;
`;

const Text = styled.span`
  color: #4b5563;
  font-weight: 500;
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 12px;
  }
`;

const FooterLink = styled.a`
  text-decoration: none;
  color: #6b7280;
  font-weight: 500;

  &:hover {
    color: #111827;
  }
`;
