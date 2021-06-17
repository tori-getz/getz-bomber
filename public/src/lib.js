
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

const ConnectToBomber = () => {
    const client = io('');

    setConnected();
}
