require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"myModule":[function(require,module,exports){
exports.myVar = "myVariable";

exports.myFunction = function() {
  return print("myFunction is running");
};

exports.myArray = [1, 2, 3];


},{}],"sticky-headers/StickyHeaders":[function(require,module,exports){

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


},{}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3Zpa3Rvcmlhd2FzdHJpbmcvRG9jdW1lbnRzL0dpdEh1Yi9mcmFtZXIvVVhEX0ZyYW1lci9wcm90b3R5cGUuZnJhbWVyL21vZHVsZXMvc3RpY2t5LWhlYWRlcnMvU3RpY2t5SGVhZGVycy5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy92aWt0b3JpYXdhc3RyaW5nL0RvY3VtZW50cy9HaXRIdWIvZnJhbWVyL1VYRF9GcmFtZXIvcHJvdG90eXBlLmZyYW1lci9tb2R1bGVzL215TW9kdWxlLmNvZmZlZSIsIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiIyMjXG5TdGlja3lIZWFkZXJzIGZvciBGcmFtZXJcbkJ5IEA3Mm1lbmFcbiMjI1xuY2xhc3MgZXhwb3J0cy5TdGlja3lIZWFkZXJzXG5cblx0QGVuYWJsZUZvcjogKHNjcm9sbENvbXBvbmVudCwgdG9wTWFyZ2luKSAtPlxuXG5cdFx0ZGF0YVNIID0gW11cblx0XHR0b3BNYXJnaW4gPz0gMFxuXG5cdFx0IyBDaGVjayBmb3Igc3RpY2t5IGhlYWRlcnMuXG5cdFx0c3RpY2t5SGVhZGVycyA9IHNjcm9sbENvbXBvbmVudC5jb250ZW50LmNoaWxkcmVuV2l0aE5hbWUoXCJTdGlja3lIZWFkZXJcIilcblx0XHRpZiBzdGlja3lIZWFkZXJzLmxlbmd0aCA+IDBcblx0XHRcdGZvciBoZWFkZXIgaW4gc3RpY2t5SGVhZGVyc1xuXHRcdFx0XHRkYXRhU0gucHVzaChoZWFkZXIueSlcblxuXHRcdFx0IyBTY3JvbGwgbG9naWMuIEknbSB1c2luZyAnY2hhbmdlOnknIGluc3RlYWQgb2YgJ29uTW92ZScgdG8gZGV0ZWN0IGFuaW1hdGlvbnMgYW5kIG1vdXNld2hlZWwuXG5cdFx0XHRzY3JvbGxDb21wb25lbnQuY29udGVudC5vbiBcImNoYW5nZTp5XCIsIC0+XG5cdFx0XHRcdGZvciBoZWFkZXIsIGkgaW4gc3RpY2t5SGVhZGVyc1xuXHRcdFx0XHRcdGhlYWRlci55ID0gZGF0YVNIW2ldXG5cdFx0XHRcdFx0Y3VycmVudFkgPSBkYXRhU0hbaV0gLSBzY3JvbGxDb21wb25lbnQuc2Nyb2xsWVxuXG5cdFx0XHRcdFx0aWYgaSA+IDBcblx0XHRcdFx0XHRcdHByZXZTdGlja3lQb3NpdGlvbiA9IGRhdGFTSFtpXSAtIHN0aWNreUhlYWRlcnNbaS0xXS5oZWlnaHRcblx0XHRcdFx0XHRcdHByZXZNYXhZID0gc3RpY2t5SGVhZGVyc1tpLTFdLmhlaWdodCArIHRvcE1hcmdpblxuXG5cdFx0XHRcdFx0XHRpZiBjdXJyZW50WSA8IHByZXZNYXhZXG5cdFx0XHRcdFx0XHRcdHN0aWNreUhlYWRlcnNbaS0xXS55ID0gcHJldlN0aWNreVBvc2l0aW9uXG5cblx0XHRcdFx0XHRpZiBjdXJyZW50WSA8PSB0b3BNYXJnaW5cblx0XHRcdFx0XHRcdGhlYWRlci55ID0gc2Nyb2xsQ29tcG9uZW50LnNjcm9sbFkgKyB0b3BNYXJnaW4iLCIjIEFkZCB0aGUgZm9sbG93aW5nIGxpbmUgdG8geW91ciBwcm9qZWN0IGluIEZyYW1lciBTdHVkaW8uIFxuIyBteU1vZHVsZSA9IHJlcXVpcmUgXCJteU1vZHVsZVwiXG4jIFJlZmVyZW5jZSB0aGUgY29udGVudHMgYnkgbmFtZSwgbGlrZSBteU1vZHVsZS5teUZ1bmN0aW9uKCkgb3IgbXlNb2R1bGUubXlWYXJcblxuZXhwb3J0cy5teVZhciA9IFwibXlWYXJpYWJsZVwiXG5cbmV4cG9ydHMubXlGdW5jdGlvbiA9IC0+XG5cdHByaW50IFwibXlGdW5jdGlvbiBpcyBydW5uaW5nXCJcblxuZXhwb3J0cy5teUFycmF5ID0gWzEsIDIsIDNdIiwiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFFQUE7QURJQSxPQUFPLENBQUMsS0FBUixHQUFnQjs7QUFFaEIsT0FBTyxDQUFDLFVBQVIsR0FBcUIsU0FBQTtTQUNwQixLQUFBLENBQU0sdUJBQU47QUFEb0I7O0FBR3JCLE9BQU8sQ0FBQyxPQUFSLEdBQWtCLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQOzs7OztBRFRsQjs7OztBQUlNLE9BQU8sQ0FBQzs7O0VBRWIsYUFBQyxDQUFBLFNBQUQsR0FBWSxTQUFDLGVBQUQsRUFBa0IsU0FBbEI7QUFFWCxRQUFBO0lBQUEsTUFBQSxHQUFTOztNQUNULFlBQWE7O0lBR2IsYUFBQSxHQUFnQixlQUFlLENBQUMsT0FBTyxDQUFDLGdCQUF4QixDQUF5QyxjQUF6QztJQUNoQixJQUFHLGFBQWEsQ0FBQyxNQUFkLEdBQXVCLENBQTFCO0FBQ0MsV0FBQSwrQ0FBQTs7UUFDQyxNQUFNLENBQUMsSUFBUCxDQUFZLE1BQU0sQ0FBQyxDQUFuQjtBQUREO2FBSUEsZUFBZSxDQUFDLE9BQU8sQ0FBQyxFQUF4QixDQUEyQixVQUEzQixFQUF1QyxTQUFBO0FBQ3RDLFlBQUE7QUFBQTthQUFBLHlEQUFBOztVQUNDLE1BQU0sQ0FBQyxDQUFQLEdBQVcsTUFBTyxDQUFBLENBQUE7VUFDbEIsUUFBQSxHQUFXLE1BQU8sQ0FBQSxDQUFBLENBQVAsR0FBWSxlQUFlLENBQUM7VUFFdkMsSUFBRyxDQUFBLEdBQUksQ0FBUDtZQUNDLGtCQUFBLEdBQXFCLE1BQU8sQ0FBQSxDQUFBLENBQVAsR0FBWSxhQUFjLENBQUEsQ0FBQSxHQUFFLENBQUYsQ0FBSSxDQUFDO1lBQ3BELFFBQUEsR0FBVyxhQUFjLENBQUEsQ0FBQSxHQUFFLENBQUYsQ0FBSSxDQUFDLE1BQW5CLEdBQTRCO1lBRXZDLElBQUcsUUFBQSxHQUFXLFFBQWQ7Y0FDQyxhQUFjLENBQUEsQ0FBQSxHQUFFLENBQUYsQ0FBSSxDQUFDLENBQW5CLEdBQXVCLG1CQUR4QjthQUpEOztVQU9BLElBQUcsUUFBQSxJQUFZLFNBQWY7eUJBQ0MsTUFBTSxDQUFDLENBQVAsR0FBVyxlQUFlLENBQUMsT0FBaEIsR0FBMEIsV0FEdEM7V0FBQSxNQUFBO2lDQUFBOztBQVhEOztNQURzQyxDQUF2QyxFQUxEOztFQVBXIn0=
