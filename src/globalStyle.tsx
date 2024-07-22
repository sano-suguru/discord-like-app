import { Global } from "@emotion/react";
import React from "react";

export const GlobalStyle: React.FC = React.memo(() => (
    <Global
        styles={`
            @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&display=swap');

            body {
                font-family: 'Noto Sans JP', sans-serif;
            }
        `}
    />
));

GlobalStyle.displayName = 'GlobalStyle';
