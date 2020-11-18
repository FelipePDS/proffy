const themes = {
    light: {
        colorBackground: '#F0F0F7',
        colorPrimaryLighter: '#9871F5',
        colorPrimaryLight: '#916BEA',
        colorPrimary: '#8257E5',
        colorPrimaryDark: '#774DD6',
        colorPrimaryDarker: '#6842c2',
        colorSecondary: '#04D361',
        colorSecondaryDark: '#04BF58',
        colorTitleInPrimary: '#FFFFFF',
        colorTextInPrimary: '#D4C2FF',
        colorTextTitle: '#32264D',
        colorTextComplement: '#9C98A6',
        colorTextBase: '#6A6180',
        colorLineInWhite: '#E6E6F0',
        colorInputBackground: '#F8F8FC',
        colorButtonText: '#FFFFFF',
        colorBoxBase: '#FFFFFF',
        colorBoxFooter: '#FAFAFC',
        colorSmallInfo: '#C1BCCC',
        colorCardBackground: '#fafafc',
        colorCardBorder: '#c9c9da',
        colorScrollbar: '#9871F5',
        colorScrollbarDark: '#8157e4',
        colorScrollbarBackground: '#e0d7f1'
    },

    dark: {
        colorBackground: '#18191a',
        colorPrimaryLighter: '#9871F5',
        colorPrimaryLight: '#764bdb',
        colorPrimary: '#683bd1',
        colorPrimaryDark: '#7247d4',
        colorPrimaryDarker: '#572cbb',
        colorSecondary: '#04D361',
        colorSecondaryDark: '#04BF58',
        colorTitleInPrimary: '#FFFFFF',
        colorTextInPrimary: '#D4C2FF',
        colorTextTitle: '#f1eff7',
        colorTextComplement: '#9C98A6',
        colorTextBase: '#ded8ee',
        colorLineInWhite: '#242526',
        colorInputBackground: '#2c2e30',
        colorButtonText: '#FFFFFF',
        colorBoxBase: '#242526',
        colorBoxFooter: '#2c2e30',
        colorSmallInfo: '#C1BCCC',
        colorCardBackground: '#393d41',
        colorCardBorder: '#2b2d30',
        colorScrollbar: '#683bd1',
        colorScrollbarDark: '#5c33bb',
        colorScrollbarBackground: '#2c2e30'
    }
}

function setTheme(newTheme) {
    const themeColors = themes[newTheme]

    Object.keys(themeColors).map(function(key) {
        document.querySelector('html').style.setProperty(`--${key}`, themeColors[key])
    })
}

themeContainer.addEventListener('click', () => {
    localStorage.setItem('Theme', buttonSetTheme.checked ? 'dark' : 'light')
    setTheme(localStorage.Theme)
})

setTheme(localStorage.Theme)
localStorage.Theme === 'dark' ? buttonSetTheme.checked = true : buttonSetTheme.checked = false