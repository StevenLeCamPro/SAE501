import Cookies from 'js-cookie';

function logout() {
    Cookies.remove('pharminnov_login');
    console.log('User logged out');
};

export default logout