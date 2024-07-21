import '@fontsource/noto-sans-jp/400.css';
import '@fontsource/noto-sans-jp/700.css';

import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
    fonts: {
        heading: '"Noto Sans JP", sans-serif',
        body: '"Noto Sans JP", sans-serif',
    },
});
