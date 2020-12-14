### Lancement du projet

Afin de lancer le projet complet (MongoDB + Vue + Node + Spring Boot),
il faut lancer les scripts dans l'ordre suivant :
- prepare_vue_front_end_and_node_backend.sh 
- start_mongodb.sh 
- start_spring_boot_backend.sh
- start_node_backend.sh
- start_vue_front_end.sh

Il y a donc 4 terminaux de lancé en parallèle :
- un pour mongoDB
- un pour le backend spring boot
- un pour le backend node
- un pour le frontend vue

Le frontend est disponible à l'adresse suivante : https://localhost:443  
ATTENTION : c'est en httpS. Cependant, le certificat que nous avons mis n'est pas un certificat valide.