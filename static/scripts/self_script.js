
// 게시글 상세 속 모달
$(document).on('click', function () {
// 모달 띄우기
    $(".btn-open-popup").click(function () {
        $(".modal-overlay1").fadeIn();
        $('body').css("overflow", "hidden");
    });
// 모달 닫기
    $(".close-area").click(function () {
        $(".modal-overlay1").fadeOut();
    });
});

// 로그인한 유저정보 불러오기
$(document).ready(function () {
    my_info()
})

// 댓글 달기
// 수정 필요 ready
$(document).ready(function () {
    setTimeout(function () {
        show_comment();
    }, 500);
});


function add_comment1(post_id) {
    let comment = $(`#${post_id}`).val()

    $.ajax({
        type: 'POST',
        url: '/comment',
        data: {comment_give: comment, post_give: post_id},
        success: function (response) {
            alert(response['msg'])
            window.location.reload()
        }
    })
}

function show_comment() {
    $.ajax({
        type: "GET",
        url: "/comment",
        data: {},
        success: function (response) {
            let rows = response['comments']
            for (let i = 0; i < rows.length; i++) {
                let comment = rows[i]['comments']
                let post_id = rows[i]['post_id']
                let usernick = rows[i]['usernick']

                let temp_html = `
                            <div class = ""style="display: flex; flex-direction: row;">
                                <a href=""><img class="box-profile"
                                                src="http://kaihuastudio.com/common/img/default_profile.png"></a>
                                <p style="margin-left: 10px;">${usernick}</p>
                                <p style="font-weight: lighter; margin-left: 10px;">${comment}</p>
                            </div>`

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

            console.log(usernick, username)

            let temp_html = `<h2 style="font-weight: lighter;">${usernick}</h2>`
            let temp_html2 = `<p>${username}</p>`

            $('#my-nick').append(temp_html)
            $('#my-name').append(temp_html2)

        }
    });
};