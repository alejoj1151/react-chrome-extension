import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Popup from './Popup';
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';
import { loadTheme } from '@uifabric/styling';

// Initialize OUFR icons.
initializeIcons();

// Replace OUFR default theme with FIFA 19 color theme.
loadTheme({
    palette: {
        themePrimary: '#06153d',
        themeLighterAlt: '#cfd5e8',
        themeLighter: '#a7b2d2',
        themeLight: '#8393bd',
        themeTertiary: '#6476a8',
        themeSecondary: '#495c92',
        themeDarkAlt: '#32467d',
        themeDark: '#1f3268',
        themeDarker: '#102253',
        neutralLighterAlt: '#9fe7da',
        neutralLighter: '#9de3d6',
        neutralLight: '#96dacd',
        neutralQuaternaryAlt: '#8ccbbf',
        neutralQuaternary: '#86c2b7',
        neutralTertiaryAlt: '#80baaf',
        neutralTertiary: '#f9c4d3',
        neutralSecondary: '#f38ba9',
        neutralPrimaryAlt: '#ed5983',
        neutralPrimary: '#ea4372',
        neutralDark: '#b23458',
        black: '#832641',
        white: '#a2ecde'
    }
});

chrome.tabs.query({ active: true, currentWindow: true }, tab => {
    ReactDOM.render(<Popup />, document.getElementById('popup'));
});
