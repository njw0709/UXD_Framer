(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Current_Time, Current_x, Pillsavail, Pillscheduled, Pillsnotavail, Pillsxpos, Pillsypos, StickyHeaders, Timewindow, i, index, scroll;

StickyHeaders = require("sticky-headers/StickyHeaders").StickyHeaders;

scroll = new ScrollComponent({
  size: Screen.size,
  scrollHorizontal: false,
  speedY: 0.6
});

Calendar.parent = scroll.content;

Time_pacman.parent = scroll.content;

scroll.scrollToLayer(Time_pacman);

CurrentTimeline.states = {
  Now: {
    borderColor: "rgba(34,34,34,0.23)",
    opacity: 1.00,
    backgroundColor: "rgba(0,0,0,1)"
  },
  future: {
    borderWidth: 3,
    borderColor: "rgba(34,34,34,0.23)",
    opacity: 0.5
  }
};

CurrentTime.states = {
  Now: {
    opacity: 1.00,
    backgroundColor: "rgba(247,248,255,0)"
  },
  future: {
    opacity: 0.50
  }
};

Time_pacman.name = "StickyHeader";

StickyHeaders.enableFor(scroll);

Current_x = Time_pacman.x;

Current_Time = Time_pacman.y;

scroll.onMove(function() {
  if (Time_pacman.y > Current_Time) {
    CurrentTimeline.states.switchInstant("future");
    CurrentTime.states.switchInstant("future");
    return Uparrow.animate({
      opacity: 0.6,
      options: {
        time: 0.1
      }
    });
  } else {
    CurrentTimeline.states.switchInstant("Now");
    CurrentTime.states.switchInstant("Now");
    return Uparrow.animate({
      opacity: 0,
      options: {
        time: 0
      }
    });
  }
});

Pacman.draggable.enabled = true;

Pacman.draggable.speedX = 1;

Pacman.draggable.speedY = 1;

Pacman.draggable.overdrag = false;

Pacman.draggable.bounce = false;

Pacman.draggable.momentum = false;

Pillsavail = [Pill2, Pill3, Pill4];

Pillsnotavail = [Pill1, Pill5];

for (index = i = 0; i <= 1; index = ++i) {
  Pillsnotavail[index].states = {
    cannottake: {
      opacity: 0.75
    },
    "default": {
      opacity: 1
    }
  };
}

Pillsxpos = [];

Pillsypos = [];

Pacman.on(Events.DragStart, function() {
  var j, k, results;
  scroll.scrollVertical = false;
  for (index = j = 0; j <= 1; index = ++j) {
    Pillsnotavail[index].states.switchInstant("cannottake");
  }
  results = [];
  for (index = k = 0; k <= 2; index = ++k) {
    Pillsxpos.push(Pillsavail[index].x);
    Pillsypos.push(Pillsavail[index].y);
    results.push(Pillsavail[index].animate({
      x: 90,
      y: scroll.scrollY + 100 + index * 60,
      options: {
        time: 0.5
      }
    }));
  }
  return results;
});

Pacman.on(Events.DragEnd, function() {
  var j, k;
  for (index = j = 0; j <= 1; index = ++j) {
    Pillsnotavail[index].states.switchInstant("default");
  }
  for (index = k = 0; k <= 2; index = ++k) {
    Pillsavail[index].animate({
      x: Pillsxpos[index],
      y: Pillsypos[index],
      options: {
        curve: Spring({
          damping: 0.5
        }),
        time: 0.5
      }
    });
  }
  this.animate({
    x: 311,
    y: 21,
    options: {
      curve: Spring({
        damping: 0.5
      }),
      time: 0.5
    }
  });
  return scroll.scrollVertical = true;
});

Pillscheduled = [Pill2, Pill3, Pill4, Pill5];

Timewindow = [300, 400, 200, 100];

Timerail.states = {
  "default": {
    opacity: 0
  },
  appear: {
    opacity: 1
  }
};


},{"sticky-headers/StickyHeaders":2}],2:[function(require,module,exports){

/*
StickyHeaders for Framer
By @72mena
 */
exports.StickyHeaders = (function() {
  function StickyHeaders() {}

  StickyHeaders.enableFor = function(scrollComponent, topMargin) {
    var dataSH, header, j, len, stickyHeaders;
    dataSH = [];
    if (topMargin == null) {
      topMargin = 0;
    }
    stickyHeaders = scrollComponent.content.childrenWithName("StickyHeader");
    if (stickyHeaders.length > 0) {
      for (j = 0, len = stickyHeaders.length; j < len; j++) {
        header = stickyHeaders[j];
        dataSH.push(header.y);
      }
      return scrollComponent.content.on("change:y", function() {
        var currentY, i, k, len1, prevMaxY, prevStickyPosition, results;
        results = [];
        for (i = k = 0, len1 = stickyHeaders.length; k < len1; i = ++k) {
          header = stickyHeaders[i];
          header.y = dataSH[i];
          currentY = dataSH[i] - scrollComponent.scrollY;
          if (i > 0) {
            prevStickyPosition = dataSH[i] - stickyHeaders[i - 1].height;
            prevMaxY = stickyHeaders[i - 1].height + topMargin;
            if (currentY < prevMaxY) {
              stickyHeaders[i - 1].y = prevStickyPosition;
            }
          }
          if (currentY <= topMargin) {
            results.push(header.y = scrollComponent.scrollY + topMargin);
          } else {
            results.push(void 0);
          }
        }
        return results;
      });
    }
  };

  return StickyHeaders;

})();


},{}]},{},[1])

//# sourceMappingURL=app.js.map
