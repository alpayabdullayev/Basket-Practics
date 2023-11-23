import React, { useEffect } from "react";
import { useState } from "react";
import UseLocalStorage from "./UseLocalStorage";

function UseDarkMode() {
    const [theme, setTheme] = UseLocalStorage("Themes")

    useEffect(() => {
        document.body.classList.toggle("dark",theme)
    }, [theme])

    function changeMode() {
        document.body.classList.toggle("dark",theme)
        setTheme(!theme)
    }
    return [theme,changeMode]
}

export default UseDarkMode;
