console.clear();

// search 메뉴
function searchMenuON() {
    $(".search-sub-menu, .search-bg").addClass("active");
}

function searchMenuOff() {
    $(".search-sub-menu, .search-bg").removeClass("active");
}

$(".search-box > .search-wrap > input").click(function () {
    searchMenuON();
});
$(".search-bg").click(function () {
    searchMenuOff();
});


// 위로가는 버튼
$(document).ready(function () {
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $(".top-btn").fadeIn();
        } else {
            $(".top-btn").fadeOut();
        }
    });
    $(".top-btn").click(function () {
        $("html, body").animate({
            scrollTop: 0
        }, 400);
        return false;
    });
});

/* 토글 사이드 바 버튼 관련 */
$('.toggle-side-bar-btn').click(function () {
    //console.log("토글 사이드바 버튼클릭");

    var $clicked = $(this);

    /* 만약 클릭된 버튼에 active 클래스가 있다면 */
    if ($clicked.hasClass('active')) {
        /* 사이드바를 없앤다 */
        hideRightSideBar();
    } else {
        /* active 클래스가 없으면 나타나게 한다 */
        showRightSideBar();
    }

    /* 아이콘에 active 클래스가 없으면 active 클래스를 넣어주고 있으면 빼줌 */
    $clicked.toggleClass('active');

});

/* 왼쪽 사이드바 함수 */
function showRightSideBar() {
    /* 메뉴바가 나올때 안에 펼쳐져 있는 메뉴들을 다 접기위해 엑티브를 없앤다 */
    $('.right-side-bar > .menu-1 li.active').removeClass('active');
    $('.right-side-bar-box').addClass('active');
};

function hideRightSideBar() {
    $('.right-side-bar-box').removeClass('active');
};

/* 메뉴 접히고 펼치기 */
$('.right-side-bar > .menu-1 > ul > li').click(function (e) {
    /* 클릭된 메뉴 안에 다른 메뉴를 클릭하면 위에있는 메뉴가 같이 클릭되는데 그것을 막아준다 */
    e.stopPropagation();
});

/* 좌측 사이드바 배경을 클릭했을때 */
$('.right-side-bar-box').click(function () {
    //console.log('배경클릭');

    /* 토글 사이드바 버튼을 클릭한 효과를 만듬 */
    $('.toggle-side-bar-btn').click();
});

/* 사이드바를 클릭할때 상위요소인 배경이 같이 클릭되어서 사이드바가 들어가버리기 때문에 그것을 막음 */
$('.right-side-bar').click(function (e) {
    e.stopPropagation();
});

$('.wrap .right-side-bar > .menu-1 > ul > li').click(function () {
    var duration = 800;
    if ($(this).hasClass('active')) {
        $(this).removeClass('active')
        $(this).find(' > .sec-menu-box').slideUp(duration, "easeInOutSine");
    } else {
        // 기존에 활성화된 녀석들 정리
        $(this).siblings('.active').find(' > .sec-menu-box').slideUp(duration, "easeInOutSine");
        $(this).siblings('.active').removeClass('active');

        // 현재 활성화 시켜야 하는 녀석 활성화
        $(this).addClass('active');
        $(this).find(' > .sec-menu-box').slideDown(duration, "easeInOutSine");
    }
})





/* 슬릭 슬라이더 */
$(document).ready(function () {
    var $slider = $('.slider');
    var $progressBar = $('.progress');
    var $progressBarLabel = $('.slider__label');

    $slider.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
        var calc = ((nextSlide) / (slick.slideCount - 1)) * 100;

        $progressBar
            .css('background-size', calc + '% 100%')
            .attr('aria-valuenow', calc);

        $progressBarLabel.text(calc + '% completed');
    });

    $slider.slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        speed: 400
    });
});
