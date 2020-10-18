
# multiplayer text-based rpg

Designed to emulate a MUD style game using TypeScript and websockets

NodeJS version 14.13.0



### Classes

#### Game
- maintains a list of zones
- maintains 'global' channels


#### Zone
- maintains a collection of rooms
- maintains its own 'zone' channels
- launches a 'respawn' event based on the global tick and a respawn interval


#### Room
- maintains a collection of occupants
- maintains a collection of items
- can maintain a collection of RespawnPoints
- maintains its own 'room' channels


#### Actor
- is the base class for all people and creatures
- has a name, short description, and long description
- maintains an Action


#### NPC
- base class for all non player characters and creatures


#### Player
- has a name, short description, and a long description
- receives and handles input from user, dispatching 'commands'
- maintains the 'Location' of the player ( zone and room )
- has several ItemSlots ( left hand, right hand, armor, etc... ) 
- can subscribe to channels


#### Channel
- emits 'events' using its own event emitter
- can be subscribed to by other classes
- is used to broadcast various events for game functions
- is used to provide communication between game and players ( interaction with NPCs, emotes, environment events )
- is used to provide communication between players ( chat, say, yell )

    ##### Chanel Types
    - internal
        - channels that are event emitters used relay data between internal game functions
    - external
        - channels that use the websocket connection to relay data between the server and clients
    - 
    - event ( external )
        - used to broadcast and listen to events that take place within the word ( player enters/exits room, an actor performs an action visible to all in the room, weather, time of day events )
    - chat ( external )
        - used for players to communicate to eachother ('chat', 'LFG', etc)


#### Action
- handles actions that Actors perform
- can hold a single action at a time ( an attack, a block, a dodge )
- can receive a dispatched action from another actor, compare that action to its own current action if any and return a result of the two ( receive left punch, compare to its own left block, inform other Action that the punch was blocked )

