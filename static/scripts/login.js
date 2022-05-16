// 로그인 클라이언트
function sign_in() {
    let useremail = $("#useremail").val()

    if (useremail.includes('@') == true) {

    } else {
        alert('이메일이 아닙니다.')
        return;
    }

    let password = $("#userpw").val()

    if (useremail == "") {
        $("#help-email-login").text("아이디를 입력해주세요.")
        $("#useremail").focus()
        return;
    } else {
        $("#help-email-login").text("")
    }

    if (password == "") {
        $("#help-password-login").text("비밀번호를 입력해주세요.")
        $("#userpw").focus()
        return;
    } else {
        $("#help-password-login").text("")
    }
    $.ajax({
        type: "POST",
        url: "/api/login",
        data: {
            useremail_give: useremail,
            password_give: password
        },

        success: function (response) {
            if (response['result'] == 'success') {
                $.cookie('mytoken', response['token'], {path: '/'});
                console.log(response)
                window.location.replace('/main')
            } else {
                alert(response['msg'])
            }
        }
    });
}

