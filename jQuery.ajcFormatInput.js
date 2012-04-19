(function($) {
  $.fn.ajcFormatInput = function(options) {

    var opts = $.extend({}, $.fn.ajcFormatInput.defaults, options);

    return this.each(function(){
	var $this = $(this);
	if(opts.formatType == 'price'){
	  $this.focus(function(){removeFormat($this)});
	  $this.blur(function(){addFormat($this)});
	}else{
	  return "";
	}
	
        $(this).keydown(function(e){var key = e.charCode || e.keyCode || 0;// allow backspace, tab, delete, arrows, numbers and keypad numbers ONLY
            return (key == 8 || key == 9 || key == 46 || key == 190 || (key >= 37 && key <= 40) || (key >= 48 && key <= 57) || (key >= 96 && key <= 105));
	  });
      });
    
    function clearFormatPrice(str) {
      str = str.replace(/,/gi,'');
      str = str.replace(/\$/gi, '');
      str = str.replace(/ /gi,'');
      return str;
    }
    function removeFormat(div){
      var newdiv = clearFormatPrice(div.val());
      div.val(newdiv);
    }
    function addFormat(div){
      var newdiv = '$ ' + formatPrice(div.val());
      if(div.val() === ""){div.val("");}else{div.val(newdiv);}
    }
    function formatPrice(number){
      var num = parseFloat(number) || 0;
      var pw;
      var dp = parseInt(2,10);
      dp = isNaN(dp) ? 2 : dp;
      var ts = ts || ',';
      return num != number ? 
      "0.00" :
      ( ( 0.9 ).toFixed( 0 ) == '1' ? 
	num.toFixed( dp ) : 
	( Math.round( num * ( pw = Math.pow( 10, dp ) || 1 ) ) / pw ).toFixed( dp ) 
	).replace( /^(-?\d{1,3})((\d{3})*)(\.\d+)?$/, function( all, first, subsequence, dmp, dec ) { 
	    return ( first || '' ) + subsequence.replace( /(\d{3})/g, ts + '$1' ) + ( dec || '' ); 
	  });
    }
    
  };

  $.fn.ajcFormatInput.defaults = {formatType: 'price'};
  
 })(jQuery);
