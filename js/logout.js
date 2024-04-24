const check_input = () => {
    const logoutForm = document.getElementById('logout_form');
    const logoutBtn = document.getElementById('logout_btn');

    const c = '로그아웃합니다.';
    alert(c);
    logoutForm.submit();
};

document.getElementById("logout_btn").addEventListener('click', check_input);