import React from 'react';
import Aside from '@/components/Aside';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Main from '@/components/Main';
import Section from '@/components/login/Section';
import { MainProps } from '@/types/MainProps';
import LoginRequired from './login/LoginRequired';

type TypeLayout = {
  activePage: 'home' | 'calendar' | 'profile';
};

function Layout({ children, activePage }: MainProps & TypeLayout) {
  return (
    <div className="flex">
      <LoginRequired />

      <Aside className="w-80" activePage={activePage} />
      <Main className="pl-80">
        <>
          <Header />
          <Section>{children}</Section>
          <Footer />
        </>
      </Main>
    </div>
  );
}

export default Layout;
