

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

function init(){ // 로그인 폼에 쿠키에서 가져온 아이디 입력
    const emailInput = document.getElementById('typeEmailX');
    const idsave_check = document.getElementById('idSaveCheck');
    let get_id = getCookie("id");
    
    if(get_id){
        emailInput.value = get_id;
        idsave_check.checked = true;
    }
    session_check();//세션 유무 검사
}

function login_count() {
    let loginCnt = parseInt(getCookie("login_cnt")) || 0; // 쿠키 값을 가져와서 정수로 변환
    loginCnt++; // 카운트 증가
    setCookie("login_cnt", loginCnt, 1); // 쿠키에 저장
    let loginCntString = String(loginCnt);
    alert('로그인 카운트: ' + loginCntString); // 카운트 알림
}

function login_failed() {
    let failCount = parseInt(getCookie("login_fail_count")) || 0; // 로그인 실패 횟수 쿠키 값 가져오기, 없으면 0
    failCount++; // 실패 횟수 증가
    setCookie("login_fail_count", failCount, 1); // 쿠키에 실패 횟수 저장

    if (failCount >= 3) {
        alert("로그인 시도가 3번 이상 실패했습니다. 로그인이 제한됩니다.");
        document.getElementById("login_btn").disabled = true; // 로그인 버튼 비활성화
    } else {
        alert("로그인 실패 횟수: " + failCount);
    }
}

function session_set(){//세션 저장
    let session_id = document.querySelector("#typeEmailX");
    let session_pass = document.querySelector("#typePasswordX");
    if (sessionStorage) {
        let en_text = encrypt_text(session_pass.value);
        sessionStorage.setItem("Session_Storage_id", session_id.value);
        sessionStorage.setItem("Session_Storage_pass", en_text);
    }
    else {
        alert("로컬 스토리지 지원 x");
    }
}

function session_get() {//세션 읽기
    if (sessionStorage) {
        return sessionStorage.getItem("Session_Storage_pass");
    }
    else {
        alert("세션 스토리지 지원 x");
    }
}

function session_check() {//세션 검사
    if(sessionStorage.getItem("Session_Storage_id")){
        alert("이미 로그인 되었습니다.");
        location.href=`../login/index_login.html`;// 로그인된 페이지로 이동
    }
}


function encodeByAES256(key, data){
    const cipher = CryptoJS.AES.encrypt(data, CryptoJS.enc.Utf8.parse(key), {
        iv: CryptoJS.enc.Utf8.parse(""),
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC
    });
    return cipher.toString();
}

function decodeByAES256(key, data){
    const cipher = CryptoJS.AES.decrypt(data, CryptoJS.enc.Utf8.parse(key), {
        iv: CryptoJS.enc.Utf8.parse(""),
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC
    });
    return cipher.toString(CryptoJS.enc.Utf8);
}

function encrypt_text(password){
    const k = "key";//클라이언트 키
    const rk = k.padEnd(32, " ");//AES256은 key 길이가 32
    const b = password;
    const eb = this.encodeByAES256(rk, b);
    return eb;
    console.log(eb);
}

function decrypt_text(){
    const k = "key"; //서버의 키
    const rk = k.padEnd(32, " "); //AES256은 key 길이가 32
    const eb = session_get();
    const b = this.decodeByAES256(rk, eb);
    console.log(b);
}

function init_logined(){
    if(sessionStorage){
        decrypt_text();
    }
    else{
        alert("세션 스토리지 지원 x");
    }
}

var logout_time; // 로그아웃 타이머
var logout_time2 = 300; // 5분 (300초) 설정

function startLogoutTimer() {
    // 기존 타이머를 정지
    clearTimeout(logout_time);
    // 자동 로그아웃 타이머 시작 (5분 후)
    logout_time = setTimeout("auto_logout()", 300000); // 300,000밀리초 = 300초 = 5분
    // 남은 시간 표시 시작
    show_time();
}

function show_time() {
    let divClock = document.getElementById('Time');
    divClock.innerText = logout_time2; // 10초 삽입 시작
    if (logout_time2 > 0) {
        logout_time2--; // 1초씩 감소
        setTimeout(show_time, 1000); // 1초마다 갱신
    }
    if (logout_time2 === 30) {
        alert('30초 후 자동 로그아웃됩니다.');
    }
    if (logout_time2 = 0){
        auto_logout();
    }
}

function session_del() {//세션 삭제
    if (sessionStorage) {
        sessionStorage.removeItem("Session_Storage_id");
        sessionStorage.removeItem("Session_Storage_pass");
        alert('세션 스토리지 및 쿠키를 삭제합니다.');
    }
    else{
        alert("세션 스토리지 지원 x");
    }
}

function deletecookie(name){
    setCookie(name, "", -1);
}

function auto_logout() {
    alert('장시간 활동이 없어 자동으로 로그아웃 됩니다.');
    session_del();  
    deletecookie("login_cnt");
    deletecookie("login_fail_count");
    location.href = '../index.html'; // 로그아웃 후 리디렉션 (예시)
}