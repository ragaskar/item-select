jQuery.fn.selectable = function() {
  var selectables = $(this);

  var newSelectables = selectables.not('.selectable');
  newSelectables.addClass('selectable');
  newSelectables.click(function() {
    var el = $(this);
    if (el.hasClass("selected")) {
      el.removeClass('selected');
      el.trigger(jQuery.fn.selectable.UNSELECTED);
    } else {
      el.addClass('selected');
      el.trigger(jQuery.fn.selectable.SELECTED);
    }
  el.trigger(jQuery.fn.selectable.UPDATE);
  });
  
  this.selected = function() {
    return selectables.filter('.selected');
  };
  return this;
};

jQuery.fn.selectable.SELECTED = 'selectable-selected';
jQuery.fn.selectable.UNSELECTED = 'selectable-unselected';
jQuery.fn.selectable.UPDATE = 'selectable-update';