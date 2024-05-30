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

function init_logined(){
    if(sessionStorage){
        decrypt_text();
    }
    else{
        alert("세션 스토리지 지원 x");
    }
}

function addJavascript(jsname){ // 자바스크립트 외부 연동
    var th = document.getElementsByTagName('head')[0];
    var s = document.createElement('script');
    s.setAttribute('type', 'text/javascript');
    s.setAttribute('src', jsname);
    th.appendChild(s);
}

addJavascript('/js/security.js'); // 암복호화 함수
addJavascript('/js/session.js'); // 세션 함수
addJavascript('/js/cookie.js'); // 쿠키 함수

document.getElementById("login_btn").addEventListener('click', function(){
    check_input();
});