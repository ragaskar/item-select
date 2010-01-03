jQuery.fn.selectable = function() {
  var selectables = $(this);

  var newSelectables = selectables.not('.selectable');
  newSelectables.addClass('selectable');
  newSelectables.click(function() {
    var el = $(this);
    el.hasClass("selected") ? el.removeClass('selected') : el.addClass('selected');
  });
  
  this.selected = function() {
    return selectables.filter('.selected');
  };
  return this;
};  