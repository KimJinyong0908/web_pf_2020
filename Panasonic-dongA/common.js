console.clear();
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
    $('.right-side-bar > .menu-1 ul > li.active').removeClass('active');
    $('.right-side-bar-box').addClass('active');
};

function hideRightSideBar() {
    $('.right-side-bar-box').removeClass('active');
};

/* 메뉴 접히고 펼치기 */
$('.right-side-bar > .menu-1 ul > li').click(function (e) {
    //console.log("메뉴 클릭됨");

    /* 만약 클릭된 메뉴에 엑티브 클래스가 있으면 */
    if ($(this).hasClass('active')) {
        /* 클릭된 메뉴의 엑티브를 없앤다 */
        $(this).removeClass('active');
    } else {
        /* 클릭된 메뉴의 형제의 엑티브를 없앤다 */
        $(this).siblings('.active').removeClass('active');

        /* 클릭된 메뉴(지역)의 엑티브를 없앤다 */
        $(this).find('.active').removeClass('active');

        /* 클릭된 메뉴의 엑티브를 만든다 */
        $(this).addClass('active');
    }

    /* 클릭된 메뉴 안에 다른 메뉴를 클릭하면 위에있는 메뉴가 같이 클릭되는데 그것을 막아준다 */
    e.stopPropagation();
});

/* 좌측 사이드바 배경을 클릭했을때 */
$('.right-side-bar-bg').click(function () {
    //console.log('배경클릭');

    /* 토글 사이드바 버튼을 클릭한 효과를 만듬 */
    $('.toggle-side-bar-btn').click();
});

/* 사이드바를 클릭할때 상위요소인 배경이 같이 클릭되어서 사이드바가 들어가버리기 때문에 그것을 막음 */
$('.right-side-bar').click(function (e) {
    e.stopPropagation();
});

/* search-box active 넣기 */
$('.ico-search').click(function () {
    var $this = $(this);
    var $searchBox = $this.closest('li').find('.search-box');

    /*if ( $searchBox.hasClass('active') ) {
        $searchBox.removeClass('active');
    }
    else {
        $searchBox.addClass('active');
    }
    */
    $searchBox.toggleClass('active');


});



/* slide up/down/toggle */
$('.right-side-bar > .menu-1 ul > li > .title').click(function () {
    var $this = $(this);
    var $showSecMenu = $this.closest("li").find("ul");
    $showSecMenu.slideToggle(200);
});









/* slick 불러오기 */
$('.visual').slick({
    autoplay: true,
    autoplaySpeed: 8000,
    arrows: false,
    dots: true,
});


/* slick 불러오기 */
$('.visual-1').slick({
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    dots: true,
    /* 버튼 커스텀 할 수 있도록 넣을 수 있도록 */
    prevArrow: '<button class="xi-angle-left-thin prev-btn"></button>',
    nextArrow: '<button class="xi-angle-right-thin next-btn"></button>',
    responsive: [
        {
            breakpoint: 989,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
            }
    },
        {
            breakpoint: 767,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1
            }
    },
  ]
});


function ActiveOnVisible__init() {
    $(window).resize(ActiveOnVisible__initOffset);
    ActiveOnVisible__initOffset();

    $(window).scroll(ActiveOnVisible__checkAndActive);
    ActiveOnVisible__checkAndActive();
}

function ActiveOnVisible__initOffset() {
    $('.active-on-visible').each(function (index, node) {
        var $node = $(node);

        var offsetTop = $node.offset().top;
        $node.attr('data-active-on-visible-offsetTop', offsetTop);

        if (!$node.attr('data-active-on-visible-diff-y')) {
            $node.attr('data-active-on-visible-diff-y', '0');
        }

        if (!$node.attr('data-active-on-visible-delay')) {
            $node.attr('data-active-on-visible-delay', '0');
        }
    });

    ActiveOnVisible__checkAndActive();
}

function ActiveOnVisible__checkAndActive() {
    $('.active-on-visible:not(.active)').each(function (index, node) {
        var $node = $(node);

        var offsetTop = $node.attr('data-active-on-visible-offsetTop') * 1;
        var diffY = parseInt($node.attr('data-active-on-visible-diff-y'));
        var delay = parseInt($node.attr('data-active-on-visible-delay'));

        if ($(window).scrollTop() + $(window).height() + diffY > offsetTop) {
            setTimeout(function () {
                $node.addClass('active');
            }, delay);
        }
    });
}

ActiveOnVisible__init();


AOS.init();
