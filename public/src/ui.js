
let THEME = 'light';

const toggleTheme = () => {
    if (THEME === 'dark') {
        THEME = 'light';
        $('.theme').attr('href', 'css/light.css');
        return;
    }

    if (THEME === 'light') {
        THEME = 'dark';
        $('.theme').attr('href', 'css/dark.css');
        return;
    }
}

const setTitle = (title) => $('.title').html(title);
