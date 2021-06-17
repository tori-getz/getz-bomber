
const AuthScreen = () => {
    setTitle('Авторизация');
    setVisible('auth');

    $('#login').on('input', () => {
        $('#login-text').css('display', 'none');
    });

    $('#password').on('input', () => {
        $('#password-text').css('display', 'none');
    });

    $('#AuthButton').on('click', () => {
        $("#AuthError").css('display', 'none');
        $('#login-text').css('display', 'none');
        $('#password-text').css('display', 'none');

        const login = $('#login').val();
        const password = $('#password').val();

        if (login === '') {
            $('#login-text').css('display', 'block');
        }

        if (password === '') {
            $('#password-text').css('display', 'block');
            return;
        }

        Authentificate(login, password);
    });
}

const CabinetScreen = () => {
    GetUser();
    ConnectToBomber();

    $('#ThemeToggler').on('click', () => toggleTheme());
}
