const check_xss = (input) => {
    // DOMPurify 라이브러리 로드 (CDN 사용)
    const DOMPurify = window.DOMPurify;

    // 입력 값을 DOMPurify로 sanitize
    const sanitizedInput = DOMPurify.sanitize(input);

    // Sanitized된 값과 원본 입력 값 비교
    if (sanitizedInput !== input) {
        // XSS 공격 가능성 발견 시 에러 처리
        alert('XSS 공격 가능성이 있는 입력값을 발견했습니다.');
        return false;
    }

    // Sanitized된 값 반환
    return sanitizedInput;
};

const check_input = () => {
    const idsave_check = document.getElementById('idSaveCheck');
    const loginForm = document.getElementById('login_form');
    const loginBtn = document.getElementById('login_btn');
    const emailInput = document.getElementById('typeEmailX');
    const passwordInput = document.getElementById('typePasswordX');

    const c = '아이디, 패스워드를 체크합니다';
    alert(c);

    const emailValue = emailInput.value.trim();
    const passwordValue = passwordInput.value.trim();

    const sanitizedPassword = check_xss(passwordValue);
    // check_xss 함수로 비밀번호 Sanitize
    const sanitizedEmail = check_xss(emailValue);
    // check_xss 함수로 이메일 Sanitize

    if (!sanitizedEmail) {
        // Sanitize된 이메일 사용
        return false;
    }

    if (!sanitizedPassword) {
        // Sanitize된 비밀번호 사용
        return false;
    }

    if (emailValue.length < 5 || emailValue.length > 10) {
        alert('아이디는 최소 5글자 이상  10글자 이하 입력해야 합니다.');
        login_failed();
        return false;
    }
    
    if (passwordValue.length < 12 || passwordValue.length > 15) {
        alert('비밀번호는 반드시 12글자 이상 15글자 이하 입력해야 합니다.');
        login_failed();
        return false;
    }

    const hasSpecialChar = passwordValue.match(/[!,@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/) !== null;
    if (!hasSpecialChar) {
        alert('패스워드는 특수문자를 1개 이상 포함해야 합니다.');
        login_failed();
        return false;
    }
    
    const hasUpperCase = passwordValue.match(/[A-Z]+/) !== null;
    const hasLowerCase = passwordValue.match(/[a-z]/) !== null;
    if (!hasUpperCase || !hasLowerCase) {
        alert('패스워드는 대소문자를 1개 이상 포함해야 합니다.');
        login_failed();
        return false;
    }

    if(idsave_check.checked == true) { // 아이디 체크 O
        alert("쿠키를 저장합니다.", emailValue);
        setCookie("id", emailValue, 1); // 1일 저장
        alert("쿠키 값 :" + emailValue);
    }
    else
    { // 아이디 체크 X
        setCookie("id", emailValue.value, 0); //날짜를 0, 쿠키 삭제
    }

    console.log('이메일:', emailValue);
    console.log('비밀번호:', passwordValue);
    session_set();//세션 생성
    loginForm.submit();
    login_count();
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

function session_del() {//세션 삭제
    if (sessionStorage) {
        sessionStorage.removeItem("Session_Storage_test");
        alert('로그아웃 버튼 클릭 확인 : 세션 스토리지를 삭제합니다.');
    }
    else{
        alert("세션 스토리지 지원 x");
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

document.getElementById("login_btn").addEventListener('click', function(){
    check_input();
});