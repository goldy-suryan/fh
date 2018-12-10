$(document).ready(function() {
  "use strict";
  var t = $(".menu"),
    e = !1,
    n = $(".header"),
    a = new ScrollMagic.Controller();
  function r() {
    window.innerWidth,
      $(window).scrollTop() > 100
        ? n.addClass("scrolled")
        : n.removeClass("scrolled"),
      window.innerWidth > 991 && e && i();
  }
  function s() {
    t.addClass("active"), (e = !0);
  }
  function i() {
    t.removeClass("active"), (e = !1);
  }
  r(),
    $(window).on("resize", function() {
      r();
    }),
    $(document).on("scroll", function() {
      r();
    }),
    (function() {
      if ($(".hamburger").length) {
        var t = $(".hamburger"),
          n = $(".menu_close_container");
        t.on("click", function() {
          e ? i() : s();
        }),
          n.on("click", function() {
            e ? i() : s();
          });
      }
    })(),
    (function() {
      if ($(".stats_item").length) {
        var t = $(".stats_item");
        t.each(function() {
          var t = $(this).find(".stats_bar"),
            e = t.find(".stats_bar_perc"),
            n = t.find(".stats_bar_value"),
            a = t.attr("data-x"),
            r = t.attr("data-y"),
            s = t.attr("data-color"),
            i = Math.round(((r - a) / a) * 100);
          if (i > 0) {
            var o = i;
            i > 100 && (o = 100),
              e.css("left", "50%"),
              e.css("width", o / 2 + "%"),
              n.text("+" + i + "%"),
              n.css("left", "0"),
              n.css("text-align", "left");
          } else {
            var o = (i = Math.abs(i));
            i > 100 && (o = 100),
              e.css("right", "50%"),
              e.css("width", o / 2 + "%"),
              n.text("-" + i + "%"),
              n.css("right", "0"),
              n.css("text-align", "right");
          }
          e.css("background", s);
        });
      }
    })(),
    (function() {
      if ($(".milestone_counter").length) {
        var t = $(".milestone_counter");
        t.each(function(t) {
          var e = $(this),
            n = e.data("end-value"),
            r = e.text(),
            s = "",
            i = "";
          e.attr("data-sign-before") && (s = e.attr("data-sign-before")),
            e.attr("data-sign-after") && (i = e.attr("data-sign-after"));
          new ScrollMagic.Scene({
            triggerElement: this,
            triggerHook: "onEnter",
            reverse: !1
          })
            .on("start", function() {
              var e = { value: r };
              TweenMax.to(e, 4, {
                value: n,
                roundProps: "value",
                ease: Circ.easeOut,
                onUpdate: function() {
                  document.getElementsByClassName("milestone_counter")[
                    t
                  ].innerHTML = s + e.value + i;
                }
              });
            })
            .addTo(a);
        });
      }
    })();
});
