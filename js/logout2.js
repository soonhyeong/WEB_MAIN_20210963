function session_del() {//세션 삭제
    if (sessionStorage) {
        sessionStorage.removeItem("Session_Storage_id");
        sessionStorage.removeItem("Session_Storage_pass");
        alert('로그아웃 버튼 클릭 확인 : 세션 스토리지 및 쿠키를 삭제합니다.');
    }
    else{
        alert("세션 스토리지 지원 x");
    }
}

function setCookie(name, value, expiredays){
    var date = new Date();
    date.setDate(date.getDate() + expiredays);
    document.cookie = escape(name) + "=" + escape(value) + "; expires=" + date.toUTCString() + "; path=/" + ";SameSite=None; Secure";
}

function deletecookie(name){
    setCookie(name, "", -1);
}

function logout(){
    session_del();  
    deletecookie("login_cnt");
    deletecookie("login_fail_count");
    location.href='../index.html';
}    

document.getElementById("logout_btn").addEventListener('click', function(){
    logout();
});