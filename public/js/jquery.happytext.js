/** 
  * 
  * 
  * 
  * 
  * 
  * 
  */
!function($){
  var ExpandingTextarea = function(textarea, options) {
    this.textarea = textarea
    this.$textarea = $(textarea)
    var declared = {}
    if(this.$textarea.attr('rows')) {
      var rows = this.$textarea.attr('rows').split(' ')
      switch(rows.length) {
        case 1:
          return;
        case 2:
          if(parseInt(rows[0]) > 0) {
            declared.minRows = parseInt(rows[0])
          }
          if(parseInt(rows[1])) {
            declared.maxRows = parseInt(rows[1])
          }
          break;
      }
    }
    if(this.$textarea.attr('maxlength')) {
      declared.maxLength = parseInt(this.$textarea.attr('maxlength'))
      if(declared.maxLength < 1) declared.maxLength = 1
    }
    this.settings = $.extend({}, $.fn.expandingTextarea.defaults, declared, options)
    this.shadow = $('<div></div>')
      .css({
        position: 'absolute'
      , top: -10000
      , left: -10000
      , width: $textarea.width()
      , fontSize: $textarea.css('fontSize')
      , fontFamily: $textarea.css('fontFamily')
      , fontWeight: $textarea.css('fontWeight')
      , lineHeight: $textarea.css('lineHeight')
      , resize: 'none'
      , 'word-wrap': 'break-word'
      })
    this.listen()
  }

  ExpandingTextarea.prototype = {
    constructor: ExpandingTextarea

  , update: function(event) {
      var times = function(string, number) {
        for (var i=0, r=''; i<number; i++) r += string
        return r
      }

      var val = this.textarea.value
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/&/g, '&amp;')
        .replace(/\n$/, '<br>&nbsp;')
        .replace(/\n/g, '<br>')
        .replace(/ {2,}/g, function(space){ return times('&nbsp;', space.length - 1) + ' ' })

      // check for enter
      if (event && event.data && event.data.event === 'keydown' && event.keyCode === 13) {
        val += '<br>'
      }

      this.shadow.css('width', $textarea.width())
      this.shadow.html(val + '...'); // Append '...' to resize pre-emptively.
      $textarea.height(Math.max(this.shadow.height(), 40));
    }

  , listen: function() {
      this.$textarea.on({
        'change': this.update
      , 'keyup': this.update
      , 'keydown': this.update
      })
      $(window).resize(this.update)
    }
  }

  $.fn.expandingTextarea = function(options) {
    return this.each(function() {
      var $this = $(this)
      if($this.data('expander')) return


      console.log('jquery plugin called')
      console.log($this.expandingTextarea())
    })
  }

  $.fn.expandingTextarea.defaults = {
    minRows: 2
  , maxRows: 1200
  , autogrow: true
  , maxLength: 80000
  , beforeKeydown: null
  , afterKeydown: null
  , beforeResize: null
  , afterResize: null
  }

  $.fn.happytext = function(options) {
    return $('textarea', this).each(function(){
      var textarea = this
      var $textarea = $(textarea)
    })
  }


}(window.jQuery)