
$(() => {
    axios.get('/user?token=' + localStorage.getItem('token'))
    .then(({ error, name }) => {
        if (error === undefined) {
            navigate('auth', AuthScreen);
        } else {
            navigate('cabinet', CabinetScreen);
        }
    });
});
