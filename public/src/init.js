
$(() => {
    axios.get('/user?token=' + localStorage.getItem('token'))
    .then(({ error, name }) => {
        alert(error);

        if (error) {
            navigate('auth', AuthScreen);
        } else {
            navigate('cabinet', CabinetScreen);
        }
    });
});
