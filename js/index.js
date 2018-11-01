document.addEventListener("DOMContentLoaded", function() {
    
    
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    var character_span = ""
    var div_game = document.getElementById("game")
    var colors = ["#ff0000", "#ff9a00", "#22ff00", "#620000", "#ffcaca", "#ffd328", "#8ebcbd", "#5f7c2a", "#ff663f", "#00dc6e", "#0098c3", "#0011ff"]
    
    // Par défaut, le jeu n'est pas en cours.
    // Grâce à ça, cela empêche l'utilisateur de perdre des points quand le jeu n'est pas lancé
    // donc quand il n'y a pas de caractères affichés
    var game_is_running = false
    
    // Cette fonction ajoute les <span> contenant les lettres dans la div #game
    var programmePrincipal = function() {
        
        game_is_running = true
        var i = 0
        
        // Supprime la div du compte à rebours
        div_game.removeChild(document.querySelector(".countdown"))
        
        // Affiche une nouvelle lettre toutes les 100ms
        var execution = window.setInterval(function() {
            
            // Génère des coordonnées aléatoires pour afficher les span n'importe
            // où et pour qu'ils restent sur le page (qu'ils soient visibles)
            var x = Math.floor(Math.random() * (window.innerWidth - 30)) + 15
            var y = Math.floor(Math.random() * (window.innerHeight - 80)) + 60
            var put_character = characters.charAt(Math.floor(Math.random() * characters.length))
            var random_color = colors[Math.floor(Math.random() * colors.length)]
            character_span = "<span class=\"" + put_character + "\" style=\"position:absolute;left:" + x + "px;top:" + y + "px;color:" + random_color + ";\">" + put_character + "</span>"
            
            // Ajoute le <span> correspondant à la lettre dans le div #game
            div_game.insertAdjacentHTML("beforeend", character_span)

            i++

            // Fin des 60s : on arrête l'exécution du programme
            if (i == 600) {
                window.clearInterval(execution)
                game_is_running = false
            }
        }, 100)
    }
    
    // Compte à rebours
    var countdown = function() {
        var countdown_area = document.querySelector(".countdown")
        var i = 3
        countdown_area.innerHTML = "<span style=\"position: relative; top: " + window.innerHeight/3 + "px\" class=\"countdown_font\">" + i + "</span>"
        var countdown = window.setInterval(function() {
            if (i == 0) {
                window.clearInterval(window)
            }
            if (i != 0) {
                i = i - 1
                countdown_area.innerHTML = "<span style=\"position: relative; top: " + window.innerHeight/3 + "px\" class=\"countdown_font\">" + i + "</span>"
            }
        }, 1000)
    }
    
    var control = document.querySelector('.game_button')
    // Lorsque le jeu est lancé, on lance le compte à rebours puis le programme principal (le jeu)
    control.addEventListener('click', function() {
        
        if (control.className == "game_button stop_game") {
            location.reload()
        } else {
            control.innerHTML = "Réinitialiser"
            control.className = "game_button stop_game"
        }
        
        countdown()
        
        // On lance programmePrincipal au bout de ~3s (3,2s)
        setTimeout(programmePrincipal, 3200)
        
    })
    
    var pressed_character = ""
    var score = 0
    var score_display = document.querySelector(".score")
    
    // On exécute le code suivant lorsque l'utilisateur appuie sur une touche
    document.addEventListener('keypress', function(event) {
        
        // Le code est exécuté que si le jeu est lancé
        if (game_is_running == true) {
            // On cherche tous les span dont class = caractère de la touche appuyée et on les supprime
            pressed_character = String.fromCharCode(event.keyCode).toUpperCase()

            var list_characters = div_game.querySelectorAll("." + pressed_character)

            if (list_characters.length > 0) {
                for (var i = 0; i < list_characters.length; i++) {
                    div_game.removeChild(list_characters[i])
                    score += 1
                }
            } else {
                // Si le caractère n'existe pas sur l'écran alors l'utilisateur perd 10 points
                score -= 10
            }
            
            // Affiche le score
            score_display.innerHTML = score
            
        }
        
    })
    
}) 