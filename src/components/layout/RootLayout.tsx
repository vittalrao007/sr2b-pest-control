import React from 'react';
import { Outlet } from 'react-router-dom';
import { AnnouncementBar } from './AnnouncementBar';
import { Header } from './Header';
import { Footer } from './Footer';
import { StickyMobileBar } from './StickyMobileBar';
import { ScrollToTop } from '../common/ScrollToTop';

export const RootLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8F6F1] text-[#263442]">
      <ScrollToTop />
      <AnnouncementBar />
      <Header />
      <main className="flex-1 pb-16 md:pb-0">
        <Outlet />
      </main>
      <Footer />
      <StickyMobileBar />
    </div>
  );
};
