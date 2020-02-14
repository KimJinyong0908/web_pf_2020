console.clear();
$('.header-mobile > .toggle-side-bar-btn').click(function () {
    showLeftSideBar();
});

$('.header-mobile > .delete-icon').click(function () {
    hideLeftSideBar();
});

$('.header-mobile > .left-side-bar-bg').click(function () {
    hideLeftSideBar();
});


$(window).scroll(function () {
    var top = $(window).scrollTop();

    if (top == 0) {
        $('html').addClass('scroll-top-0');
    } else {
        $('html').removeClass('scroll-top-0');
    }
})

function showLeftSideBar() {
    $('.header-mobile > .left-side-bar').addClass('active');
    $('.header-mobile > .left-side-bar-bg').addClass('active');
    $('.header-mobile > .delete-icon').addClass('active');
}

function hideLeftSideBar() {
    $('.header-mobile > .left-side-bar').removeClass('active');
    $('.header-mobile > .left-side-bar-bg').removeClass('active');
    $('.header-mobile > .delete-icon').removeClass('active');
}




/* fadeinup jq */
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
