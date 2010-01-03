describe('Selectable', function() {
  var fixture, select1, select2;
  beforeEach(function() {
    $('#jasmine_content').html('');
    fixture = $('<ul id="container">' +
                '<li id="select1" class="select">select1</li>' +
                '<li id="select2" class="select">select2</li>' +
                '</ul>');
    $('#jasmine_content').html(fixture);
    select1 = $('#select1')[0];
    select2 = $('#select2')[0];
  });

  it('should add a class to selected items', function() {
    $('.select').selectable();
    expect($('#select1').hasClass('selected')).toBe(false);
    expect($('#select2').hasClass('selected')).toBe(false);
    $('#select1').click();
    expect($('#select1').hasClass('selected')).toBe(true);
    expect($('#select2').hasClass('selected')).toBe(false);
  });

  it('should remove a class on selected items', function() {
    $('.select').selectable();
    expect($('#select1').hasClass('selected')).toBe(false);
    $('#select1').click();
    expect($('#select1').hasClass('selected')).toBe(true);
    $('#select1').click();
    expect($('#select1').hasClass('selected')).toBe(false);
  });

  it('should track elements that have been selected', function() {
    $('.select').selectable();
    $('#select1').click();
    var selected = $('.select').selectable().selected();
    expect(selected.length).toEqual(1);
    expect(selected[0]).toEqual($('#select1')[0]);

    $('#select2').click();
    selected = $('.select').selectable().selected();
    expect(selected.length).toEqual(2);
    expect(selected[0]).toEqual(select1);
    expect(selected[1]).toEqual(select2);

    $('#select1').click();
    selected = $('.select').selectable().selected();
    expect(selected.length).toEqual(1);
    expect(selected[0]).toEqual(select2);
  });

  it("should fire an event on selection", function() {
    $('.select').selectable();
    var selectedSpy = jasmine.createSpy('selectedSpy');
    $('.select').bind(jQuery.fn.selectable.SELECTED, selectedSpy);
    $('#select1').click();
    expect(selectedSpy).wasCalled();
    expect(selectedSpy.mostRecentCall.args[0].target).toEqual(select1);
  });

  it("should fire an event on de-selection", function() {
    $('.select').selectable();
    var selectedSpy = jasmine.createSpy('selectedSpy');
    $('.select').bind(jQuery.fn.selectable.UNSELECTED, selectedSpy);
    $('#select1').click();
    expect(selectedSpy).wasNotCalled();
    $('#select1').click();
    expect(selectedSpy).wasCalled();
    expect(selectedSpy.mostRecentCall.args[0].target).toEqual(select1);
  });

  it("should fire an event on selection OR de-selection", function() {
    $('.select').selectable();
    var selectedSpy = jasmine.createSpy('selectedSpy');
    $('.select').bind(jQuery.fn.selectable.UPDATE, selectedSpy);
    $('#select1').click();
    expect(selectedSpy).wasCalled();
    expect(selectedSpy.mostRecentCall.args[0].target).toEqual(select1);
    $('#select1').click();
    expect(selectedSpy).wasCalled();
    expect(selectedSpy.mostRecentCall.args[0].target).toEqual(select1);
  });

});