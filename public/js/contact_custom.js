$(document).ready(function() {
  "use strict";
  var n = $(".menu"),
    o = !1,
    e = $(".header");
  function i() {
    window.innerWidth,
      $(window).scrollTop() > 100
        ? e.addClass("scrolled")
        : e.removeClass("scrolled"),
      window.innerWidth > 991 && o && r();
  }
  function c() {
    n.addClass("active"), (o = !0);
  }
  function r() {
    n.removeClass("active"), (o = !1);
  }
  i(),
    $(window).on("resize", function() {
      i();
    }),
    $(document).on("scroll", function() {
      i();
    }),
    (function() {
      if ($(".hamburger").length) {
        var n = $(".hamburger"),
          e = $(".menu_close_container");
        n.on("click", function() {
          o ? r() : c();
        }),
          e.on("click", function() {
            o ? r() : c();
          });
      }
    })();
});
