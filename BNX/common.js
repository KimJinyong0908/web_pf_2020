$('.content .slider .page-btn > div').click(function () {
    // this는 `클릭` 이라는 사건을 당한 당사자 입니다.
    // 즉 this는 여러분이 클릭한 div를 의미합니다.

    // $(this)는 `이거 포장해주세요!` 라는 의미입니다.
    // 여기서 이거는 this 입니다.
    // 이렇게 포장을 하는 이유는 포장을 한 후에는 명령을 내리기 편하기 때문입니다.
    var $클릭된_녀석 = $(this);

    // 즉 .page-nav 를 말합니다.
    var $클릭된_녀석의_부모 = $클릭된_녀석.parent()

    // 지역탐색, 참고로 $('')는 전국탐색입니다.
    var $기존_활성된_녀석 = $클릭된_녀석의_부모.find('.active');
    $기존_활성된_녀석.removeClass('active');
    $클릭된_녀석.addClass('active');

    var 이번에_클릭된_녀석이_형제중에서_몇번째인지 = $클릭된_녀석.index();

    // 조상중에서 .slider-2 를 가진 녀석을 딱 하나 가져온다.(기준 나랑 가장 가까운 것)
    var $슬라이더 = $클릭된_녀석.closest('.content .slider');

    // 기존에 나와있던 이미지를 안나오게 한다.
    $슬라이더.find('.slides > div.active').removeClass('active');
    // 현재 클릭된 버튼의 순서에 맞춰서 슬라이드를 보여준다.
    $슬라이더.find('.slides > div:nth-of-type(' + (이번에_클릭된_녀석이_형제중에서_몇번째인지 + 1) + ')').addClass('active');
});




$('.toggle-side-bar-btn').click(function () {
    var $클릭된_아이콘 = $(this);

    var nowAnimating = $클릭된_아이콘.attr('data-ico-now-animating');

    if (nowAnimating == 'Y') {
        return;
    }

    if ($클릭된_아이콘.hasClass('active')) {
        hideLeftSideBar();
    } else {
        showLeftSideBar();
    }

    $클릭된_아이콘.toggleClass('active');
    $클릭된_아이콘.attr('data-ico-now-animating', 'Y');

    setTimeout(function () {
        $클릭된_아이콘.attr('data-ico-now-animating', 'N');
    }, 300);
});

$('.left-side-bar .menu-1 ul > li > a').click(function (e) {
    var $clickedA = $(this);

    var href = $clickedA.attr('href');

    if (href == "#") {
        e.preventDefault();
    }
});

$('.left-side-bar .menu-1 ul > li').click(function (e) {
    var $clicked = $(this);

    if ($clicked.hasClass('active')) {
        $clicked.removeClass('active');
    } else {
        // 내 형제 중에서 active 가지고 있는거 빼았는다.
        $clicked.siblings('.active').removeClass('active');
        // 내가 지금 펼치려는 메뉴의 후손 중에 이미 펼쳐진게 있다면 닫는다.
        $clicked.find('.active').removeClass('active');
        // 메뉴를 펼친다.
        $clicked.addClass('active');
    }

    e.stopPropagation();
});

function showLeftSideBar() {
    // html, body에 세로 스크롤 바가 사라진다.
    $('html').addClass('hide-y-scroll-bar-on-sm-down');

    // 기존에 활성화 되어 있는 메뉴 아이템들 전부 비활성화 처리
    $('.left-side-bar .menu-1 ul > li.active').removeClass('active');

    $('.left-side-bar-box').addClass('active');
}

function hideLeftSideBar() {
    // html, body에 세로 스크롤 바가 다시 보여진다.
    $('html').removeClass('hide-y-scroll-bar-on-sm-down');
    $('.left-side-bar-box').removeClass('active');
}

$('.left-side-bar-box').click(function () {
    // 박스를 클릭하면 제이쿼리가 토글 버튼을 대신 클릭해준다.
    $('.toggle-side-bar-btn').click();
});

// .left-side-bar 클릭하면 .left-side-bar-box 가 없어지지 않게하도록 처리
$('.left-side-bar').click(function (e) {
    // 클릭이 되었다는 사실을 부모에게 전파하지 않는다.
    e.stopPropagation();
});
