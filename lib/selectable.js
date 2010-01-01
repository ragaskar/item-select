jQuery.fn.selectable = function() {
  $(this).click(function() {
    var el = $(this);
      el.hasClass("selected") ? el.removeClass('selected') : el.addClass('selected');
    });
  var self = this;
  this.selected = function() {
    var selected = [];
    $(self).each(function() { if ($(this).hasClass('selected')) {
      selected.push(this);
    }});
    return $(selected);
  };
  return this;
};  