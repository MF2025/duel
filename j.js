//created by Mark Friant
//in June 2022

'use strict';

var keysPressed = [];for(var i=0;i<10;i++)keysPressed[i]=false;
var refresh = 20;
var vel = 3;
var angVel = 2.5;
var bulletVel = 15;
var reloadTime = 4000;

var player1 = document.getElementById('Player1');
var p1ang = 0;
var p1left = 200;
var p1top = 200;
var p1leftPrev = 200;
var p1topPrev = 200;

var player2 = document.getElementById('Player2');
var p2ang = 0;
var p2left = 606;
var p2top = 200;
var p2leftPrev = 606;
var p2topPrev = 200;

var bullet1 = document.getElementById('Player1Bullet');
var b1reloadTimer = 0;
var b1active = false;
var b1firstFrame = false;
var b1ang = 0;
var b1left = 50;
var b1top = 50;

var bullet2 = document.getElementById('Player2Bullet');
var b2reloadTimer = 0;
var b2active = false;
var b2firstFrame = false;
var b2ang = 0;
var b2left = 50;
var b2top = 50;

var player1reloadBar = document.getElementById('Player1ReloadBar');
var player2reloadBar = document.getElementById('Player2ReloadBar');

///////////////////////////////////////////////////////////////////////////////

setInterval(function updateFrame(){
  
  p1leftPrev = p1left;
  p1topPrev = p1top;

  p2leftPrev = p2left;
  p2topPrev = p2top;

  //////////////////////////////
  //player 1

  if(keysPressed[1])
  {
    p1ang -= angVel; if(p1ang < 0) p1ang += 360;
  }

  if(keysPressed[3])
  {
    p1ang += angVel; if(p1ang >= 360) p1ang -= 360;
  }

  if(keysPressed[0])
  {
    p1left += Math.sin(p1ang * Math.PI / 180.0) * vel;
    p1top -= Math.cos(p1ang * Math.PI / 180.0) * vel;
  }

  if(keysPressed[2])
  {
    p1left -= Math.sin(p1ang * Math.PI / 180.0) * vel;
    p1top += Math.cos(p1ang * Math.PI / 180.0) * vel;
  }

  if(keysPressed[8] && b1reloadTimer <= 0)
  {
    b1firstFrame = true;
    b1active = true;
    b1reloadTimer = reloadTime;
    b1ang = p1ang;
  }

///////////////////////////////////////////////////////////////////////////////
  //player 2

  if(keysPressed[5])
  {
    p2ang -= angVel; if(p2ang < 0) p2ang += 360;
  }

  if(keysPressed[7])
  {
    p2ang += angVel; if(p2ang >= 360) p2ang -= 360;
  }

  if(keysPressed[4])
  {
    p2left += Math.sin(p2ang * Math.PI / 180.0) * vel;
    p2top -= Math.cos(p2ang * Math.PI / 180.0) * vel;
  }

  if(keysPressed[6])
  {
    p2left -= Math.sin(p2ang * Math.PI / 180.0) * vel;
    p2top += Math.cos(p2ang * Math.PI / 180.0) * vel;
  }

  if(keysPressed[9] && b2reloadTimer <= 0)
  {
    b2firstFrame = true;
    b2active = true;
    b2reloadTimer = reloadTime;
    b2ang = p2ang;
  }

///////////////////////////////////////////////////////////////////////////////
  //boundaries

  //////////////////////////////
  //player 1

  var p1distFromTopLeftCorner = Math.sqrt(
    Math.pow((p1left + 64) - 403, 2) + Math.pow((p1top + 64) - 200, 2)
  );
  var p1distFromTopRightCorner = Math.sqrt(
    Math.pow((p1left + 64) - 531, 2) + Math.pow((p1top + 64) - 200, 2)
  );
  var p1distFromBotLeftCorner = Math.sqrt(
    Math.pow((p1left + 64) - 403, 2) + Math.pow((p1top + 64) - 328, 2)
  );
  var p1distFromBotRightCorner = Math.sqrt(
    Math.pow((p1left + 64) - 531, 2) + Math.pow((p1top + 64) - 328, 2)
  );

  //p1 left side
  if(p1left + 128 >= 403 + 1 && p1left + 128 <= 403 + 4 && p1top + 64 >= 200 && p1top + 64 <= 328)
  {
    p1left = p1leftPrev;
  }

  //p1 right side
  if(p1left <= 531 - 1 && p1left >= 531 - 4 && p1top + 64 >= 200 && p1top + 64 <= 328)
  {
    p1left = p1leftPrev;
  }

  //p1 top side
  if(p1top + 128 >= 200 - 1 && p1top + 128 <= 200 + 4 && p1left + 64 >= 403 && p1left + 64 <= 531)
  {
    p1top = p1topPrev;
  }

  //p1 bot side
  if(p1top <= 328 + 1 && p1top >= 328 - 4 && p1left + 64 >= 403 && p1left + 64 <= 531)
  {
    p1top = p1topPrev;
  }

  if(p1distFromTopLeftCorner <= 63)
  {
    p1left += ( (p1left + 64) - 403 ) / p1distFromTopLeftCorner * vel; //x-vel
    p1top += ( (p1top + 64) - 200 ) / p1distFromTopLeftCorner * vel; //y-vel
  }
  if(p1distFromTopRightCorner <= 63)
  {
    p1left += ( (p1left + 64) - 531 ) / p1distFromTopRightCorner * vel; //x-vel
    p1top += ( (p1top + 64) - 200 ) / p1distFromTopRightCorner * vel; //y-vel
  }
  if(p1distFromBotLeftCorner <= 63)
  {
    p1left += ( (p1left + 64) - 403 ) / p1distFromBotLeftCorner * vel; //x-vel
    p1top += ( (p1top + 64) - 328 ) / p1distFromBotLeftCorner * vel; //y-vel
  }
  if(p1distFromBotRightCorner <= 63)
  {
    p1left += ( (p1left + 64) - 531 ) / p1distFromBotRightCorner * vel; //x-vel
    p1top += ( (p1top + 64) - 328 ) / p1distFromBotRightCorner * vel; //y-vel
  }

///////////////////////////////////////////////////////////////////////////////
  //player 2

  var p2distFromTopLeftCorner = Math.sqrt(
    Math.pow((p2left + 64) - 403, 2) + Math.pow((p2top + 64) - 200, 2)
  );
  var p2distFromTopRightCorner = Math.sqrt(
    Math.pow((p2left + 64) - 531, 2) + Math.pow((p2top + 64) - 200, 2)
  );
  var p2distFromBotLeftCorner = Math.sqrt(
    Math.pow((p2left + 64) - 403, 2) + Math.pow((p2top + 64) - 328, 2)
  );
  var p2distFromBotRightCorner = Math.sqrt(
    Math.pow((p2left + 64) - 531, 2) + Math.pow((p2top + 64) - 328, 2)
  );

  //p2 left side
  if(p2left + 128 >= 403 + 1 && p2left + 128 <= 403 + 4 && p2top + 64 >= 200 && p2top + 64 <= 328)
  {
    p2left = p2leftPrev;
  }

  //p2 right side
  if(p2left <= 531 - 1 && p2left >= 531 - 4 && p2top + 64 >= 200 && p2top + 64 <= 328)
  {
    p2left = p2leftPrev;
  }

  //p2 top side
  if(p2top + 128 >= 200 - 1 && p2top + 128 <= 200 + 4 && p2left + 64 >= 403 && p2left + 64 <= 531)
  {
    p2top = p2topPrev;
  }

  //p2 bot side
  if(p2top <= 328 + 1 && p2top >= 328 - 4 && p2left + 64 >= 403 && p2left + 64 <= 531)
  {
    p2top = p2topPrev;
  }

  if(p2distFromTopLeftCorner <= 63)
  {
    p2left += ( (p2left + 64) - 403 ) / p2distFromTopLeftCorner * vel; //x-vel
    p2top += ( (p2top + 64) - 200 ) / p2distFromTopLeftCorner * vel; //y-vel
  }
  if(p2distFromTopRightCorner <= 63)
  {
    p2left += ( (p2left + 64) - 531 ) / p2distFromTopRightCorner * vel; //x-vel
    p2top += ( (p2top + 64) - 200 ) / p2distFromTopRightCorner * vel; //y-vel
  }
  if(p2distFromBotLeftCorner <= 63)
  {
    p2left += ( (p2left + 64) - 403 ) / p2distFromBotLeftCorner * vel; //x-vel
    p2top += ( (p2top + 64) - 328 ) / p2distFromBotLeftCorner * vel; //y-vel
  }
  if(p2distFromBotRightCorner <= 63)
  {
    p2left += ( (p2left + 64) - 531 ) / p2distFromBotRightCorner * vel; //x-vel
    p2top += ( (p2top + 64) - 328 ) / p2distFromBotRightCorner * vel; //y-vel
  }

///////////////////////////////////////////////////////////////////////////////
  //updating

  player1.style.transform = 'rotate('+p1ang+'deg)';
  player1.style.left = p1left + 'px';
  player1.style.top = p1top + 'px';

  player2.style.transform = 'rotate('+p2ang+'deg)';
  player2.style.left = p2left + 'px';
  player2.style.top = p2top + 'px';

///////////////////////////////////////////////////////////////////////////////
  //bullets

  //b1

  if(b1active)
  {
    if(b1firstFrame)
    {
      b1firstFrame = false;
      b1left = p1left + 64 - 16 + Math.sin(b1ang * Math.PI / 180.0) * 48;
      b1top = p1top + 64 - 16 - Math.cos(b1ang * Math.PI / 180.0) * 48;
      bullet1.style.left = b1left + 'px';
      bullet1.style.top = b1top + 'px';
      bullet1.style.visibility = 'visible';
    }
    else
    {
      b1left += Math.sin(b1ang * Math.PI / 180.0) * bulletVel;
      b1top -= Math.cos(b1ang * Math.PI / 180.0) * bulletVel;
      bullet1.style.left = b1left + 'px';
      bullet1.style.top = b1top + 'px';
    }

    //collisions

    var b1distFromP2 = Math.sqrt(
      Math.pow((b1left + 16) - (p2left + 64), 2) + Math.pow((b1top + 16) - (p2top + 64), 2)
    );
    var b1distFromTopLeftCorner = Math.sqrt(
      Math.pow((b1left + 16) - 403, 2) + Math.pow((b1top + 16) - 200, 2)
    );
    var b1distFromTopRightCorner = Math.sqrt(
      Math.pow((b1left + 16) - 531, 2) + Math.pow((b1top + 16) - 200, 2)
    );
    var b1distFromBotLeftCorner = Math.sqrt(
      Math.pow((b1left + 16) - 403, 2) + Math.pow((b1top + 16) - 328, 2)
    );
    var b1distFromBotRightCorner = Math.sqrt(
      Math.pow((b1left + 16) - 531, 2) + Math.pow((b1top + 16) - 328, 2)
    );

    //b1 left side
    if(b1left + 32 >= 403 + 1 && b1left + 32 <= 403 + 20 && b1top + 16 >= 200 && b1top + 16 <= 328)
    {
      b1active = false;
      bullet1.style.visibility = 'hidden';
    }

    //b1 right side
    if(b1left <= 531 - 1 && b1left >= 531 - 20 && b1top + 16 >= 200 && b1top + 16 <= 328)
    {
      b1active = false;
      bullet1.style.visibility = 'hidden';
    }

    //b1 top side
    if(b1top + 32 >= 200 - 1 && b1top + 32 <= 200 + 20 && b1left + 16 >= 403 && b1left + 16 <= 531)
    {
      b1active = false;
      bullet1.style.visibility = 'hidden';
    }

    //b1 bot side
    if(b1top <= 328 + 1 && b1top >= 328 - 20 && b1left + 16 >= 403 && b1left + 16 <= 531)
    {
      b1active = false;
      bullet1.style.visibility = 'hidden';
    }

    if(b1distFromTopLeftCorner <= 15)
    {
      b1active = false;
      bullet1.style.visibility = 'hidden';
    }
    if(b1distFromTopRightCorner <= 15)
    {
      b1active = false;
      bullet1.style.visibility = 'hidden';
    }
    if(b1distFromBotLeftCorner <= 15)
    {
      b1active = false;
      bullet1.style.visibility = 'hidden';
    }
    if(b1distFromBotRightCorner <= 15)
    {
      b1active = false;
      bullet1.style.visibility = 'hidden';
    }

    if(b1distFromP2 <= 16 + 64)
    {
      player2.style.visibility = 'hidden';

      //b1active = false;
      //bullet1.style.visibility = 'hidden';
    }
  }

  if(b1reloadTimer > 0)
  {
    b1reloadTimer -= refresh;

    if(b1active && b1reloadTimer <= 0)
    {
      b1active = false;
      bullet1.style.visibility = 'hidden';
    }
  }

  var p1relBarHeight = 64 * b1reloadTimer / reloadTime;
  var p1relBarTop = 296 - p1relBarHeight;

  player1reloadBar.style.height = p1relBarHeight + 'px';
  player1reloadBar.style.top = p1relBarTop + 'px';

///////////////////////////////////////////////////////////////////////////////
  //b2

  if(b2active)
  {
    if(b2firstFrame)
    {
      b2firstFrame = false;
      b2left = p2left + 64 - 16 + Math.sin(b2ang * Math.PI / 180.0) * 48;
      b2top = p2top + 64 - 16 - Math.cos(b2ang * Math.PI / 180.0) * 48;
      bullet2.style.left = b2left + 'px';
      bullet2.style.top = b2top + 'px';
      bullet2.style.visibility = 'visible';
    }
    else
    {
      b2left += Math.sin(b2ang * Math.PI / 180.0) * bulletVel;
      b2top -= Math.cos(b2ang * Math.PI / 180.0) * bulletVel;
      bullet2.style.left = b2left + 'px';
      bullet2.style.top = b2top + 'px';
    }

    //collisions

    var b2distFromP1 = Math.sqrt(
      Math.pow((b2left + 16) - (p1left + 64), 2) + Math.pow((b2top + 16) - (p1top + 64), 2)
    );
    var b2distFromTopLeftCorner = Math.sqrt(
      Math.pow((b2left + 16) - 403, 2) + Math.pow((b2top + 16) - 200, 2)
    );
    var b2distFromTopRightCorner = Math.sqrt(
      Math.pow((b2left + 16) - 531, 2) + Math.pow((b2top + 16) - 200, 2)
    );
    var b2distFromBotLeftCorner = Math.sqrt(
      Math.pow((b2left + 16) - 403, 2) + Math.pow((b2top + 16) - 328, 2)
    );
    var b2distFromBotRightCorner = Math.sqrt(
      Math.pow((b2left + 16) - 531, 2) + Math.pow((b2top + 16) - 328, 2)
    );

    //b2 left side
    if(b2left + 32 >= 403 + 1 && b2left + 32 <= 403 + 20 && b2top + 16 >= 200 && b2top + 16 <= 328)
    {
      b2active = false;
      bullet2.style.visibility = 'hidden';
    }

    //b2 right side
    if(b2left <= 531 - 1 && b2left >= 531 - 20 && b2top + 16 >= 200 && b2top + 16 <= 328)
    {
      b2active = false;
      bullet2.style.visibility = 'hidden';
    }

    //b2 top side
    if(b2top + 32 >= 200 - 1 && b2top + 32 <= 200 + 20 && b2left + 16 >= 403 && b2left + 16 <= 531)
    {
      b2active = false;
      bullet2.style.visibility = 'hidden';
    }

    //b2 bot side
    if(b2top <= 328 + 1 && b2top >= 328 - 20 && b2left + 16 >= 403 && b2left + 16 <= 531)
    {
      b2active = false;
      bullet2.style.visibility = 'hidden';
    }

    if(b2distFromTopLeftCorner <= 15)
    {
      b2active = false;
      bullet2.style.visibility = 'hidden';
    }
    if(b2distFromTopRightCorner <= 15)
    {
      b2active = false;
      bullet2.style.visibility = 'hidden';
    }
    if(b2distFromBotLeftCorner <= 15)
    {
      b2active = false;
      bullet2.style.visibility = 'hidden';
    }
    if(b2distFromBotRightCorner <= 15)
    {
      b2active = false;
      bullet2.style.visibility = 'hidden';
    }

    if(b2distFromP1 <= 16 + 64)
    {
      player1.style.visibility = 'hidden';

      //b2active = false;
      //bullet2.style.visibility = 'hidden';
    }
  }

  if(b2reloadTimer > 0)
  {
    b2reloadTimer -= refresh;

    if(b2active && b2reloadTimer <= 0)
    {
      b2active = false;
      bullet2.style.visibility = 'hidden';
    }
  }

  var p2relBarHeight = 64 * b2reloadTimer / reloadTime;
  var p2relBarTop = 296 - p2relBarHeight;

  player2reloadBar.style.height = p2relBarHeight + 'px';
  player2reloadBar.style.top = p2relBarTop + 'px';

}, refresh);

function convertToIndex(keycode)
{
  switch(keycode)
  {
    case 'KeyW':return 0;
      break;
    case 'KeyA':return 1;
      break;
    case 'KeyS':return 2;
      break;
    case 'KeyD':return 3;
      break;
    case 'KeyI':return 4;
      break;
    case 'KeyJ':return 5;
      break;
    case 'KeyK':return 6;
      break;
    case 'KeyL':return 7;
      break;
    case 'Space':return 8;
      break;
    case 'ArrowUp':
    case 'ArrowLeft':
    case 'ArrowDown':
    case 'ArrowRight':return 9;
      break;
  }
}

///////////////////////////////////////////////////////////////////////////////
//keydown event listeners
for(var i=0;i<1;i++)
{
  document.addEventListener('keydown', (event) =>
  {
    var keydown = `${event.code}`;
    keysPressed[convertToIndex(keydown)] = true;
  });
}

///////////////////////////////////////////////////////////////////////////////
//keyup event listener
  
for(var i=0;i<1;i++)
{
  document.addEventListener('keyup', (event) =>
  {
    var keyup = `${event.code}`;
    keysPressed[convertToIndex(keyup)] = false;
  });
}