import React from "react"
import { useMediaQuery } from "react-responsive"

// Desktop 기준
const Desktop = ({ children }) => {
    const isDesktop = useMediaQuery({ minWidth: 1281 })
    return isDesktop ? children : null
    }

// Tablet 기준
const Tablet = ({ children }) => {
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1280 })
    return isTablet ? children : null
    }

export { Desktop, Tablet }