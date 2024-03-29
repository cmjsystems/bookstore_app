function isUserLoggedIn() {
    const username = sessionStorage.getItem('username');
    return username && typeof username === 'string' && username.trim() !== ''
}

function userName() {
    return sessionStorage.getItem('username');
}

module.exports = {
    isUserLoggedIn,
    userName
};