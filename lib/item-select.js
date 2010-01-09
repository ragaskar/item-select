(function() {
  function ItemSelect(selectables) {
    this.selectables = selectables;
    this.disabled = false;
    this.makeSelectable(selectables.not('.selectable'));
  }

  ItemSelect.prototype.selected = function() {
    return this.selectables.filter('.selected');
  };

  ItemSelect.prototype.enable = function() {
    this.disabled = false;
  };

  ItemSelect.prototype.disable = function() {
    this.disabled = true;
  };


  ItemSelect.prototype.clear = function() {
    this.selectables.removeClass('selected');
  };

  ItemSelect.prototype.remove = function(el) {
    var self = this;
    $(el).each(function() {
      var elIndex = jQuery.inArray($(this)[0], self.selectables);
      self.selectables.splice(elIndex, 1)
    })
  };

  ItemSelect.prototype.all = function() {
    this.selectables.addClass('selected');
  };

  ItemSelect.prototype.select = function(el, select) {
    if (select) {
      el.addClass('selected');
      el.trigger(jQuery.fn.itemSelect.SELECTED);
    } else {
      el.removeClass('selected');
      el.trigger(jQuery.fn.itemSelect.UNSELECTED);
    }
    el.trigger(jQuery.fn.itemSelect.UPDATE);
  };


  ItemSelect.prototype.makeSelectable = function(selectables) {
    selectables.addClass('selectable');
    selectables.mousedown(function() {
      return false;
    });
    var self = this;
    var onClick = function(event) {
      self.onClick(this, event);
    };
    selectables.click(onClick);
  };

  ItemSelect.prototype.onClick = function(clickedEl, event) {
    if (this.disabled) {
      return false;
    }
    var clicked = $(clickedEl);
    var alreadySelected = clicked.hasClass('selected');
    var selected = this.selected();
    if (event.shiftKey && selected.length) {
      var firstSelectedIndex = jQuery.inArray(selected[0], this.selectables);
      var selectedIndex = jQuery.inArray(clickedEl, this.selectables);
      var fromIndex = firstSelectedIndex < selectedIndex ? firstSelectedIndex + 1 : firstSelectedIndex;
      var indexes = [firstSelectedIndex, selectedIndex];
      var self = this;
      this.selectables.slice(Math.min.apply(null, indexes), Math.max.apply(null, indexes) + 1).each(function() {
        self.select($(this), true);
      });
    } else if (event.metaKey) {
      this.select(clicked, !alreadySelected);
    } else {
      var multipleSelected = selected.length > 1;
      this.clear();
      this.select(clicked, !alreadySelected || multipleSelected);
    }
  };

  jQuery.fn.itemSelect = function() {
    return new ItemSelect(this);
  };

  jQuery.fn.itemSelect.SELECTED = 'selectable-selected';
  jQuery.fn.itemSelect.UNSELECTED = 'selectable-unselected';
  jQuery.fn.itemSelect.UPDATE = 'selectable-update';
})();