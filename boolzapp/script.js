

$(document).ready(function() { 

    showChargePercentage(100); 

    // aggiunta del messaggio al click
    $('.footer__right').click(aggiungiMessaggio);  

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

    // creo e mostro nella sidebar la lista dei contatti presenti nell'array contatti 
    displayContacts(); 

    $('.contact').click(mostraMessaggi);  

});

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



// funzione che mi restituisce ora e minuti (mi serve nell'array dei contatti)
function ora() { 
    var d, minuti, ora;

    d = new Date();
    minuti = d.getMinutes(); 
    ora = d.getHours(); 

    if (minuti < 10) {
        minuti = '0' + minuti;
    } 

    if (ora < 10) {
        ora = '0' + ora; 
    }

    return ora + ':' + minuti;
}




// Array di oggetti contenente tutti i contatti e le info necessarie 
var contatti = [

    {
        nome: 'Andrea',
        messaggi: [
            {
                testoMessaggio: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
                tipo: 'own', 
                ora: ora()
            },

            {
                testoMessaggio: 'Lorem ipsum dolor sit amet. ', 
                tipo: 'contact', 
                ora: ora()
            }
        ]
    }, 

    {
        nome: 'Marco',
        messaggi: [
            {
                testoMessaggio: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
                tipo: 'own', 
                ora: ora()
            },

            {
                testoMessaggio: 'Lorem ipsum dolor sit amet. ', 
                tipo: 'contact', 
                ora: ora()
            }
        ]
    }, 

    {
        nome: 'Simone',
        messaggi: [
            {
                testoMessaggio: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
                tipo: 'own', 
                ora: ora()
            },

            {
                testoMessaggio: 'Lorem ipsum dolor sit amet. ', 
                tipo: 'contact', 
                ora: ora()
            }
        ]
    },

    {
        nome: 'Giulio',
        messaggi: [
            {
                testoMessaggio: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
                tipo: 'own', 
                ora: ora()
            },

            {
                testoMessaggio: 'Lorem ipsum dolor sit amet. ', 
                tipo: 'contact', 
                ora: ora()
            }
        ]
    },

    {
        nome: 'Fabio',
        messaggi: [
            {
                testoMessaggio: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
                tipo: 'own', 
                ora: ora()
            },

            {
                testoMessaggio: 'Lorem ipsum dolor sit amet. ', 
                tipo: 'contact', 
                ora: ora()
            }
        ]
    },
    
    {
        nome: 'Michele',
        messaggi: [
            {
                testoMessaggio: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
                tipo: 'own', 
                ora: ora()
            },

            {
                testoMessaggio: 'Lorem ipsum dolor sit amet. ', 
                tipo: 'contact', 
                ora: ora()
            }
        ]
    },

    {
        nome: 'Francesco',
        messaggi: [
            {
                testoMessaggio: 'consectetur adipisicing elit.',
                tipo: 'own', 
                ora: ora()
            },

            {
                testoMessaggio: 'sit amet. ', 
                tipo: 'contact', 
                ora: ora()
            }
        ]
    },

    {
        nome: 'Daniele',
        messaggi: [
            {
                testoMessaggio: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
                tipo: 'own', 
                ora: ora()
            },

            {
                testoMessaggio: 'dolor sit amet. ', 
                tipo: 'contact', 
                ora: ora()
            }
        ]
    },

    {
        nome: 'Emanuele',
        messaggi: [
            {
                testoMessaggio: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
                tipo: 'own', 
                ora: ora()
            },

            {
                testoMessaggio: 'Lorem ipsum dolor sit amet. ', 
                tipo: 'contact', 
                ora: ora()
            }
        ]
    },

    {
        nome: 'Chiara',
        messaggi: [
            {
                testoMessaggio: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
                tipo: 'own', 
                ora: ora()
            },

            {
                testoMessaggio: 'Lorem ipsum dolor sit amet. ', 
                tipo: 'contact', 
                ora: ora()
            }
        ]
    },

    {
        nome: 'Paolo',
        messaggi: [
            {
                testoMessaggio: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
                tipo: 'own', 
                ora: ora()
            },

            {
                testoMessaggio: 'Lorem ipsum dolor sit amet. ', 
                tipo: 'contact', 
                ora: ora()
            }
        ]
    },

    {
        nome: 'Martina',
        messaggi: [
            {
                testoMessaggio: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
                tipo: 'own', 
                ora: ora()
            },

            {
                testoMessaggio: 'Lorem ipsum dolor sit amet. ', 
                tipo: 'contact', 
                ora: ora()
            }, 

            {
                testoMessaggio: 'Lorem. ', 
                tipo: 'contact', 
                ora: ora()
            }
        ]
    }

]; 

// funzione che crea il template del singolo contatto e ci mette dentro le info ripescate nell'oggetto contatti
function createContacts( arr , index ) { 

    var clonato = $('.sidebar__contact-list').children().first().clone(); 

    var nome = clonato.find('.contact__name');  
    nome.text(arr[index].nome); 
    var tempo = clonato.find('.contact__last-time'); 
    tempo.text( arr[index].messaggi[0].ora ); 
    var ultimoMessaggio = clonato.find('.contact__last-message'); 
    var indiceUltimoMessaggio = arr[index].messaggi.length - 1; 
    ultimoMessaggio.text(arr[index].messaggi[ indiceUltimoMessaggio ].testoMessaggio); 
    clonato.attr("data-item", index);

    $('.sidebar__contact-list').append(clonato); 
} 

function displayContacts() {

    for (var i = 0; i < contatti.length; i++) {

        createContacts( contatti, i); 

    }
    $('.sidebar__contact-list').children().first().remove(); 

}

// ------------- 

function mostraMessaggi() {

    // ripulisco il corpo messaggi ogni volta che cambio utente 
    $('.message-body').empty(); 

    // chiudo la finestra di apertura di default appena clicko su uno dei contatti 
    $('.charge-window').addClass('closed'); 

    $('.contact').removeClass('active'); 
    $(this).addClass('active'); 

    // stampo nome contatto attuale 
    var currentName = $(this).find('.contact__name').text(); 
    $('.header__left--name').text(currentName); 

    // messaggi 
    var indice = $(this).attr('data-item'); 
    var lunghezza = contatti[indice].messaggi.length;

    for (var i = 0; i < lunghezza; i++) {

        var currentMessageText = contatti[indice].messaggi[i].testoMessaggio; 
        var currentMessageType = contatti[indice].messaggi[i].tipo; 
        var currentMessageTime = contatti[indice].messaggi[i].ora; 

        // generare tutto il dom per il messaggio, e assegnarli la classe in base al tipo ! 
        var newMessage = '<div class="message message--' + currentMessageType + '"><p class="message__text">' + currentMessageText + '</p><span class="message__time">' + currentMessageTime + '</span></div>'

        $('.message-body').append(newMessage); 
        
    }
}



// funzione che carica la percentuale di load prima di far vedere l'app
function showChargePercentage (n) {
    for (var i = 1; i <= n; i++) {
        /* 
            IIFE, per generare una copia di i per ogni ciclo, altrimenti
            la stampa la fa subito, non durante l'esecuzione del timeout! 
        */
        (function( iCopy ) {
            setTimeout(function() { 

                $('.initial-charger__number').empty(); 
                $('.initial-charger__number').append(iCopy + '%'); 

                $('.initial-charger__bar').css('height', '10px'); 
                $('.initial-charger__bar').css('width', iCopy + '%'); 

            
            }, iCopy * 25); 
        })(i);    
    } 

    var showApp = setTimeout(function() {
        $('.initial-charger').addClass('closed'); 
        $('.container').fadeIn(1200); 
        $('.container').css('display', 'flex'); 
    }, 3000); 

} 
