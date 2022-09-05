const express = require('express');
const app = express();
const http = require('http');
var CryptoJS = require("crypto-js");
const server = http.createServer(app);

const io = require("socket.io")(server, {
    cors: {
        origin: "*"
    }
});

app.get('/', (req, res) => {
    res.send('server');
});

const mob = require("./mob.js")


if (true) {
    function v(x=0, y=0) {
        return {x:x,y:y}
    }
    
    function rotate(t, n, e) {
        var r = e,
          o = Math.cos(r),
          u = Math.sin(r);
        return {
          x: o * (n.x - t.x) + u * (n.y - t.y) + t.x,
          y: o * (n.y - t.y) - u * (n.x - t.x) + t.y,
        };
      }
      function stopOverflow(t, n) {
        return ((t % n) + n) % n;
      }
      function angleDiff(angle1, angle2) {
        var diff = ( angle2 - angle1 + 180 ) % 360 - 180;
        return diff < -180 ? diff + 360 : diff;
      }
      function xmur3(t) {
        for (var n = 0, e = 1779033703 ^ t.length; n < t.length; n++)
          e = ((e = Math.imul(e ^ t.charCodeAt(n), 3432918353)) << 13) | (e >>> 19);
       return function () {
          return (
            (e = Math.imul(e ^ (e >>> 16), 2246822507)),
            (e = Math.imul(e ^ (e >>> 13), 3266489909)),
            ((e ^= e >>> 16) >>> 0) / 45e8
          );
        };
      }
      function createElementFromHTML(htmlString) {
        var div = document.createElement('div');
        div.innerHTML = htmlString.trim();
    
        // Change this to div.childNodes to support multiple top-level nodes.
        return div.firstChild;
    }
    var pSBC = (p, c0, c1, l) => {
        let r, g, b, P, f, t, h, i = parseInt,
            m = Math.round,
            a = typeof(c1) == "string";
        if (typeof(p) != "number" || p < -1 || p > 1 || typeof(c0) != "string" || (c0[0] != 'r' && c0[0] != '#') || (c1 && !a)) return null;
        if (!this.pSBCr) this.pSBCr = (d) => {
            let n = d.length,
                x = {};
            if (n > 9) {
                [r, g, b, a] = d = d.split(","), n = d.length;
                if (n < 3 || n > 4) return null;
                x.r = i(r[3] == "a" ? r.slice(5) : r.slice(4)), x.g = i(g), x.b = i(b), x.a = a ? parseFloat(a) : -1
            } else {
                if (n == 8 || n == 6 || n < 4) return null;
                if (n < 6) d = "#" + d[1] + d[1] + d[2] + d[2] + d[3] + d[3] + (n > 4 ? d[4] + d[4] : "");
                d = i(d.slice(1), 16);
                if (n == 9 || n == 5) x.r = d >> 24 & 255, x.g = d >> 16 & 255, x.b = d >> 8 & 255, x.a = m((d & 255) / 0.255) / 1000;
                else x.r = d >> 16, x.g = d >> 8 & 255, x.b = d & 255, x.a = -1
            }
            return x
        };
        h = c0.length > 9, h = a ? c1.length > 9 ? true : c1 == "c" ? !h : false : h, f = this.pSBCr(c0), P = p < 0, t = c1 && c1 != "c" ? this.pSBCr(c1) : P ? {
            r: 0,
            g: 0,
            b: 0,
            a: -1
        } : {
            r: 255,
            g: 255,
            b: 255,
            a: -1
        }, p = P ? p * -1 : p, P = 1 - p;
        if (!f || !t) return null;
        if (l) r = m(P * f.r + p * t.r), g = m(P * f.g + p * t.g), b = m(P * f.b + p * t.b);
        else r = m((P * f.r ** 2 + p * t.r ** 2) ** 0.5), g = m((P * f.g ** 2 + p * t.g ** 2) ** 0.5), b = m((P * f.b ** 2 + p * t.b ** 2) ** 0.5);
        a = f.a, t = t.a, f = a >= 0 || t >= 0, a = f ? a < 0 ? t : t < 0 ? a : a * P + t * p : 0;
        if (h) return "rgb" + (f ? "a(" : "(") + r + "," + g + "," + b + (f ? "," + m(a * 1000) / 1000 : "") + ")";
        else return "#" + (4294967296 + r * 16777216 + g * 65536 + b * 256 + (f ? m(a * 255) : 0)).toString(16).slice(1, f ? undefined : -2)
    }
    
    function clamp(num, min, max) {
        if (num > max) {
            num = max
        }
        if (num < min) {
            num = min
        }
        return num
    }
    function inBounds(num, min, max) {
        if (num > max) {
            return false
        } else if (num < min) {
            return false
        } else {
            return true
        }
    }
    
    var nextId = 0
    function newId() {
        return '${Math.random()}'
    }
    
    function randInt(min, max) {
        return Math.floor(Math.random() * ((max + 1) - min)) + min;
    }
    
    function getDistance(a, b) {
        let xd = (a.x - b.x)
        let yd = (a.y - b.y)
        return Math.sqrt(Math.pow(xd, 2) + Math.pow(yd, 2))
    }
    
    function getAngle(a, b) {
        return -Math.atan2(a.x - b.x, a.y - b.y) + (Math.PI*0.5)
    }
}




// Mobiles will require
// .pos ? v()
// .chunkPos ? v()
// .id ? newId()





function chunkArray2d(e, t, n = {}, r = v(1, 1), c) {
    let a = new Array(e);
    for (let e = 0; e < a.length; e++) {
        a[e] = new Array(t);
        for (let t = 0; t < a[e].length; t++)
            a[e][t] = new cChunk(v(e * r.x, t * r.y), c);
    }
    return { array: a, data: n };
}
function tileArray2d(e, t, n, r, c) {

    let a = new Array(e);
    for (let e = 0; e < a.length; e++) {
        a[e] = new Array(t);
        for (let t = 0; t < a[e].length; t++)
            a[e][t] = new cTile(
                e + (n * c.options.rows),
                t + (r * c.options.columns)
            );
    }
    return a;
}

function getTileValue(x, y) {


    var config = {
	greenLandWidth:40, // Width of the non-wasteland
	
	landSectionWidth:20, // Height of water/land sections
	shallowWaterFrequency:3, // Frequency of shallow water
    }


    var val = "grass"


    // Shallow Water
    if ((Math.floor((y-12)/config.landSectionWidth) % config.shallowWaterFrequency) == 0) {
        val = "water"
    }

    // Wasteland
    if (Math.abs(x)>(config.greenLandWidth/2) ) {
	val = "wasteland"
    }
    return val



    /*
t < -5 && (Math.floor(t)%25===0  Math.floor(t+1)%25===0  Math.floor(t+2)%25===0)? this.type = "shallowWater" : 
    e > 9.9  e < -10  t > 9.9 ? this.type = "water" : (t > 6.9 ? this.type = "wasteland" : this.type = "grass")
*/
}

function cTile(e, t, n = !0) {
    this.pos = v(e, t)
    this.type = getTileValue(e, t)

}
function cChunk(e, t) {
    if ((`${e.x}`).includes(".")) {
    }
    this.id = newId();
    (this.mobiles = new Array()),
        (this.grid = tileArray2d(t.options.rows, t.options.columns, e.x, e.y, t)),
        (this.pos = e);
}
;
var startingSize = 5;

class Chunks {
    constructor(options) {
        this.options = {
            rows: 5,
            columns: 5,
            width: 120,
            height: 120,
            xSet: 1,
            ySet: 1,
            ...options,
        }

        this.chunkMaps = {
            x1y1array: chunkArray2d(startingSize, startingSize, "x1y1", v(1, 1), this),
            x0y1array: chunkArray2d(startingSize, startingSize, "x0y1", v(-1, 1), this),
            x1y0array: chunkArray2d(startingSize, startingSize, "x1y0", v(1, -1), this),
            x0y0array: chunkArray2d(startingSize, startingSize, "x0y0", v(-1, -1), this),
        }
    }
    requestChunk(e, t) {
        let n = e < 0 ? (t < 0 ? "x0y0" : "x0y1") : t < 0 ? "x1y0" : "x1y1",
            r = this.chunkMaps[n + "array"].array;
        let a = e < 0 ? -1 * e : e,
            l = t < 0 ? -1 * t : t;
        return (
            r.length - 1 < a &&
            ((r[a] = new Array()), (r[a][l] = new cChunk(v(e, t), this))),
            null == r[a] && (r[a] = new Array()),
            r[a].length - 1 < l && (r[a][l] = new cChunk(v(e, t), this)),
            null == r[a][l] && (r[a][l] = new cChunk(v(e, t), this)),
            r[a][l]
        );
    }
    requestTile(e, t) {
        let n = v(Math.floor(e / this.options.rows), Math.floor(t / this.options.columns)),
            tileP = v(e - n.x * this.options.rows, t - n.y * this.options.columns)
        return (
            
            this.requestChunk(n.x, n.y).grid[tileP.x][tileP.y]
        );
    }
    requestChunks(e, t, n, r) {
        let a = new Array();
        for (let l = n; l > 0; l--)
            for (let n = 0; n < r; n++) {/*console.log(n, t);*/a.push(this.requestChunk(l + e, n + t));}
        return a;
    }
    getMobiles(e) {
        let t = new Array(),
            n = new Array();
        for (let r = 0; r < e.length; r++) {
            const a = e[r];
            for (let e = 0; e < a.mobiles.length; e++) {
                const n = a.mobiles[e];
                n.chunkPos = a.pos
                t.push(n);
            }
           
        }
        return t
    }
    removeMob(e, t, n) {
        let r = this.requestChunk(e, t);

        for (let e = 0; e < r.mobiles.length; e++) {
            if (r.mobiles[e].id == n.id) {
                r.mobiles.splice(e, 1);
                break;
            }
        }
    }
    insertMob(e, t, n) {
        let r = this.requestChunk(e, t);
        return this.removeMob(e, t, n.id), r.mobiles.push(n), n;
    }
    revaulateMobile(mobile) {
        var tilePos = v(Math.floor(mobile.pos.x/64), Math.floor(mobile.pos.y/64)),
            chunkPos = v(Math.floor(tilePos.x/this.options.rows), Math.floor(tilePos.y/this.options.columns))

        if (!vc(chunkPos, mobile.chunkPos)) {
            this.removeMob(mobile.chunkPos.x, mobile.chunkPos.y, mobile)
            this.insertMob(chunkPos.x, chunkPos.y, mobile)

        }
    }
    posToChunkPos(pos) {
        return v((Math.floor((pos.x/this.options.width)/this.options.rows)), Math.floor((pos.y/this.options.height)/this.options.columns))
    }
};


console.log("indexYay")
console.log(mob.yay())
var mainLobby = new Chunks()





io.on('connection', async(socket) => {

    socket.on('requestServer', (data) => {
        
        io.sockets.emit("testReturn", {server:mainLobby})
       


    });

    socket.on('createPlayer', (data) => {
        
        var player = data.player, 
            playerId = player.id

        
       


    });

    
    
})


server.listen(process.env.PORT || 3000, () => {
    console.log('listening on *:3000');
})
