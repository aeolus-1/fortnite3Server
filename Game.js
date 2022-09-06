exports.GameState = {
    gameState:class {
        constructor(){
            this.deps =[[],[],[],[],[],[],[],[],[],[],[],[],[],[],]
            this.turn = 0
    
            this.gameTokens = new Array()
        }
    },
    addToken(state, dep) {

        var hitbox = hitboxes[dep],
            pos = {x:hitbox.x+(hitbox.width/2),y:hitbox.y+(hitbox.height/2)}

        var newToken = new gameToken(pos.x,pos.y)

        state.gameTokens.push(newToken)
        state.deps[dep].push(newToken)

    },
    moveTokens(state,dep) {
        var tokens = state.deps[dep],
            l = 0
        for (let i = 0; i < tokens.length; i++,l++) {
            const token = tokens[i];
            console.log(token)
            var targetDep = (dep+l+1)%14,
                hitbox = hitboxes[targetDep]


            token.target = {x:hitbox.x+(hitbox.width/2),y:hitbox.y+(hitbox.height/2)}
            for (let j = 0; j < tokens.length; j++) {
                if (tokens[j].id == token.id) {
                    tokens.splice(j, 1)
                    i--
                    
                    break
                }
            }
            state.deps[targetDep].push(token)
        }
    },
    updateTokens(state) {
        for (let i = 0; i < state.gameTokens.length; i++) {
            const token = state.gameTokens[i];
            if (token.target != undefined) {
                var dst = (Math.sqrt(Math.pow(token.pos.x-token.target.x, 2)+Math.pow(token.pos.y-token.target.y, 2)))
                if (dst > 30) {
                    var angle = Math.atan2(token.pos.x-token.target.x, token.pos.y-token.target.y)+(Math.PI/2)
                    token.pos.x += Math.cos(angle)*3
                    token.pos.y -= Math.sin(angle)*3
                } 
            }
            for (let j = 0; j < state.gameTokens.length; j++) {
                var token2 = state.gameTokens[j],
                    dst = (Math.sqrt(Math.pow(token.pos.x-token2.pos.x, 2)+Math.pow(token.pos.y-token2.pos.y, 2)))
                if (dst <= 20 && token.id != token2.id) {
                    var angle = (Math.random()*0.1)+Math.atan2(token.pos.x-token2.pos.x, token.pos.y-token2.pos.y)-(Math.PI/2)
                    token.pos.x += Math.cos(angle)
                    token.pos.y -= Math.sin(angle)
                }
            }

        }
    },
    
    makeMove(state, dep, turn) {
        GameState.moveTokens(state, dep)
        state.turn = (turn+1)%2
    },
}