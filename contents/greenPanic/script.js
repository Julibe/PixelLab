const GB = { 0: '#0f380f', 1: '#306230', 2: '#8bac0f', 3: '#9bbc0f' };
const TILE = 40;
const GRID_W = 19;
const GRID_H = 19;
const ISO_X = TILE;
const ISO_Y = TILE / 2;

function toIso(x, y) {
    return { x: (x - y) * ISO_X, y: (x + y) * ISO_Y };
}

const SPRITES = {
    PLAYER: [
        [0,0,0,1,1,1,1,1,0,0,0,0],
        [0,0,1,3,3,3,3,3,1,0,0,0],
        [0,1,3,1,1,3,1,1,3,1,0,0],
        [1,3,1,3,3,3,3,3,1,3,1,0],
        [1,3,1,1,3,1,1,3,1,3,1,0],
        [1,3,1,1,3,1,1,3,1,3,1,0],
        [1,3,3,3,3,3,3,3,3,3,1,0],
        [1,3,3,1,1,1,1,1,3,3,1,0],
        [0,1,3,3,3,3,3,3,3,1,0,0],
        [0,0,1,1,3,3,3,1,1,0,0,0],
        [0,1,1,0,1,1,1,0,1,1,0,0],
        [0,1,1,0,0,0,0,0,1,1,0,0]
    ],
    GHOST: [
        [0,0,0,0,1,1,1,1,0,0,0,0],
        [0,0,0,1,2,2,2,2,1,0,0,0],
        [0,0,1,2,2,2,2,2,2,1,0,0],
        [0,1,2,2,3,3,2,3,3,2,1,0],
        [0,1,2,2,3,1,2,3,1,2,1,0],
        [1,2,2,2,2,2,2,2,2,2,2,1],
        [1,2,2,2,2,2,2,2,2,2,2,1],
        [1,2,1,2,2,2,2,2,2,1,2,1],
        [1,2,2,1,1,1,1,1,1,2,2,1],
        [1,2,2,2,2,2,2,2,2,2,2,1],
        [0,1,2,1,2,1,1,2,1,2,1,0],
        [0,0,1,0,1,0,0,1,0,1,0,0]
    ],
    GHOST_SCARED: [
        [0,0,0,0,1,1,1,1,0,0,0,0],
        [0,0,0,1,3,3,3,3,1,0,0,0],
        [0,0,1,3,3,3,3,3,3,1,0,0],
        [0,1,3,3,1,3,3,1,3,3,1,0],
        [1,3,3,3,3,3,3,3,3,3,3,1],
        [1,3,3,3,3,3,3,3,3,3,3,1],
        [1,3,3,1,0,1,1,0,1,3,3,1],
        [1,3,3,1,0,1,1,0,1,3,3,1],
        [1,3,3,3,1,1,1,1,3,3,3,1],
        [0,1,3,1,3,1,1,3,1,3,1,0],
        [0,0,1,0,1,0,0,1,0,1,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0]
    ],
    BOMB: [
        [0,0,0,0,1,1,0,0,0,0,0,0],
        [0,0,0,1,3,3,1,0,0,0,0,0],
        [0,0,1,1,1,1,1,1,0,0,0,0],
        [0,1,1,3,3,1,1,1,1,0,0,0],
        [1,1,3,3,1,1,1,1,1,1,0,0],
        [1,1,1,1,1,1,1,1,1,1,0,0],
        [1,1,1,1,3,3,1,1,1,1,0,0],
        [1,1,1,1,3,3,1,1,1,1,0,0],
        [0,1,1,1,1,1,1,1,1,0,0,0],
        [0,0,1,1,1,1,1,1,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0]
    ]
};

class MazeGen {
    static generate(w, h) {
        let map = [];
        for(let y=0; y<h; y++) {
            let row = [];
            for(let x=0; x<w; x++) row.push(1);
            map.push(row);
        }
        let stack = [{x:1, y:1}];
        map[1][1] = 0;
        while(stack.length > 0) {
            let current = stack[stack.length - 1];
            let neighbors = [];
            let dirs = [{x:0, y:-2}, {x:0, y:2}, {x:-2, y:0}, {x:2, y:0}];
            for(let d of dirs) {
                let nx = current.x + d.x;
                let ny = current.y + d.y;
                if(nx > 0 && nx < w-1 && ny > 0 && ny < h-1 && map[ny][nx] === 1) {
                    neighbors.push({x: nx, y: ny, dx: d.x/2, dy: d.y/2});
                }
            }
            if(neighbors.length > 0) {
                let next = neighbors[Math.floor(Math.random() * neighbors.length)];
                map[current.y + next.dy][current.x + next.dx] = 0;
                map[next.y][next.x] = 0;
                stack.push({x: next.x, y: next.y});
            } else {
                stack.pop();
            }
        }
        for(let y=2; y<h-2; y++) {
            for(let x=2; x<w-2; x++) {
                if(map[y][x] === 1 && Math.random() < 0.25) map[y][x] = 0;
            }
        }
        return map;
    }
}

class Actor {
    constructor(gx, gy) {
        this.gx = gx;
        this.gy = gy;
        this.x = gx * TILE;
        this.y = gy * TILE;
        this.dir = {x:0, y:0};
        this.nextDir = {x:0, y:0};
        this.speed = 2;
        this.moving = false;
        this.flip = 1;
    }
    moveLogic(game) {
        const targetX = this.gx * TILE;
        const targetY = this.gy * TILE;
        if (this.x === targetX && this.y === targetY) {
            this.moving = false;
            this.onTileCenter(game);
        } else {
            this.moving = true;
            if (this.x < targetX) this.x = Math.min(this.x + this.speed, targetX);
            if (this.x > targetX) this.x = Math.max(this.x - this.speed, targetX);
            if (this.y < targetY) this.y = Math.min(this.y + this.speed, targetY);
            if (this.y > targetY) this.y = Math.max(this.y - this.speed, targetY);
        }
    }
    canMove(dx, dy, game) {
        if(game.map[this.gy + dy] && game.map[this.gy + dy][this.gx + dx] === 0) return true;
        return false;
    }
}

class Player extends Actor {
    constructor(gx, gy) {
        super(gx, gy);
        this.dashTime = 0;
        this.bombTimer = 0;
    }
    onTileCenter(game) {
        if (this.nextDir.x !== 0 || this.nextDir.y !== 0) {
            if (this.canMove(this.nextDir.x, this.nextDir.y, game)) {
                this.dir = {...this.nextDir};
                this.nextDir = {x:0, y:0};
                if(this.dir.x !== 0) this.flip = this.dir.x;
            }
        }
        if (this.canMove(this.dir.x, this.dir.y, game)) {
            this.gx += this.dir.x;
            this.gy += this.dir.y;
            if(this.dir.x !== 0) this.flip = this.dir.x;
        } else {
            this.dir = {x:0, y:0};
        }
    }
    update(game, input) {
        if(input.w) this.nextDir = {x:0, y:-1};
        if(input.s) this.nextDir = {x:0, y:1};
        if(input.a) this.nextDir = {x:-1, y:0};
        if(input.d) this.nextDir = {x:1, y:0};

        this.speed = 3;
        if(game.chaos === 'SLOW_DOWN') this.speed = 1.5;
        if(input.dash && this.dashTime <= 0) this.dashTime = 15;
        if(this.dashTime > 0) { this.speed = 6; this.dashTime--; }

        if(game.chaos === 'BOMB_SPREE') {
            this.bombTimer++;
            if(this.bombTimer > 15) { game.spawnBomb(this.x, this.y); this.bombTimer = 0; }
        }
        this.moveLogic(game);
    }
}

class Ghost extends Actor {
    constructor(gx, gy) {
        super(gx, gy);
        this.scared = false;
    }
    onTileCenter(game) {
        let possible = [];
        let dirs = [{x:0, y:-1}, {x:0, y:1}, {x:-1, y:0}, {x:1, y:0}];
        for(let d of dirs) {
            if (d.x === -this.dir.x && d.y === -this.dir.y && this.moving) continue;
            if (this.canMove(d.x, d.y, game)) possible.push(d);
        }
        if (possible.length === 0) {
             let back = {x: -this.dir.x, y: -this.dir.y};
             if (this.canMove(back.x, back.y, game)) possible.push(back);
        }
        if (possible.length > 0) {
            let chosen = possible[0];
            if(this.scared) {
                let maxD = -1;
                for(let p of possible) {
                    let tx = (this.gx + p.x) * TILE;
                    let ty = (this.gy + p.y) * TILE;
                    let dist = Math.hypot(tx - game.player.x, ty - game.player.y);
                    if(dist > maxD || Math.random() > 0.8) { maxD = dist; chosen = p; }
                }
            } else {
                if(Math.random() < 0.7) {
                    let minD = 999999;
                    for(let p of possible) {
                        let tx = (this.gx + p.x) * TILE;
                        let ty = (this.gy + p.y) * TILE;
                        let dist = Math.hypot(tx - game.player.x, ty - game.player.y);
                        if(dist < minD) { minD = dist; chosen = p; }
                    }
                } else {
                    chosen = possible[Math.floor(Math.random() * possible.length)];
                }
            }
            this.dir = chosen;
            this.gx += this.dir.x;
            this.gy += this.dir.y;
            if(this.dir.x !== 0) this.flip = this.dir.x;
        }
    }
    update(game) {
        this.speed = 2;
        if (game.chaos === 'ENEMY_FRENZY') this.speed = 4;
        if (game.chaos === 'SLOW_DOWN') this.speed = 1;
        if (this.scared) this.speed = 1.5;
        this.moveLogic(game);
    }
}

class Bomb {
    constructor(x, y) {
        this.x = x; this.y = y;
        this.timer = 60;
        this.exploded = false;
    }
    update(game) {
        this.timer--;
        if(this.timer <= 0 && !this.exploded) {
            this.exploded = true;
            game.shake = 10;
            game.ghosts.forEach(g => {
                if(Math.hypot(g.x - this.x, g.y - this.y) < 80) {
                    g.gx = 1; g.gy = 1; g.x = TILE; g.y = TILE;
                }
            });
        }
    }
}

class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.resize();
        window.addEventListener('resize', () => this.resize());

        this.input = { w:false, a:false, s:false, d:false, dash:false };
        window.addEventListener('keydown', e => this.handleKey(e, true));
        window.addEventListener('keyup', e => this.handleKey(e, false));

        this.restart();
        this.loop();
    }

    handleKey(e, state) {
        let k = e.key.toLowerCase();
        if('wasd'.includes(k) || k.startsWith('arrow')) {
            if(k==='w'||k==='arrowup') this.input.w = state;
            if(k==='a'||k==='arrowleft') this.input.a = state;
            if(k==='s'||k==='arrowdown') this.input.s = state;
            if(k==='d'||k==='arrowright') this.input.d = state;
        }
        if(k===' ' || k==='e') this.input.dash = state;
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx.imageSmoothingEnabled = false;
    }

    restart() {
        document.getElementById('game-over').style.display = 'none';
        this.score = 0;
        this.level = 1;
        this.gameOver = false;
        this.chaos = 'NORMAL';
        this.chaosTimer = 600;
        this.powerModeTime = 0;
        this.loadLevel();
    }

    loadLevel() {
        this.map = MazeGen.generate(GRID_W, GRID_H);
        let openSpots = [];
        for(let y=1; y<GRID_H-1; y++) {
            for(let x=1; x<GRID_W-1; x++) {
                if(this.map[y][x] === 0) openSpots.push({x,y});
            }
        }
        let pStart = openSpots.shift();
        this.player = new Player(pStart.x, pStart.y);
        this.powerUps = [];
        let corners = [{x: 1, y: 1}, {x: GRID_W-2, y: 1}, {x: 1, y: GRID_H-2}, {x: GRID_W-2, y: GRID_H-2}];
        corners.forEach(c => {
             if(this.map[c.y][c.x] === 0) this.powerUps.push({x: c.x * TILE + TILE/2, y: c.y * TILE + TILE/2, active: true});
        });
        this.pellets = [];
        for(let s of openSpots) {
            let isPower = this.powerUps.some(p => Math.abs(p.x - (s.x*TILE+TILE/2)) < 5);
            if(!isPower && Math.random() > 0.1) this.pellets.push({x: s.x * TILE + TILE/2, y: s.y * TILE + TILE/2, active:true});
        }
        this.ghosts = [];
        let ghostCount = 3 + Math.floor(this.level / 2);
        for(let i=0; i<ghostCount; i++) {
            let s = openSpots[openSpots.length - 1 - i];
            if(s) this.ghosts.push(new Ghost(s.x, s.y));
        }
        this.bombs = [];
        this.shake = 0;
        this.powerModeTime = 0;
    }

    spawnBomb(x, y) { this.bombs.push(new Bomb(x, y)); }

    activatePowerMode() {
        this.powerModeTime = 400;
        this.ghosts.forEach(g => g.scared = true);
    }

    update() {
        if(this.gameOver) return;

        this.chaosTimer--;
        if(this.chaosTimer <= 0) {
            const modes = ['NORMAL', 'BOMB_SPREE', 'ENEMY_FRENZY', 'SLOW_DOWN'];
            let prev = this.chaos;
            while(this.chaos === prev) this.chaos = modes[Math.floor(Math.random()*modes.length)];
            this.chaosTimer = 500;
            document.getElementById('chaos-msg').innerText = this.chaos;
            this.shake = 5;
        }
        if(this.powerModeTime > 0) {
            this.powerModeTime--;
            if(this.powerModeTime <= 0) this.ghosts.forEach(g => g.scared = false);
        }
        this.player.update(this, this.input);
        this.pellets.forEach(p => {
            if(p.active && Math.abs(p.x - (this.player.x + TILE/2)) < 10 && Math.abs(p.y - (this.player.y + TILE/2)) < 10) {
                p.active = false; this.score += 10;
            }
        });
        this.powerUps.forEach(p => {
            if(p.active && Math.abs(p.x - (this.player.x + TILE/2)) < 15 && Math.abs(p.y - (this.player.y + TILE/2)) < 15) {
                p.active = false; this.activatePowerMode(); this.score += 50;
            }
        });
        this.ghosts.forEach(g => g.update(this));
        if(this.player.dashTime <= 0) {
            for(let g of this.ghosts) {
                let dist = Math.hypot((g.x) - (this.player.x), (g.y) - (this.player.y));
                if(dist < 20) {
                    if(g.scared) {
                        g.gx = 1; g.gy = 1; g.x = TILE; g.y = TILE; g.scared = false; this.score += 200; this.shake = 5;
                    } else {
                        this.gameOver = true;
                        document.getElementById('game-over').style.display = 'block';
                        document.getElementById('final-score').innerText = "FINAL SCORE: " + this.score;
                    }
                }
            }
        }
        let remaining = this.pellets.filter(p => p.active).length;
        document.getElementById('score-ui').innerText = "SCORE: " + this.score;
        if(remaining === 0) { this.level++; this.loadLevel(); }
        this.bombs.forEach(b => b.update(this));
        this.bombs = this.bombs.filter(b => !b.exploded);
        if(this.shake > 0) this.shake *= 0.9;
    }

    draw() {
        this.ctx.fillStyle = GB[0];
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        let camX = this.canvas.width/2;
        let camY = this.canvas.height/2;
        let pIso = toIso(this.player.x/TILE, this.player.y/TILE);
        let shakeX = (Math.random()-0.5)*this.shake;
        let shakeY = (Math.random()-0.5)*this.shake;

        this.ctx.save();
        // CAMERA FIX: subtracted 150 to move the whole map higher up the screen
        this.ctx.translate(camX - pIso.x + shakeX, camY - pIso.y + shakeY - 150);

        let objects = [];
        for(let y=0; y<GRID_H; y++) {
            for(let x=0; x<GRID_W; x++) {
                if(Math.abs(x - this.player.gx) > 16 || Math.abs(y - this.player.gy) > 16) continue;
                objects.push({ type: 'tile', val: this.map[y][x], gx: x, gy: y, sort: (x+y) });
            }
        }
        objects.push({type: 'player', gx: this.player.x/TILE, gy: this.player.y/TILE, sort: (this.player.x/TILE + this.player.y/TILE)});
        this.ghosts.forEach(g => objects.push({type: 'ghost', obj: g, gx: g.x/TILE, gy: g.y/TILE, sort: (g.x/TILE + g.y/TILE)}));
        this.pellets.forEach(p => { if(p.active) objects.push({type: 'pellet', x: p.x, y: p.y, sort: (p.x/TILE + p.y/TILE)}); });
        this.powerUps.forEach(p => { if(p.active) objects.push({type: 'power', x: p.x, y: p.y, sort: (p.x/TILE + p.y/TILE)}); });
        this.bombs.forEach(b => objects.push({type: 'bomb', x: b.x, y: b.y, sort: (b.x/TILE + b.y/TILE)}));

        objects.sort((a, b) => a.sort - b.sort);

        objects.forEach(o => {
            if(o.type === 'tile') {
                let iso = toIso(o.gx, o.gy);
                if(o.val === 1) this.drawIsoBlock(iso.x, iso.y, GB[1], 24);
                else this.drawIsoRect(iso.x, iso.y, GB[2]);
            }
            else if(o.type === 'pellet') {
                let iso = toIso(o.x/TILE - 0.5, o.y/TILE - 0.5);
                this.ctx.fillStyle = GB[3];
                this.ctx.fillRect(iso.x - 3, iso.y - 3, 6, 6);
            }
            else if(o.type === 'power') {
                let iso = toIso(o.x/TILE - 0.5, o.y/TILE - 0.5);
                this.ctx.fillStyle = (Math.floor(Date.now()/200)%2 === 0) ? GB[3] : GB[2];
                this.ctx.fillRect(iso.x - 8, iso.y - 18, 16, 16);
            }
            else if(o.type === 'player') {
                let iso = toIso(o.gx, o.gy);
                this.drawSprite(iso.x, iso.y, SPRITES.PLAYER, this.player.flip, false);
            }
            else if(o.type === 'ghost') {
                let iso = toIso(o.gx, o.gy);
                let sprite = o.obj.scared ? SPRITES.GHOST_SCARED : SPRITES.GHOST;
                this.drawSprite(iso.x, iso.y, sprite, o.obj.flip, o.obj.scared);
            }
            else if(o.type === 'bomb') {
                let iso = toIso(o.x/TILE, o.y/TILE);
                this.drawSprite(iso.x, iso.y, SPRITES.BOMB, 1, false);
            }
        });
        this.ctx.restore();
    }

    drawIsoRect(x, y, color) {
        this.ctx.beginPath();
        this.ctx.moveTo(x, y - ISO_Y);
        this.ctx.lineTo(x + ISO_X, y);
        this.ctx.lineTo(x, y + ISO_Y);
        this.ctx.lineTo(x - ISO_X, y);
        this.ctx.fillStyle = color;
        this.ctx.fill();
        this.ctx.strokeStyle = 'rgba(0,0,0,0.1)';
        this.ctx.stroke();
    }

    drawIsoBlock(x, y, color, h) {
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        this.ctx.moveTo(x, y - ISO_Y - h);
        this.ctx.lineTo(x + ISO_X, y - h);
        this.ctx.lineTo(x, y + ISO_Y - h);
        this.ctx.lineTo(x - ISO_X, y - h);
        this.ctx.fill();
        this.ctx.stroke();

        this.ctx.fillStyle = GB[0];
        this.ctx.beginPath();
        this.ctx.moveTo(x + ISO_X, y - h);
        this.ctx.lineTo(x + ISO_X, y);
        this.ctx.lineTo(x, y + ISO_Y);
        this.ctx.lineTo(x, y + ISO_Y - h);
        this.ctx.fill();

        this.ctx.beginPath();
        this.ctx.moveTo(x - ISO_X, y - h);
        this.ctx.lineTo(x - ISO_X, y);
        this.ctx.lineTo(x, y + ISO_Y);
        this.ctx.lineTo(x, y + ISO_Y - h);
        this.ctx.fill();
    }

    drawSprite(x, y, sprite, flip, isAlt) {
        const pxSize = 3;
        const w = sprite[0].length;
        const h = sprite.length;
        const xOffset = (w * pxSize) / 2;
        const yOffset = (h * pxSize) + 10;
        let bounce = Math.floor(Math.sin(Date.now()/150) * 3);
        this.ctx.fillStyle = 'rgba(15, 56, 15, 0.4)';
        this.ctx.beginPath();
        this.ctx.ellipse(x, y, 12, 6, 0, 0, Math.PI*2);
        this.ctx.fill();
        for(let r=0; r<h; r++) {
            for(let c=0; c<w; c++) {
                let val = sprite[r][c];
                if(val === 0) continue;
                let drawC = c;
                if(flip === -1) drawC = (w-1) - c;
                let px = x - xOffset + (drawC * pxSize);
                let py = y - yOffset + (r * pxSize) - bounce;
                if(val === 1) this.ctx.fillStyle = GB[0];
                if(val === 2) this.ctx.fillStyle = isAlt ? GB[2] : GB[1];
                if(val === 3) this.ctx.fillStyle = isAlt ? GB[3] : GB[3];
                this.ctx.fillRect(px, py, pxSize, pxSize);
            }
        }
    }

    loop() {
        this.update();
        this.draw();
        requestAnimationFrame(() => this.loop());
    }
}

const game = new Game();