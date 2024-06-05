class SignUp {
    constructor(firstName, lastName, email, password, random) { // 생성자 함수
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.random = random;
    }
    
    get fullName() {
        return `${this.firstName} ${this.lastName}`; // 템플릿 리터럴 문자열 연결, 기존에는 + 연산자로 연결
    }

    set fullName(fullName) {
        const [firstName, lastName] = fullName.split(" ");
        this.firstName = firstName;
        this.lastName = lastName;
    }

    get contactInfo() {
        return `${this.email} ${this.phoneNumber} ${this.random}`; // 요소 하나 하나를 객체 프로퍼티라고 한다
    }

    set contactInfo(contactInfo) {
        const [email, password, random] = constactInfo.split(" ");
        this.email = email;
        this.password = password;
        this.random = random;
    }
}

function join(){ // 회원가입
    let form = document.querySelector("#form_main");
    let f_name = document.querySelector("#firstName");
    let l_name = document.querySelector("#lastName");
    let email = document.querySelector("#email");
    let password = document.querySelector("#password");
    let class_check = document.querySelector(".select-form-control-lg");

    form.action = "../login/join_end.html";
    form.method = "get";

    if(f_name.value.length === 0 || l_name.value.length === 0 || email.value.length === 0 || password.value.length === 0){
        alert("회원가입 폼에 필수 정보를 입력해주세요.(성별, 분반 제외)");
    }
    else{
        session_join_set();
        form.submit();
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
