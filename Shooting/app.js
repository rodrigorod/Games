var LEFT_KEY = 37;
var UP_KEY = 38;
var RIGHT_KEY = 39;
var DOWN_KEY = 40;
var HERO_MOVEMENT = 10;
var SPACE_KEY = 32;

var lastLoopRun = 0;

var controller = new Object();
var enemies = new Array();

function createSprite(element, x, y, w, h) {
    var result = new Object();
    result.element = element;
    resault.x = x;
    result.y = y;
    result.w = w;
    result.h = h;
    return result;
} 

function toggleKey(keyCode, isPressed) {
    if (keyCode == LEFT_KEY) {
        controller.left = isPressed
    }
    if (keyCode == RIGHT_KEY) {
        controller.right = isPressed
    }
    if (keyCode == UP_KEY) {
        controller.up = isPressed
    }
    if (keyCode == DOWN_KEY) {
        controller.down = isPressed
    }
    if (keyCode == SPACE_KEY) {
        controller.space = isPressed;
    }
}

function ensureBounds(sprite) {
    if (sprite.x < 20) {
        sprite.x = 20;
    }
    if (sprite.y < 20) {
        sprite.y = 20;
    }
    if (sprite.x + sprite.w > 480) {
        sprite.x = 480 - sprite.w;
    }
    if (sprite.y + sprite.h > 480) {
        sprite.y = 480 - sprite.h;
    }
}

function showSprites() {
    setPosition(hero)
    setPosition(laser)
    for (var i = 0; i < enemies.length; i++) {
        setPosition(enemies[i])
    }
}

function setPosition(sprite) {
    var e = document.getElementById(sprite.element);
    e.style.left = sprite.x + 'px';
    e.style.top = sprite.y + 'px'
}

function handleControls() {
    if (controller.up) {
        hero.y -= HERO_MOVEMENT;
    }
    if (controller.down) {
        hero.y += HERO_MOVEMENT;
    }
    if (controller.left) {
        hero.x -= HERO_MOVEMENT;
    }
    if (controller.right) {
        hero.x += HERO_MOVEMENT;
    }
    if (controller.space && laser.y <= -120) {
        laser.x = hero.x + 9;
        laser.y = hero.y - laser.h;
    }
    ensureBounds(hero)
}

function updatePositions() {
    for(var i = 0; i < enemies.length; i++) {
        enemies[i].y += 4;
        enemies[i].x += getRandom(7) - 3;
        ensureBounds(enemies[i])
    }
    laser.y -= 12;
}

function addEnemy() {
    if (getRandom(50) == 0) {
        var elementName = 'enemy' + getRandom(100000000);
        var enemy = createSprite(elementName, getRandom(450), -40, 35, 35);  
        
        var element = document.createElement('div');
        element.id = enemy.element;
        element.className = 'enemy';
        document.children[0].appendChild(element);

        enemies[enemies.length] = enemy;
    }
}

function getRandom(maxSize) {
    return parseInt(Math.random() * maxSize);
}

function loop() {
    if (new Date().getTime() - lastLoopRun > 40) {
        updatePositions()
        handleControls()

        addEnemy();

        showSprites()
        lastLoopRun = new Date().getTime()
    }
    setTimeout('loop();', 2);
}

document.onkeydown = function(evt) {
    toggleKey(evt.keyCode, true);
};

document.onkeyup = function(evt) {
    toggleKey(evt.keyCode, false);
};

var hero = createSprite('hero', 250, 460, 20, 20);
var laser = createSprite('laser', 0, -120, 2, 50);

loop();