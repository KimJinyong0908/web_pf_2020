console.clear();
/* 좌측에 따라다니는 정보 */
$(window).scroll(function () {
    var scrollTop = $(this).scrollTop();

    if (scrollTop < 100) {
        scrollTop = 100;
    } else if (scrollTop > 9600) {
        scrollTop = 9600;
    }

    var duration = 1000;
    $('.main-1 > .quick').stop().animate({
        top: scrollTop
    }, duration);

    console.log(scrollTop);
});

// Hide Header on on scroll down
var didScroll;
var lastScrollTop = 0;
var delta = 5; // 동작의 구현이 시작되는 위치
var navbarHeight = $('.new-box').outerHeight(); // 영향을 받을 요소를 선택

// 스크롤시에 사용자가 스크롤했다는 것을 알림
$(window).scroll(function (event) {
    didScroll = true;
});

// hasScrolled()를 실행하고 didScroll 상태를 재설정
setInterval(function () {
    if (didScroll) {
        hasScrolled();
        didScroll = false;
    }
}, 250);

// 동작을 구현
function hasScrolled() {
    // 접근하기 쉽게 현재 스크롤의 위치를 저장한다.
    var st = $(this).scrollTop();

    // 설정한 delta 값보다 더 스크롤되었는지를 확인한다.
    if (Math.abs(lastScrollTop - st) <= delta) {
        return;
    }

    // 헤더의 높이보다 더 스크롤되었는지 확인하고 스크롤의 방향이 위인지 아래인지를 확인한다.
    if (st > lastScrollTop && st > navbarHeight) {
        // Scroll Down
        $('.new-box').removeClass('nav-down').addClass('nav-up');
    } else {
        // Scroll Up
        if (st + $(window).height() < $(document).height()) {
            $('.new-box').removeClass('nav-up').addClass('nav-down');
        }
    }

    // lastScrollTop 에 현재 스크롤위치를 지정한다.
    lastScrollTop = st;
}

/* 추가로 웹페이지의 스크롤을 내렸을때를 감지해 코드를 실행시키는 함수입니다.
$(window).scroll(function(){ 
   if($(window).scrollTop() == $(document).height() - $(window).height()){ 
      // 실행할 함수
   } 
});
*/




/* 메인 가운데 슬라이더 페이지 버튼 클릭하면 사진 변경*/
$('.slider-1 > .pages > ul > li').click(function () {
    var $this = $(this);
    var $slider1 = $this.closest('.slider-1');

    $this.addClass('active');
    $this.siblings('.active').removeClass('active');

    var index = $this.index();

    $slider1.find('> .slides > a').removeClass('active');
    $slider1.find('> .slides > a').eq(index).addClass('active');
});
/* 메인 가운데 슬라이더 사이드버튼 (좌우) 버튼 클릭하면 사진 변경*/
$('.slider-1 > .side-btns > div').click(function () {
    var $this = $(this);
    var index = $this.index();
    var $slider1 = $this.closest('.slider-1');

    var $current = $slider1.find(' > .pages > ul > li.active');
    var $post;

    if (index == 0) {
        $post = $current.prev();
    } else {
        $post = $current.next();
    }

    if ($post.length == 0) {
        if (index == 0) {
            $post = $slider1.find('.pages > ul > li:last-child');
        } else {
            $post = $slider1.find('.pages > ul > li:first-child');
        }
    }
    $post.click();
});
/* 메인 우측 슬라이더 사이드버튼 (좌우) 버튼 클릭하면 사진 변경*/
$('.slider-2 > div').click(function () {
    var $this = $(this);
    var index = $this.index();
    var $slider2 = $this.closest('.slider-2');

    var $current = $slider2.find('.slides > a.active');
    var $post;

    if (index == 0) {
        $post = $current.prev();
    } else {
        $post = $current.next();
    }

    if ($post.length == 0) {
        if (index == 0) {
            $post = $slider2.find('.slides > a:last-child');
        } else {
            $post = $slider2.find('.slides > a:first-child');
        }
    }

    $current.removeClass('active');
    $post.addClass('active');
});
/* main-2 마우스엔터시 컨텐츠 내용 바뀌는 것 */
$('.main-2 > .best-menu > .menu1 > li').mouseenter(function () {
    var $this = $(this);
    var index = $this.index();
    var $bestMenu = $this.closest('.best-menu');

    $bestMenu.find(' > .content-box > .content').removeClass('active');
    $bestMenu.find(' > .content-box > .content').eq(index).addClass('active');
});
