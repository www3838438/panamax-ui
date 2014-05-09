describe('$.fn.appendable', function() {
  var $trigger,
      $list,
      subject;

  beforeEach(function() {
    fixture.load('appendable.html');
    $list = $('#teaspoon-fixtures').find('ol');
    $trigger = $('.add-button');
    subject = new $.PMX.Appendable($list, {
      $trigger: $trigger
    });
    subject.init();
  });

  describe('on click of the trigger element', function() {
    it('prevents the default behavior', function() {
      var clickEvent = $.Event('click');
      $trigger.trigger(clickEvent);
      expect(clickEvent.isDefaultPrevented()).toBeTruthy();
    });

    it('appends the specified html fragment to the list', function() {
      expect($list.find('li').length).toEqual(2)
      $trigger.click();
      expect($list.find('li').length).toEqual(3)
      expect($list.find('li:last-child').text()).toMatch('a new thing')
    });
  });

  describe('on cancel', function() {
    it('prevents the default behavior', function() {
      var clickEvent = $.Event('click');
      $trigger.click();
      $('ol a.cancel').trigger(clickEvent);
      expect(clickEvent.isDefaultPrevented()).toBeTruthy();
    });

    it('removes itself from the list', function() {
      expect($list.find('li').length).toEqual(2)
      $trigger.click();
      $trigger.click();
      expect($list.find('li').length).toEqual(4)
      $('ol a.cancel').click(); // click ALL the cancel buttons
      expect($list.find('li').length).toEqual(2)
    });

    it('can still add after removing', function() {
      expect($list.find('li').length).toEqual(2)
      $trigger.click();
      expect($list.find('li').length).toEqual(3)
      $('ol a.cancel').click();
      expect($list.find('li').length).toEqual(2)
      $trigger.click();
      expect($list.find('li').length).toEqual(3)
    });
  });

});
