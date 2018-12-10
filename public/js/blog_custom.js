$(document).ready(function() {
  "use strict";
  var o = $(".menu"),
    n = !1,
    e = $(".header");
  function c() {
    window.innerWidth,
      $(window).scrollTop() > 100
        ? e.addClass("scrolled")
        : e.removeClass("scrolled"),
      window.innerWidth > 991 && n && r();
  }
  function i() {
    o.addClass("active"), (n = !0);
  }
  function r() {
    o.removeClass("active"), (n = !1);
  }
  c(),
    $(window).on("resize", function() {
      c();
    }),
    $(document).on("scroll", function() {
      c();
    }),
    (function() {
      if ($(".hamburger").length) {
        var o = $(".hamburger"),
          e = $(".menu_close_container");
        o.on("click", function() {
          n ? r() : i();
        }),
          e.on("click", function() {
            n ? r() : i();
          });
      }
    })(),
    $(".gallery_item").length &&
      $(".colorbox").colorbox({ rel: "colorbox", photo: !0 });
});
