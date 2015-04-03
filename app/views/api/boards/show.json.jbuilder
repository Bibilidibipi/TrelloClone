# write some jbuilder to return some json about a board
# it should include the board
#  - its lists
#    - the cards for each list
json.id @board.id
json.title @board.title
json.user_id @board.user_id
