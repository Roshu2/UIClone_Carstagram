// 모달
$(document).on('click', function () {
// 모달 띄우기
    $(".btn-open-popup").click(function () {
        $(".modal-overlay").fadeIn();
        $('body').css("overflow", "hidden");
    });
// 모달 닫기
    $(".close-area").click(function () {
        $(".modal-overlay").fadeOut();
        $('body').css("overflowY", "scroll");
    });
});
$(document).on('click', function (e) {
    if ($(".modal-overlay").is(e.target)) {
        $(".modal-overlay").fadeOut();
        $('body').css("overflowY", "scroll");
    }
    ;
});

// 팔로우 버튼 클릭시 팔로잉 변경
$(document).on('click', function () {
    $('.follow-btn').click(function () {
        if ($(this).html() == '팔로우') {
            $(this).html('팔로잉');
        } else {
            $(this).html('팔로우');
        }
    });
});

// 로그인한 유저정보 불러오기
$(document).ready(function () {
    my_info()
    rec_user()
})

// 댓글 달기
// 수정 필요 ready
$(document).ready(function () {
    setTimeout(function () {
        show_comment();
    }, 900);
});


function add_comment(post_id) {
    let comment = $(`#${post_id}`).val()
    console.log(comment)
    $.ajax({
        type: 'POST',
        url: '/comment',
        data: {comment_give: comment, post_give: post_id},
        success: function (response) {
            alert(response['msg'])
            // console.log(post_id)
            window.location.reload()
        }
    })
}

// 로그아웃 함수
// 로그아웃은 내가 가지고 있는 토큰만 쿠키에서 없애면 됩니다.
function logout() {
    $.removeCookie('mytoken');
    alert('로그아웃!')
    window.location.href = '/login'
}

function show_comment() {

    $.ajax({
        type: "GET",
        url: "/comment",
        data: {},
        success: function (response) {
            let rows = response['comments']
            for (let i = 0; i < rows.length; i++) {
                // let post = posts[i]
                let comment = rows[i]['comments']
                let post_id = rows[i]['post_id']
                let usernick = rows[i]['usernick']

                console.log(post_id)

                let temp_html = `<p style="font-weight: lighter"><span style="font-weight: bold">${usernick}</span> ${comment}</p>`

                $(`.${post_id}`).append(temp_html)
            }
        }
    });
}

function my_info() {

    $.ajax({
        type: "GET",
        url: "/info",
        data: {},
        success: function (response) {
            let row = response['users']
            let usernick = row['nick']
            let username = row['name']
            let useremail = row['email']


            let temp_html = `
                            <div class="left-profile">
                                <a href="/user/${useremail}"><img class="profile"
                                                             src="http://kaihuastudio.com/common/img/default_profile.png"></a>
                            </div>
                            <div style="color: white; margin-left: 10px; font-weight: bold; font-size: 12px; margin-top: 10px;">
                                ${usernick}<br>
                                <p style="font-size: 13px; color: #dbdbdb; font-weight: lighter;">${username}</p>
                            </div>

                            `
            $('#user-info').append(temp_html)
        }
    });
}


function rec_user() {

    $.ajax({
        type: "GET",
        url: "/recommend",
        data: {},
        success: function (response) {
            let rows = response['users']

            for (let i = 0; i < rows.length; i++) {
                let usernick = rows[i]['nick']

                let temp_html = `
                        <div class="rec-member">
                            <div class="left-mini-profile">
                                <a href=""><img class="profile"
                                                src="http://kaihuastudio.com/common/img/default_profile.png"></a>
                            </div>
                            <div style="color: white; margin-left: 10px; font-size: 12px; margin-top: 10px; font-weight: bold;">
                                ${usernick}<br>
                                <p style="font-size: 12px; color: #dbdbdb; font-weight: lighter">회원님을 위한 추천</p>
                            </div>
                            <div style="margin-left: 32%; font-size: 12px;">
                                <button class="follow-btn">팔로우</button>
                            </div>
                        </div>`
                $('#recommend-user').append(temp_html)
            }
        }
    });
};
