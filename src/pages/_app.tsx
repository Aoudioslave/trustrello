import './style.css';
import React, {FunctionComponent} from 'react';
import {Provider} from '../MainApplication/Provider';
import {ClerkProvider, RedirectToSignIn, SignedIn, SignedOut} from "@clerk/clerk-react";
import Home from "./index";

const App: FunctionComponent = () => {
    return  <Provider><InnerApp/></Provider>
}

const InnerApp: FunctionComponent = () => {
    return (
        <ClerkProvider frontendApi="clerk.polished.bird-37.lcl.dev">
            <>
                <SignedIn>
                    <Home />
                </SignedIn>
                <SignedOut>
                    <RedirectToSignIn />
                </SignedOut>
            </>
        </ClerkProvider>
    );
};

export default App;
