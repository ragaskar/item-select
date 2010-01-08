jQuery.fn.itemSelect = function() {
  var selectables = $(this);
  selectables.selected = function() {
    return selectables.filter('.selected');
  };
  selectables.clear = function() {
    selectables.removeClass('selected')
  };
  selectables.all = function() {
   selectables.addClass('selected');
  };

  selectables.disabled = false;
  selectables.disable = function() {
    selectables.disabled = true;
  };
  selectables.enable = function() {
    selectables.disabled = false;
  };

  var newSelectables = selectables.not('.selectable');
  newSelectables.addClass('selectable');
  newSelectables.mousedown(function() {
    return false;
  });
  newSelectables.click(function(event) {
    if (selectables.disabled) {
      return false;
    }
    var el = $(this);
    var alreadySelected = el.hasClass('selected');
    var selected = selectables.selected();
    if (event.shiftKey && selected.length) {
      var firstSelectedIndex = jQuery.inArray(selected[0], selectables);
      var selectedIndex = jQuery.inArray(this, selectables);
      var fromIndex = firstSelectedIndex < selectedIndex ? firstSelectedIndex + 1 : firstSelectedIndex;
      var indexes = [firstSelectedIndex, selectedIndex];
      selectables.slice(Math.min.apply(null, indexes), Math.max.apply(null, indexes) + 1).each(function() {
        jQuery.fn.itemSelect.select($(this), true);
      });
    } else if (event.metaKey) {
      jQuery.fn.itemSelect.select(el, !alreadySelected);
    } else {
      var multipleSelected = selectables.selected().length > 1;
      selectables.clear();
      jQuery.fn.itemSelect.select(el, !alreadySelected || multipleSelected);
    }
    return false;
  });

  return selectables;
};

jQuery.fn.itemSelect.select = function(el, select) {
  if (select) {
    el.addClass('selected');
    el.trigger(jQuery.fn.itemSelect.SELECTED);
  } else {
    el.removeClass('selected');
    el.trigger(jQuery.fn.itemSelect.UNSELECTED);
  }
  el.trigger(jQuery.fn.itemSelect.UPDATE);
};

jQuery.fn.itemSelect.SELECTED = 'selectable-selected';
jQuery.fn.itemSelect.UNSELECTED = 'selectable-unselected';
jQuery.fn.itemSelect.UPDATE = 'selectable-update';