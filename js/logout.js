const check_input = () => {
    const logoutForm = document.getElementById('logout_form');
    const logoutBtn = document.getElementById('logout_btn');

    const c = '로그아웃합니다.';
    alert(c);
    logoutForm.submit();
};

function setCookie(name, value, expiredays){
    var date = new Date();
    date.setDate(date.getDate() + expiredays);
    document.cookie = escape(name) + "=" + escape(value) + "; expires=" + date.toUTCString() + "; path=/" + ";SameSite=None; Secure";
}

function getCookie(name){
    var cookie = document.cookie;
    console.log("쿠키를 요청합니다.");
    if (cookie !=""){
        var cookie_array = cookie.split("; ");
        for(var index in cookie_array){
            var cookie_name = cookie_array[index].split("=");
            if(cookie_name[0] == "id"){
                return cookie_name[1];
            }
        }
    }
    return;
}

function logout_count(){
    let logoutCnt = getCookie("logout_cnt");
    logoutCnt++;
    setCookie("logout_cnt", logoutCnt.value, 1);
    alert('로그아웃카운트');
}

document.getElementById("logout_btn").addEventListener('click', function(){
    check_input();
    logout_count();
});