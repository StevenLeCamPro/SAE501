import Cookies from 'js-cookie'

function GetCookieInfo() {
    const getAuthData = () => {
        const cookie = Cookies.get('auth_data');
        return cookie ? JSON.parse(cookie) : null;
    };

    const authData = getAuthData();
    if (authData) {
        console.log('User ID:', authData.user_id);
        console.log('Role:', authData.role);
        console.log('Token:', authData.token);
    }

    return authData
}

export default GetCookieInfo