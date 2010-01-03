jQuery.fn.selectable = function() {
  var selectables = $(this);
  selectables.selected = function() {
    return selectables.filter('.selected');
  };
  selectables.clear = function() {
    selectables.each(function() {
      var el = $(this);
      el.removeClass('selected')
    });
  };

  var newSelectables = selectables.not('.selectable');
  newSelectables.addClass('selectable');
  newSelectables.click(function(event) {
    var el = $(this);
    if (event.shiftKey && jQuery.fn.selectable.lastClicked) {
      var selectedIndex = jQuery.inArray(this, selectables);
      var lastSelectedIndex = jQuery.inArray(jQuery.fn.selectable.lastClicked, selectables);
      var fromIndex = lastSelectedIndex < selectedIndex ? lastSelectedIndex + 1 : lastSelectedIndex;
      var indexes = [lastSelectedIndex, selectedIndex];
      selectables.slice(Math.min.apply(null, indexes), Math.max.apply(null, indexes) + 1).each(function() {
        jQuery.fn.selectable.select($(this), true);
      });
    } else {
      var alreadySelected = el.hasClass('selected');
      var multipleSelected = selectables.selected().length > 1;
      selectables.clear();
      jQuery.fn.selectable.select(el, !alreadySelected || multipleSelected);
      jQuery.fn.selectable.lastClicked = this;
    }
  });

  return selectables;
};

jQuery.fn.selectable.select = function(el, select) {
  if (select) {
    el.addClass('selected');
    el.trigger(jQuery.fn.selectable.SELECTED);
  } else {
    el.removeClass('selected');
    el.trigger(jQuery.fn.selectable.UNSELECTED);
  }
  el.trigger(jQuery.fn.selectable.UPDATE);
};

jQuery.fn.selectable.lastClicked = null;

jQuery.fn.selectable.SELECTED = 'selectable-selected';
jQuery.fn.selectable.UNSELECTED = 'selectable-unselected';
jQuery.fn.selectable.UPDATE = 'selectable-update';