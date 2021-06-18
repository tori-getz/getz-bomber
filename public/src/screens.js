
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
    setTitle('Личный кабинет');
    GetUser();
    ConnectToBomber(socket => {
        socket.on(ATTACKS, (count) => {
            console.log(`[BOMBER] attacks count ${count}`);
            $('#AttackCountInfo').html(count);
        });

        $('#QuitButton').on('click', () => quitToAuth(socket));

        $('#PhoneNumber').on('input', () => $('#PhoneNumberError').css('display', 'none'));
        $('#AttackCount').on('input', () => $('#AttackCountError').css('display', 'none'));

        $('#AttackButton').on('click', () => {
            $('#PhoneNumberError').css('display', 'none');
            $('#AttackCountError').css('display', 'none');

            const phone = $('#PhoneNumber').val();
            const attackCount = $('#AttackCount').val();


            if (phone.length !== 12) {
                $('#PhoneNumberError').css('display', 'block');
                return;
            }

            if (attackCount === '') {
                $('#AttackCountError').css('display', 'block');
                return;
            }

            console.log(`[BOMBER] attack ${phone} count ${attackCount}`);

            socket.emit(START, { phone, count: attackCount });

            $('#AttackInfo').css('display', 'block');

            setTimeout(() => {
                $("#AttackToggler").attr('class', 'input rounded shadow');
                setUnvisible("attack-menu");
                $('#PhoneNumber').val('');
                $('#AttackCount').val('');
                $('#AttackInfo').css('display', 'none');
            }, 3000)
        });
    });

    $('#ThemeToggler').on('click', () => toggleTheme());
}
