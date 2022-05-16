// 간단한 회원가입 함수입니다.
// 아이디, 비밀번호, 닉네임을 받아 DB에 저장합니다.
function sign_up() {
    let useremail = $("#useremail").val()
    let username = $("#username").val()
    let usernick = $("#usernick").val()
    let userpw = $("#userpw").val()
    let today = new Date().toISOString()

    if (useremail == "") {
        alert("이메일을 입력해주세요.")
        return;
    } else if (username == "") {
        alert("이름을 입력해주세요.")
        return;
    } else if (usernick == "") {
        alert("닉네임을 입력해주세요.")
        return;
    } else if (userpw == "") {
        alert("비밀번호를 입력해주세요.")
        return;
    } else if (useremail.includes('@') == true) {

    } else {
        alert('이메일 형식으로 입력해주세요!')
        return;
    }

    $.ajax({
        type: "POST",
        url: "/sign_up",
        data: {
            name_give: username,
            pw_give: userpw,
            nickname_give: usernick,
            email_give: useremail,
            date_give: today
        },
        success: function (response) {
            if (response['result'] == 'success') {
                alert('회원가입이 완료되었습니다.')
                window.location.href = '/login'
            } else {
                alert(response['msg'])
            }
        }
    })
}

// 아이디 중복확인 클라이언트
function check_email() {

    let useremail = $("#useremail").val()

    if (useremail.includes('@') == true) {

    } else {
        alert('이메일 형식으로 입력해주세요!')
        return;
    }

    $.ajax({
        type: "POST",
        url: "/check_email",
        data: {
            email_give: useremail
        },
        success: function (response) {
            console.log(response)
            if (response["exist"]) {
                alert("중복된 이메일입니다.")
            } else if (useremail == "") {
                alert("이메일을 입력해주세요.")
            } else {
                alert("사용가능한 정보입니다.")
            }
        }
    });
}

function check_nick() {

    let usernick = $("#usernick").val()

    $.ajax({
        type: "POST",
        url: "/check_nick",
        data: {
            nickname_give: usernick
        },
        success: function (response) {

            if (response["exists"]) {
                alert("중복된 닉네임입니다.")
            } else if (usernick == "") {
                alert("닉네임을 입력해주세요.")
            } else {
                alert("사용가능한 정보입니다.")
            }
        }
    });
}


