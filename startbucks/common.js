console.clear();


/* 스크롤시 메뉴 업 */
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


$(window).scroll(function () {
    var scrollTop = $(this).scrollTop();

    if (scrollTop < 100) {
        scrollTop = 100;
    } else if (scrollTop > 3840) {
        scrollTop = 3840;
    }

    var duration = 1000;
    $('.fly').stop().animate({
        top: scrollTop
    }, duration);

    console.log(scrollTop);
});

/* 탭 메뉴 */

$('.tab-box > .head > ul > li').click(function () {
    var $this = $(this);
    $this.addClass('active');
    $this.siblings('.active').removeClass('active');

    var $index = $(this).index();
    var $tabBox = $(this).closest('.tab-box');

    $tabBox.find(' > .content > ul > li.active').removeClass('active');
    $tabBox.find(' > .content > ul > li').eq($index).addClass('active');

    /* 탭안에 슬릭을 넣으려면 이렇게 해야합니다*/
    $('.page-2 .visual').slick('setPosition');
});




/* 탭박스 
function TabBox__init() {
    $('.tab-box').each(function (index, node) {
        var $tabBox = $(node);

        if ($tabBox.find(' > .head > ul > li.active').length == 0) {
            $tabBox.find(' > .head > ul > li:first-child').addClass('active');
        }

        var activedIndex = $tabBox.find(' > .head > ul > li.active').index();

        $tabBox.find(' > .body > ul > li.active').removeClass('active');
        $tabBox.find(' > .body > ul > li').eq(activedIndex).addClass('active');
    });

    $('.tab-box > .head > ul > li').click(function () {
        var $clicked = $(this);
        var $tabBox = $clicked.closest('.tab-box');

        $clicked.siblings('.active').removeClass('active');
        $clicked.addClass('active');

        var activedIndex = $clicked.index();

        $tabBox.find(' > .body > ul > li.active').removeClass('active');
        $tabBox.find(' > .body > ul > li').eq(activedIndex).addClass('active');
    })
}

TabBox__init();
*/


/* 슬릭 슬라이더 */
$('.page-2 .visual').slick({
    infinite: true,
    slidesToShow: 3,
    cssEase: 'linear',
    arrows: true,
    prevArrow: '<i class="fas fa-angle-left"></i>',
    nextArrow: '<i class="fas fa-angle-right"></i>',
    responsive: [
        {
            breakpoint: 769,
            settings: {
                slidesToShow: 2
            }
    },
        {
            breakpoint: 321,
            settings: {
                slidesToShow: 1
            }
    }
  ]
});





/* 카드 슬라이더 */

$('.page-5 .visual').slick({
    dots: true,
    infinite: true,
    slidesToShow: 1,
    adaptiveHeight: true,
    cssEase: 'linear',
    prevArrow: '<i class="fas fa-angle-left"></i>',
    nextArrow: '<i class="fas fa-angle-right"></i>',

});


/* 싱크 높이 */
HeightSync__nodes = {};

var HeightSync__windowWidth = $(window).width();

function HeightSync__init() {
    // 데이터를 모으는 작업, HeightSync__nodes 변수에 데이터를 채운다.
    $('.height-sync').each(function (index, node) {
        var $node = $(node);
        var groupNos = $node.attr('data-height-sync-group-no');

        groupNos = groupNos.split(',');

        for (var i = 0; i < groupNos.length; i++) {
            var groupNo = groupNos[i];
            if (groupNo.indexOf("up") == -1) {
                groupNo += "_0up";
            }

            if (groupNo.indexOf("down") == -1) {
                groupNo += "_100000down";
            }

            if (typeof HeightSync__nodes[groupNo] == 'undefined') {
                var bits = groupNo.replace('down', '');
                bits = groupNo.replace('up', '');
                bits = groupNo.split('_');
                var minWidth = parseInt(bits[1]);
                var maxWidth = parseInt(bits[2]);

                console.log(groupNo);

                HeightSync__nodes[groupNo] = {
                    minWidth: minWidth,
                    maxWidth: maxWidth,
                    nodes: []
                };
            }

            HeightSync__nodes[groupNo].nodes.push($node);
        }
    });

    $(window).resize(Height_Sync__sync);
    Height_Sync__sync();
}

function Height_Sync__sync() {
    HeightSync__windowWidth = $(window).width();

    $('.height-sync').data('height-sync-group-no', 'N');

    for (var key in HeightSync__nodes) {
        var height = 0;
        var $tallNode = null;
        var tallNodeIndex = -1;

        for (var i = 0; i < HeightSync__nodes[key].nodes.length; i++) {
            var $node = HeightSync__nodes[key].nodes[i];
            if ($node.data('height-sync-group-no') != 'Y') {
                $node.css('height', '');
            }
        }

        if (HeightSync__windowWidth < HeightSync__nodes[key].minWidth || HeightSync__windowWidth > HeightSync__nodes[key].maxWidth) {
            continue;
        }

        for (var i = 0; i < HeightSync__nodes[key].nodes.length; i++) {
            var $node = HeightSync__nodes[key].nodes[i];
            if ($tallNode == null || $tallNode.height() < $node.height()) {
                $tallNode = $node;
                tallNodeIndex = i;
            }
        }

        for (var i = 0; i < HeightSync__nodes[key].nodes.length; i++) {
            var $node = HeightSync__nodes[key].nodes[i];
            if (i != tallNodeIndex) {
                $node.height($tallNode.height());
                $node.data('height-sync-group-no', 'Y');
            }
        }
    }
}

HeightSync__init();


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

$('.right-side-bar > .menu-1 > ul > li').click(function () {
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