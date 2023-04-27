import $ from 'jquery';
import 'slick-carousel';
import 'jquery-validation';
import Inputmask from "inputmask";

// Slider

$(document).ready(function () {
    $('.carousel__inner').slick({
        infinite: false,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true,
        prevArrow: '<button type="button" class="slick-prev"><img src="img/chevron-left.png"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="img/chevron-right.png"></button>',
    });

    // Tabs
    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab--active)', function () {
        $(this)
            .addClass('catalog__tab--active').siblings().removeClass('catalog__tab--active')
            .closest('div.container').find('div.catalog__content').removeClass('catalog__content--active').eq($(this).index()).addClass('catalog__content--active');
    });

    function toggleSlide(item) {
        $(item).each(function (i) {
            $(this).on('click', function (e) {
                e.preventDefault();
                $('.catalog__item-content').eq(i).toggleClass('catalog__item-content--active');
                $('.catalog__item-list').eq(i).toggleClass('catalog__item-list--active');
            })
        })
    };

    toggleSlide('.catalog__link');
    toggleSlide('.catalog__item-back');

    //Modal

    $('[data-modal=consultation]').on('click', function () {
        $('.overlay, #consultation').fadeIn('slow');
    });
    $('.modal__close').on('click', function () {
        $('.overlay, #consultation, #order, #thanks').fadeOut('slow');
    });

    $('.overlay').on('click', function (e) {
        console.log(e.target);
        if ($(e.target).hasClass('overlay')) {
            $('.overlay, #consultation, #order, #thanks').fadeOut('slow');
        } 
    });

    $('.button--mini').each(function (i) {
        $(this).on('click', function () {
            $('#order .modal__descr').text($('.catalog__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('slow');
        });
    });


    $('#feed-form').validate({
        rules: {
            name: 'required',
            phone: 'required',
            email: {
                required: true,
                email: true
            }
        },
        messages: {
            name: 'Пожалуйста, укажите ваше имя',
            phone: 'Пожалуйста, укажите ваш телефон',
            email: {
                required: 'Нам нужен ваш адрес электронной почты, чтобы связаться с вами',
                email: 'Ваш адрес электронной почты должен быть в формате name@domain.com'
            }
        }
    });

    function valideForms(form) {
        $(form).validate({
            rules: {
                name: 'required',
                phone: 'required',
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: 'Пожалуйста, укажите ваше имя',
                phone: 'Пожалуйста, укажите ваш телефон',
                email: {
                    required: 'Нам нужен ваш адрес электронной почты, чтобы связаться с вами',
                    email: 'Ваш адрес электронной почты должен быть в формате name@domain.com'
                }
            }
        });
    };

    valideForms('#feed-form');
    valideForms('#consultation form');
    valideForms('#order form');

    Inputmask('+7 (999) 999-99-99').mask('input[name=phone]');

    // Form

    $('form').submit(function (e) {
        e.preventDefault();

        if (!$(this).valid()) {
            return;
        };

        $.ajax({
            type: 'POST',
            url: 'mailer/smart.php',
            data: $(this).serialize()
        }).done(function () {
            $(this).find('input').val('');
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');

            $('form').trigger('reset');
        });
        return false;
    });

    //Scroll 

    $(window).scroll(function () {
        if ($(this).scrollTop() > 1600) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });
});