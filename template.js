(función ($) {

	"uso estricto";

	jQuery (ventana) .load (función (e) {
		/ *
		 * Pre-carga
		 * * /
		jQuery ("# ​​pageloader"). fadeOut (500);

		if (jQuery ('body'). hasClass ('adult-content')) {
			var cookie_adult = window.wpmanga.getCookie ('wpmanga-adault');
			si (cookie_adult! = 1) {
				jQuery ('# adult_modal'). modal ({background: 'static', keyboard: false});
			} else {
				jQuery ('body'). removeClass ('censored');
			}
		}

	});

	jQuery ("body"). removeClass ("precarga");

	jQuery (documento) .ready (función () {

		jQuery ('ul.c-user_menu> li') .each (función (i, e) {
			jQuery (this) .clone (). appendTo ('. mobile-menu ul.navbar-nav');
		});

		if (jQuery ('body'). hasClass ('manga-reading-paged-style')) {

			$ (documento) .on ("clic", ".page-prev-link", function () {
				var prev_page_button = $ ('. main-col-inner .c-blog-post .wp-manga-nav .nav-links a.prev_page');
				if (typeof prev_page_button! == 'undefined' && prev_page_button.length> 0 && prev_page_button.is (": visible")) {
					$ (prev_page_button [0]). trigger ('clic');
				}
			});

			$ (documento) .on ("clic", ".page-next-link", function () {
				var next_page_button = $ ('. main-col-inner .c-blog-post .wp-manga-nav .nav-links a.next_page');
				if (typeof next_page_button! == 'undefined' && next_page_button.length> 0 && next_page_button.is (": visible")) {
					$ (next_page_button [0]). trigger ('click');
				}
			});

			jQuery (ventana) .on ('mousemove', function (e) {

				var prev_page_button = $ ('. main-col-inner .c-blog-post .wp-manga-nav .nav-links a.prev_page');
				var next_page_button = $ ('. main-col-inner .c-blog-post .wp-manga-nav .nav-links a.next_page');

				var halfScreen = $ (this) .width () / 2;

				var originURL = jQuery ('. reading-content-wrap'). attr ('data-site-url');

				var cursorImage = e.pageX <halfScreen? madara.cursorPrev: madara.cursorNext;

				// Pantalla izquierda y página anterior
				if (e.pageX <halfScreen) {
					if (typeof prev_page_button! == 'undefined' && prev_page_button.length> 0 && prev_page_button.is (": visible")) {
						$ ('body.reading-manga .reading-content .page-prev-link'). css ({"cursor": "url (" + cursorImage + "), auto"});
					} else {
						$ ('body.reading-manga .reading-content .page-prev-link'). css ({"cursor": "initial! important;"});
					}

				} else {

					if (typeof next_page_button! == 'undefined' && next_page_button.length> 0 && next_page_button.is (": visible")) {
						$ ('body.reading-manga .reading-content .page-next-link'). css ({"cursor": "url (" + cursorImage + "), auto"});
					} else {
						$ ('body.reading-manga .reading-content .page-next-link'). css ({"cursor": "initial"});
					}
				}

			});

		}

		var siteUrl = jQuery ('# adult_modal'). attr ('data-site-url');
		$ ('. btn-not-adult'). on ('click', function (e) {
			if (siteUrl! == '') {
				window.location = siteUrl;
			}

		});

		if (jQuery ('body'). hasClass ('censored')) {
			jQuery ('. btn-adult-confirm'). en ('clic', función (e) {
				window.wpmanga.setCookie ('wpmanga-adault', 1, 7);
				jQuery ('body'). removeClass ('censored');
			});
		}

		/ * encabezado secundario * /
		$ ('li.menu-item-has-children a [href ^ = "#"]'). en ('clickend click', function (e) {
			var $ this = $ (this);
			if ($ this.parents ('. c-sub-header-nav'). length) {
				e.preventDefault ();
				$ this.parent (). toggleClass ('active');
			} else {
				e.preventDefault ();
			}
		});

		/ * menú off-canvas * /

		jQuery (". off-canvas ul> li.menu-item-has-children"). addClass ("hiden-sub-canvas");
		jQuery (". off-canvas ul> li.menu-item-has-children"). append ('<i class = "fa fa-caret-right" aria-hidden = "true"> </i>') ;
		var menu_open = $ ('. menu_icon__open');
		var menu_close = $ ('. menu_icon__close');
		var menu_slide = $ ('. off-canvas');
		var menu_sign_in = $ ('. mobile-menu .btn-active-modal');

		menu_open.on ('click', function () {
			menu_open.addClass ('activo');
			menu_slide.addClass ('activo');
			$ ('body'). addClass ('open_canvas');
		});

		menu_close.on ('clic', función (e) {
			e.preventDefault ();
			menu_open.removeClass ('active');
			menu_slide.removeClass ('active');
			$ ('body'). removeClass ('open_canvas');
		});

		menu_sign_in.on ('clic', función (e) {
			e.preventDefault ();
			menu_open.removeClass ('active');
			menu_slide.removeClass ('active');
			$ ('body'). removeClass ('open_canvas');
		});

		$ (". off-canvas ul> li.menu-item-has-children> i"). en ('clic', función () {
			var $ this = $ (this) .parent ("li");
			$ this.toggleClass ("active"). children ("ul"). slideToggle ();
			falso retorno;
		});
		$ (documento) .on ("clickend click", función (e) {
			if (! $ (e.target) .hasClass ('menu_icon__open') &&! $ (e.target) .closest ('. off-canvas'). hasClass ('active')) {
				menu_slide.removeClass ('active');
				menu_open.removeClass ("activo");
				$ ('body'). removeClass ('open_canvas');
			}
		});
		/ **
		 * Menú pegajoso
		 * @type {Ventana}
		 * /

		var stickyNavigation = $ ('. c-sub-header-nav'). length> 0? $ ('. c-sub-header-nav'). offset (). top: 0;
		var cloneHeader = $ ("<div>", {
			clase: "encabezado de clonación"
		})
		$ (cloneHeader) .insertBefore (". c-sub-header-nav");
		var navigationHeight = $ ('. c-sub-header-nav'). outerHeight (true);

		/ **
		 * Compara la posición scrollTop para agregar la clase .sticky
		 * /
		var felis_need_add_sticky = function () {
			var scrollTop = $ (window) .scrollTop ();
			if (scrollTop - stickyNavigation> 750 && $ ("body"). hasClass ("sticky-enabled")) {
				$ (cloneHeader) .css ('height', navigationHeight);
				$ ('. c-sub-header-nav'). addClass ('sticky');
				$ ('body'). addClass ('sticky__active');
				$ ('. c-sub-header-nav'). fadeIn (300, 'linear');
			}
			else if (scrollTop - stickyNavigation <= navigationHeight + 5 && $ ("body"). hasClass ("sticky-enabled")) {
				// $ (cloneHeader) .remove ();
				$ (cloneHeader) .css ('altura', 0);
				$ ('. c-sub-header-nav'). removeClass ('sticky');
				$ ('body'). removeClass ('sticky__active');
			}

		}

		/ **
		 * Detectar el desplazamiento hacia arriba o hacia abajo, para agregar clase .sticky
		 * /
		var stickyNav = function () {
			if (typeof stickyNav.x == 'undefined') {
				stickyNav.x = window.pageXOffset;
				stickyNav.y = window.pageYOffset;
			}
			;

			var diffX = stickyNav.x - window.pageXOffset;
			var diffY = stickyNav.y - window.pageYOffset;


			if (diffX <0) {
				// desplazarse a la derecha
			} else if (diffX> 0) {
				// desplazarse a la izquierda
			} else if (diffY <0) {
				// desplazarse hacia abajo
				if ($ ('body'). hasClass ('sticky-style-2')) {
					$ ('. c-sub-header-nav'). removeClass ('sticky');
					$ ('body'). removeClass ('sticky__active');
					$ ('. clone-header'). css ('height', 0);


				} else {
					felis_need_add_sticky ();
				}
			} else if (diffY> 0) {
				// Desplazarse hacia arriba

				felis_need_add_sticky ();
			} else {
				// Primer evento de desplazamiento
			}

			stickyNav.x = window.pageXOffset;
			stickyNav.y = window.pageYOffset;
		};

		if ($ ('body'). hasClass ('sticky-enabled')) {
			$ (ventana) .on ('scroll', function () {
				if ($ (window) .width ()> = 768) {
					stickyNav ();
				}
			});
		}

		if ($ (window) .width ()> = 768) {
			$ ('body'). delegate ('. page-item-detail .item-thumb.hover-details', 'mousemove', (function (e) {
				var postID = $ (this) .attr ('data-post-id');
				var currentPostID;
				var hoverPostID;
				currentPostID = 'manga-item-' + postID;
				hoverPostID = 'manga-hover-' + postID;
				var check_bar = $ ('body'). hasClass ('admin-bar');
				var parentOffset = $ (this) .offset ();
				var relativeXPosition = (e.pageX); // offset -> el método le permite recuperar la posición actual de un elemento 'relativo' al documento
				var relativeYPosition = (e.pageY);
				var _width_infor = $ ("# hover-infor"). width ();
				var infor_left = (relativeXPosition - 15) - _width_infor;
				var infor_right = relativeXPosition + 15;
				var infor_top = check_bar? (posición relativa - 32): (posición relativa);
				var body_outerW = ($ (window) .outerWidth () / 2);

				$ ("# hover-infor"). addClass ('active');
				$ ("# hover-infor"). show ();
				$ (". icon-load-info"). css ({
					"posición": "absoluto",
					"top": infor_top - 20,
					"izquierda": relativaXPosición - 20,
					"display": "inline-block",
					"z-index": "99999",
					"ancho": "40px",
					"altura": "40px",
				});
				$ ("# hover-infor"). css ({
					"posición": "absoluto",
					"top": infor_top,
					"display": "inline-block",
					"z-index": "99999",
				});
				if (relativeXPosition> = body_outerW) {
					$ ("# hover-infor"). css ({
						"izquierda": infor_left,
					});
				}
				else {
					$ ("# hover-infor"). css ({
						"izquierda": infor_right,
					});
				}
			})) mouseout (function () {
				$ ("# hover-infor"). removeClass ('active');
				$ ("# hover-infor"). hide ();
			});
		}


		//Ve arriba
		jQuery ('. go-to-top'). en ('click', function () {
			jQuery ('html, body'). animate ({scrollTop: 0}, 500);
		});
		jQuery (ventana) .on ('scroll', function () {
			if (jQuery (window) .scrollTop ()> = (window.innerHeight * 0.5)) {
				if (! jQuery ('. go-to-top'). hasClass ('active')) {
					jQuery ('. go-to-top'). addClass ('active');
				}
				;
			} else {
				jQuery ('. go-to-top'). removeClass ('active');
			}
			;
		});
		// buscar
		$ ('. main-menu-search .open-search-main-menu'). en ('click', function () {
			var $ this = $ (this);

			if ($ this.hasClass ('search-open')) {
				$ this.parents ('. c-header__top'). find ('. search-main-menu'). removeClass ('active');
				setTimeout (function () {
					$ this.parents ('. c-header__top'). find ('. search-main-menu'). find ('input [type = "text"]'). blur ();
				}, 200);
				$ this.removeClass ('search-open');
				
				if ($ ('body'). hasClass ('mobile')) {
					var $ adv_search_link = $ ('. link-adv-search', $ ('# blog-post-search'));
					if ($ adv_search_link.length> 0) {
						$ adv_search_link.remove ();
					}
				}
			} else {
				$ this.parents ('. c-header__top'). find ('. search-main-menu'). addClass ('active');
				setTimeout (function () {
					$ this.parents ('. c-header__top'). find ('. search-main-menu'). find ('input [type = "text"]'). focus ();
				}, 200);
				$ this.addClass ('search-open');
				
				if ($ ('body'). hasClass ('mobile')) {
					var $ adv_search_link = $ ('. link-adv-search', $ this.closest ('. widget-manga-search'));
					if ($ adv_search_link.length> 0) {
						$ ('# blog-post-search'). append ($ adv_search_link.clone ());
					}
				}
			}
			;
		});

		$ (". genres_wrap .btn-genres"). haga clic en (función () {
			var $ this = $ (this);
			var $ this_parent;
			$ this.toggleClass ("active");
			$ this_parent = $ this.parents (". genres_wrap");
			$ this_parent.find (". genres__collapse"). slideToggle (300);
			$ this_parent.find (". c-blog__heading.style-3"). toggleClass ("active");
		});


		// vista acordeón cap
		$ (". listing-chapters_wrap ul.main> li.has-child"). en ('clic', función (e) {
			var $ this = $ (this);
			$ (e.target) .toggleClass ("active"). children ("ul"). slideToggle (300);
		});

		$ (". listing-chapters_wrap ul.main> li a.has-child"). en ('clic', función (e) {
			var $ this = $ (this);
			$ (e.target) .next ("ul"). slideToggle (300);
			$ (e.target) .parent (). toggleClass ("active");
		});

		$ ("# checkall"). haga clic en (función () {
			$ ('table.list-bookmark input: checkbox'). not (this) .prop ('checked', this.checked);
		});

		// deslizador del encabezado
		$ (". manga-slider .slider__container"). each (function () {

			var $ this = $ (this);
			var style = $ (this) .parents (". manga-slider"). attr ('data-style');
			var autoplay = $ (this) .parents (". manga-slider"). attr ('data-autoplay');
			reproducción automática = reproducción automática == "1"? verdadero Falso;
			var manga_slidesToShow = parseInt ($ (this) .parents (". manga-slider"). attr ('data-count'));
			var check_style = $ this.parents (". style-3"). length;
			var check_rtl = (jQuery ("body"). css ('direction') === "rtl");
			var manga_style_1 = {
				puntos: verdad,
				infinito: verdadero,
				velocidad: 500,
				modo central: (((manga_slidesToShow% 2! == 0) && (! check_style))? true: false),
				slidesToShow: manga_slidesToShow,
				slidesToScroll: 1,
				flechas: falso,
				rtl: check_rtl,
				reproducción automática: reproducción automática,
				responsivo: [{
					punto de interrupción: 992,
					ajustes: {
						slidesToShow: (manga_slidesToShow == 1)? 1: 2,
						slidesToScroll: 1,
						infinito: verdadero,
						modo central: falso,
						puntos: cierto
					}
				}, {
					punto de interrupción: 660,
					ajustes: {
						diapositivas para mostrar: 1,
						slidesToScroll: 1,
						infinito: verdadero,
						Ancho variable: falso,
						puntos: cierto
					}
				}, {
					punto de ruptura: 480,
					ajustes: {
						diapositivas para mostrar: 1,
						Ancho variable: falso,
					}
				}]
			}
			var manga_style_2 = {
				puntos: verdad,
				infinito: verdadero,
				velocidad: 500,
				slidesToShow: manga_slidesToShow,
				slidesToScroll: 1,
				flechas: falso,
				rtl: check_rtl,
				reproducción automática: reproducción automática,
				responsivo: [{
					punto de interrupción: 992,
					ajustes: {
						slidesToShow: (manga_slidesToShow == 1)? 1: 2,
						slidesToScroll: 1,
						infinito: verdadero,
						puntos: cierto
					}
				}, {
					punto de interrupción: 768,
					ajustes: {
						diapositivas para mostrar: 1,
						slidesToScroll: 1,
						infinito: verdadero,
						puntos: cierto
					}
				}]
			}
			var manga_style_3 = {
				puntos: verdad,
				infinito: verdadero,
				velocidad: 500,
				slidesToShow: manga_slidesToShow,
				slidesToScroll: 1,
				flechas: falso,
				rtl: check_rtl,
				reproducción automática: reproducción automática,
				responsivo: [{
					punto de interrupción: 992,
					ajustes: {
						slidesToShow: (manga_slidesToShow == 1)? 1: 2,
						slidesToScroll: 1,
						infinito: verdadero,
						puntos: cierto
					}
				}, {
					punto de interrupción: 768,
					ajustes: {
						diapositivas para mostrar: 1,
						slidesToScroll: 1,
						infinito: verdadero,
						puntos: cierto
					}
				}]
			}

			interruptor (estilo) {
				caso 'estilo-1':
					$ this.slick (manga_style_1);
					descanso;
				caso 'estilo-2':
					$ this.slick (manga_style_2);
					descanso;
				caso 'estilo-4':
					$ this.slick (manga_style_3);
					descanso;
			}

		});

		// control deslizante popular
		$ (". popular-slider .slider__container"). each (function () {
			var manga_slidesToShow = parseInt ($ (this) .parents (". popular-slider"). attr ('data-count'));
			var check_rtl = (jQuery ("body"). css ('direction') === "rtl");
			var autoplay = $ (this) .parents (". popular-slider"). attr ('data-autoplay');
			reproducción automática = reproducción automática == "1"? verdadero Falso;
			var popular_style_2 = {
				puntos: falso,
				infinito: verdadero,
				velocidad: 500,
				slidesToShow: manga_slidesToShow,
				flechas: verdad,
				rtl: check_rtl,
				reproducción automática: reproducción automática,
				slidesToScroll: 1,
				sensible: [
					{
						punto de quiebre: 1700,
						ajustes: {
							slidesToShow: (manga_slidesToShow == 1)? 1: 4,
							slidesToScroll: 1,
						}
					}
					{
						punto de interrupción: 1400,
						ajustes: {
							slidesToShow: (manga_slidesToShow == 1)? 1: 3,
							slidesToScroll: 1,
						}
					}
					{
						punto de interrupción: 992,
						ajustes: {
							slidesToShow: (manga_slidesToShow == 1)? 1: 2,
							slidesToScroll: 1,
						}
					}
					{
						punto de ruptura: 600,
						ajustes: {
							diapositivas para mostrar: 1,
							slidesToScroll: 1,
						}
					}
				]
			}
			var popular_style_1 = {
				puntos: falso,
				infinito: verdadero,
				velocidad: 500,
				slidesToShow: manga_slidesToShow,
				flechas: verdad,
				rtl: check_rtl,
				reproducción automática: reproducción automática,
				slidesToScroll: 1,
				sensible: [
					{
						punto de quiebre: 1700,
						ajustes: {
							diapositivas para mostrar: 4,
							slidesToScroll: 1,
						}
					}
					{
						punto de quiebre: 1200,
						ajustes: {
							diapositivas para mostrar: 3,
							slidesToScroll: 1,
						}
					}
					{
						punto de interrupción: 992,
						ajustes: {
							diapositivas para mostrar: 2,
							slidesToScroll: 1,
						}
					}
					{
						punto de ruptura: 600,
						ajustes: {
							diapositivas para mostrar: 1,
							slidesToScroll: 1,
						}
					}
				]
			}

			var popular_style_3 = popular_style_1;

			var $ this = $ (this);
			var style = $ (this) .parents (". popular-slider"). attr ('data-style');
			interruptor (estilo) {
				caso 'estilo-1':
					$ this.slick (popular_style_1);
					descanso;
				caso 'estilo-2':
					$ this.slick (popular_style_2);
					descanso;
				caso 'estilo-3':
					$ this.slick (popular_style_3);
					descanso;
			}

		});

		if ($ ('body'). tiene ('. summary__content.show-more'). length) {
			var text = $ ('. summary__content.show-more'),
				btn = $ ('. content-readmore'),
				h = texto [0] .scrollHeight;
			si (h> 120) {
				btn.addClass ('menos');
				btn.css ('display', 'inline-block');
			} else {
				btn.css ('display', 'none');
				$ ('. description-summary'). addClass ('hide_show-more');
			}

			btn.click (función (e) {
				e.stopPropagation ();

				if (btn.hasClass ('less')) {
					btn.removeClass ('less');
					btn.addClass ('más');

					if (typeof single_manga_show_more! == 'undefined') {
						btn.text (single_manga_show_more.show_less);
					}más{
						btn.text ('Mostrar menos');
					}

					text.addClass ('activo');
					text.animate ({'height': h});
				} else {
					btn.addClass ('menos');
					btn.removeClass ('más');
					text.removeClass ('active');

					if (typeof single_manga_show_more! == 'undefined') {
						btn.text (single_manga_show_more.show_more);
					}más{
						btn.text ('Show more');
					}

					text.animate ({'height': '120px'});
				}
			});
		}

		if ($ ('body'). tiene ('. listing-chapters_wrap.show-more .version-chap'). length) {
			var text_chap = $ ('. version-chap');
			var btn_chap = $ ('. chapter-readmore');
			var height_parent = text_chap.height ();
			var check_show_btn = function () {
				if (height_parent> = 550) {
					btn_chap.addClass ('less-chap');
					btn_chap.fadeIn (300);
					$ ('. listing-chapters_wrap'). addClass ('show');
					text_chap.addClass ('activo');
				} else {
					btn_chap.fadeOut (300);
					$ ('. listing-chapters_wrap'). removeClass ('show');
					text_chap.removeClass ('active')
				}
			}
			$ (". listing-chapters_wrap ul.main> li.has-child"). en ('clic', función (e) {
				var $ this = $ (this);
				setTimeout (function () {
					height_parent = $ this.parents ('. version-chap'). height ();
					check_show_btn ();
				}, 300);
			});
			check_show_btn ();
			btn_chap.click (función (e) {
				e.stopPropagation ();
				if (btn_chap.hasClass ('less-chap')) {
					btn_chap.removeClass ('less-chap');
					btn_chap.fadeOut (300);
					text_chap.addClass ('cargando');
					$ ('. listing-chapters_wrap'). removeClass ('show');
					setTimeout (function () {
						btn_chap.remove ();
						text_chap.animate ({'max-height': '100%'});
						text_chap.removeClass ('cargando');
						text_chap.addClass ('cargado');
					}, 1000);
				}
			});
		}

		// Género de colapso móvil
		$ (documento) .on ('clic', '.c-sub-header-nav .mobile-icon', function (e) {
			var $ this = $ (this);

			if ($ this.parent (). hasClass ('active')) {
				$ this.parent (). removeClass ('active');
			} else {
				$ this.parent (). addClass ('active');
			}
		});

		var pagination_btn = $ (". mobile-nav-btn");
		var select_pagination = $ (". select-pagination");

		pagination_btn.on ('clic', función (e) {

			e.preventDefault ();
			if (select_pagination.parent (). hasClass ('active')) {
				select_pagination.parent (). removeClass ('active');
			} else {
				select_pagination.parent (). addClass ('active');
			}

		});

		$ ('# btn_view_full_image'). en ('clic', función (e) {
			$ ('. container'). css ({'width': 'auto', 'max-width': 'initial'});

			$ (este) .hide ();

			e.preventDefault ();
			e.stopPropagation ();
		});
		
		$ ('# btn-read-first'). en ('click', function (e) {
			location.href = $ ('. listing-chapters_wrap .wp-manga-chapter: eq (0)> a'). attr ('href');
			falso retorno;
		});
		
		$ ('# btn-read-last'). en ('click', function (e) {
			var cuenta = $ ('. listing-chapters_wrap .wp-manga-chapter'). length - 1;
			location.href = $ ('. listing-chapters_wrap .wp-manga-chapter: eq (' + count + ')> a'). attr ('href');
			falso retorno;
		});
	});


	función shortString () {
		var shorts = document.querySelectorAll ('. short');
		si (pantalones cortos) {
			Array.prototype.forEach.call (shorts, function (ele) {
				var str = ele.innerText,
					indt = '...';

				if (ele.hasAttribute ('límite de datos')) {
					if (str.length> ele.dataset.limit) {
						var resultado = str.substring (0, ele.dataset.limit - indt.length) .trim () + indt;
						ele.innerText = resultado;
						str = nulo;
						resultado = nulo;
					}
				} else {
					lanzar Error ('No se puede encontrar el atributo \' límite de datos \ '');
				}
			});
		}
	}

	window.onload = function () {
		shortString ();
	};
}) (jQuery);
