describe('Selectable', function() {
  var fixture;
  beforeEach(function() {
    $('#jasmine_content').html('');
    fixture = $('<ul id="container">' +
                '<li id="select1" class="select">select1</li>' +
                '<li id="select2" class="select">select2</li>' +
                '</ul>');
    $('#jasmine_content').html(fixture);
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
    expect(selected[0]).toEqual($('#select1')[0]);
    expect(selected[1]).toEqual($('#select2')[0]);

    $('#select1').click();
    selected = $('.select').selectable().selected();
    expect(selected.length).toEqual(1);
    expect(selected[0]).toEqual($('#select2')[0]);


  });

});