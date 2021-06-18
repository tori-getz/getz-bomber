
let THEME = localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light';
let CURRENT_SCREEN = 'auth';

const toggleTheme = () => {
    if (THEME === 'dark') {
        THEME = 'light';
        localStorage.setItem('theme', 'light');
        $('.theme').attr('href', 'css/light.css');
        return;
    }

    if (THEME === 'light') {
        THEME = 'dark';
        localStorage.setItem('theme', 'dark');
        $('.theme').attr('href', 'css/dark.css');
        return;
    }
}

$('.theme').attr('href', `css/${THEME}.css`);
$('#PhoneNumber').mask('+70000000000');

const setTitle = (title) => $('.title').html(title);

const setVisible = el => $(`.${el}`).css('display', 'flex');
const setUnvisible = el => $(`.${el}`).css('display', 'none');

const navigate = (screen, handler = () => console.log('[NAVIGATOR] - default handler')) => {
    setUnvisible(CURRENT_SCREEN);
    handler();

    console.log('[NAVIGATOR] - CURRENT SCREEN => ' + CURRENT_SCREEN);
    console.log('[NAVIGATOR] - NEXT SCREEN => ' + screen);

    CURRENT_SCREEN = screen;

    setVisible(screen);
}

const setConnected = () => {
    $('#Connection').attr('class', 'connected');
    $('#Connection').html("ПОДКЛЮЧЕНО");
}

const SetDisconnected = () => {
    $('#Connection').attr('class', 'disconnected');
    $('#Connection').html("ОТКЛЮЧЕНО");
}

let attackTogglerClicked = false;
$("#AttackToggler").on('click', () => {
    if (!attackTogglerClicked) {
        $("#AttackToggler").attr('class', 'input rounded shadow toggled');
        setVisible('attack-menu');
        attackTogglerClicked = true;
    } else {
        $("#AttackToggler").attr('class', 'input rounded shadow');
        setUnvisible("attack-menu");
        attackTogglerClicked = false
    }
});
