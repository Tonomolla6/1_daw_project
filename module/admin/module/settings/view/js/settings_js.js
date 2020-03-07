$(document).ready(function() {
    $('#lang').val(localStorage.getItem('lang'));
    $('#lang').change(function() {
        if ($(this).val() == 'es') {
            change_lang('es');
            localStorage.setItem('lang','es');
        } else if ($(this).val() == 'en') {
            change_lang('en');
            localStorage.setItem('lang','en');
        } else if ($(this).val() == 'va') {
            change_lang('va');
            localStorage.setItem('lang','va');
        }
    });
});