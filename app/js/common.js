$(function () {
	if (localStorage.getItem('banner')) {
		$('.banner').hide();
	} else {
		setTimeout(() => {
			$('.banner').slideDown(300);
		}, 3000);
	}
	$('.close_button').on('click', function () {
		localStorage.setItem('banner', 'close')
		$('.banner').slideUp(300);
	});
	// preloader=======================================================
	$(window).on('load', function () {
		setTimeout(function () {
			$('.wrapper').css({ 'opacity': '0' });
			$(".progress").delay(400).fadeOut("slow");
			$('.wrapper').css({ 'opacity': '1' });
		}, 800);

	});
	// scrol to top==========================================================================
	$(window).scroll(function () {
		if ($(this).scrollTop() != 0) {
			$('#toTop').fadeIn();
		} else {
			$('#toTop').fadeOut();
		}
	});
	$('#toTop').click(function () {
		$('body,html').animate({ scrollTop: 0 }, 800);
	});
	// custom scroll=========================================================================
	$(window).on("load", function () {
		// $(".content").mCustomScrollbar({
		//   theme: "minimal-dark",
		//   scrollInertia:800
		// });

	});
	//mmenu=====================================================================================
	$(".sf-menu").superfish({
		delay: 200,
		speed: "fast",
		cssArrows: false
	})
		.after("<div id='mobile-menu'>").clone().appendTo("#mobile-menu");
	$("#mobile-menu").find("*").attr("style", "");
	var logo = $(".logo-wrap").html();
	$("#mobile-menu").children("ul").removeClass("sf-menu")
		.parent().mmenu({
			extensions: ['widescreen', 'theme-white', 'effect-menu-slide', 'pagedim-black'],
			navbars: [
				{
					"position": "top",
					"content": [
						logo
					]
				},
			],
			navbar: {
				title: ""
			},
			offCanvas: {
				position: 'right',
				pageNodetype: "section"
			}
		});

	$(".toggle-mnu").click(function () {
		$(this).addClass("on");
	});

	var api = $("#mobile-menu").data("mmenu");
	api.bind("closed", function () {
		$(".toggle-mnu").removeClass("on");
	});

	$("#leftside-navigation  .open").click(function (e) {
		$(".slideDown").mCustomScrollbar("destroy");
		var submnu = $("#leftside-navigation ul ul").slideUp();
		$(submnu).toggleClass("slideDown");
		$(".slideDown").mCustomScrollbar({
			theme: "minimal-dark",
		});
		$(this).next().is(":visible") || $(this).next().slideDown(), e.stopPropagation();
	});

});
$(document).ready(function () {
	$('.sf-menu li:has(ul)').each(function () {
		var el = $(this).context.lastElementChild,
			dis_link = $(this).context.firstElementChild,
			el_lenght = $(el).context.childElementCount;
		if ($(dis_link).attr("tabindex") == 1) {
			$(dis_link).attr("href", "#!");
		}
		if (el_lenght >= 10) {
			$(el).addClass("two_colons");
		}
	});
});
function filterElementInit() {
	$("input[name='arrFilter_ff[NAME]']").attr("id", "name");
	// $("input#arrFilter_DATE_ACTIVE_FROM_1").attr("placeholder", "По дате от");
	// $("input#arrFilter_DATE_ACTIVE_FROM_2").attr("placeholder", "По дате до");
	// filter===================================================================================
	if ($.cookie('filter')) {
		$(".filter-news").slideToggle();
		$(".filter").addClass("active");
		$(".filter").find("span i").attr("class", "fa fa-chevron-up");
	}
	$(".filter").on("click", function () {
		$(this).toggleClass("active");
		$(".filter-news").slideToggle();
		if ($(this).hasClass("active")) {
			$.cookie('filter', 1, {
				path: '/'
			});
			$(this).find("span i").attr("class", "fa fa-chevron-down");
			$(this).find("span i").attr("class", "fa fa-chevron-up");
		} else if (!$(this).hasClass("active")) {
			$.removeCookie('filter', { path: '/' });
			$(this).find("span i").attr("class", "fa fa-chevron-up");
			$(this).find("span i").attr("class", "fa fa-chevron-down");
		}
	});
	// option button============================================================================
	var option = {
		list: $('#btn-list'),
		excerpt: $('#btn-excerpt')
	},
		overview = $('#overview');
	if ($.cookie('view-preference') == true) {
		option.excerpt.attr('data-state', 'active');
		overview.attr('data-view', 'excerpt');
	} else {
		option.list.attr('data-state', 'active');
		overview.attr('data-view', 'list');
	}
	option.excerpt.on('click', function () {
		if ($(this).attr('data-state') === undefined) {
			$(this).attr('data-state', 'active');
			option.list.removeAttr('data-state');
			var excerpt = overview.attr('data-view', 'excerpt');
			$.cookie('view-preference', true, {
				path: '/'
			});
		}
	});
	option.list.on('click', function () {
		if ($(this).attr('data-state') === undefined) {
			$(this).attr('data-state', 'active');
			option.excerpt.removeAttr('data-state');
			overview.attr('data-view', 'list');
			$.removeCookie('view-preference', {
				path: '/'
			});
		}
	});
	// select================================================================================
	var select = $('select.dropdown');
	if ($(select)[0]) {
		var objSel = $(select)[0];
		if (objSel.options.length > 5) {
			$(select).select2('destroy');
			$(select).removeClass("sl");
			$(select).addClass("sl-search");
		} else {
			$(select).select2('destroy');
			$(select).removeClass("sl-search");
			$(select).addClass("sl");
		}
	}
	$(select).each(function (i, obj) {
		if ($(obj).data("select2") == 'undefined') {
			$(obj).select2();
		}
	});
	$(".sl").select2({
		minimumResultsForSearch: Infinity,
		language: "ru"
	});
	$(".sl-search").select2({
		placeholder: {
			id: '-1', // the value of the option
			text: 'Select an option'
		}
	});
	$(document).on("select2-open", "select", function () {
		$("ul.select2-results").mCustomScrollbar('destroy');
		var el;
		$('.select2-results').each(function () {
			var api = $(this).data('jsp');

			if (api !== undefined) api.destroy();
		});

		$('.select2-results').each(function () {
			if ($(this).parent().css("display") != 'none') el = $(this);

			if (el === undefined) return;
			// if ($(el).hasClass('mCustomScrollbar')){
			// 	$(el).removeClass('mCustomScrollbar');
			// 	$(el).removeClass('_mCS_2');
			// }
			$(el).mCustomScrollbar({
				mouseWheel: true,
				advanced: {
					updateOnContentResize: true
				}
			});
		});
	});
	//stick_in_parent========================================================================
	$(".sidebar").stick_in_parent();
}
//slider====================================================================================

$('.slider_news').owlCarousel({
	loop: true,
	margin: 10,
	nav: true,
	stagePadding: 15,
	navText: ['<i class="fa fa-chevron-left" aria-hidden="true"></i>', '<i class="fa fa-chevron-right" aria-hidden="true"></i>'],
	navClass: ["slider_news_prev", "slider_news_next"],
	responsive: {
		0: {
			items: 1
		},
		600: {
			items: 2
		},
		1000: {
			items: 5
		}
	}
});
$('.big-slider').owlCarousel({
	loop: true,
	nav: true,
	items: 1,
	navText: ['<i class="fa fa-chevron-left" aria-hidden="true"></i>', '<i class="fa fa-chevron-right" aria-hidden="true"></i>'],
	navClass: ["big-slider-prev", "big-slider-next"],
});
//material pushpin==========================================================================
$(document).ready(function () {
	$('.parallax').parallax();
});
//material carousel=========================================================================
$(document).ready(function () {
	$('.carousel').carousel({
		padding: 30,
		dist: -50,
		//noWrap: true,
		shift: 30,
		//indicators: true
	});
});
// scroll content===========================================================================
$(".scroll_to_top").on("click", function () {
	$(".content").mCustomScrollbar("scrollTo", ['top', null], {
		scrollInertia: 800
	});
});
window.onscroll = function () {
	var scrolled = window.pageYOffset || document.documentElement.scrollTop;
	if (scrolled >= 40) {
		$('.header').addClass("fixed_head");
	} else {
		$('.header').removeClass("fixed_head");
	}
}

// fotorama==============================================================================
function detailFotoramaInit() {
	$('.news-detail-thumbs').each(function () {
		$('a', this).each(function () {
			var $a = $(this);
			// set ids, will use them later
			$a.attr({
				id: $a.attr('href').replace(/[\/\.-]/g, '')
			});
		});

		var $thumbs = $(this),
			$fotorama = $thumbs.clone();

		$fotorama
			.on('fotorama:show', function (e, fotorama) {
				// pick the active thumb by id
				$('#' + fotorama.activeFrame.id)
					.addClass('active')
					.siblings()
					.removeClass('active');
			})
			.addClass('fotorama')
			.removeClass('news-detail-thumbs')
			.insertBefore(this)
			.fotorama({
				nav: false,
				width: '100%',
				maxHeight: 400,
				ratio: 3 / 2
			});

		// get access to the API
		var fotorama = $fotorama.data('fotorama');

		$thumbs.on('click', 'a', function (e) {
			e.preventDefault();
			// show frame by id
			fotorama.show(this.id);
		});
	});
}
// modal================================================================================================
$("#modal").iziModal({
	title: '',
	subtitle: '',
	headerColor: '#ffbb5a',
	background: null,
	theme: '',  // light
	icon: null,
	iconText: null,
	iconColor: '',
	rtl: false,
	width: 800,
	top: 100,
	bottom: 100,
	borderBottom: true,
	padding: 0,
	radius: 10,
	zindex: 999,
	iframe: false,
	iframeHeight: 400,
	iframeURL: null,
	focusInput: true,
	group: '',
	loop: false,
	arrowKeys: true,
	navigateCaption: true,
	navigateArrows: true, // Boolean, 'closeToModal', 'closeScreenEdge'
	history: false,
	restoreDefaultContent: false,
	autoOpen: 0, // Boolean, Number
	bodyOverflow: false,
	fullscreen: false,
	openFullscreen: false,
	closeOnEscape: true,
	closeButton: true,
	appendTo: 'body', // or false
	appendToOverlay: 'body', // or false
	overlay: true,
	overlayClose: true,
	overlayColor: 'rgba(0, 0, 0, 0.4)',
	timeout: false,
	timeoutProgressbar: false,
	pauseOnHover: false,
	timeoutProgressbarColor: 'rgba(255,255,255,0.5)',
	transitionIn: 'comingIn',
	transitionOut: 'comingOut',
	transitionInOverlay: 'fadeIn',
	transitionOutOverlay: 'fadeOut',
	onFullscreen: function () {
		$(".survey_doc_loader").fadeIn("slow");
	},
	onResize: function () {
		console.log("onResize");
		$(".iziModal-wrap").mCustomScrollbar("destroy");
		$(".iziModal-wrap").mCustomScrollbar();
		$(".survey_doc_loader").fadeOut("slow");
	},
	onOpening: function () {
		console.log("onOpening");
		$(".survey_doc_loader").fadeIn("slow");
		$(".iziModal-wrap").mCustomScrollbar("destroy");
	},
	onOpened: function () {
		console.log("onOpened");
		$(".survey_doc_loader").fadeOut("slow");
		$(".iziModal-wrap").mCustomScrollbar();
	},
	onClosing: function () { },
	onClosed: function () {
		console.log("onClosed");
		$(".iziModal-wrap").mCustomScrollbar("destroy");
	},
	afterRender: function () {
	}
}
);
$(".iziModal-wrap").mCustomScrollbar();
$(".home_news_list").mCustomScrollbar();
//ripple-effect=========================================================================================
(function ($) {
	$(".ripple-effect").click(function (e) {
		var rippler = $(this);

		// create .ink element if it doesn't exist
		if (rippler.find(".ink").length == 0) {
			rippler.append("<span class='ink'></span>");
		}

		var ink = rippler.find(".ink");

		// prevent quick double clicks
		ink.removeClass("animate");

		// set .ink diametr
		if (!ink.height() && !ink.width()) {
			var d = Math.max(rippler.outerWidth(), rippler.outerHeight());
			ink.css({ height: d, width: d });
		}

		// get click coordinates
		var x = e.pageX - rippler.offset().left - ink.width() / 2;
		var y = e.pageY - rippler.offset().top - ink.height() / 2;

		// set .ink position and add class .animate
		ink.css({
			top: y + 'px',
			left: x + 'px'
		}).addClass("animate");
	})
})(jQuery);
// form============================================================================
$(function () {
	$('.material-design-form .material-design-input-group input').focusout(function () {
		var any_input = $(this).val(); //get input value after focusout
		if (any_input === "") //if input value is empty
		{
			$(this).removeClass('has-value');
		}
		else {
			$(this).addClass('has-value');
		}
	});
});
//material popup===================================================================
$(document).ready(function () {
	$('.materialboxed').materialbox();
});
$(document).ready(function () {
	$('.tap-target').tapTarget();
});
document.addEventListener('DOMContentLoaded', function () {
	var elems = document.querySelectorAll('.fixed-action-btn');
	var instances = M.FloatingActionButton.init(elems, {
		direction: 'left',
		hoverEnabled: false
	});
});
//home grid load===================================================================
(function ($) {
	var speed = 2000;
	var container = $('#display-animation');
	container.each(function () {
		var elements = $(this).children();
		var el_1 = $(elements)[0];
		var el_5 = $(elements)[4];
		var el_9 = $(elements)[8];
		$(el_1)
			.removeClass('col-lg-3')
			.addClass('col-lg-6 big_block');
		$(el_5)
			.removeClass('col-lg-3')
			.addClass('col-lg-6 big_block');
		$(el_9)
			.removeClass('col-lg-3')
			.addClass('col-lg-6 big_block');
		elements.each(function () {
			var elementOffset = $(this).offset();
			var offset = elementOffset.left * 0.8 + elementOffset.top;
			var delay = parseFloat(offset / speed).toFixed(2);
			$(this)
				.css("animation-delay", delay + 's')
				.addClass('animated');
			// $(this+":nth-child(1)")
			// 	.removeClass('col-lg-3')
			// 	.addClass('col-lg-6');			
		});

	});
})(jQuery);
var li_len = 0;
$('li').each(function (i) {
	li_len++;
	if (li_len == 3) {
		$(this).addClass('li_3')
		li_len = 0;
	}
});
$('body').on('click', '[data-action="drawer"]', function () {
	$(this).closest('.card_v2').toggleClass("active");
});
$(document).ready(function () {
	filterElementInit();
	detailFotoramaInit();
	// BX.addCustomEvent('onAjaxSuccess', function () {
	// 	filterElementInit();
	// 	detailFotoramaInit();
	// });
});