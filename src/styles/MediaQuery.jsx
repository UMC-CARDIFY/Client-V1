import React from "react"
import { useMediaQuery } from "react-responsive"

// Desktop 기준
const Desktop = ({ children }) => {
    const isDesktop = useMediaQuery({ minWidth: 1441 })
    return isDesktop ? children : null
    }

const Laptop = ({ children }) => {
    const isLaptop = useMediaQuery({ minWidth: 1025, maxWidth: 1440 })
    return isLaptop ? children : null
    }

// Tablet 기준
const Tablet = ({ children }) => {
    const isTablet = useMediaQuery({ maxWidth: 1024 })
    return isTablet ? children : null
    }

export { Desktop, Laptop, Tablet }