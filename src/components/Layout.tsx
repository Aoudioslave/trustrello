import React from 'react';
import TopBar from './TopBar';

type Props = {
    children: React.ReactElement;
};

const Layout = ({ children }: Props) => (
    <div className="min-w-full min-h-screen h-screen overflow-hidden bg-blue-100">
        <TopBar />
        <main>{children}</main>
    </div>
);

export default Layout;
