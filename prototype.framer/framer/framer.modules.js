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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3Zpa3Rvcmlhd2FzdHJpbmcvRG9jdW1lbnRzL0dpdEh1Yi9VWERfRnJhbWVyL3Byb3RvdHlwZS5mcmFtZXIvbW9kdWxlcy9zdGlja3ktaGVhZGVycy9TdGlja3lIZWFkZXJzLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3Zpa3Rvcmlhd2FzdHJpbmcvRG9jdW1lbnRzL0dpdEh1Yi9VWERfRnJhbWVyL3Byb3RvdHlwZS5mcmFtZXIvbW9kdWxlcy9teU1vZHVsZS5jb2ZmZWUiLCJub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiMjI1xuU3RpY2t5SGVhZGVycyBmb3IgRnJhbWVyXG5CeSBANzJtZW5hXG4jIyNcbmNsYXNzIGV4cG9ydHMuU3RpY2t5SGVhZGVyc1xuXG5cdEBlbmFibGVGb3I6IChzY3JvbGxDb21wb25lbnQsIHRvcE1hcmdpbikgLT5cblxuXHRcdGRhdGFTSCA9IFtdXG5cdFx0dG9wTWFyZ2luID89IDBcblxuXHRcdCMgQ2hlY2sgZm9yIHN0aWNreSBoZWFkZXJzLlxuXHRcdHN0aWNreUhlYWRlcnMgPSBzY3JvbGxDb21wb25lbnQuY29udGVudC5jaGlsZHJlbldpdGhOYW1lKFwiU3RpY2t5SGVhZGVyXCIpXG5cdFx0aWYgc3RpY2t5SGVhZGVycy5sZW5ndGggPiAwXG5cdFx0XHRmb3IgaGVhZGVyIGluIHN0aWNreUhlYWRlcnNcblx0XHRcdFx0ZGF0YVNILnB1c2goaGVhZGVyLnkpXG5cblx0XHRcdCMgU2Nyb2xsIGxvZ2ljLiBJJ20gdXNpbmcgJ2NoYW5nZTp5JyBpbnN0ZWFkIG9mICdvbk1vdmUnIHRvIGRldGVjdCBhbmltYXRpb25zIGFuZCBtb3VzZXdoZWVsLlxuXHRcdFx0c2Nyb2xsQ29tcG9uZW50LmNvbnRlbnQub24gXCJjaGFuZ2U6eVwiLCAtPlxuXHRcdFx0XHRmb3IgaGVhZGVyLCBpIGluIHN0aWNreUhlYWRlcnNcblx0XHRcdFx0XHRoZWFkZXIueSA9IGRhdGFTSFtpXVxuXHRcdFx0XHRcdGN1cnJlbnRZID0gZGF0YVNIW2ldIC0gc2Nyb2xsQ29tcG9uZW50LnNjcm9sbFlcblxuXHRcdFx0XHRcdGlmIGkgPiAwXG5cdFx0XHRcdFx0XHRwcmV2U3RpY2t5UG9zaXRpb24gPSBkYXRhU0hbaV0gLSBzdGlja3lIZWFkZXJzW2ktMV0uaGVpZ2h0XG5cdFx0XHRcdFx0XHRwcmV2TWF4WSA9IHN0aWNreUhlYWRlcnNbaS0xXS5oZWlnaHQgKyB0b3BNYXJnaW5cblxuXHRcdFx0XHRcdFx0aWYgY3VycmVudFkgPCBwcmV2TWF4WVxuXHRcdFx0XHRcdFx0XHRzdGlja3lIZWFkZXJzW2ktMV0ueSA9IHByZXZTdGlja3lQb3NpdGlvblxuXG5cdFx0XHRcdFx0aWYgY3VycmVudFkgPD0gdG9wTWFyZ2luXG5cdFx0XHRcdFx0XHRoZWFkZXIueSA9IHNjcm9sbENvbXBvbmVudC5zY3JvbGxZICsgdG9wTWFyZ2luIiwiIyBBZGQgdGhlIGZvbGxvd2luZyBsaW5lIHRvIHlvdXIgcHJvamVjdCBpbiBGcmFtZXIgU3R1ZGlvLiBcbiMgbXlNb2R1bGUgPSByZXF1aXJlIFwibXlNb2R1bGVcIlxuIyBSZWZlcmVuY2UgdGhlIGNvbnRlbnRzIGJ5IG5hbWUsIGxpa2UgbXlNb2R1bGUubXlGdW5jdGlvbigpIG9yIG15TW9kdWxlLm15VmFyXG5cbmV4cG9ydHMubXlWYXIgPSBcIm15VmFyaWFibGVcIlxuXG5leHBvcnRzLm15RnVuY3Rpb24gPSAtPlxuXHRwcmludCBcIm15RnVuY3Rpb24gaXMgcnVubmluZ1wiXG5cbmV4cG9ydHMubXlBcnJheSA9IFsxLCAyLCAzXSIsIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBRUFBO0FESUEsT0FBTyxDQUFDLEtBQVIsR0FBZ0I7O0FBRWhCLE9BQU8sQ0FBQyxVQUFSLEdBQXFCLFNBQUE7U0FDcEIsS0FBQSxDQUFNLHVCQUFOO0FBRG9COztBQUdyQixPQUFPLENBQUMsT0FBUixHQUFrQixDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUDs7Ozs7QURUbEI7Ozs7QUFJTSxPQUFPLENBQUM7OztFQUViLGFBQUMsQ0FBQSxTQUFELEdBQVksU0FBQyxlQUFELEVBQWtCLFNBQWxCO0FBRVgsUUFBQTtJQUFBLE1BQUEsR0FBUzs7TUFDVCxZQUFhOztJQUdiLGFBQUEsR0FBZ0IsZUFBZSxDQUFDLE9BQU8sQ0FBQyxnQkFBeEIsQ0FBeUMsY0FBekM7SUFDaEIsSUFBRyxhQUFhLENBQUMsTUFBZCxHQUF1QixDQUExQjtBQUNDLFdBQUEsK0NBQUE7O1FBQ0MsTUFBTSxDQUFDLElBQVAsQ0FBWSxNQUFNLENBQUMsQ0FBbkI7QUFERDthQUlBLGVBQWUsQ0FBQyxPQUFPLENBQUMsRUFBeEIsQ0FBMkIsVUFBM0IsRUFBdUMsU0FBQTtBQUN0QyxZQUFBO0FBQUE7YUFBQSx5REFBQTs7VUFDQyxNQUFNLENBQUMsQ0FBUCxHQUFXLE1BQU8sQ0FBQSxDQUFBO1VBQ2xCLFFBQUEsR0FBVyxNQUFPLENBQUEsQ0FBQSxDQUFQLEdBQVksZUFBZSxDQUFDO1VBRXZDLElBQUcsQ0FBQSxHQUFJLENBQVA7WUFDQyxrQkFBQSxHQUFxQixNQUFPLENBQUEsQ0FBQSxDQUFQLEdBQVksYUFBYyxDQUFBLENBQUEsR0FBRSxDQUFGLENBQUksQ0FBQztZQUNwRCxRQUFBLEdBQVcsYUFBYyxDQUFBLENBQUEsR0FBRSxDQUFGLENBQUksQ0FBQyxNQUFuQixHQUE0QjtZQUV2QyxJQUFHLFFBQUEsR0FBVyxRQUFkO2NBQ0MsYUFBYyxDQUFBLENBQUEsR0FBRSxDQUFGLENBQUksQ0FBQyxDQUFuQixHQUF1QixtQkFEeEI7YUFKRDs7VUFPQSxJQUFHLFFBQUEsSUFBWSxTQUFmO3lCQUNDLE1BQU0sQ0FBQyxDQUFQLEdBQVcsZUFBZSxDQUFDLE9BQWhCLEdBQTBCLFdBRHRDO1dBQUEsTUFBQTtpQ0FBQTs7QUFYRDs7TUFEc0MsQ0FBdkMsRUFMRDs7RUFQVyJ9
