
$(document).ready(function() { 

    // aggiunta del messaggio al click
    $('.footer__right').click(function() {
        aggiungiMessaggio(); 
    }); 

    // aggiunta del messaggio quando viene premuto ENTER 
    $('.footer__input').keypress(function( e ) {
        if ( e.which === 13 ) {
            aggiungiMessaggio(); 
        }
    }); 

    // filtro dei contatti in base al nome 
    $('.sidebar__input').keyup(function( e ) {
        mostraUtentiAlMatch(); 
    });

});

/* ------------------------------------------------------------------------------ */

function aggiungiMessaggio() { 

    var inputV = $('.footer__input').val().toLowerCase(); 
    if ( inputV ) {

        var newM = $('.message-body').children().first().clone(); 
        newM.children().first().text(inputV); 
        $('.message-body').append(newM); 

        var setAnswer = setTimeout(function() {

            var answMessage = newM.clone(); 
            answMessage.removeClass('message--own').addClass('message--contact'); 
            answMessage.children().first().text('Ciao. Va bene!'); 
            $('.message-body').append(answMessage); 

        }, 1500);
    }
    // ripulisco lo spazio per digitare un altro messaggio 
    $('.footer__input').val(''); 
} 

function mostraUtentiAlMatch() {

    // appena comincio a digitare, li nascondo tutti, e mostro sotto solo quelli matchati 
    $('.contact').hide(); 
    // valore da confrontare 
    var digitValue = $('.sidebar__input').val().toLowerCase(); 

    // faccio il match sul nome dei contatti presenti nell'elenco 
    $('.contact__name').each(function() {
        // se ci sono dei match 
        if ( $(this).text().toLowerCase().includes(digitValue) ) {
            // salgo di 3 livelli per mostrare tutti i dati del contatto, non solo il nome 
            $(this).closest('.contact').show(); 
        } 
    }); 
}