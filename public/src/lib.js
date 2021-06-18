
const Authentificate = (login, password) => {
    axios.get(`/auth?login=${login}&password=${password}`)
    .then(({ data: { error, token } }) => {
        if (error) {
            $('#AuthError').html(error);
            $('#AuthError').css('display', 'block');
            return;
        }

        localStorage.setItem('token', token);

        navigate('cabinet', CabinetScreen);
    });
}

const GetUser = () => {
    axios.get('/user?token=' + localStorage.getItem('token'))
    .then(({ data: { name } }) => {
        $('#ProfileName').html(`Здравствуйте, ${name}!`);
    });
}

const ConnectToBomber = (cb) => {
    const client = io('');

    cb(client);

    client.on(SERVICES_COUNT, servicesCount => {
        $('#ServicesCount').html(servicesCount);
    });

    client.on('disconnect', () => {
        SetDisconnected();
    });

    setConnected();
}

const quitToAuth = (socket) => {
    socket.disconnect();
    localStorage.setItem('token', '');
    location.reload();
}
