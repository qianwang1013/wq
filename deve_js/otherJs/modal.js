$('#signInModal').on('shown.bs.modal', function () {
  $('#myInput').focus()
});

$('#create').on('shown.bs.modal', function () {
  $('#myInput').focus()
});

$(window).scroll(function(){
	if ($(this).scrollTop() > 1){  
    	$('.nav').addClass("sticky");
	    $('.nav').addClass("hvr-sink");
	    $('.nav').removeClass("hvr-float");	    
	  }
	  else{
	    $('.nav').removeClass("sticky");
	    $('.nav').removeClass("hvr-sink");
	    $('.nav').addClass("hvr-float");
	  };
});

$('#1').addClass("red");