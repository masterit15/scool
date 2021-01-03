$(function(){
    $(document).pjax('.sidebar a, .logo-wrap a, .tab-link a, .footer-menu a', '.pjax_container', {fragment: '.pjax_container', timeout:1000, "scrollTo":false});
    $('.pjax_container').on('pjax:succes', function(){
        $.pjax({
            url: window.location.href,
            container: '.sidebar, .footer-menu a, .page-navigation .current',
            fragment: '.sidebar, .footer-menu a, .page-navigation .current'
        });
    });
    //$(".nano-content a").on('pjax:clicked',function(e) {e.preventDefault();$(".nano-content a").removeClass('active');$(this).addClass('active');});
    $('#loading').hide();
});
//pjax.connect({ 'container': 'pageContent', 'beforeSend': function(){ $('#loading').show(); }, 'complete': function(){ $('#loading').hide();} });
	