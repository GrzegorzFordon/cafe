actions

game:start (fold into game:advance?)
game:advance
player:card
unit:move
unit:use
player:burn

side effects

unit:spawn (unit, tile)
unit:move (unit, target, move_type(base,teleport,pushed,...))
unit:use (unit)
unit:die (unit)

player:card (player,card,target)
player:draw (player,card)
player:burn (player,card)

game:phase(phase)
game:combat(units,outcome)
game:end (winner)
