$.fn.pickAndHide = function(){
	return this.each(function(){
		$(this).addClass('pick-and-hide');
		var counter = 0;
		$(this).children().each(function(){
			$(this).attr('data-pick-and-hide', counter++);
		});
		var key = null;
		$(this).change(function(){
			var newKey = $(this).val();
			// add the option back
			if(key != null){
				var opt = $(this).children('option[value="'+key+'"]');
				if( opt != null ){
					var position = parseInt(opt.attr('data-pick-and-hide'));
					$('.pick-and-hide').not(this).each(function(){
						var newOption = $("<option></option>").val(opt.val())
							.attr('data-pick-and-hide', position)
							.text(opt.text());
						var lastElement = null;
						var firstElement = null;
						var ltDiff = position + 1;
						var gtDiff = 0;
						$(this).children('option').each(function(){
							var optPos = parseInt($(this).attr('data-pick-and-hide'));
							if(optPos < position && position - optPos < ltDiff){
								ltDiff = position - optPos;
								lastElement = $(this);
							} else if (optPos > position && optPos - position < gtDiff){
								gtDiff = optPos - position;
								firstElement = $(this);
							}
						});
						if(lastElement != null){
							lastElement.after(newOption);
						} else if(firstElement != null){
							firstElement.before(newOption);
						}
					});
				}
			}
			if(newKey == ''){
				key = null;
			} else {
				key = newKey;
				$('.pick-and-hide').not(this).children('option[value="'+key+'"]').remove();
			}
		});
	});
};