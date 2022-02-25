import React from 'react';
import { UserButton, useUser } from '@clerk/nextjs';

const TopBar = () => {
    const { firstName } = useUser();
    return (
        <nav className="flex justify-between px-10 py-4 items-center ">
            <h1 className="font-bold text-xl text-black">Trustrello</h1>
            <div className="flex items-center text-black">
                <p className="font-bold mr-3">{firstName}</p>
                <UserButton />
            </div>
        </nav>
    );
};

export default TopBar;
