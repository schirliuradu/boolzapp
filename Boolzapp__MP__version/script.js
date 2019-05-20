
/* -------------------------------------------- 
   -------        DATA controller       -------
   -------------------------------------------- */ 


var dataController = (function( $ ) {
    /*
        Array di oggetti contenente tutti i contatti e le info necessarie, costruito manualmente 
        in questo caso, dato che non abbiamo necessità di introdurre nuovi n utenti nuovi nella nostra app 

        Dovrebbe essere vuoto, ma c'è dentro un messaggio per non caricare la pagina vuota all'inizio 
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
                },

                {
                    testoMessaggio: 'Io credo invece che tu ce la possa fare! ',
                    tipo: 'contact', 
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

    // ------------------------ array risposte casuali ------------------

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

    // funzione che genera la struttura (un oggetto) di un nuovo messaggio, che poi vado a inserire nell'array messaggi (sotto)
    function addNewMessage () {
        var ultimoMessaggio, testoM, classString, tipoM, oraM, newMessageItem; 

        ultimoMessaggio = $('.message-body > .message').last(); 

        if ( $('.message-body').children().length !== 0 ) {

            testoM = ultimoMessaggio.find('.message__text').text(); 
            classString = ultimoMessaggio.attr('class').split('--'); 
            tipoM = classString[1]; 
            oraM = ora(); 

        } else {

            alert('vuoto'); 

            testoM = inputMess; 
            tipoM = "own";  
            oraM = ora(); 
        }

        newMessageItem = {}; 
    
        newMessageItem.testoMessaggio = testoM; 
        newMessageItem.tipo = tipoM; 
        newMessageItem.ora = oraM;  

        return newMessageItem; 
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



    // Returning public methods 

    return {
        getContacts: function() {
            return contatti; 
        },

        autoAnswer: function() {
            return arrayRisposte[ Math.floor( Math.random() * arrayRisposte.length ) ];
        },

        assignOrderToMessages: function() {
            var a = 0; 
            while ( a < $('.message').length ) {
                $('.message').each(function() {
                    $(this).attr('data-order', a); 
                    a++; 
                }); 
            }
        },

        addMessageToArray: function( arr ) {
            var messageToAdd, index; 

            messageToAdd = addNewMessage(); 
            index = $('.contact.active').attr('data-item'); 
            arr[index].messaggi.push(messageToAdd);   
        },

        removeMessageFromArray: function( arr ) {
            var contactIndex, toDeleteIndex; 

            // indice contatto sul quale si lavora 
            contactIndex = $('.contact.active').attr('data-item'); 
            // indice messaggio che si cancella         
            toDeleteIndex = $(event.target).closest('.message').data('order'); 
            arr[ contactIndex ].messaggi.splice(toDeleteIndex, 1); 
        }
    }

})( jQuery ); 




/* -------------------------------------------- 
   ---------       UI controller      ---------
   -------------------------------------------- */




var UIController = (function( $ ) {

    var switchChargingToApp = function() {
        $('.initial-charger').addClass('closed'); 
        $('.container').fadeIn(1200); 
        $('.container').css('display', 'flex'); 
    }

    var numberAndProgressBar = function( i ) {
        $('.initial-charger__number').empty(); 
        $('.initial-charger__number').append(i + '%'); 
        $('.initial-charger__bar').css('height', '10px'); 
        $('.initial-charger__bar').css('width', i + '%');    
    }
 
    var handleMatches = function() { 
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

    // se la stringa ha più di 35 caratteri stampo i primi 30 e ci aggiungo 3 puntini, altrimenti la fa vedere tutta, e non va bene
    function stringHandle( str ) {
        if (str.length > 35 ) {
            var stringaRisultante = str.substr(0, 30) + '... ';
        } 
        return stringaRisultante;  
    }

    // funzione che crea il template del singolo contatto e ci mette dentro le info ripescate nell'array contatti
    function createContacts( arr , index ) { 
        var nome, tempo, ultimoMessaggio, indiceUltimoMessaggio, source, modelloContatto, parametri, contatto; 

        nome = arr[index].nome; 
        tempo = arr[index].messaggi[0].ora; 
        indiceUltimoMessaggio = arr[index].messaggi.length - 1; 
        ultimoMessaggio = arr[index].messaggi[ indiceUltimoMessaggio ].testoMessaggio; 
    
        source = $("#contact-template").html();
        modelloContatto = Handlebars.compile(source);

        parametri = {
            name: nome, 
            lastTime: tempo,
            lastMessage: stringHandle( ultimoMessaggio ),
            dataItem: index
        };

        contatto = modelloContatto(parametri); 
        $('.sidebar__contact-list').append(contatto); 
    } 

    function changeUserInSidebar( clickedElement ) {
        var currentName;

        // ripulisco il corpo messaggi ogni volta che cambio utente 
        $('.message-body').empty(); 
        // chiudo la finestra di apertura di default appena clicko su uno dei contatti 
        $('.charge-window').addClass('closed'); 

        $('.contact').removeClass('active'); 
        clickedElement.addClass('active'); 
        // stampo nome contatto attuale 
        currentName = clickedElement.find('.contact__name').text(); 
        $('.header__left--name').text(currentName);         
    }


    function generateContactsMessagesInTheUI( arr, clickedElement, callbackF ) {
        var indice, lunghezza, currentMessageText, currentMessageType, currentMessageTime, source, modelloMessaggio, parametri, newMessage; 

        // stampo tutti i messaggi del contatto selezionato  
        indice = clickedElement.attr('data-item'); 
        lunghezza = arr[indice].messaggi.length; 

        if ( lunghezza !== 0 ) {

            for (i = 0; i < lunghezza; i++) {

                currentMessageText = arr[indice].messaggi[i].testoMessaggio; 
                currentMessageType = arr[indice].messaggi[i].tipo; 
                currentMessageTime = arr[indice].messaggi[i].ora; 
    
                source = $("#message-template").html();
                modelloMessaggio = Handlebars.compile(source); 
    
                parametri = {
                    curMessType: currentMessageType, 
                    curMessText: currentMessageText,
                    curMessTime: currentMessageTime 
                }; 
    
                newMessage = modelloMessaggio(parametri);
                $('.message-body').append(newMessage); 
    
                // riassegno il data-order 
                callbackF(); 
            }
    
        } 
    }


    // Returning public methods 

    return {

        // funzione che mostra il caricamento dell'App 
        showChargePercentage: function( n ) {
            for (var i = 1; i <= n; i++) { 

                // nuovo scope ad ogni iterazione, altrimenti il risultato viene stampato prima del timeOut 
                (function( iCopy ) {
                    setTimeout(function() { 

                        numberAndProgressBar( iCopy ); 

                    }, iCopy * 25); 
                })(i);    
            } 
            // cambia la UI una volta finito il caricamento 
            setTimeout(switchChargingToApp, 3000); 
        },

        // stampa nella sidebar tutti i contatti presenti nell'array passato in input (contatti in questo caso )
        displayContacts: function( arr ) {
            for (var i = 0; i < arr.length; i++) {
                createContacts( arr, i); 
            }
            // $('.sidebar__contact-list').children().first().remove(); 
        },

        // funzione che filtra la ricerca nella input della sidebar 
        mostraUtentiAlMatch: function() { 
            $('.contact').hide(); 
            handleMatches(); 
        },

        // aggiunge nuovo messaggio nella chat
        appendNewMessage: function( val ) {
            var newM = $('.message-body').children().first().clone(); 
            newM.children().first().text(val); 
            $('.message-body').append(newM); 

            return newM; 
        }, 

        // funzione che fa scorrere la chat all'ultimo messaggio, inserito dall'utente o dal PC 
        scrollChat: function() {
            var chat, number; 

            chat = $('.message-body');
            number = chat[0].scrollHeight; 
            chat.scrollTop(number); 
        },

        // funzione che gestisce la tendina opzione di cancellazione dei messaggi (anche al click fuori la chiude lo stesso)
        dropdownHandler: function( e ) {
            if ( $(e.target).hasClass('message__time') ) {
                $('.dropdown-wrapper').removeClass('aperto'); 

                actualTarget = $(e.target); 
                actualTarget.next().toggleClass( 'aperto' ); 
            } else { 
                $('.dropdown-wrapper').removeClass('aperto'); 
            } 
        },

        // funzione che mostra nella UI il messaggio generato dal PC in automatico 
        appendRandomPcAnswer: function( val, callback) {
            var answMessage = val.clone(); 
            answMessage.removeClass('message--own').addClass('message--contact'); 
            answMessage.children().first().text( callback ); 
            $('.message-body').append(answMessage); 
        }, 

        // funzione che cambia dinamicamente l'ultimo messaggio (ricevuto / mandato) da ogni utente presente nella sidebar 
        lastMessageUpdate: function( arr ) {
            var index, utente, lunghezzaArrayMessaggi, indiceUltimoMessaggio, tempo;

            index = $('.contact.active').attr('data-item'); 
            // aggiorno l'ultimo messaggio che l'utente ha ricevuto o ha scritto 
            utente = $('.contact.active').find('.contact__last-message');  

            lunghezzaArrayMessaggi = arr[index].messaggi.length; 

            if ( lunghezzaArrayMessaggi !== 0 ) {

                indiceUltimoMessaggio = lunghezzaArrayMessaggi - 1; 
                utente.text(arr[index].messaggi[ indiceUltimoMessaggio ].testoMessaggio); 
        
                // se è più lunga di quanto voglio io, la taglio (vedi stringHandle sopra)
                utente.text( stringHandle(utente.text()) ); 
                // aggiorno l'ora dell'ultimo messaggio nel contatto in sidebar 
                tempo = $('.contact.active').find('.contact__last-time'); 
                tempo.text( arr[index].messaggi[ indiceUltimoMessaggio ].ora ); 
    
            } else {
                utente.text( stringHandle("Non ci sono messaggi presenti in questa conversazione!") ); 
            }

        }, 

        // funzione che mostra nella UI i messaggi 
        showMessageOfSelectedContact: function( arr, selected, callbackF ) {
            // cambio contatto 
            changeUserInSidebar( selected ); 
            // stampo tutti i messaggi del contatto selezionato  
            generateContactsMessagesInTheUI( arr, selected, callbackF ); 
        } 
    }

})( jQuery ); 




/* -------------------------------------------- 
   ---------      APP controller      ---------
   -------------------------------------------- */




var appController = (function( $, DATACtrl, UICtrl ) {

    // array dei contatti 
    var c = DATACtrl.getContacts(); 

    var updateFields = function() {

        /* --------------------------- */
        DATACtrl.assignOrderToMessages(); 
        /* --------------------------- */
        DATACtrl.addMessageToArray( c ); 
        /* --------------------------- */
        UICtrl.lastMessageUpdate( c ); 
        /* --------------------------- */

    }

    // funzione che gestisce l'introduzione di nuovi messaggi sia al click che all'ENTER 
    function aggiungiMessaggio() { 
        var inputV = $('.footer__input').val();  

        if ( inputV ) {
            message = UICtrl.appendNewMessage( inputV ); 
            UICtrl.scrollChat(); 
            // rispondo con un messaggio dopo 1 secondo e mezzo 
            setTimeout(function() {

                // PC genera risposta a caso (scelta dall'array delle possibili risposte)
                UICtrl.appendRandomPcAnswer( message, DATACtrl.autoAnswer )
                // aggiorna i campi dei messaggi ogni volta che viene generata una nuova risposta del PC
                updateFields();
                // scrollo la chat 
                UICtrl.scrollChat(); 

            }, 1500);
        }
        // ripulisco lo spazio per digitare un altro messaggio 
        $('.footer__input').val(''); 
    } 
    
    // Funzione che racchiude tutti gli eventi che devo gestire 
    var eventHandlers = function() { 

        UICtrl.showChargePercentage(100); 
        // creo e mostro nella sidebar la lista dei contatti presenti nell'array contatti 
        UICtrl.displayContacts( c );  
        // aggiunta del messaggio al click
        $('.footer__right').click(aggiungiMessaggio);  
        // aggiunta del messaggio quando viene premuto ENTER 
        $('.footer__input').keypress(function( e ) {
    
            if ( e.which === 13 ) { 
                // carico messaggio all'ENTER 
                aggiungiMessaggio();  
                // aggiorno i campi dei messaggi ogni volta che un nuovo messaggio viene introdotto 
                updateFields();
            }
        }); 
    
        // filtro dei contatti in base al nome 
        $('.sidebar__input').keyup( UICtrl.mostraUtentiAlMatch );

        // genero il corpo dei messaggi e i messaggi stessi, ogni volta che cambio utente 
        $('.contact').click( function() {

            // metto this in una variabile, perchè lo devo passare nella funzione sotto, altrimenti fa riferimento a Window 
            var self = $(this); 
            UICtrl.showMessageOfSelectedContact( c, self, DATACtrl.assignOrderToMessages ); 

        });  
    
        // handler del dropdown con opzione di cancellazione del messaggio 
        $('body').on('click', UICtrl.dropdownHandler); 
    
        // funzione che gestisce l'eliminazione del messaggio sia dalla UI che dalla data structure  
        $('body').on('click', '.message__option--2', function() {
            // rimuove dalla data s
            dataController.removeMessageFromArray( c ); 
            // rimuove dalla UI 
            $(this).closest('.message').remove(); 
            // riassegno il data-order ogni volta che ne elimino uno 
            dataController.assignOrderToMessages(); 
            // aggiorno anche l'ultimo messaggio nella UI, in sidebr, per ogni contatto 
            UICtrl.lastMessageUpdate( c );  
        });

    }

    // Returning public methods 

    return {
        runApp: function() { 
            eventHandlers(); 
            console.log( c ); 
        }
    }

/*
    jQuery - $
    dataController - DATACtrl   ( nomi diversi: se nel futuro cambia non devo cambiare tutto dentro )
    UIController - UICtrl       ( idem )
*/

})( jQuery, dataController, UIController ); 



/* ------------------------------------------------ */



// Run app when page is loaded 

$(document).ready(function() { 

    appController.runApp();  

});

