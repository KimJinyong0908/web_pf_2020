console.clear();
/* AOS라이브러리 불러오기 */
AOS.init();

/* 스크롤리 파이 */
$(function() {
    $.scrollify({
        section:".panel",
        scrollbars:true,
        setHeights:false,
        before:function(i,panels) {
            var ref = panels[i].attr("data-section-name");
            $(".pagination .active").removeClass("active");
            $(".pagination").find("a[href=\"#" + ref + "\"]").addClass("active");
        },
        afterRender:function() {
            var pagination = "<ul class=\"pagination\">";
            var activeClass = "";
            $(".panel").each(function(i) {
                activeClass = "";
                if ( i === 0 ) {
                    activeClass = "active";
                }
                pagination += "<li><a class=\"" + activeClass + "\" href=\"#" + $(this).attr("data-section-name") + "\"><span class=\"hover-text\">" + $(this).attr("data-section-name").charAt(0).toUpperCase() + $(this).attr("data-section-name").slice(1) + "</span></a></li>";
            });

            pagination += "</ul>";

            $(".home").append(pagination);

            $(".pagination a").on("click", $.scrollify.move);
        }
    });
    
    $(window).resize(function() {
        var windowWidth = $(window).width();
        
        if ( windowWidth < 600 ) {
            if ( $.scrollify.isDisabled() == false ) {
                $.scrollify.disable();
            }
        }
        else {
            if ( $.scrollify.isDisabled() ) {
                $.scrollify.enable();
            }
        }
    }).reisze();
    
    setTimeout(function() {
        $.scrollify.update();
    }, 3000);
});


/* 메인 4페이지 세로 슬라이더 */
$('.slider-box > .slider-box-1 > .side-btns > div').click(function () {
    var $this = $(this);
    var isUp = $this.index() == 0;
    var $slider = $this.closest('.slider-box-1');

    if ($slider.attr('data-slider-box-1-now-work') === 'Y') {
        return;
    }

    $slider.attr('data-slider-box-1-now-work', 'Y');

    var $current = $slider.find(' > .slides > div.active');
    var $post = null;

    if (isUp) {
        $post = $current.prev();
        if ($post.length == 0) {
            $post = $slider.find(' > .slides > div:last-child');
        }
    } else {
        $post = $current.next();
        if ($post.length == 0) {
            $post = $slider.find(' > .slides > div:first-child');
        }
    }

    var $prev = $post.prev();

    if ($prev.length == 0) {
        $prev = $slider.find(' > .slides > div:last-child');
    }

    var $next = $post.next();

    if ($next.length == 0) {
        $next = $slider.find(' > .slides > div:first-child');
    }

    $current.removeClass('active');
    $post.addClass('active');

    if (isUp) {
        $prev.stop().animate({
            top: '220%'
        }, 300, function () {
            $prev.css('top', '-110%');
        });
        $post.stop().animate({
            top: '0%'
        }, 300);
        $next.stop().animate({
            top: '110%'
        }, 300);
    } else {
        $prev.stop().animate({
            top: '-110%'
        }, 300);
        $post.stop().animate({
            top: '0%'
        }, 300);
        $next.stop().animate({
            top: '-220%'
        }, 300, function () {
            $next.css('top', '110%');
        });
    }

    setTimeout(function () {
        $slider.attr('data-slider-box-1-now-work', 'N');
    }, 300);
})
$('.slider-box > .slider-box-1 > .side-btns > div').eq(0).click();

/* 헤더메뉴 */
$('.header-top > .menu-all-btn').click(function () {
    var $clicked = $(this);

    $clicked.toggleClass('active');

    if ($clicked.hasClass('active')) {
        showRightSideBar();
    } else {
        hideRightSideBar();
    }
});
$('.all-menu-bg').click(function () {
    $('.header-top > .menu-all-btn').click();
});

function showRightSideBar() {
    $('.all-menu-wrap').addClass('active');
    $('.all-menu-bg').addClass('active');
    $('.header-top > .the-lab-box').addClass('active');
    $('.header-top > .logo-box').addClass('active');
};

function hideRightSideBar() {
    $('.all-menu-wrap').removeClass('active');
    $('.all-menu-bg').removeClass('active');
    $('.header-top > .the-lab-box').removeClass('active');
    $('.header-top > .logo-box').removeClass('active');
};
/* 메인 1페이지 슬라이더 */
var windowFocusHere = true;

// 다른 탭으로 이동했을 때
$(window).on("blur", function () {
    windowFocusHere = false;
});

// 다시 해당 윈도우(브라우저로 돌아왔을 때)
$(window).on("focus", function () {
    windowFocusHere = true;
});


function Slider1__init() {
    $('.slider-0 .btn-stop').click(function () {
        var $slider = $(this).closest('.slider-0');
        $slider.attr('data-slider-1-autoplay-status', 'N');
    });

    $('.slider-0 .btn-play').click(function () {
        var $slider = $(this).closest('.slider-0');
        $slider.attr('data-slider-1-autoplay-status', 'Y');
    });

    Slider1__update();
}

var Slider1__updateLastTimestamp = 0;

function Slider1__moveNext($slider) {
    var $current = $slider.find('> .slides > .active');
    var $post = $current.next();

    if ($post.length == 0) {
        $post = $slider.find('> .slides > :first-child');
    }

    $current.removeClass('active');
    $post.addClass('active');
}

function Slider1__update(timestamp) {
    if (!timestamp) {
        timestamp = 0;
    }

    var delta = timestamp - Slider1__updateLastTimestamp;

    $('.slider-0').each(function (index, node) {
        var $slider = $(this);

        var $progressBarGage = $slider.find(' > .nav-bar .progress-bar > div');

        var autoplayTimeout = parseInt($slider.attr('data-slider-1-autoplay-timeout'));
        var autoplayCurrent = parseInt($slider.attr('data-slider-1-autoplay-current'));
        var autoplayStatus = $slider.attr('data-slider-1-autoplay-status') !== 'N';

        if (autoplayStatus && windowFocusHere) {
            autoplayCurrent += delta;

            if (autoplayCurrent > autoplayTimeout) {
                Slider1__moveNext($slider);

                autoplayCurrent = 0;
            }

            var percent = autoplayCurrent / autoplayTimeout * 100;

            $progressBarGage.css('width', percent + '%');

            $slider.attr('data-slider-1-autoplay-current', autoplayCurrent)
        }
    });

    Slider1__updateLastTimestamp = timestamp;

    requestAnimationFrame(Slider1__update);
}

Slider1__init();
