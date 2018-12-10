$(document).ready(function() {
  "use strict";
  var t = $(".menu"),
    e = !1,
    n = $(".header");
  function i() {
    window.innerWidth,
      $(window).scrollTop() > 100
        ? n.addClass("scrolled")
        : n.removeClass("scrolled"),
      window.innerWidth > 991 && e && r();
  }
  function a() {
    t.addClass("active"), (e = !0);
  }
  function r() {
    t.removeClass("active"), (e = !1);
  }
  i(),
    $(window).on("resize", function() {
      i();
    }),
    $(document).on("scroll", function() {
      i();
    }),
    (function() {
      if ($(".hamburger").length && $(".menu").length) {
        var t = $(".hamburger"),
          n = $(".menu_close_container");
        t.on("click", function() {
          e ? r() : a();
        }),
          n.on("click", function() {
            e ? r() : a();
          });
      }
    })(),
    (function() {
      var t = $(".sort_btn"),
        e = ($(".filter_btn"), $(".offers_grid"));
      if (e.length) {
        var n = e.isotope({
          itemSelector: ".offers_item",
          getSortData: {
            price: function(t) {
              var e = $(t)
                .find(".offers_price")
                .text()
                .replace("$", "");
              return parseFloat(e);
            },
            name: ".offer_name",
            stars: function(t) {
              var e = $(t).find(".offers_rating"),
                n = e.attr("data-rating");
              return n;
            }
          },
          animationOptions: { duration: 750, easing: "linear", queue: !1 }
        });
        t.each(function() {
          $(this).on("click", function() {
            var t = $(this)
              .parent()
              .parent()
              .find(".sorting_text");
            t.text($(this).text());
            var e = $(this).attr("data-isotope-option");
            (e = JSON.parse(e)), n.isotope(e);
          });
        }),
          $(".filter_btn").on("click", function() {
            var t = $(this)
              .parent()
              .parent()
              .find(".sorting_text");
            t.text($(this).text());
            var e = $(this).attr("data-filter");
            n.isotope({ filter: e });
          });
      }
    })(),
    $(".search_tab").length &&
      $(".search_tab").on("click", function() {
        $(".search_tab").removeClass("active"), $(this).addClass("active");
        var t = $(".search_tab").index(this),
          e = $(".search_panel");
        e.removeClass("active"), $(e[t]).addClass("active");
      });
});
