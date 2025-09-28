import React from 'react';
import styled from 'styled-components';
import { Box } from '../ui';
import { Header } from './Header';
import { Footer } from './Footer';

const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  flex: 1;
  padding: ${({ theme }) => theme.space[8]} 0;
`;

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <LayoutContainer>
      <Header />
      <Main>
        {children}
      </Main>
      <Footer />
    </LayoutContainer>
  );
};