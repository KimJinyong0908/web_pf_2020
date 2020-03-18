console.clear();

/* 모든 페이지가 실행되면 딱 1번 실행되는 함수 */
/*window.onload = function() {
    alert('코카콜라-코리아 리디자인 사이트입니다. 상업용으로 사용하지 않고 개인적인 디자인 포트폴리오 사이트입니다.연락처)010-4444-1782');
};*/


/* aos 라이브러리 */
AOS.init();

/* 스크롤시 탑바 변경 */
function NotScrollTop0__init() {
    var scrollTop = $(window).scrollTop();

    if (scrollTop > 0) {
        $('html').addClass('not-scroll-top-0');
    } else {
        $('html').removeClass('not-scroll-top-0');
    }
}

$(window).scroll(NotScrollTop0__init);
NotScrollTop0__init();



/* 서치박스 관련 */
$('.ico-box .cell-search-box').click(function () {
    var $this = $(this);

    $this.addClass('active');

    /* settimeout이유 0.1초 늦게 실행하십시오. */
    /* 그 이유는 focus때문에 foucs는 검색창 누르면 바로 검색할 수 있도록 만들어준 것 */
    setTimeout(function () {
        $this.find('form > input').focus();
    }, 100);
});

/* 검색하다가 다른 곳을 눌렀을 때 발생 */
$('.ico-box .cell-search-box form > input').blur(function () {
    /* 검색하다가 다른 곳을 사라지고나서 내용 리셋시키는 것 */
    $(this).val('');
    $(this).closest('.cell-search-box').removeClass('active');
});

/* 모든 href="#"인 a의 링크 이벤트를 막아 주는 것 */
$('a').click(function (e) {
    if ($(this).attr('href') == '#') {
        e.preventDefault();
    }
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
    $('.right-side-bar > li.active').removeClass('active');
    $('.right-side-bar-box').addClass('active');
};

function hideRightSideBar() {
    $('.right-side-bar-box').removeClass('active');
};

/* 메뉴 접히고 펼치기 */
$('.right-side-bar > ul > li').click(function (e) {
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

$('.header-wrap > .mobil-menu-box > .right-side-bar > ul > li').click(function () {
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





/* 메인 - 슬라이더 */
$('.main-bn .slider-1 > .side-btns > div').click(function () {
    var $this = $(this);
    var index = $this.index();

    var $slider = $this.closest('.slider-1');

    var $current = $slider.find(' > .slides > div.active');
    var $post = null;



    if (index == 0) {
        $post = $current.prev();
    } else {
        $post = $current.next();
    }

    if ($post.length == 0) {
        if (index == 0) {
            $post = $slider.find(' > .slides > div:last-child');
        } else {
            $post = $slider.find(' > .slides > div:first-child');
        }
    }

    $current.removeClass('active');
    $post.addClass('active');

    $('html').attr('data-slider-1-index', $post.index());
});

var $ico2 = $('.ico-2');
/* v2 */
$(window).scroll(function () {
    if ($ico2.data('work') == true) {
        return;
    }

    $ico2.data('work', true);

    $ico2.addClass('active');

    setTimeout(function () {
        $ico2.removeClass('active');
        $ico2.data('work', false);
    }, 500);
});




/* 탑바 - 메인 슬라이더2페이지 될 때 탑바 색상 변경 */
/*var headerChang = function(){
    var $slider = $('.main-bn > .main-bn-wrap > .slider-1');
    var $slide2 = $slider.find(' > .slides > .slide-2');
    var $menuBoxText = $('.header .menu-box a');
    var $icoBoxText = $('.header .ico-box a > .ico');

    if ( $slide2.hasClass('active')) {
        $menuBoxText.css('color', '#222');
        $icoBoxText.css('color', '#222');
    }
};
headerChang();
*/

$('.visual').slick({
    dots: true,
    prevArrow: '<a class="slick-prev" href="#"><i class="fas fa-angle-left"></i></a>',
    nextArrow: '<a class="slick-next" href="#"><i class="fas fa-angle-right"></i></a>',
    centerMode: true,
    centerPadding: '60px',
    slidesToShow: 1,
    responsive: [
        {
            breakpoint: 480,
            settings: {
                arrows: false,
                centerMode: true,
                centerPadding: '60px',
                slidesToShow: 1
            }
        },
    ]
});