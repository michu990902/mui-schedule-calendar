import React from 'react'
import { useTheme } from '@material-ui/core/styles'
import { useMediaQuery } from '@material-ui/core'

const ResponsiveViewSwitcher = ({fullScreen, middleScreen, smallScreen}) => {
    const theme = useTheme();
    const isMiddleScreen = useMediaQuery(theme.breakpoints.up('sm'));
    const isFullScreen = useMediaQuery(theme.breakpoints.up('md'));
    return isFullScreen ? fullScreen : isMiddleScreen ? middleScreen : smallScreen;
};

export default ResponsiveViewSwitcher;