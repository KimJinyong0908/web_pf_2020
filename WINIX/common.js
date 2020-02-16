console.clear();

$('.header-wrap > .left-side-bar').click(function () {
    showLeftSideBar();
});

$('.menu-all > .close').click(function () {
    hideLeftSideBar();
});

function showLeftSideBar() {
    $('.header > .menu-all').addClass('active');

};

function hideLeftSideBar() {
    $('.header > .menu-all').removeClass('active');
};


$('.menu-all-wrap > .menu-box-2 > ul > li').mouseenter(function () {
    var $this = $(this);

    $this.siblings('.normal').addClass('off');
});

$('.menu-all-wrap > .menu-box-2 > ul > li').mouseleave(function () {
    var $this = $(this);

    $this.siblings('.normal').removeClass('off');
});



function My1__updateCurrentPageNumber(event) {
    var totalItemNo = $('.my-1').attr('date-total-items');
    var currentItemNo = $('.my-1 > .owl-carousel > .owl-stage-outer > .owl-stage > .owl-item.active > .item').attr('data-no');
    $('.my-1 .item-counter .total-item-no').html(totalItemNo);
    $('.my-1 .item-counter .current-item-no').html(currentItemNo);

    var widthP = parseInt(currentItemNo / totalItemNo * 100);

    $('.my-1 > .indicator > div').stop().animate({
        width: widthP + '%'
    }, 300);
}

function My1__init() {
    // 전체 개수 세팅해서 `.my-1`의 `date-total-items` 속성에 값 넣기
    var totalItemNo = $('.my-1 .item').length;
    $('.my-1').attr('date-total-items', totalItemNo);

    // 각 아이템에 번호 매기기
    $('.my-1 .item').each(function (index, node) {
        $(node).attr('data-no', index + 1);
    });

    $('.my-1 > .owl-carousel').owlCarousel({
        loop: true,
        nav: true,
        /* 애니메이션을 계속 주고 플레이타임아웃을 7초동안*/
        autoplay: true,
        autoplayTimeout: 7000,
        dots: false,
        navText: ['<', '>'],
        singleItem: true,
        responsive: {
            0: {
                items: 1
            },
        },
        animateOut: 'fadeOut',
        onInitialized: My1__updateCurrentPageNumber,
        onTranslated: My1__updateCurrentPageNumber,
    });
}

My1__init();
