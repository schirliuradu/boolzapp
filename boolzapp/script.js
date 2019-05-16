
$(document).ready(function() { 

    console.log(contatti); 

    // faccio partire l'app dopo 3 secondi e mostro il caricamento 
    showChargePercentage(100); 

    // creo e mostro nella sidebar la lista dei contatti presenti nell'array contatti 
    displayContacts(); 

    // aggiunta del messaggio al click
    $('.footer__right').click(aggiungiMessaggio);  

    // aggiunta del messaggio quando viene premuto ENTER 
    $('.footer__input').keypress(function( e ) {

        if ( e.which === 13 ) { 
            // gestisco aggiunta di messaggi, sia in UI che in data structure 
            aggiungiMessaggio(); 
            // ogni volta che aggiungo o elimino un messaggio, reimposto il data-order
            assignOrderToMessages(); 
            
            addMessageToArray( contatti ); 
            // modifico nella UI del contatto (nella sidebar) il testo dell'ultimo messaggio 
            lastMessageUpdate( contatti ); 
        }
    }); 

    // filtro dei contatti in base al nome 
    $('.sidebar__input').keyup(function( e ) {
        mostraUtentiAlMatch(); 
    });

    // genero il corpo dei messaggi e i messaggi stessi, ogni volta che cambio utente 
    $('.contact').click(mostraMessaggi);  

 
    /*
        funzione che gestisce il click sulla tendina, e la fa sparire 
        al RIclick sulla tendina, o al click su qualsiasi altra zona del body 
    */
    $('body').on('click', dropdownHandler); 


    // funzione che gestisce l'eliminazione del messaggio sia dalla UI che dalla data structure  
    $('body').on('click', '.message__option--2', function( event ) {

        // rimuove dalla data s
        removeMessageFromArray( contatti ); 

        // rimuove dalla UI 
        $(this).closest('.message').remove(); 

        // riassegno il data-order ogni volta che ne elimino uno 
        assignOrderToMessages(); 

        // aggiorno anche l'ultimo messaggio nella UI, in sidebr, per ogni contatto 
        lastMessageUpdate( contatti );
    });

});


function autoAnswer() {

    var arrayRisposte = [
        'Questa è solo una delle risposte a caso che ti posso dare :) ',
        'Questo è un altro modo in cui ti posso rispondere', 
        'Qualsiasi cosa tu mi abbia chiesto, ti dico che va bene :D ', 
        'Mi dispiace amico, ho le risposte limitate :D ', 
        'Lorem ipsum dolor sit amet consecteur. ', 
        'Questa è solo un\'altra delle risposte che ti posso dare. ', 
        'Spero che le mie risposte non ti facciano arrabbiare. Sono solo un generatore di risposte :) ',
        'Ammetto che potrei fare di meglio, ma per ora ti dovrai accontentare delle mie risposte. '
    ];

    var randomNumber = Math.floor( Math.random() * arrayRisposte.length ); 

    return arrayRisposte[ randomNumber ]; 

}


// funzione che gestisce sia il click, che l'ENTER 
function aggiungiMessaggio() { 

    var inputV = $('.footer__input').val().toLowerCase(); 
    if ( inputV ) {

        var newM = $('.message-body').children().first().clone(); 
        newM.children().first().text(inputV); 
        $('.message-body').append(newM); 

        // rispondo con un messaggio dopo 1 secondo e mezzo 
        var setAnswer = setTimeout(function() {

            var answMessage = newM.clone(); 
            answMessage.removeClass('message--own').addClass('message--contact'); 
            answMessage.children().first().text( autoAnswer() ); 
            $('.message-body').append(answMessage); 

            // riassegno a tutti i messaggi il data-order
            assignOrderToMessages(); 

            /* --------------------------- */
            
            addMessageToArray( contatti ); 

            /* --------------------------- */

            lastMessageUpdate( contatti ); 

            /* --------------------------- */

        }, 1500);
    }
    // ripulisco lo spazio per digitare un altro messaggio 
    $('.footer__input').val(''); 
} 


// filtro durante la digitazione 
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


/* 
    funzione che gestisce la lunghezza dell'ultimo messaggio che 
    l'utente ha ricevuto, per non visualizzarlo tutto, se troppo lungo 
*/
function stringHandle( str ) {

    if (str.length > 35 ) {
        var stringaRisultante = str.substr(0, 30) + '... ';
    } 
    return stringaRisultante;  

}


// funzione che crea il template del singolo contatto e ci mette dentro le info ripescate nell'oggetto contatti
function createContacts( arr , index ) { 
    var clonato, nome, tempo, ultimoMessaggio, indiceUltimoMessaggio; 

    clonato = $('.sidebar__contact-list').children().first().clone(); 
    nome = clonato.find('.contact__name');  
    nome.text(arr[index].nome); 
    tempo = clonato.find('.contact__last-time'); 
    tempo.text( arr[index].messaggi[0].ora ); 
    ultimoMessaggio = clonato.find('.contact__last-message'); 
    indiceUltimoMessaggio = arr[index].messaggi.length - 1; 
    ultimoMessaggio.text(arr[index].messaggi[ indiceUltimoMessaggio ].testoMessaggio); 
    clonato.attr("data-item", index);

    ultimoMessaggio.text( stringHandle(ultimoMessaggio.text()) ) ;  

    $('.sidebar__contact-list').append(clonato); 
} 


// funzione che stampa in sidebar la lista dei contatti presenti nell'array contatti
function displayContacts() {

    for (var i = 0; i < contatti.length; i++) {
        createContacts( contatti, i); 
    }
    $('.sidebar__contact-list').children().first().remove(); 

} 


// funzione che mi serve per aggiornare via via che aggiungo o cancello l'ultimo messaggio visibile sul contatto; 
function lastMessageUpdate( arr ) {
    var index, utente, indiceUltimoMessaggio, tempo;

    index = $('.contact.active').attr('data-item'); 
    // aggiorno l'ultimo messaggio che l'utente ha ricevuto o ha scritto 
    utente = $('.contact.active').find('.contact__last-message');  
    indiceUltimoMessaggio = arr[index].messaggi.length - 1; 
    utente.text(arr[index].messaggi[ indiceUltimoMessaggio ].testoMessaggio); 

    // se è più lunga di quanto voglio io, la taglio (vedi stringHandle sopra)
    utente.text( stringHandle(utente.text()) ); 

    // aggiorno l'ora dell'ultimo messaggio nel contatto in sidebar 
    tempo = $('.contact.active').find('.contact__last-time'); 
    tempo.text( arr[index].messaggi[ indiceUltimoMessaggio ].ora ); 
}


// funzione che mostra nella UI i messaggi 
function mostraMessaggi() {
    var currentName, indice, lunghezza, currentMessageText, currentMessageType, currentMessageTime, newMessage;

    // ripulisco il corpo messaggi ogni volta che cambio utente 
    $('.message-body').empty(); 

    // chiudo la finestra di apertura di default appena clicko su uno dei contatti 
    $('.charge-window').addClass('closed'); 

    $('.contact').removeClass('active'); 
    $(this).addClass('active'); 

    // stampo nome contatto attuale 
    currentName = $(this).find('.contact__name').text(); 
    $('.header__left--name').text(currentName); 

    // messaggi 
    indice = $(this).attr('data-item'); 
    lunghezza = contatti[indice].messaggi.length;

    for (i = 0; i < lunghezza; i++) {

        currentMessageText = contatti[indice].messaggi[i].testoMessaggio; 
        currentMessageType = contatti[indice].messaggi[i].tipo; 
        currentMessageTime = contatti[indice].messaggi[i].ora; 

        // generare tutto il dom per il messaggio, e assegnarli la classe in base al tipo ! 
        newMessage = '<div class="message message--' + currentMessageType + '"><p class="message__text">' + currentMessageText + '</p><span class="message__time">' + currentMessageTime + '</span><div class="dropdown-wrapper"><ul class="message__options"><li class="message__option message__option--1">Message info</li><li class="message__option message__option--2">Delete message</li></ul></div> </div>'

        $('.message-body').append(newMessage); 
        // riassegno il data-order 
        assignOrderToMessages(); 
    }
} 


// funzione che genera la struttura (un oggetto) di un nuovo messaggio, che poi vado a inserire nell'array messaggi (sotto)
function addNewMessage() {
    var ultimoMessaggio, testoM, classString, tipoM, oraM, newMessageItem; 

    ultimoMessaggio = $('.message-body > .message').last(); 

    testoM = ultimoMessaggio.find('.message__text').text(); 
    classString = ultimoMessaggio.attr('class').split('--');
    tipoM = classString[1]; 
    oraM = ora(); 
    
    newMessageItem = {}; 

    newMessageItem.testoMessaggio = testoM; 
    newMessageItem.tipo = tipoM; 
    newMessageItem.ora = oraM;  
    
    return newMessageItem; 
}

// funzione che aggiunge il messaggio alla data structure 
function addMessageToArray( arr ) {
    var messageToAdd, index; 

    messageToAdd = addNewMessage(); 
    index = $('.contact.active').attr('data-item'); 

    arr[index].messaggi.push(messageToAdd);   
} 

// funzione che rimuove messaggio dalla data structure 
function removeMessageFromArray( arr ) {
    var contactIndex, toDeleteIndex; 

    // indice contatto sul quale si lavora 
    contactIndex = $('.contact.active').attr('data-item'); 
    // indice messaggio che si cancella         
    toDeleteIndex = $(event.target).closest('.message').data('order'); 
    
    arr[ contactIndex ].messaggi.splice(toDeleteIndex, 1); 

}

// funzione che mi fa chiudere il dropdown ovunque clicki, non per forza di nuovo sulla freccetta 
function dropdownHandler( event ) {
    if ( $(event.target).hasClass('message__time') ) {
            
        var that = $(event.target).next(); 
        that.toggleClass( 'aperto' ); 

    } else {
        $('.dropdown-wrapper').removeClass('aperto'); 
    } 
}

/*
    funzione che assegna il data-order a ogni messaggio in maniera dinamica, 
    ogni volta che i messaggi si aggiornano: in aggiunta o in cancellazione 
*/
function assignOrderToMessages() {
    var a = 0; 

    while ( a < $('.message').length ) {
        $('.message').each(function() {
            
            $(this).attr('data-order', a); 
            a++; 

        });
    }
}


// --------------------------------------------------------------------------


// funzione che carica la percentuale di load prima di far vedere l'app
function showChargePercentage ( n ) {
    for (var i = 1; i <= n; i++) {
        /* 
            IIFE per generare una copia di i per ogni ciclo, altrimenti
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

    // gestisco la visuale al completamento del caricamento 
    var showApp = setTimeout(function() {
        $('.initial-charger').addClass('closed'); 
        $('.container').fadeIn(1200); 
        $('.container').css('display', 'flex'); 
    }, 3000); 

} 





/* ---------------------------------- Data Structure -------------------------------- */




/*
    Array di oggetti contenente tutti i contatti e le info necessarie, costruito manualmente 
    in questo caso, dato che non abbiamo necessità di introdurre nuovi n utenti nuovi nella nostra app 
*/


var contatti = [

    {
        nome: 'Andrea',
        messaggi: [
            {
                testoMessaggio: 'Sono andato ieri a guardare il lago.',
                tipo: 'own', 
                ora: ora()
            }
        ]
    }, 

    {
        nome: 'Marco',
        messaggi: [
            {
                testoMessaggio: 'Non credo di farcela. Vediamo...',
                tipo: 'own', 
                ora: ora()
            }
        ]
    }, 

    {
        nome: 'Simone',
        messaggi: [
            { 
                testoMessaggio: 'Non so come andrà a finire. Vivremo e vedremo',
                tipo: 'own', 
                ora: ora()
            }
        ]
    },

    {
        nome: 'Giulio',
        messaggi: [
            {
                testoMessaggio: 'Lorem ipsum dolor sit amet consecteur.',
                tipo: 'own', 
                ora: ora()
            }
        ]
    },

    {
        nome: 'Fabio',
        messaggi: [
            {
                testoMessaggio: 'Il compleanno lo ha fatto in pizzeria ieri sera.',
                tipo: 'own', 
                ora: ora()
            }
        ]
    },
    
    {
        nome: 'Michele',
        messaggi: [
            {
                testoMessaggio: 'L\'esame è andato molto bene, ho preso 30.',
                tipo: 'own', 
                ora: ora()
            }
        ]
    }, 

    {
        nome: 'Francesco',
        messaggi: [
            {
                testoMessaggio: 'Lorem ipsum dolor sit amet consecteur.',
                tipo: 'own', 
                ora: ora()
            }
        ]
    },

    {
        nome: 'Daniele',
        messaggi: [
            {
                testoMessaggio: 'Ho pagato bollo e assicurazione della macchina oggi.',
                tipo: 'own', 
                ora: ora()
            }
        ]
    },

    {
        nome: 'Emanuele',
        messaggi: [
            {
                testoMessaggio: 'Grazie. Appena posso ricambio il favore. ',
                tipo: 'own', 
                ora: ora()
            }
        ]
    },

    {
        nome: 'Chiara',
        messaggi: [
            {
                testoMessaggio: 'Passo alla coop stasera e prendo una bottiglia di vino. ',
                tipo: 'own', 
                ora: ora()
            }
        ]
    },

    {
        nome: 'Paolo',
        messaggi: [
            {
                testoMessaggio: 'Lorem ipsum dolor sit amet consecteur. ',
                tipo: 'own', 
                ora: ora()
            }
        ]
    },

    {
        nome: 'Martina',
        messaggi: [
            {
                testoMessaggio: 'Credo di fare in tempo, ti aggiorno!',
                tipo: 'own', 
                ora: ora()
            }
        ]
    }

]; 

