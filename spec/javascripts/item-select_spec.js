describe('ItemSelect', function() {
  var selectables, fixture, select1, select2, select3, select4;
  beforeEach(function() {
    $('#jasmine_content').html('');
    fixture = $('<ul id="container">' +
                '<li id="select1" class="select">select1</li>' +
                '<li id="select2" class="select">select2</li>' +
                '<li id="select3" class="select">select3</li>' +
                '<li id="select4" class="select">select4</li>' +
                '</ul>');
    $('#jasmine_content').html(fixture);
    select1 = $('#select1')[0];
    select2 = $('#select2')[0];
    select3 = $('#select3')[0];
    select4 = $('#select4')[0];
  });
  describe("after application", function() {

    beforeEach(function() {
      selectables = $('.select').itemSelect();
    });

    it('should add a class to selected items', function() {
      expect($('#select1').hasClass('selected')).toBe(false);
      expect($('#select2').hasClass('selected')).toBe(false);
      $('#select1').click();
      expect($('#select1').hasClass('selected')).toBe(true);
      expect($('#select2').hasClass('selected')).toBe(false);
    });

    it('should remove a class on other items', function() {
      expect($('#select1').hasClass('selected')).toBe(false);
      $('#select1').click();
      expect($('#select1').hasClass('selected')).toBe(true);
      $('#select2').click();
      expect($('#select1').hasClass('selected')).toBe(false);
    });


    it('should deselect', function() {
      expect($('#select1').hasClass('selected')).toBe(false);
      $('#select1').click();
      expect($('#select1').hasClass('selected')).toBe(true);
      $('#select1').click();
      expect($('#select1').hasClass('selected')).toBe(false);
    });

    it('should track elements that have been selected', function() {
      $('#select1').click();
      var selected = selectables.selected();
      expect(selected.length).toEqual(1);
      expect(selected[0]).toEqual($('#select1')[0]);

      $('#select2').click();
      selected = $('.select').itemSelect().selected();
      expect(selected.length).toEqual(1);
      expect(selected[0]).toEqual(select2);

      $('#select1').click();
      selected = $('.select').itemSelect().selected();
      expect(selected.length).toEqual(1);
      expect(selected[0]).toEqual(select1);
    });

    it("should fire an event on selection", function() {
      $('.select').itemSelect();
      var selectedSpy = jasmine.createSpy('selectedSpy');
      $('.select').bind(jQuery.fn.itemSelect.SELECTED, selectedSpy);
      $('#select1').click();
      expect(selectedSpy).wasCalled();
      expect(selectedSpy.mostRecentCall.args[0].target).toEqual(select1);
    });

    it("should fire an event on de-selection", function() {
      $('.select').itemSelect();
      var selectedSpy = jasmine.createSpy('selectedSpy');
      $('.select').bind(jQuery.fn.itemSelect.UNSELECTED, selectedSpy);
      $('#select1').click();
      expect(selectedSpy).wasNotCalled();
      $('#select1').click();
      expect(selectedSpy).wasCalled();
      expect(selectedSpy.mostRecentCall.args[0].target).toEqual(select1);
    });

    it("should fire an event on selection OR de-selection", function() {
      $('.select').itemSelect();
      var selectedSpy = jasmine.createSpy('selectedSpy');
      $('.select').bind(jQuery.fn.itemSelect.UPDATE, selectedSpy);
      $('#select1').click();
      expect(selectedSpy).wasCalled();
      expect(selectedSpy.mostRecentCall.args[0].target).toEqual(select1);
      $('#select1').click();
      expect(selectedSpy).wasCalled();
      expect(selectedSpy.mostRecentCall.args[0].target).toEqual(select1);
    });

    it("should select multiple selectables when shift clicking", function() {
      $('.select').itemSelect();

      $('#select1').click();
      var selected = $('.select').itemSelect().selected();
      expect(selected.length).toEqual(1);

      $('#select3').trigger({type:'click', shiftKey:true});
      selected = $('.select').itemSelect().selected();
      expect(selected.length).toEqual(3);
      expect(selected[0]).toEqual(select1);
      expect(selected[1]).toEqual(select2);
      expect(selected[2]).toEqual(select3);
    });

    it("should select entire range when shift-clicking", function() {
      $('.select').itemSelect();

      $('#select3').click();
      var selected = $('.select').itemSelect().selected();
      expect(selected.length).toEqual(1);

      $('#select1').trigger({type:'click', shiftKey:true});
      selected = $('.select').itemSelect().selected();
      expect(selected.length).toEqual(3);

      $('#select2').trigger({type:'click', metaKey:true});
      selected = $('.select').itemSelect().selected();
      expect(selected.length).toEqual(2);

      $('#select4').trigger({type:'click', shiftKey:true});
      selected = $('.select').itemSelect().selected();
      expect(selected.length).toEqual(4);
    });

    it("should select entire range when shift-and-ctrl-clicking", function() {
      $('.select').itemSelect();

      $('#select3').click();
      var selected = $('.select').itemSelect().selected();
      expect(selected.length).toEqual(1);

      $('#select1').trigger({type:'click', metaKey:true});
      selected = $('.select').itemSelect().selected();
      expect(selected.length).toEqual(2);

      $('#select4').trigger({type:'click', shiftKey:true});
      selected = $('.select').itemSelect().selected();
      expect(selected.length).toEqual(4);
    });

    it("should select multiple selectables when meta(ctrl) clicking", function() {
      $('.select').itemSelect();

      $('#select1').click();
      var selected = $('.select').itemSelect().selected();
      expect(selected.length).toEqual(1);

      $('#select3').trigger({type:'click', metaKey:true});
      selected = selectables.selected();
      expect(selected.length).toEqual(2);
      expect(selected[0]).toEqual(select1);
      expect(selected[1]).toEqual(select3);

      $('#select1').trigger({type:'click', metaKey:true});
      selected = $('.select').itemSelect().selected();
      expect(selected.length).toEqual(1);
      expect(selected[0]).toEqual(select3);
    });

    it("should handle single selectables after multiple", function() {
      $('.select').itemSelect();
      var selectedSpy = jasmine.createSpy('selectedSpy');
      $('.select').bind(jQuery.fn.itemSelect.UPDATE, selectedSpy);
      $('#select1').click();
      var selected = selectables.selected();
      expect(selected.length).toEqual(1);
      $('#select3').trigger({type:'click', shiftKey:true});
      selected = $('.select').itemSelect().selected();
      expect(selected.length).toEqual(3);
      $('#select1').click();
      selected = $('.select').itemSelect().selected();
      expect(selected.length).toEqual(1);
    });

    it("should be possible to clear all selectables", function() {
      $('#select1').click();
      expect(selectables.selected().length).toEqual(1);
      selectables.clear();
      expect(selectables.selected().length).toEqual(0);
      $('#select1').click();
      expect(selectables.selected().length).toEqual(1);
      $('#select3').trigger({type:'click', shiftKey:true});
      expect(selectables.selected().length).toEqual(3);
      selectables.clear();
      expect(selectables.selected().length).toEqual(0);
    });

    it("should be possible to disable selectables", function() {
      selectables.disable();
      $('#select1').click();
      expect(selectables.selected().length).toEqual(0);
      expect($('#select1').hasClass('selected')).toBe(false);
    });

    it("should be possible to re-enable selectables", function() {
      selectables.disable();
      $('#select1').click();
      expect(selectables.selected().length).toEqual(0);
      expect($('#select1').hasClass('selected')).toBe(false);

      selectables.enable();
      $('#select1').click();
      expect(selectables.selected().length).toEqual(1);
      expect($('#select1').hasClass('selected')).toBe(true);

    });


  });

  it('should prevent mousedown events from bubbling, so text is not marked as selected', function() {
    var mouseDownSpy = jasmine.createSpy('mouseDownSpy');
    $('#container').mousedown(mouseDownSpy);
    $('#select1').mousedown();
    expect(mouseDownSpy).wasCalled();
    mouseDownSpy.reset();
    $('.select').itemSelect();
    $('#select1').mousedown();
    expect(mouseDownSpy).wasNotCalled();
  });


});