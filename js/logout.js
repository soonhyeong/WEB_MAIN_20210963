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

function logout_count() {
    let logoutCnt = parseInt(getCookie("logout_cnt")) || 0; // 쿠키 값을 가져와서 정수로 변환
    logoutCnt++; // 카운트 증가
    setCookie("logout_cnt", logoutCnt, 1); // 쿠키에 저장
    alert('로그아웃 카운트: ' + logoutCnt); // 카운트 알림
}

document.getElementById("logout_btn").addEventListener('click', function(){
    check_input();
    logout_count();
});