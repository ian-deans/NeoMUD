# Client

- maintains to the server via a websocket
- it receives and sends "messages" from and to the server
- messages tell:
    - what type of data the message contains
        - communication
        - 


player performs action against target
    -> { type: 'action', name: 'left_punch', target: 'occupant_id' }

- server receives message
    - checks the message type
        - command
        - player-login

player-login
- prompt for player  name
- get player name
    - if "new" is received -> create new character()
- find player with name
- prompt for password
- get password
- compare password to player.password
- if success -> player object instantiated with socket and client id
    - player is loaded into the game -> loadPlayer()
- if fail -> inform user no player exits, ask if new character

### Player persistant data
- name
- uid
- location coordinates
- inventory
- hp current/max
- equipment
