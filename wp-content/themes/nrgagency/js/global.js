(function($){
    "use strict";

    //VARIABLES
    var tabFinish = 0, enableScroll = 0, swipers = [],winW, winH, xsPoint = 767, smPoint = 991, mdPoint = 1199, initIterator = 0, is_visible = $('.menu-button').is(':visible');
    winW = $(window).width();
    winH  =  $(window).height();


    if( $('body').hasClass('left-side-menu') ){
        $('header').addClass('s-header');
        $('header').find('nav.nav').addClass('s-nav');
        $('#logo').find('a').addClass('s-logo');
        $('header').find('nav.nav').find('ul li ul').each(function(){ $(this).remove(); });
    }
    
   
   
    $('.tabbed-team').each(function(){
        var $team = $(this);
        var $nav = $team.find('.nav-tab');

        $team.find('.tab-info').each(function(){
            var title = $(this).data('title');
            var position = $(this).data('position');
            var $item = $('<div class="nav-tab-item v-member-nav"></div>');
            $item.append( $('<h4>').html(title) );
            $item.append( $('<span>').html(position) );
            $nav.append($item);
        });

        $nav.find('.nav-tab-item').css('width', parseFloat(100/$nav.find('.nav-tab-item').length ,10)+'%');
        

    });


    $('.image-zoom-gallery').each(function(){
        var $g = $(this);
        var col = 100/parseInt($g.data('column'),10);
        var per = col;
        if( $(window).width()<601 ){ per = 50; }

        $g.find('.v-project-link').each(function(){
            $(this).css('width', per+'%');
        });
    });

    

    $('.team-container').each(function(){
        var $tm = $(this);
        $tm.find('.team-member-container').each(function(index){
            if( index==0 ){ $(this).addClass('active'); }
            $tm.find('.team-nav').find('.swiper-wrapper').append( $('<div class="swiper-slide member-slide"><img src="'+$(this).find('.thumb-img img').attr('src')+'" alt="img"/></div>') );
        });
    });


    $('.wpb_tour_extended').each(function(){
        var $tour = $(this);
        var t_title = $tour.data('desc-title');
        var t_desc = $tour.data('desc-text');
        var $desc = $('<span class="tab_nav_head"></span>');
        $desc.append( $("'<h3></h3>'").html(t_title) );
        $desc.append( $("'<p></p>'").html(t_desc) );

        $tour.find('.wpb_tabs_nav, .vc_tta-tabs-list').prepend( $desc );
    });

    var swiper = new Swiper('.tt-carousel-image-gallery', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        spaceBetween: 0
    });
    


    // scroll-to-block
    if( $('body').hasClass('one-page-menu') ){
        $('.one-page-section').each(function(){
            $(this).next().addClass('scroll-to-block');
        });

        $('header nav.nav').find('a').each(function(){
            $(this).addClass('scroll-to-link');
        });
    }
    

    $('.testimonial-wrapper').each(function(){
        var $t = $(this);
        if( $t.hasClass('slider-type-circles') ){
            var $block = $('<div class="testimonials-block"></div>');
            $t.find('.swiper-slide').each(function(){
                $block.append( $(this).find('.testimonials-item') );
                $(this).find('.testimonials-item').remove();
            });
            $t.append( $block );
            $t.find('.testimonials-item').eq(0).addClass('active').show();

            $t.find('.client-slide').on('click', function () {
                if( $(this).hasClass('default-active') ) return false;
                $t.find('.client-slide').removeClass('default-active');
                $(this).addClass('default-active');
                var index = $t.find('.client-slide').index(this);
                swipers[$t.find('.swiper-container').attr('data-init')].swipeTo(index);
            });
        }
    });




    $('.t-gallery').each(function(){
        var $tg = $(this);
        var tags = [];
        var slide_item = '';

        $tg.find('.work-img').each(function(){
            var tag = $(this).data('category')+'';
            var splt = tag.split(' ');
            for( var i=0; i<splt.length; i++ ){
                var slabel = splt[i].replace('ftr-', '');
                if( tags.indexOf(slabel)<0 ){
                    tags.push(slabel);
                }
            }

            var sitem = '<div class="swiper-slide"> \
                            <div class="plase-box background-parent"></div> \
                            <div class="place-info"> \
                                <div class="hot-price"></div> \
                                <h3 class="country-name"></h3> \
                                <p></p> \
                            </div> \
                        </div>';
            var $sitem = $(sitem);
            
            $sitem.find('.plase-box').css('background-image', 'url('+$(this).find('img').attr('src')+')');
            $sitem.find('.hot-price').html( $(this).find('.hot-price').html() );
            $sitem.find('.country-name').html( $(this).find('.country-name').html() );
            $sitem.find('p').html( $(this).find('.info-desc').html() );

            $tg.find('.t-gallery-box .swiper-wrapper').append( $sitem );

        });

        for( var i=0; i<tags.length; i++ ){
            $tg.find('.cont-filter').append( "<button class='button' data-filter='.ftr-"+tags[i]+"'>"+tags[i].replace('-', ' ')+"</button>" );
        }

    });


    function folio_ajax_content($folio){
        $folio.find('.work-img:not(#filters)').magnificPopup({
            type: 'ajax',
            data: null,
            removalDelay: 500, //delay removal by X to allow out-animation
            callbacks: {
                beforeOpen: function() {
                    this.st.mainClass = this.st.el.attr('data-effect');
                },
                ajaxContentAdded: function(){
                    var $content = $(this.content);
                    if( $content.find('.place-info').find('.gallery').length ){
                        $content.find('.swiper-wrapper').html('');
                        $content.find('.place-info').find('.gallery').eq(0).find('img').each(function(){
                            var $item = $('<div class="swiper-slide"><div class="plase-box background-parent"><img class="center-image" src="'+$(this).attr('src')+'" alt="img"/></div></div>');
                            $content.find('.swiper-wrapper').append( $item );
                        });
                    }
                    else{
                        $content.find('.swiper-wrapper').find('img').css({
                            'width': '100%',
                            'height': 'auto'
                        })
                    }
                    $content.find('.swiper-container').swiper({
                        pagination: '.pagination-folio-single',
                        paginationClickable: true,
                        calculateHeight: true
                    });
                }
            },
            midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
        });
    }

    


    //WINDOW LOAD
    $(window).load(function(){

        // init swiper
        initSwiper();

        $('body').addClass('loaded');
        $('#loader-wrapper').fadeOut();
        isotopFn();
        var $container = $('.isotope');
        $container.isotope({
            itemSelector: '.work-img',
            masonry: '.work-img'
        });

        $(window).resize(function(){
            $container.isotope('layout');
        });

        filterHeight();
        window.scrollTo(0, 0);


        if( $('body').hasClass('one-page-menu') ){
            if( window.location.hash ){
                var _hash = window.location.hash.split('#');
                if( _hash.length<2 ){
                    _hash = window.location.hash;
                }
                var index = $('a.scroll-to-link').index( $('a.scroll-to-link[href="'+_hash[1]+'"]') );
                $('body, html').animate({'scrollTop':$('.scroll-to-block').eq(index).offset().top}, 10, function(){
                    enableScroll = 1;
                });
            }
            else{
                enableScroll = 1;
            }
        }

        // <a href="#myid" class="custom-scroll-to-link">My link</a>
        $('.custom-scroll-to-link,.custom-scroll-to-link a').on('click', function(){
            var id = $(this).attr('href');
            $('body, html').animate({'scrollTop':$('div[data-id="'+id.replace('#','')+'"]').offset().top});
        });


        $('.blog-posts').each(function(){
            var $blog = $(this);
            $blog.isotope({
                itemSelector: '.post-item',
                masonry: '.post-item'
            });
        });


        // Portfolio
        $('.lates-work, .fashion-gallery').each(function(){
            var $folio = $(this);
            var col = $folio.data('column');
            $folio.find('.work-img:not(#filters)').each(function(){
                var cl = col;
                if( $(window).width()<721 && $(window).width()>=601 ){
                    cl = 3;
                }
                else if( $(window).width()<601 ){
                    cl = 2;
                }

                $(this).css('width', 100/cl+'%');


                if( !$folio.hasClass('fashion-gallery') ){
                    folio_ajax_content($folio);
                }

            });
            
            $folio.find('.isotope').isotope({ filter: "*" });


            $(window).resize(function(){
                var cl = $folio.data('column');
                if( $(window).width()<721 && $(window).width()>601 ){
                    cl = 3;
                }
                else if( $(window).width()<601 ){
                    cl = 2;
                }

                $folio.find('.work-img:not(#filters)').each(function(){
                    $(this).css('width', 100/cl+'%');
                });

                $folio.find('.isotope').isotope({ filter: "*" });

            });

        });
    
        
    });


    //SCROLL FUNCTIONS
    $(window).scroll(function(){
        scrollCall();

        if( $('.time-line').length ) {

            $('.time-line').not('.animated').each(function(){
                if($(window).scrollTop() + $(window).height() > $(this).offset().top){
                    $(this).addClass('animated').find('.timer').countTo();
                    $('.skill').each(function() {
                        var toHeight = $(this).find('h3').data('to') ;
                        $(this).find('.timer-wrapper').height(toHeight + '%');
                    });
                    $('.line').each(function(){
                        var toW = $(this).find('.timer').data('to') ;
                        $(this).find('.line-active').width(toW + '%');
                    });

                }
            });
        }

        if(!is_visible) {
            template8placeHeader();
        }
    });


    var headerHeight = $('header.header').outerHeight();
    if( $('body').hasClass('admin-bar') ) {
        headerHeight = headerHeight + 34;
    }


    //SCROLL MENU
    function scrollCall(){
        var winScroll = $(window).scrollTop();
        if( $('.scroll-to-block').length && enableScroll ){
            $('.one-page-section').each(function(index){
                var _section = $(this);
                var _block = _section.next();
                var _sp = (winScroll + $(window).height()*0.8);
                if( _section.offset().top <= _sp && _block.offset().top + _block.outerHeight() > _sp ){
                    $('.menu-item.active').removeClass('active');
                    $('.scroll-to-link').eq(index).parent().addClass('active');
                    var _uri = '#' + _section.data('id');
                    if( window.location.hash!=_uri ){
                        window.location.hash = _uri;
                    }
                }
            });
        }
    }

    
    $('.scroll-to-link').on('click',function(){
        if($(this).attr('href').indexOf('http://') > -1 || $(this).attr('href').indexOf('https://') > -1 ) { return; }
        var index = $(this).parent().parent().find('.scroll-to-link').index(this);

        $('body, html').animate({'scrollTop':$('.scroll-to-block').eq(index).offset().top-headerHeight}, 800);
        return false;
    });


    //OUR SERVICES
    $('.service').click(function(){
        var $t = $(this);
        if(tabFinish || $t.hasClass('active')) return false;
        tabFinish = 1;
        $t.closest('.serv').find('.service').removeClass('active-item');
        $t.addClass('active-item');
        var index = $t.parent().find('.service').index(this);
        $t.closest('.serv').find('.serv-description:visible').fadeOut(500, function(){
            $t.closest('.serv').find('.serv-description').eq(index).fadeIn(500,
                function() {
                    tabFinish = 0;

                });
        });
    });


    $('.process').on('click',  function(){
        var $t = $(this);
        if(tabFinish || $t.hasClass('active')) return false;
        tabFinish = 1;
        $t.closest('.work-process').find('.process').removeClass('active-process');
        $t.addClass('active-process');
        var index = $t.parent().parent().find('.process').index(this);
        $t.closest('.work-process').find('.process-info:visible').fadeOut(500, function(){
            $t.closest('.work-process').find('.process-info').eq(index).fadeIn(500, function() {
                tabFinish = 0;

            });
        });
    });



    function initSwiper(){
        var initIterator = 0;
        $('.swiper-container').each(function(){
            var $t = $(this);
            
            if( $t.parents('.wpb_tab').length && $t.parents('.wpb_tab').css('display')=='none' ){
                $t.parents('.wpb_tab').show();
                setTimeout(function(){
                    $t.parents('.wpb_tab').hide();
                }, 1000);
            }

            var index = 'unique-id-'+initIterator;
            var slideMode = $(this).attr('data-mode');
            var space_btwn = $(this).attr('data-space-between');
            $t.attr('data-init', index).addClass('initialized');
            $t.find('.pagination').addClass('pagination-'+index);

            var loopVar = parseInt($t.attr('data-loop')),
                slidesPerViewVar = $t.attr('data-slides-per-view'),
                xsValue, smValue, mdValue, lgValue;
            var centeredSlidesVar = ($t.closest('.history, .testimonials-container').length) ? 1 : 0;
            
            var swiperCenteredAttr = $t.attr('data-centered');
            if( typeof swiperCenteredAttr !== typeof undefined && swiperCenteredAttr !== false ) {
                centeredSlidesVar = parseInt(swiperCenteredAttr);
            }
            if(slidesPerViewVar == 'responsive'){
                slidesPerViewVar = 1;
                xsValue = $t.attr('data-xs-slides');
                smValue = $t.attr('data-sm-slides');
                mdValue = $t.attr('data-md-slides');
                lgValue = $t.attr('data-lg-slides');

                slidesPerViewVar = getSlidesPerView(xsValue, smValue, mdValue, lgValue);
            }

            space_btwn = typeof(space_btwn)!=='undefined' ? space_btwn : 0;

            if( $t.parent().hasClass('team-nav') ){

                if( $t.parent().parent().hasClass('info-gallery-full') ){
                    $t.parent().show();
                }
            }
            else{
                $t.parent().hide();
                $t.parent().width( $t.parent().parent().width() );
                $t.parent().show();

                $(window).resize(function(){
                    $t.parent().hide();
                    $t.parent().width( $t.parent().parent().width() );
                    $t.parent().show();
                });
            }

            swipers[index] = new Swiper(this,{
                pagination: '.pagination-'+index,
                loop: loopVar,
                paginationClickable: true,
                calculateHeight: true,
                slidesPerView: slidesPerViewVar,
                roundLengths: true,
                mode:slideMode,
                centeredSlides: centeredSlidesVar,
                spaceBetween: space_btwn,
                onInit: function(swiper){
                    if($t.attr('data-slides-per-view')=='responsive'){
                        updateSlidesPerView(xsValue, smValue, mdValue, lgValue, swiper);
                    }

                    if( $t.parent().find('.slider-index').length ){
                        $t.parent().find('.slider-index .end_index').html( $t.find('.swiper-wrapper > div').length-slidesPerViewVar+1 );
                    }
                },
                onSlideChangeEnd:function(swiper){

                    var activeIndex = (loopVar===true)?swiper.activeIndex:swiper.activeLoopIndex;
                    if($t.next().find('.slider-index').length) {
                        $t.next().find(".start_index").html(activeIndex+1);
                    }
                    if($t.find('.slider-index').length) {
                        $t.find(".start_index").html(activeIndex+1);
                    }
                    if($t.hasClass('swiper-project')) {
                        var activeSlide = $t.find('.swiper-slide-active'),
                            activePrev =  activeSlide.prev().data('name'),
                            activeNext =  activeSlide.next().data('name');

                        $('.v-project-prev span').text(activePrev);
                        $('.v-project-next span').text(activeNext);

                        if(!activeSlide.next().hasClass('swiper-slide')) {
                            $('.v-project-next').fadeOut();
                        }
                        else{
                            $('.v-project-next').fadeIn();
                        }

                        if(!activeSlide.prev().hasClass('swiper-slide')) {
                            $('.v-project-prev').fadeOut();
                        }
                        else{
                            $('.v-project-prev').fadeIn();
                        }
                    }
                    if( $t.parent().hasClass('slider-type-circles') ){
                        $t.parent().find('.testimonials-item').css('display', 'none').removeClass('active');
                        $t.parent().find('.testimonials-item').eq(activeIndex).css({
                            'display' : 'block',
                            'opacity' : 0
                        }).animate({'opacity' : 1},50,
                            function() {
                                $(this).addClass('active');
                            }
                        );
                    }

                },
                onSlideChangeStart: function(swiper){

                }
            });
            swipers[index].reInit();
            if($t.find('.default-active').length) swipers[index].swipeTo($t.find('.swiper-slide').index($t.find('.default-active')), 0);
            initIterator++;
        });
    };

    //SWIPER ARROWS
    $('.arrow-left').on('click', function(){
        // swipers[$(this).parent().prev().attr('data-init')].swipePrev();
        if( $(this).parents('.swiper-container').length ){
            swipers[$(this).parents('.swiper-container').attr('data-init')].swipePrev();
        }
        else{
            swipers[$(this).parent().parent().find('.swiper-container').attr('data-init')].swipePrev();
        }
    });

    $('.arrow-right').on('click', function(){
        if( $(this).parents('.swiper-container').length ){
            swipers[$(this).parents('.swiper-container').attr('data-init')].swipeNext();
        }
        else{
            swipers[$(this).parent().parent().find('.swiper-container').attr('data-init')].swipeNext();
        }
    });

    $('.swiper-arrow-left, .a-arrow-left').on('click',function(){
        swipers[$(this).parents('.swiper-container').attr('data-init')].swipePrev();
    });

    $('.swiper-arrow-right, .a-arrow-right').on('click', function(){
        swipers[$(this).parents('.swiper-container').attr('data-init')].swipeNext();
    });


    $('.banner-nav-left, .banner-l').on('click', function(){
        swipers[$(this).parent().parent().attr('data-init')].swipePrev();
    });

    $('.banner-nav-right, .banner-r').on('click', function(){
        swipers[$(this).parent().parent().attr('data-init')].swipeNext();
    });





    function updateSlidesPerView(xsValue, smValue, mdValue, lgValue, swiper){
        if(winW>mdPoint){
            swiper.params.slidesPerView = lgValue;
        }
        else if(winW>smPoint){
            swiper.params.slidesPerView = mdValue;
        }
        else if(winW>xsPoint){
            swiper.params.slidesPerView = smValue;
        }
        else{
            swiper.params.slidesPerView = xsValue;
        }
    }

    function getSlidesPerView(xsValue, smValue, mdValue, lgValue){
        if(winW>mdPoint){
            return lgValue;
        }
        else if(winW>smPoint){
            return mdValue;
        }
        else if(winW>xsPoint){
            return smValue;
        }
        else{
            return xsValue;
        }
    }



    //FUNCTIONS OF PAGE RESIZE
    function resizeCall(){
        winW = $(window).width();
        winH  =  $(window).height();
        $('.swiper-container[data-slides-per-view="responsive"]').each(function(){
            swipers[$(this).attr('data-init')].reInit();
        });
        is_visible = $('.menu-button').is(':visible');
        if(is_visible) {
            $('.s-header').addClass('fixed').removeClass('fixed-bottom fixed-top');
        }
        filterHeight();
    }
    $(window).resize(function(){
        resizeCall();
    });
    window.addEventListener("orientationchange", function() {
        resizeCall();
    }, false);

    //SLIDE IN TAB CLICK
    $('.member-slide').on('click', function () {
       var $t =  $(this),
            index =  $t.closest('.team-nav').find('.member-slide').index(this);
        if(tabFinish || $t.hasClass('active')) return false;
        tabFinish = 1;
        $t.closest('.team-nav').find('.member-slide').removeClass('active');
        $t.addClass('active');
        $t.closest('.team-container').find('.team-info').find('.team-member-container:visible').animate({'opacity': '0'},500, function(){
            $(this).hide();
            $t.closest('.team-container').find('.team-info').find('.team-member-container').removeClass('active');
            var newTab = $t.closest('.team-container').find('.team-info').find('.team-member-container').eq(index);
            newTab.addClass('active');
            newTab.show().css({'opacity' : '0'});
            newTab.css('display', 'table');
            if(newTab.find('.swiper-container').length){
                newTab.find('.swiper-container').each(function() {
                    swipers[$(this).attr('data-init')].reInit();
                    swipers[$(this).attr('data-init')].resizeFix();
                });

            }
            newTab.animate({'opacity': '1'},500,function() {
                tabFinish = 0;
            });
        });
    });

    // BACKGROUND IMG
    $('.center-image').each(function(){
        var bgSrc = $(this).attr('src');
        $(this).parent().css({'background-image':'url('+bgSrc+')'});
        $(this).remove();
    });

    //SWIPER BANNER NAVIGATION
    $('.banner-navigation').on('click', function(){
        var $t = $(this);
        if($t.hasClass('active')) return false;
        $t.closest('.w-banner').find('.banner-navigation').removeClass('active');
        $t.addClass('active');
        var nine = $t.parent().parent().find('.banner-navigation').index(this);
        swipers[$t.closest('.w-banner').find('.swiper-container').attr('data-init')].swipeTo(nine);
    });

    $('.banner-nav-item').on('click', function(){
        var $t = $(this);
        if($t.hasClass('active')) return false;
        $t.parent().find('.banner-nav-item').removeClass('active');
        $t.addClass('active');
        var nine = $t.parent().find('.banner-nav-item ').index(this);

        var _rev_id = $('.rev_slider_wrapper').eq(0).attr('id');
        _rev_id = _rev_id.replace('_wrapper', '').replace('rev_slider_','');
        var _revs = _rev_id.split('_');
        _rev_id = 'revapi' + _revs[0];
        window[_rev_id].revshowslide(nine+1);
    });


    $('body').on('click', function () {
        if( $('#gallery-box').find('.swiper-container').length){
            var sw =  $('#gallery-box').find('.swiper-container');
                swipers[sw.attr('data-init')].reInit();
                swipers[sw.attr('data-init')].resizeFix();
        }
    });



    //SERVICES
    $('.service').on('click', function(){
        var $t = $(this);
        if($t.hasClass('active')) return false;
        $t.closest('.serv').find('.service').removeClass('active-serv');
        $t.addClass('active-serv');
        var index = $t.parent().find('.service').index(this);
        $t.closest('.serv').find('.detail:visible').fadeOut(300, function(){
            $t.closest('.serv').find('.detail').eq(index).fadeIn(300);
        });
    });



    //HISTORY SLIDER CLICK
    $('.story-date').on('click', function(){
        var $t = $(this);
        if($t.hasClass('active')) return false;
        $t.closest('.history').find('.story-date').removeClass('active');
        $t.addClass('active');
        var story = $('.story-date').index(this);
        swipers[$t.closest('.history').find('.swiper-container').attr('data-init')].swipeTo(story);
    });




    //TAB
    $('.nav-tab-item').on('click', function(){
        var $t = $(this);
        if(tabFinish || $t.hasClass('active')) return false;
        tabFinish = 1;
        $t.closest('.nav-tab').find('.nav-tab-item').removeClass('active');
        $t.addClass('active');
        var index = $t.parent().parent().find('.nav-tab-item').index(this);
        $t.closest('.tab-wrapper').find('.tabs-content').find('.tab-info:visible').animate({'opacity': '0'},500, function(){
            $(this).hide();
            var newTab = $t.closest('.tab-wrapper').find('.tabs-content').find('.tab-info').eq(index);
            newTab.show().css({'opacity' : '0'});
            if(newTab.find('.swiper-container').length){
                newTab.find('.swiper-container').each(function() {
                    swipers[$(this).attr('data-init')].reInit();
                    swipers[$(this).attr('data-init')].resizeFix();
                });
            }
            newTab.animate({'opacity': '1'},500,function() {
                tabFinish = 0;
            });
        });
    });


    $('.nav-tab-item-proc').on('click', function () {
        var $t = $(this),
            index = $t.parent().parent().find('.nav-tab-item-proc').index(this),
            numElem =  $t.closest('.nav-tab').next('.tab-line-container').find('.tab-num');
        numElem.parent().find('.active').removeClass('active');
        numElem.eq(index).addClass('active').prevAll().addClass('active');

    });

    //RIGHT FIXED MENU
    function template8placeHeader() {
        if ($('.nav').hasClass('s-nav')) {
            var menuH = $('.header .container').outerHeight();
            if (menuH > winH) {
                $('.s-header').removeClass('fixed-top');
                if ($(window).scrollTop() + winH >= menuH) {
                    $('.s-header').addClass('fixed-bottom');
                }
                else {
                    $('.s-header').removeClass('fixed-bottom');
                }
            } else $('.s-header').removeClass('fixed-bottom').addClass('fixed-top');
        }
    }

    if(!is_visible) {
        template8placeHeader();
    }

    if(is_visible) {
        $('.s-header').addClass('fixed');
    }




    //HEADER FIXED ON SCROLL
    $(window).on('scroll', function () {
        if ($(this).scrollTop() > 10){
            $('body.h-transparent header.header').addClass('sticky');
        }
        else{
            $('body.h-transparent header.header').removeClass('sticky');
        }
    });


    //MENU RESPONSIVE SHOW
    $('.menu-button').on('click', function () {
        $('body').toggleClass('burger-menu');
        if( $('body').hasClass('burger-menu') && $(window).width()>992 ){
            $('header.header').toggleClass('menu-active');
            $('header.header nav.nav').toggleClass('nav-active');
        }
        else{
            var menu = $('.nav').slideToggle(400);
        }

        $(this).toggleClass('active');

        $(window).resize(function(){
            var w = $(window).width();
            if(w > 320 && menu.is(':hidden')) {
                menu.removeAttr('style');
            }
        });
    });

    //MENU RESPONSIVE SHOW TYPE2
    $('.m-menu-button').on('click', function () {
        $(this).toggleClass('active');
        $('.m-header').toggleClass('m-header-active');
        $('.m-nav').toggleClass('m-nav-active');

    });

    if(is_visible){
        $('.nav a').on('click', function () {
            $('.nav').slideUp(300);
            $('.menu-button').removeClass('active');
            $('body').removeClass('burger-menu');
        });
    }

    $('.m-nav a').on('click', function () {
        if(winW < 992 ) {
            $('.m-nav').removeClass('m-nav-active');
        }
    });


    //CALCULATE HEIGHT FILTER BLOCK
    function filterHeight () {
        var imgH = $('.corner-stamp').next('.work-img').find('img').height();
        $('.corner-stamp').height(imgH - 30);
    };
    filterHeight();

    //ARROW DOWN
    $('.arrow-down').on('click', function (e) {
        $('html,body').stop().animate({ scrollTop: $('.demo-info').offset().top }, 800);
        e.preventDefault();
    });

    $('.to-gallery').on('click', function (e) {
        $('html,body').stop().animate({ scrollTop: $('.gallery-food').offset().top }, 800);
        e.preventDefault();
    });




    //FILTER FUNCTIONS
    function isotopFn(){

        var $container = $('.isotope');
        $container.isotope({
            itemSelector: '.work-img',
            masonry: '.work-img'
        });


        $('.view').on( 'click', function(e) {
            e.preventDefault();

            var $this = $(this);
            var _pager = parseInt($this.attr('data-pager'), 10);
            var $folio = $this.parents('.lates-work');
            var _col = parseInt($folio.data('column'), 10);
            var _width = 100/_col;

            $.post(theme_options.ajax_url, { action:'tt_portfolio_posts', pager:_pager, folio_args:$folio.find('.folio-args').html() }, function(data){
                // create new item elements
                if( data!='' ){
                    var _json = $.parseJSON(data);
                    var _items = $('<div></div>').append(_json.folio);

                    $this.attr('data-pager', _pager+1);

                    if( _items.find('a').length ){
                        _items.imagesLoaded(function(){
                            _items.find('a.work-img').each(function(){
                                var current_item = $(this);
                                current_item.css('width', _width+'%');
                                $container.append( current_item ).isotope( 'appended', current_item );
                            });

                            if( !$folio.hasClass('fashion-gallery') ){
                                folio_ajax_content($folio);
                            }
                            $container.isotope('layout');
                        });
                    }
                    else{
                        $this.fadeOut(300);
                    }
                }
                else{
                    $this.fadeOut(300);
                }
            });

        });


        // make <div class="item width# height#" />
        function getItemElement() {
            var $item = $('.work-img').clone();
            // add width and height class
            return $item;
        }

        $('#filters').on( 'click', 'button', function() {
            $('#filters button').removeClass('actual');
            $(this).addClass('actual');
            var filterValue = $(this).attr('data-filter');
            $container.isotope({filter: filterValue});
        });

        $('#filters').on('click','button', function() {
            $('#filters button').removeClass('actual');
            $(this).addClass('actual');
            var selector = $(this).data('filter');
            if ( selector !== '*' ) {
                selector = selector + ', .corner-stamp'
            }
            $container.isotope({ filter: selector });
        });

    }


    // Inline popups
    if($('#gallery-popap').length) {
        $('#gallery-popap').magnificPopup({
            delegate: 'a',
            removalDelay: 500, //delay removal by X to allow out-animation
            callbacks: {
                beforeOpen: function() {
                    this.st.mainClass = this.st.el.attr('data-effect');
                },
                open: function(){
                    if( !$('#gallery-box').find('.swiper-container').length ){
                        $('#gallery-box').find('.sw-container').each(function(){
                            $(this).find('.swc').addClass('swiper-container');
                            initSwiper();
                        });
                    }
                }
            },
            midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
        });
    }


    //GALLERY POPUP
    if($('.gallery-parent').length) {
        $('.gallery-parent').magnificPopup({
            delegate: 'a', // child items selector, by clicking on it popup will open
            type: 'image',
            gallery: {enabled: true},
            removalDelay: 500, //delay removal by X to allow out-animation
            callbacks: {
                beforeOpen: function () {
                    this.st.mainClass = this.st.el.attr('data-effect');
                }
            },
            midClick: true

        });
    };


    $('.v-project-link').each(function(){
        if( !$(this).parent().hasClass('image-zoom-gallery') ){
            $(this).magnificPopup({
                type: 'image',
                removalDelay: 500, //delay removal by X to allow out-animation
                callbacks: {
                    beforeOpen: function () {
                        this.st.mainClass = this.st.el.attr('data-effect');
                    }
                },
                midClick: true
            });
        }
    });


    $(document).ready(function(){
        // vc_col options
        $('.vc-col-option').each(function(){
            var $col = $(this);
            if( $col.parent().hasClass('vc_row') || $col.parent().parent().hasClass('vc_row') ){
                if( $col.parent().hasClass('vc_row') ){
                    $col.parent().addClass('vc-row-table');
                    $col.prev().css('vertical-align', $col.data('valign'));
                    $col.prev().css('text-align', $col.data('align'));
                }
                else if( $col.parent().parent().hasClass('vc_row') ){
                    $col.parent().parent().addClass('vc-row-table');
                    $col.parent().css('vertical-align', $col.data('valign'));
                    $col.parent().css('text-align', $col.data('align'));
                }
                
            }
        });

        // Fullwidth section
        var fullscreen_func = function(){
            $('.vc_row.fullscreen').each(function(){
                $(this).height( $(window).height() );
            });
        };
        fullscreen_func();
        $(window).resize(function(){ fullscreen_func(); });

        
        // vc_row overlay
        $('.vc-overlay-settings').each(function(){
            var $settings = $(this);
            var $target = $(this).next();

            if( $target.hasClass('vc_row') ){
                $target.prepend('<div class="vc-overlay"></div>');
                $target.find('> .vc-overlay').css({
                    'background-color': $settings.data('overlay'),
                    'opacity': $settings.data('overlay-alpha')
                });
            }
        });


        $('.tabbed-team').each(function(){
            var $team = $(this);
            var $nav = $team.find('.nav-tab');

            $nav.find('.nav-tab-item').eq(0).trigger('click');

        });
        
        





        // VC tabs
        $('.wpb_tabs_extended').each(function(){
            var $tabs = $(this);
            var type = typeof $tabs.attr('data-style')!=='undefined' ? $tabs.attr('data-style') : 'default';
            var show_number = typeof $tabs.attr('data-number')!=='undefined' ? $tabs.attr('data-number') : 'yes';
            var bgimage = typeof $tabs.attr('data-bgimage')!=='undefined' ? $tabs.attr('data-bgimage') : '';
            var brightness = typeof $tabs.attr('data-brightness')!=='undefined' ? $tabs.attr('data-brightness') : '';

            $tabs.find('.vc_tta-tabs-list').addClass('container');
            if( type=='process' ){
                var count_nav = $tabs.find('.vc_tta-tabs-list li').length;
                var nav_count = parseInt(12/count_nav, 10);
                var nav_class = 'col-md-'+nav_count+' col-sm-6 col-xs-6';

                var $heads = $('<div class="container"></div>');
                $tabs.find('.vc_tta-tabs-list li').each(function(index){
                    var $div = $('<div class="'+nav_class+'"></div>').append('<div class="process"></div>');
                    var $panel = $tabs.find('div.vc_tta-panel').eq(index);
                    var icon = $panel.data('icon')+'';
                    var number = $panel.data('number');

                    if( icon!='' ){
                        if( icon.length>4 && icon.substring(0,4)=='http' ) {
                            $div.find('.process').append( '<img src="'+icon+'"  alt="Tab title"/>' );
                        }
                        else {
                            $div.find('.process').append( '<i class="'+icon+'"></i>' );
                        }
                    }
                    $div.find('.process').append( $('<h6></h6>').append( $(this).find('a').text() ) );
                    if( number!='' && show_number=='yes' ){
                        $div.find('.process').append( '<div class="number"><p>'+number+'</p></div>' );
                        $div.addClass('show-progress');
                    }

                    $heads.append( $div );
                });


                var $tab_contents = $('<div class="row"></div>');
                $tabs.find('div.vc_tta-panel').each(function(){
                    var $div = $('<div class="col-md-12 process-info"></div>')
                    $div.append( $(this).html() );
                    $tab_contents.append( $div );
                });

                $tabs.html( $heads ).append($tab_contents);

                $tabs.find('.process').each(function(index){
                    var $btn = $(this);
                    $btn.on('click', function(){
                        if( !$(this).hasClass('active-process') ){
                            $tabs.find('.process').removeClass('active-process');
                            $btn.addClass('active-process');

                            $tabs.find('.process-info').hide();
                            $tabs.find('.process-info').eq(index).fadeIn('slow');

                            $tabs.find('.process').each(function(j){
                                var $p = $(this);
                                if( j<=index ){
                                    setTimeout(function(){
                                        $p.addClass('process-on');
                                    }, (j-1)*400);
                                }
                                else{
                                    $(this).removeClass('process-on');
                                }
                            });
                        }
                    });
                });

                $tabs.find('.process').eq(0).trigger('click');

            }
            else if( type.indexOf('service')!==-1 ){

                var classes = 'col-md-6 col-sm-12';
                if(type.indexOf('reversed')!==-1) {classes = classes +' col-md-pull-6';}
                var $heads = $('<div class="'+classes+'"></div>').append('<div class="serv-item"><div class="row"></div></div>');   
                $tabs.find('.vc_tta-tabs-list li').each(function(index){
                    var $div = $('<div class="service col-md-6 col-sm-6 col-xs-6"></div>');
                    var $panel = $tabs.find('div.vc_tta-panel').eq(index);
                    var icon = $panel.data('icon')+'';
                    var number = $panel.data('number');

                    if( icon!='' ){
                        if( icon.length>4 && icon.substring(0,4)=='http' ) {
                            $div.append( '<img src="'+icon+'"  alt="Tab title"/>' );
                        }
                        else {
                            $div.append( '<i class="'+icon+'"></i>' );
                        }
                    }
                    $div.append( $('<h6></h6>').append( $(this).find('a').text() ) );

                    $heads.find('.row').append( $div );
                });

                var classes_x = 'col-md-6 col-sm-12 bg-serv';
                if(type.indexOf('reversed')!==-1) {classes_x = classes_x +' col-md-push-6';}
                var $tab_contents = $('<div class="'+classes_x+'"><div class="services"></div></div>');
                $tabs.find('div.vc_tta-panel').each(function(index){
                    var $div = $('<div class="serv-description"></div>')
                    var title = $tabs.find('.vc_tta-tabs-list li').eq(index).find('a').text();
                    $div.append( $('<h3 class="topic"></h3>').html(title) );
                    $div.append( $(this).html() );
                    $tab_contents.find('.services').append( $div );
                });

                $tabs.html('<div class="row"></div>');
                $tabs.find('.row').append($tab_contents).append( $heads );

                $tabs.find('.serv-item .service').each(function(index){
                    var $this = $(this);
                    $this.on('click', function(){
                        $tabs.find('.serv-item .service').removeClass('active-item');
                        $(this).addClass('active-item');

                        $tabs.find('.serv-description').hide();
                        $tabs.find('.serv-description').eq(index).fadeIn();
                    });
                });

                $tabs.find('.serv-item .service').eq(0).trigger('click');

                $tabs.find('.bg-serv').css({
                    'background-image': 'url('+bgimage+')'
                });

            }

        });

        if($(window).width() <= 768) {
            $('.show-progress').on('click', function(){
                var tabOffsetTop = $(this).parent().parent().find('.process-info').eq( $(this).index() ).offset().top - 90;
                $('html, body').animate({scrollTop: tabOffsetTop}, 1500);
            });
        }





        // VC tabs
        // Deprecated tabs
        $('.wpb_tabs').each(function(){
            var $tabs = $(this);
            var type = typeof $tabs.attr('data-style')!=='undefined' ? $tabs.attr('data-style') : 'default';
            var show_number = typeof $tabs.attr('data-number')!=='undefined' ? $tabs.attr('data-number') : 'yes';
            var bgimage = typeof $tabs.attr('data-bgimage')!=='undefined' ? $tabs.attr('data-bgimage') : '';
            var brightness = typeof $tabs.attr('data-brightness')!=='undefined' ? $tabs.attr('data-brightness') : '';

            $tabs.find('.wpb_tabs_nav').addClass('container');
            if( type=='process' ){
                var count_nav = $tabs.find('.wpb_tabs_nav li').length;
                var nav_count = parseInt(12/count_nav, 10);
                var nav_class = 'col-md-'+nav_count+' col-sm-6 col-xs-6';

                var $heads = $('<div class="container"></div>');
                $tabs.find('.wpb_tabs_nav li').each(function(index){
                    var $div = $('<div class="'+nav_class+'"></div>').append('<div class="process"></div>');
                    var $panel = $tabs.find('div.wpb_tab').eq(index);
                    var icon = $panel.data('icon')+'';
                    var number = $panel.data('number');

                    if( icon!='' ){
                        if( icon.length>4 && icon.substring(0,4)=='http' ) {
                            $div.find('.process').append( '<img src="'+icon+'"  alt="Tab title"/>' );
                        }
                        else {
                            $div.find('.process').append( '<i class="'+icon+'"></i>' );
                        }
                    }
                    $div.find('.process').append( $('<h6></h6>').append( $(this).find('a').text() ) );
                    if( number!='' && show_number=='yes' ){
                        $div.find('.process').append( '<div class="number"><p>'+number+'</p></div>' );
                        $div.addClass('show-progress');
                    }

                    $heads.append( $div );
                });


                var $tab_contents = $('<div class="row"></div>');
                $tabs.find('div.wpb_tab').each(function(){
                    var $div = $('<div class="col-md-12 process-info"></div>')
                    $div.append( $(this).html() );
                    $tab_contents.append( $div );
                });

                $tabs.html( $heads ).append($tab_contents);

                $tabs.find('.process').each(function(index){
                    var $btn = $(this);
                    $btn.on('click', function(){
                        if( !$(this).hasClass('active-process') ){
                            $tabs.find('.process').removeClass('active-process');
                            $btn.addClass('active-process');

                            $tabs.find('.process-info').hide();
                            $tabs.find('.process-info').eq(index).fadeIn('slow');

                            $tabs.find('.process').each(function(j){
                                var $p = $(this);
                                if( j<=index ){
                                    setTimeout(function(){
                                        $p.addClass('process-on');
                                    }, (j-1)*400);
                                }
                                else{
                                    $(this).removeClass('process-on');
                                }
                            });
                        }
                    });
                });

                $tabs.find('.process').eq(0).trigger('click');

            }
            else if( type.indexOf('service') !== -1){

                var classes = 'col-md-6 col-sm-12';
                if(type.indexOf('reversed')!==-1) {classes = classes +' col-md-pull-6';}
                var $heads = $('<div class="'+classes+'"></div>').append('<div class="serv-item"><div class="row"></div></div>');
                $tabs.find('.wpb_tabs_nav li').each(function(index){
                    var $div = $('<div class="service col-md-6 col-sm-6 col-xs-6"></div>');
                    var $panel = $tabs.find('div.wpb_tab').eq(index);
                    var icon = $panel.data('icon')+'';
                    var number = $panel.data('number');

                    if( icon!='' ){
                        if( icon.length>4 && icon.substring(0,4)=='http' ) {
                            $div.append( '<img src="'+icon+'"  alt="Tab title"/>' );
                        }
                        else {
                            $div.append( '<i class="'+icon+'"></i>' );
                        }
                    }
                    $div.append( $('<h6></h6>').append( $(this).find('a').text() ) );

                    $heads.find('.row').append( $div );
                });

                var classes_x = 'col-md-6 col-sm-12 bg-serv';
                if(type.indexOf('reversed')!==-1) {classes_x = classes_x +' col-md-push-6';}
                var $tab_contents = $('<div class="'+classes_x+'"><div class="services"></div></div>');
                $tabs.find('div.wpb_tab').each(function(index){
                    var $div = $('<div class="serv-description"></div>')
                    var title = $tabs.find('.wpb_tabs_nav li').eq(index).find('a').text();
                    $div.append( $('<h3 class="topic"></h3>').html(title) );
                    $div.append( $(this).html() );
                    $tab_contents.find('.services').append( $div );
                });

                $tabs.html('<div class="row"></div>');
                $tabs.find('.row').append($tab_contents).append( $heads );

                $tabs.find('.serv-item .service').each(function(index){
                    var $this = $(this);
                    $this.on('click', function(){
                        $tabs.find('.serv-item .service').removeClass('active-item');
                        $(this).addClass('active-item');

                        $tabs.find('.serv-description').hide();
                        $tabs.find('.serv-description').eq(index).fadeIn();
                    });
                });

                $tabs.find('.serv-item .service').eq(0).trigger('click');

                $tabs.find('.bg-serv').css({
                    'background-image': 'url('+bgimage+')'
                });

            }

        });



    

    }); //end document ready


})(jQuery);