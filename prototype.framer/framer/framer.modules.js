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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1VzZXJzL2p3bmFtMDcwOS9EZXNrdG9wL1VYRF9GcmFtZXIvcHJvdG90eXBlLmZyYW1lci9tb2R1bGVzL3N0aWNreS1oZWFkZXJzL1N0aWNreUhlYWRlcnMuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvanduYW0wNzA5L0Rlc2t0b3AvVVhEX0ZyYW1lci9wcm90b3R5cGUuZnJhbWVyL21vZHVsZXMvbXlNb2R1bGUuY29mZmVlIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIjIyNcblN0aWNreUhlYWRlcnMgZm9yIEZyYW1lclxuQnkgQDcybWVuYVxuIyMjXG5jbGFzcyBleHBvcnRzLlN0aWNreUhlYWRlcnNcblxuXHRAZW5hYmxlRm9yOiAoc2Nyb2xsQ29tcG9uZW50LCB0b3BNYXJnaW4pIC0+XG5cblx0XHRkYXRhU0ggPSBbXVxuXHRcdHRvcE1hcmdpbiA/PSAwXG5cblx0XHQjIENoZWNrIGZvciBzdGlja3kgaGVhZGVycy5cblx0XHRzdGlja3lIZWFkZXJzID0gc2Nyb2xsQ29tcG9uZW50LmNvbnRlbnQuY2hpbGRyZW5XaXRoTmFtZShcIlN0aWNreUhlYWRlclwiKVxuXHRcdGlmIHN0aWNreUhlYWRlcnMubGVuZ3RoID4gMFxuXHRcdFx0Zm9yIGhlYWRlciBpbiBzdGlja3lIZWFkZXJzXG5cdFx0XHRcdGRhdGFTSC5wdXNoKGhlYWRlci55KVxuXG5cdFx0XHQjIFNjcm9sbCBsb2dpYy4gSSdtIHVzaW5nICdjaGFuZ2U6eScgaW5zdGVhZCBvZiAnb25Nb3ZlJyB0byBkZXRlY3QgYW5pbWF0aW9ucyBhbmQgbW91c2V3aGVlbC5cblx0XHRcdHNjcm9sbENvbXBvbmVudC5jb250ZW50Lm9uIFwiY2hhbmdlOnlcIiwgLT5cblx0XHRcdFx0Zm9yIGhlYWRlciwgaSBpbiBzdGlja3lIZWFkZXJzXG5cdFx0XHRcdFx0aGVhZGVyLnkgPSBkYXRhU0hbaV1cblx0XHRcdFx0XHRjdXJyZW50WSA9IGRhdGFTSFtpXSAtIHNjcm9sbENvbXBvbmVudC5zY3JvbGxZXG5cblx0XHRcdFx0XHRpZiBpID4gMFxuXHRcdFx0XHRcdFx0cHJldlN0aWNreVBvc2l0aW9uID0gZGF0YVNIW2ldIC0gc3RpY2t5SGVhZGVyc1tpLTFdLmhlaWdodFxuXHRcdFx0XHRcdFx0cHJldk1heFkgPSBzdGlja3lIZWFkZXJzW2ktMV0uaGVpZ2h0ICsgdG9wTWFyZ2luXG5cblx0XHRcdFx0XHRcdGlmIGN1cnJlbnRZIDwgcHJldk1heFlcblx0XHRcdFx0XHRcdFx0c3RpY2t5SGVhZGVyc1tpLTFdLnkgPSBwcmV2U3RpY2t5UG9zaXRpb25cblxuXHRcdFx0XHRcdGlmIGN1cnJlbnRZIDw9IHRvcE1hcmdpblxuXHRcdFx0XHRcdFx0aGVhZGVyLnkgPSBzY3JvbGxDb21wb25lbnQuc2Nyb2xsWSArIHRvcE1hcmdpbiIsIiMgQWRkIHRoZSBmb2xsb3dpbmcgbGluZSB0byB5b3VyIHByb2plY3QgaW4gRnJhbWVyIFN0dWRpby4gXG4jIG15TW9kdWxlID0gcmVxdWlyZSBcIm15TW9kdWxlXCJcbiMgUmVmZXJlbmNlIHRoZSBjb250ZW50cyBieSBuYW1lLCBsaWtlIG15TW9kdWxlLm15RnVuY3Rpb24oKSBvciBteU1vZHVsZS5teVZhclxuXG5leHBvcnRzLm15VmFyID0gXCJteVZhcmlhYmxlXCJcblxuZXhwb3J0cy5teUZ1bmN0aW9uID0gLT5cblx0cHJpbnQgXCJteUZ1bmN0aW9uIGlzIHJ1bm5pbmdcIlxuXG5leHBvcnRzLm15QXJyYXkgPSBbMSwgMiwgM10iLCIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUVBQTtBRElBLE9BQU8sQ0FBQyxLQUFSLEdBQWdCOztBQUVoQixPQUFPLENBQUMsVUFBUixHQUFxQixTQUFBO1NBQ3BCLEtBQUEsQ0FBTSx1QkFBTjtBQURvQjs7QUFHckIsT0FBTyxDQUFDLE9BQVIsR0FBa0IsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVA7Ozs7O0FEVGxCOzs7O0FBSU0sT0FBTyxDQUFDOzs7RUFFYixhQUFDLENBQUEsU0FBRCxHQUFZLFNBQUMsZUFBRCxFQUFrQixTQUFsQjtBQUVYLFFBQUE7SUFBQSxNQUFBLEdBQVM7O01BQ1QsWUFBYTs7SUFHYixhQUFBLEdBQWdCLGVBQWUsQ0FBQyxPQUFPLENBQUMsZ0JBQXhCLENBQXlDLGNBQXpDO0lBQ2hCLElBQUcsYUFBYSxDQUFDLE1BQWQsR0FBdUIsQ0FBMUI7QUFDQyxXQUFBLCtDQUFBOztRQUNDLE1BQU0sQ0FBQyxJQUFQLENBQVksTUFBTSxDQUFDLENBQW5CO0FBREQ7YUFJQSxlQUFlLENBQUMsT0FBTyxDQUFDLEVBQXhCLENBQTJCLFVBQTNCLEVBQXVDLFNBQUE7QUFDdEMsWUFBQTtBQUFBO2FBQUEseURBQUE7O1VBQ0MsTUFBTSxDQUFDLENBQVAsR0FBVyxNQUFPLENBQUEsQ0FBQTtVQUNsQixRQUFBLEdBQVcsTUFBTyxDQUFBLENBQUEsQ0FBUCxHQUFZLGVBQWUsQ0FBQztVQUV2QyxJQUFHLENBQUEsR0FBSSxDQUFQO1lBQ0Msa0JBQUEsR0FBcUIsTUFBTyxDQUFBLENBQUEsQ0FBUCxHQUFZLGFBQWMsQ0FBQSxDQUFBLEdBQUUsQ0FBRixDQUFJLENBQUM7WUFDcEQsUUFBQSxHQUFXLGFBQWMsQ0FBQSxDQUFBLEdBQUUsQ0FBRixDQUFJLENBQUMsTUFBbkIsR0FBNEI7WUFFdkMsSUFBRyxRQUFBLEdBQVcsUUFBZDtjQUNDLGFBQWMsQ0FBQSxDQUFBLEdBQUUsQ0FBRixDQUFJLENBQUMsQ0FBbkIsR0FBdUIsbUJBRHhCO2FBSkQ7O1VBT0EsSUFBRyxRQUFBLElBQVksU0FBZjt5QkFDQyxNQUFNLENBQUMsQ0FBUCxHQUFXLGVBQWUsQ0FBQyxPQUFoQixHQUEwQixXQUR0QztXQUFBLE1BQUE7aUNBQUE7O0FBWEQ7O01BRHNDLENBQXZDLEVBTEQ7O0VBUFcifQ==
