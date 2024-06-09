/*function session_set(){//세션 저장
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
}*/

function session_set(){ //세션 저장(객체)
    let id = document.querySelector("#typeEmailX");
    let password = document.querySelector("#typePasswordX");
    let random = new Date(); // 랜덤 타임스탬프

    const obj = { //개체 선언
    id : id.value,
    otp : random
    }

    if (sessionStorage) {
        const objString = JSON.stringify(obj); // 객체 -> JSON 문자열 변환
        let en_text = encrypt_text(objString); // 암호화
        sessionStorage.setItem("Session_Storage_object", objString);
        sessionStorage.setItem("Session_Storage_encrypted", en_text);
    }
    else {
        alert("세션 스토리지 지원 x");
    }
}

function session_get() {//세션 읽기
    if (sessionStorage) {
        return sessionStorage.getItem("Session_Storage_encrypted");
    }
    else {
        alert("세션 스토리지 지원 x");
    }
}

function session_check() {//세션 검사
    if(sessionStorage.getItem("Session_Storage_object")){
        alert("이미 로그인 되었습니다.");
        location.href=`../login/index_login.html`;// 로그인된 페이지로 이동
    }
}

function session_join_set(){ //세션 저장(객체)
    let f_name = document.querySelector("#firstName").value;
    let l_name = document.querySelector("#lastName").value;
    let email = document.querySelector("#email").value;
    let password = document.querySelector("#password").value;
    let class_check = document.querySelector(".select-form-control-lg");
    let random = new Date(); // 랜덤 타임스탬프

    const newSignUp = new SignUp(f_name, l_name, email, password, class_check, random);
    console.log(newSignUp.fullName);
    console.log(newSignUp.contactInfo);

    if(sessionStorage) {
        const objString = JSON.stringify(newSignUp); //객체 -> JSON 문자열 변환
        let en_text = encrypt_text(objString);
        sessionStorage.setItem("Session_Storage_new_user", objString);
        sessionStorage.setItem("Session_Storage_new_user_encryted", en_text);
    }
    else {
        alert("세션 스토리지 지원 x");
    }
}

function session_join_get() {
    if (sessionStorage) {
        let userData = sessionStorage.getItem("Session_Storage_new_user");
        console.log(userData);
        return userData;
    }
    else {
        alert("세션 스토리지 지원 x");
    }
}

function session_profile_check() {
    if (sessionStorage) {
        let storedUser = sessionStorage.getItem("Session_Storage_object");
        if (storedUser) {
            let storedUserObj = JSON.parse(storedUser);
            let emailInput = document.querySelector("#email");

            if (emailInput) {
                let email = emailInput.value;
            
                if (storedUserObj.id === email) {
                    console.log("사용자가 일치합니다.");
                    alert("사용자가 일치합니다.");
                }
                else {
                    console.log("사용자가 일치하지 않습니다.");
                    alert("사용자가 일치하지 않습니다. 로그아웃됩니다.");
                    location.href = `../index.html`;
                }
            }
        }
        else {
            alert("사용자 정보가 없습니다.");
        }
    }
    else {
        alert("세션 스토리지 지원 x");
    }
}