
$(window).on("load", function() {
    $('.hover_bkgr_fricc').show();
});

// $(".trigger_popup_fricc").on('click', function(){
//     $('.hover_bkgr_fricc').show();
// });

$('.hover_bkgr_fricc').on('click', function(){
    $('.hover_bkgr_fricc').hide();
    dealRound();
});

$('.popupCloseButton').on('click', function(){
    $('.hover_bkgr_fricc').hide();
    dealRound();
});
