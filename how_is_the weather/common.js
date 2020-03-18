console.clear();
AOS.init();





$('.page-5 .visual').slick({
    slidesToShow: 1,
    pauseOnHover: false,
    cssEase: 'linear',
    autoplay: true,
    autoplaySpeed: 2000,
});

$('.page-9 .visual').slick({
    slidesToShow: 4,
    pauseOnHover: false,
    cssEase: 'linear',
    autoplay: true,
    autoplaySpeed: 2000,
    prevArrow: '<i class="fas fa-angle-left"></i>',
    nextArrow: '<i class="fas fa-angle-right"></i>',
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