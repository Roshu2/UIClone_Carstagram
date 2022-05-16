
// 게시글 업로드 모달
$("#open-post-modal").on('click', function () {
    $(".modal-overlay2").fadeIn();
    $('body').css("overflow", "hidden");
});

$(document).on('click',function (e) {
    if( $(".modal-overlay2").is(e.target)) {
        $(".modal-overlay2").fadeOut();
        $('body').css("overflowY", "scroll");
    };
});



$(document).ready(function () {
    post_listing()
})
// 포스팅 시간 나타내기

function time2str(date) {
    let today = new Date()
    let time = (today - date) / 1000 / 60  // 분

    if (time < 60) {
        return parseInt(time) + "분 전"
    }
    time = time / 60  // 시간
    if (time < 24) {
        return parseInt(time) + "시간 전"
    }
    time = time / 24
    if (time < 7) {
        return parseInt(time) + "일 전"
    }
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`
}

/* POST 요청 ajax 코드 */
function post_posting() {
    // 고유 id let 함수로 정의
    let hashtag = $('#post_hashtag').val()
    let comment = $('#post_comment').val()
    let today = new Date().toISOString()

    let picture = $('#customFile')[0].files[0]
    let form_data = new FormData()

    form_data.append("hashtag_give", hashtag)
    form_data.append("picture_give", picture)
    form_data.append("comment_give", comment)
    form_data.append("date_give", today)

    $.ajax({
        type: "POST",
        url: "/posting",
        data: form_data,
        cache: false,
        contentType: false,
        processData: false,
        success: function (response) {
            alert(response['msg'])
            window.location.reload()
        }
    })
}


/* GET 요청 ajax 코드 */
function post_listing(email) {
    if (email == undefined) {
        email = ""
    }
    console.log(email)
    // $("#post-feed-box").empty()
    $.ajax({
        type: "GET",
        url: `/listing?email_give=${email}`,
        data: {},
        success: function (response) {
            let posts = Object(response['posts'])

            // console.log(posts)

            for (let i = 0; i < posts.length; i++) {
                let post = posts[i]
                let time_post = new Date(post["date"])
                let time_before = time2str(time_post)
                let post_hashtag = post['post_hashtag']
                let post_comment = post['post_comment']
                let post_picture = post['post_picture']
                let post_id = post['_id']['$oid']
                let post_nick = post['usernick']
                let class_heart = post['heart_by_me'] ? "fa-heart" : "fa-heart-o"


                let temp_html =`
                            <div class="feed-box" id="feed_box">
                                <!--                상단의 이미지와 이름 그리고 ''' 아이콘-------------------------------------------------->
                                <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 2%; margin-left: 1%; margin-bottom: 2%;">
                                    <div style="display: flex; align-items: center">
                                        <div class="box-profile">
                                            <a href=""><img class="profile"
                                                            src="http://kaihuastudio.com/common/img/default_profile.png"></a>
                                        </div>
                                        <div style="margin-left: 10px">
                                            ${post_nick}
                                        </div>
                                    </div>
                                    <div>
                                        <button id="open-modal" class="btn-open-popup" style="border: none; background-color: white;">
                                            <span class="material-icons-outlined" style="margin-right: 15px;">more_horiz</span>
                                        </button>
                                    </div>
                                </div>
                                <!--                메인 피드 슬라이드 사진--------------------------------------------------------------->
                                <div id="carouselExampleControlsNoTouching" class="carousel slide" data-bs-touch="false"
                                     data-bs-interval="false" style="height: 600px;">
                                    <div class="carousel-inner">
                                        <div class="carousel-item active">
                                            <img src="../static/image/${post_picture}"
                                                 class="d-block w-100 feed-picture" alt="...">
                                        </div>
                                    </div>
                                    <button class="carousel-control-prev" type="button"
                                            data-bs-target="#carouselExampleControlsNoTouching" data-bs-slide="prev">
                                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                        <span class="visually-hidden">Previous</span>
                                    </button>
                                    <button class="carousel-control-next" type="button"
                                            data-bs-target="#carouselExampleControlsNoTouching" data-bs-slide="next">
                                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                        <span class="visually-hidden">Next</span>
                                    </button>
                                </div>
                                <!--                사진 아래 아이콘--------------------------------------------------------------------->
                                <div style="margin-top: 2%; display: flex; flex-direction: row; justify-content: space-between;">
                                    <div style="margin-left: 10px;">
                                        <button class="like-btn" onclick="toggle_like('${post['_id']}', 'heart')"><span class="material-icons-outlined fa ${class_heart}">favorite_border</span></button>
                                        <span class="material-icons-outlined">mode_comment</span>
                                        <span class="material-icons-outlined">send</span>
                                    </div>
                                    <div style="margin-right: 10px;">
                                        <span class="material-icons-outlined">bookmark_border</span>
                                    </div>
                                </div>
                                <div style="margin-left: 10px;">
                                    <!--                좋아요-->
                                    <div class="like_reset">좋아요 ${num2str(post["count_heart"])}개</div>
                                    <!--                    게시자 글-->
                                    <div>
                                        <div><a href='#' class="name">${post_nick}</a>
                                        <span style="font-weight: lighter; color: dodgerblue;">
                                        ${post_hashtag}
                                        </span>
                                        <span style="font-weight: lighter">${post_comment}</span>
                                        <span style="color: #c7c7c7">더보기</span>
                                        </div>
                                    </div>
                                    <!--                댓글모두보기-->
                                    <!--<div style="font-weight: lighter; color: grey">댓글 3,243개 모두보기</div>-->
                                    <!--                댓글-->
                                    <div class="${post['_id']}">
                    
                                    </div>
                                    <!--                몇일,시간,분전-->
                                    <div style="font-weight: lighter; font-size: 10px;">${time_before}</div>
                                    <!--                댓글달기-->
                                    <div style="display:flex; flex-direction: row; justify-content: center; margin-left: -10px; margin-top: 10px; border-top: solid 1px #dbdbdb;">
                                        <span style="margin-left: 8px; margin-top: 7px;" class="material-symbols-outlined">mood</span>
                                        <input type="text" class="form-control"
                                               style="box-shadow: none; border: none; border-radius: 0px;" id="${post['_id']}"
                                               placeholder="댓글 달기 ..."/>
                                        <button id = "comment-1"onclick="add_comment('${post['_id']}')"
                                                style="background-color: white; border: none; width: 50px; margin-right: 8px; text-decoration: none; color: cornflowerblue; font-weight: bold">
                                            게시
                                        </button>
                                    <!--  -->
                                    </div>
                                </div>`
                $('#post-feed-box').append(temp_html)
            }
        }
    })
}

function toggle_like(post_id, type) {
    console.log(post_id, type)
    let $a_like = $(`#${post_id} a[aria-label='${type}']`)
    let $i_like = $a_like.find("i")
    let class_s = {"heart": "fa-heart"}
    let class_o = {"heart": "fa-heart-o"}
    if ($i_like.hasClass(class_s[type])) {
        $.ajax({
            type: "POST",
            url: "/update_like",
            data: {
                post_id_give: post_id,
                type_give: type,
                action_give: "unlike"
            },
            success: function (response) {
                console.log("unlike")
                $i_like.addClass(class_o[type]).removeClass(class_s[type])
                $a_like.find("span.like-num").text(num2str(response["count"]))
                window.location.reload()
            }
        })
    } else {
        $.ajax({
            type: "POST",
            url: "/update_like",
            data: {
                post_id_give: post_id,
                type_give: type,
                action_give: "like"
            },
            success: function (response) {
                console.log("like")
                $i_like.addClass(class_s[type]).removeClass(class_o[type])
                $a_like.find("span.like-num").text(num2str(response["count"]))
                window.location.reload()
            }
        })

    }
}

function num2str(count) {
    if (count > 10000) {
        return parseInt(count / 1000) + "k"
    }
    if (count > 500) {
        return parseInt(count / 100) / 10 + "k"
    }
    if (count == 0) {
        return ""
    }
    return count
}