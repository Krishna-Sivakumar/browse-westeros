function getMousePos(canvas, evt){
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    }
}

window.onscroll = () => {
  
  function getScrollPercent() {
    var h = document.documentElement, 
        b = document.body,
        st = 'scrollTop',
        sh = 'scrollHeight';
    return (h[st]||b[st]) / ((h[sh]||b[sh]) - h.clientHeight) * 100;
  }

  progress_bar = document.getElementById("scrollProgress");
  progress_bar.value = String(getScrollPercent()); 

}

function findRectangle(mousePos){
  for (i in rectangles){
    rect = rectangles[i];
    if (
      mousePos.x >= Math.min(rect[0].x, rect[1].x) && 
      mousePos.x <= Math.max(rect[0].x, rect[1].x) &&
      mousePos.y >= Math.min(rect[0].y, rect[1].y) && 
      mousePos.y <= Math.max(rect[0].y, rect[1].y)){
        return i;
      }
  }
  return -1;
}

function drawRectangle(i){
    if (rectangleDrawn) return;
    var ctx = canvas.getContext("2d");
    ctx.beginPath();
    width = rectangles[i][1].x - rectangles[i][0].x;
    height = rectangles[i][1].y - rectangles[i][0].y;
    ctx.fillStyle = "rgba(255,255,255,0.2)";
    ctx.fillRect(rectangles[i][0].x, rectangles[i][0].y, width, height);
    ctx.stroke();
    rectangleDrawn = true;
}

function drawZoomedSection(i){
    if (rectangleDrawn) return;
    var ctx = canvas.getContext("2d");
    
    /*
    rectangle_coords = Object.assign({}, rectangles[i]);
    rectangle_coords[0].x = Math.max(0, rectangle_coords[0].x-100)
    rectangle_coords[0].y = Math.max(0, rectangle_coords[0].y-100)
    rectangle_coords[1].x = Math.max(0, rectangle_coords[0].x+100)
    rectangle_coords[1].y = Math.max(0, rectangle_coords[0].y+100)
    

    scaled_coords = {
      x: rectangle_coords[0].x * 3600 / 1250,
      y: rectangle_coords[0].y * 3600 / 1250,
    }
    */

    scaled_coords = {
      x: i.x * 3600 / 1250,
      y: i.y * 3600 / 1250,
    }

    ctx.filter = "brightness(1.2)";
    img = document.getElementById("src_image")


    /*
    ctx.drawImage(img, scaled_coords.x - 100, scaled_coords.y - 400, 450, 900,
      rectangle_coords[0].x - 100, rectangle_coords[0].y - 100, 200, 400);
    */

   ctx.drawImage(img, scaled_coords.x - 200, scaled_coords.y - 400, 450, 900,
      i.x - 100, i.y - 100, 200, 400);

      rectangleDrawn = true;
}

window.onload = () =>{
  canvasWidth = 1250;
  canvas = document.getElementsByTagName('canvas').mapCanvas;
  canvas.height = canvasWidth*2;
  canvas.width = canvasWidth;
  ctx = canvas.getContext('2d');

  rectangleDrawn = false;

  canvas.addEventListener('mousemove', evt => {
    mousePos = getMousePos(canvas, evt);
    index = findRectangle(mousePos);
    if (index > -1){
        if (rectangleDrawn){
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          rectangleDrawn = false;
      }
      drawZoomedSection(mousePos);
      //drawZoomedSection(i);
      return;
    }
    if (rectangleDrawn){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        rectangleDrawn = false;
    }
  });

    canvas.addEventListener('click', evt => {
        mousePos = getMousePos(canvas, evt);
        index = findRectangle(mousePos);
        if (index > -1){
          window.open(rectangles[i].link);
        }
    });
}




rectangles = [
  [
    {
      "x": 634,
      "y": 315.6875
    },
    {
      "x": 713,
      "y": 338.6875
    },
    "https://awoiaf.westeros.org/index.php/Fist_of_the_First_Men"
  ],
  [
    {
      "x": 788,
      "y": 299.6875
    },
    {
      "x": 865,
      "y": 316.6875
    },
    "https://awoiaf.westeros.org/index.php/Hardhome"
  ],
  [
    {
      "x": 819,
      "y": 412.6875
    },
    {
      "x": 945,
      "y": 432.6875
    },
    "https://awoiaf.westeros.org/index.php/Eastwatch-by-the-Sea"
  ],
  [
    {
      "x": 736,
      "y": 391.6875
    },
    {
      "x": 814,
      "y": 404.6875
    },
    "https://awoiaf.westeros.org/index.php/Whitetree"
  ],
  [
    {
      "x": 706,
      "y": 362.6875
    },
    {
      "x": 789,
      "y": 374.6875
    },
    "https://awoiaf.westeros.org/index.php/Craster%27s_Keep"
  ],
  [
    {
      "x": 702,
      "y": 407.6875
    },
    {
      "x": 779,
      "y": 420.6875
    },
    "https://awoiaf.westeros.org/index.php/Castle_Black"
  ],
  [
    {
      "x": 662,
      "y": 486.6875
    },
    {
      "x": 737,
      "y": 499.6875
    },
    "https://awoiaf.westeros.org/index.php/Queenscrown"
  ],
  [
    {
      "x": 767,
      "y": 580.6875
    },
    {
      "x": 851,
      "y": 596.6875
    },
    "https://awoiaf.westeros.org/index.php/Last_Hearth"
  ],
  [
    {
      "x": 947,
      "y": 661.6875
    },
    {
      "x": 1024,
      "y": 674.6875
    },
    "https://awoiaf.westeros.org/index.php/Karhold"
  ],
  [
    {
      "x": 782,
      "y": 742.6875
    },
    {
      "x": 857,
      "y": 753.6875
    },
    "https://awoiaf.westeros.org/index.php/Dreadfort"
  ],
  [
    {
      "x": 566,
      "y": 783.6875
    },
    {
      "x": 670,
      "y": 799.6875
    },
    "https://awoiaf.westeros.org/index.php/Winterfell"
  ],
  [
    {
      "x": 420,
      "y": 670.6875
    },
    {
      "x": 500,
      "y": 698.6875
    },
    "https://awoiaf.westeros.org/index.php/Deepwood_Motte"
  ],
  [
    {
      "x": 457,
      "y": 868.6875
    },
    {
      "x": 553,
      "y": 882.6875
    },
    "https://awoiaf.westeros.org/index.php/Torrhen%27s_Square"
  ],
  [
    {
      "x": 691,
      "y": 1011.6875
    },
    {
      "x": 766,
      "y": 1026.6875
    },
    "https://awoiaf.westeros.org/index.php/White_Harbor"
  ],
  [
    {
      "x": 783,
      "y": 965.6875
    },
    {
      "x": 862,
      "y": 980.6875
    },
    "https://awoiaf.westeros.org/index.php/Ramsgate"
  ],
  [
    {
      "x": 975,
      "y": 981.6875
    },
    {
      "x": 1073,
      "y": 995.6875
    },
    "https://awoiaf.westeros.org/index.php/Widow%27s_Watch"
  ],
  [
    {
      "x": 430,
      "y": 993.6875
    },
    {
      "x": 503,
      "y": 1005.6875
    },
    "https://awoiaf.westeros.org/index.php/Barrowton"
  ],
  [
    {
      "x": 286,
      "y": 1134.6875
    },
    {
      "x": 362,
      "y": 1149.6875
    },
    "https://awoiaf.westeros.org/index.php/Flint%27s_Finger"
  ],
  [
    {
      "x": 517,
      "y": 1171.6875
    },
    {
      "x": 586,
      "y": 1192.6875
    },
    "https://awoiaf.westeros.org/index.php/Greywater_Watch"
  ],
  [
    {
      "x": 718,
      "y": 1145.6875
    },
    {
      "x": 817,
      "y": 1159.6875
    },
    "https://awoiaf.westeros.org/index.php/Sisterton"
  ],
  [
    {
      "x": 816,
      "y": 1214.6875
    },
    {
      "x": 911,
      "y": 1229.6875
    },
    "https://awoiaf.westeros.org/index.php/Coldwater_Burn"
  ],
  [
    {
      "x": 836,
      "y": 1261.6875
    },
    {
      "x": 928,
      "y": 1274.6875
    },
    "https://awoiaf.westeros.org/index.php/Snakewood_(forest)"
  ],
  [
    {
      "x": 925,
      "y": 1295.6875
    },
    {
      "x": 1021,
      "y": 1309.6875
    },
    "https://awoiaf.westeros.org/index.php/Longbow_Hall"
  ],
  [
    {
      "x": 511,
      "y": 1312.6875
    },
    {
      "x": 589,
      "y": 1323.6875
    },
    "https://awoiaf.westeros.org/index.php/Twins"
  ],
  [
    {
      "x": 483,
      "y": 1348.6875
    },
    {
      "x": 544,
      "y": 1363.6875
    },
    "https://awoiaf.westeros.org/index.php/Seagard"
  ],
  [
    {
      "x": 339,
      "y": 1420.6875
    },
    {
      "x": 402,
      "y": 1430.6875
    },
    "https://awoiaf.westeros.org/index.php/Ten_Towers"
  ],
  [
    {
      "x": 251,
      "y": 1454.6875
    },
    {
      "x": 304,
      "y": 1467.6875
    },
    "https://awoiaf.westeros.org/index.php/Pyke"
  ],
  [
    {
      "x": 280,
      "y": 1504.6875
    },
    {
      "x": 334,
      "y": 1517.6875
    },
    "https://awoiaf.westeros.org/index.php/Banefort"
  ],
  [
    {
      "x": 245,
      "y": 1555.6875
    },
    {
      "x": 300,
      "y": 1569.6875
    },
    "https://awoiaf.westeros.org/index.php/Crag"
  ],
  [
    {
      "x": 176,
      "y": 1619.6875
    },
    {
      "x": 238,
      "y": 1633.6875
    },
    "https://awoiaf.westeros.org/index.php/Faircastle"
  ],
  [
    {
      "x": 539,
      "y": 1416.6875
    },
    {
      "x": 598,
      "y": 1425.6875
    },
    "https://awoiaf.westeros.org/index.php/Oldstones"
  ],
  [
    {
      "x": 532,
      "y": 1457.6875
    },
    {
      "x": 597,
      "y": 1468.6875
    },
    "https://awoiaf.westeros.org/index.php/Fairmarket"
  ],
  [
    {
      "x": 494,
      "y": 1488.6875
    },
    {
      "x": 590,
      "y": 1505.6875
    },
    "https://awoiaf.westeros.org/index.php/Inn_of_the_Kneeling_Man"
  ],
  [
    {
      "x": 495,
      "y": 1539.6875
    },
    {
      "x": 582,
      "y": 1556.6875
    },
    "https://awoiaf.westeros.org/index.php/Riverrun"
  ],
  [
    {
      "x": 591,
      "y": 1543.6875
    },
    {
      "x": 689,
      "y": 1562.6875
    },
    "https://awoiaf.westeros.org/index.php/Lord_Harroway%27s_Town"
  ],
  [
    {
      "x": 701,
      "y": 1323.6875
    },
    {
      "x": 768,
      "y": 1334.6875
    },
    "https://awoiaf.westeros.org/index.php/Strongsong"
  ],
  [
    {
      "x": 825,
      "y": 1340.6875
    },
    {
      "x": 921,
      "y": 1353.6875
    },
    "https://awoiaf.westeros.org/index.php/Heart%27s_Home"
  ],
  [
    {
      "x": 782,
      "y": 1373.6875
    },
    {
      "x": 876,
      "y": 1384.6875
    },
    "https://awoiaf.westeros.org/index.php/Eyrie"
  ],
  [
    {
      "x": 885,
      "y": 1390.6875
    },
    {
      "x": 948,
      "y": 1401.6875
    },
    "https://awoiaf.westeros.org/index.php/Ironoaks"
  ],
  [
    {
      "x": 935,
      "y": 1368.6875
    },
    {
      "x": 1004,
      "y": 1378.6875
    },
    "https://awoiaf.westeros.org/index.php/Old_Anchor"
  ],
  [
    {
      "x": 1012,
      "y": 1409.6875
    },
    {
      "x": 1082,
      "y": 1421.6875
    },
    "https://awoiaf.westeros.org/index.php/Runestone"
  ],
  [
    {
      "x": 1008,
      "y": 1451.6875
    },
    {
      "x": 1077,
      "y": 1463.6875
    },
    "https://awoiaf.westeros.org/index.php/Gulltown"
  ],
  [
    {
      "x": 303,
      "y": 1599.6875
    },
    {
      "x": 365,
      "y": 1614.6875
    },
    "https://awoiaf.westeros.org/index.php/Ashemark"
  ],
  [
    {
      "x": 553,
      "y": 1570.6875
    },
    {
      "x": 624,
      "y": 1582.6875
    },
    "https://awoiaf.westeros.org/index.php/High_Heart"
  ],
  [
    {
      "x": 644,
      "y": 1590.6875
    },
    {
      "x": 704,
      "y": 1602.6875
    },
    "https://awoiaf.westeros.org/index.php/Harrenhal"
  ],
  [
    {
      "x": 716,
      "y": 1513.6875
    },
    {
      "x": 778,
      "y": 1527.6875
    },
    "https://awoiaf.westeros.org/index.php/Saltpans"
  ],
  [
    {
      "x": 854,
      "y": 1450.6875
    },
    {
      "x": 924,
      "y": 1460.6875
    },
    "https://awoiaf.westeros.org/index.php/Redfort"
  ],
  [
    {
      "x": 847,
      "y": 1528.6875
    },
    {
      "x": 918,
      "y": 1540.6875
    },
    "https://awoiaf.westeros.org/index.php/Wickenden"
  ],
  [
    {
      "x": 936,
      "y": 1527.6875
    },
    {
      "x": 1008,
      "y": 1541.6875
    },
    "https://awoiaf.westeros.org/index.php/Dyre_Den"
  ],
  [
    {
      "x": 755,
      "y": 1608.6875
    },
    {
      "x": 821,
      "y": 1619.6875
    },
    "https://awoiaf.westeros.org/index.php/Antlers"
  ],
  [
    {
      "x": 819,
      "y": 1595.6875
    },
    {
      "x": 888,
      "y": 1607.6875
    },
    "https://awoiaf.westeros.org/index.php/Maidenpool"
  ],
  [
    {
      "x": 844,
      "y": 1634.6875
    },
    {
      "x": 904,
      "y": 1642.6875
    },
    "https://awoiaf.westeros.org/index.php/Rook%27s_Rest"
  ],
  [
    {
      "x": 1001,
      "y": 1583.6875
    },
    {
      "x": 1082,
      "y": 1594.6875
    },
    "https://awoiaf.westeros.org/index.php/Whispers"
  ],
  [
    {
      "x": 971,
      "y": 1640.6875
    },
    {
      "x": 1070,
      "y": 1660.6875
    },
    "https://awoiaf.westeros.org/index.php/Dragonstone"
  ],
  [
    {
      "x": 302,
      "y": 1667.6875
    },
    {
      "x": 365,
      "y": 1680.6875
    },
    "https://awoiaf.westeros.org/index.php/Sarsfield"
  ],
  [
    {
      "x": 397,
      "y": 1625.6875
    },
    {
      "x": 456,
      "y": 1641.6875
    },
    "https://awoiaf.westeros.org/index.php/Golden_Tooth"
  ],
  [
    {
      "x": 500,
      "y": 1621.6875
    },
    {
      "x": 571,
      "y": 1636.6875
    },
    "https://awoiaf.westeros.org/index.php/Pinkmaiden_Castle"
  ],
  [
    {
      "x": 514,
      "y": 1656.6875
    },
    {
      "x": 585,
      "y": 1670.6875
    },
    "https://awoiaf.westeros.org/index.php/Stoney_Sept"
  ],
  [
    {
      "x": 152,
      "y": 1698.6875
    },
    {
      "x": 211,
      "y": 1709.6875
    },
    "https://awoiaf.westeros.org/index.php/Kayce"
  ],
  [
    {
      "x": 147,
      "y": 1738.6875
    },
    {
      "x": 206,
      "y": 1749.6875
    },
    "https://awoiaf.westeros.org/index.php/Feastfires"
  ],
  [
    {
      "x": 157,
      "y": 1827.6875
    },
    {
      "x": 219,
      "y": 1841.6875
    },
    "https://awoiaf.westeros.org/index.php/Crakehall"
  ],
  [
    {
      "x": 246,
      "y": 1742.6875
    },
    {
      "x": 326,
      "y": 1763.6875
    },
    "https://awoiaf.westeros.org/index.php/Lannisport"
  ],
  [
    {
      "x": 280,
      "y": 1701.6875
    },
    {
      "x": 358,
      "y": 1719.6875
    },
    "https://awoiaf.westeros.org/index.php/Casterly_Rock"
  ],
  [
    {
      "x": 285,
      "y": 1800.6875
    },
    {
      "x": 342,
      "y": 1811.6875
    },
    "https://awoiaf.westeros.org/index.php/Cornfield"
  ],
  [
    {
      "x": 394,
      "y": 1665.6875
    },
    {
      "x": 458,
      "y": 1678.6875
    },
    "https://awoiaf.westeros.org/index.php/Hornvale"
  ],
  [
    {
      "x": 425,
      "y": 1720.6875
    },
    {
      "x": 497,
      "y": 1734.6875
    },
    "https://awoiaf.westeros.org/index.php/Deep_Den"
  ],
  [
    {
      "x": 401,
      "y": 1780.6875
    },
    {
      "x": 472,
      "y": 1796.6875
    },
    "https://awoiaf.westeros.org/index.php/Silverhill"
  ],
  [
    {
      "x": 671,
      "y": 1784.6875
    },
    {
      "x": 778,
      "y": 1808.6875
    },
    "https://awoiaf.westeros.org/index.php/King%27s_Landing"
  ],
  [
    {
      "x": 739,
      "y": 1668.6875
    },
    {
      "x": 809,
      "y": 1680.6875
    },
    "https://awoiaf.westeros.org/index.php/Sow%27s_Horn"
  ],
  [
    {
      "x": 778,
      "y": 1697.6875
    },
    {
      "x": 844,
      "y": 1706.6875
    },
    "https://awoiaf.westeros.org/index.php/Duskendale"
  ],
  [
    {
      "x": 754,
      "y": 1727.6875
    },
    {
      "x": 811,
      "y": 1742.6875
    },
    "https://awoiaf.westeros.org/index.php/Rosby"
  ],
  [
    {
      "x": 972,
      "y": 1694.6875
    },
    {
      "x": 1045,
      "y": 1707.6875
    },
    "https://awoiaf.westeros.org/index.php/Sharp_Point"
  ],
  [
    {
      "x": 985,
      "y": 1729.6875
    },
    {
      "x": 1063,
      "y": 1742.6875
    },
    "https://awoiaf.westeros.org/index.php/Stonedance"
  ],
  [
    {
      "x": 599,
      "y": 1832.6875
    },
    {
      "x": 669,
      "y": 1842.6875
    },
    "https://awoiaf.westeros.org/index.php/Tumbleton"
  ],
  [
    {
      "x": 413,
      "y": 1904.6875
    },
    {
      "x": 487,
      "y": 1918.6875
    },
    "https://awoiaf.westeros.org/index.php/Goldengrove"
  ],
  [
    {
      "x": 257,
      "y": 1946.6875
    },
    {
      "x": 318,
      "y": 1957.6875
    },
    "https://awoiaf.westeros.org/index.php/Old_Oak"
  ],
  [
    {
      "x": 369,
      "y": 2071.6875
    },
    {
      "x": 468,
      "y": 2091.6875
    },
    "https://awoiaf.westeros.org/index.php/Highgarden"
  ],
  [
    {
      "x": 471,
      "y": 2014.6875
    },
    {
      "x": 532,
      "y": 2028.6875
    },
    "https://awoiaf.westeros.org/index.php/Cider_Hall"
  ],
  [
    {
      "x": 559,
      "y": 2001.6875
    },
    {
      "x": 617,
      "y": 2016.6875
    },
    "https://awoiaf.westeros.org/index.php/Ashford"
  ],
  [
    {
      "x": 551,
      "y": 1947.6875
    },
    {
      "x": 613,
      "y": 1960.6875
    },
    "https://awoiaf.westeros.org/index.php/Longtable"
  ],
  [
    {
      "x": 569,
      "y": 1917.6875
    },
    {
      "x": 640,
      "y": 1931.6875
    },
    "https://awoiaf.westeros.org/index.php/Bitterbridge"
  ],
  [
    {
      "x": 644,
      "y": 1940.6875
    },
    {
      "x": 718,
      "y": 1952.6875
    },
    "https://awoiaf.westeros.org/index.php/Grassy_Vale"
  ],
  [
    {
      "x": 813,
      "y": 1876.6875
    },
    {
      "x": 886,
      "y": 1891.6875
    },
    "https://awoiaf.westeros.org/index.php/Bronzegate"
  ],
  [
    {
      "x": 828,
      "y": 1929.6875
    },
    {
      "x": 890,
      "y": 1946.6875
    },
    "https://awoiaf.westeros.org/index.php/Felwood"
  ],
  [
    {
      "x": 703,
      "y": 1995.6875
    },
    {
      "x": 782,
      "y": 2006.6875
    },
    "https://awoiaf.westeros.org/index.php/Summerhall"
  ],
  [
    {
      "x": 677,
      "y": 2045.6875
    },
    {
      "x": 758,
      "y": 2059.6875
    },
    "https://awoiaf.westeros.org/index.php/Blackhaven"
  ],
  [
    {
      "x": 243,
      "y": 2114.6875
    },
    {
      "x": 328,
      "y": 2137.6875
    },
    "https://awoiaf.westeros.org/index.php/Brightwater_Keep"
  ],
  [
    {
      "x": 194,
      "y": 2138.6875
    },
    {
      "x": 259,
      "y": 2153.6875
    },
    "https://awoiaf.westeros.org/index.php/Bandallon"
  ],
  [
    {
      "x": 221,
      "y": 2204.6875
    },
    {
      "x": 311,
      "y": 2224.6875
    },
    "https://awoiaf.westeros.org/index.php/Oldtown"
  ],
  [
    {
      "x": 188,
      "y": 2238.6875
    },
    {
      "x": 254,
      "y": 2250.6875
    },
    "https://awoiaf.westeros.org/index.php/Blackcrown"
  ],
  [
    {
      "x": 244,
      "y": 2283.6875
    },
    {
      "x": 321,
      "y": 2295.6875
    },
    "https://awoiaf.westeros.org/index.php/Three_Towers"
  ],
  [
    {
      "x": 336,
      "y": 2239.6875
    },
    {
      "x": 402,
      "y": 2256.6875
    },
    "https://awoiaf.westeros.org/index.php/Uplands"
  ],
  [
    {
      "x": 289,
      "y": 2335.6875
    },
    {
      "x": 385,
      "y": 2351.6875
    },
    "https://awoiaf.westeros.org/index.php/Sunhouse"
  ],
  [
    {
      "x": 497,
      "y": 2348.6875
    },
    {
      "x": 571,
      "y": 2366.6875
    },
    "https://awoiaf.westeros.org/index.php/Sandstone"
  ],
  [
    {
      "x": 423,
      "y": 2297.6875
    },
    {
      "x": 495,
      "y": 2313.6875
    },
    "https://awoiaf.westeros.org/index.php/Starfall"
  ],
  [
    {
      "x": 419,
      "y": 2268.6875
    },
    {
      "x": 508,
      "y": 2279.6875
    },
    "https://awoiaf.westeros.org/index.php/High_Hermitage"
  ],
  [
    {
      "x": 527,
      "y": 2263.6875
    },
    {
      "x": 598,
      "y": 2277.6875
    },
    "https://awoiaf.westeros.org/index.php/Skyreach"
  ],
  [
    {
      "x": 636,
      "y": 2246.6875
    },
    {
      "x": 707,
      "y": 2259.6875
    },
    "https://awoiaf.westeros.org/index.php/Yronwood"
  ],
  [
    {
      "x": 546,
      "y": 2208.6875
    },
    {
      "x": 620,
      "y": 2223.6875
    },
    "https://awoiaf.westeros.org/index.php/Kingsgrave"
  ],
  [
    {
      "x": 376,
      "y": 2138.6875
    },
    {
      "x": 437,
      "y": 2149.6875
    },
    "https://awoiaf.westeros.org/index.php/Horn_Hill"
  ],
  [
    {
      "x": 498,
      "y": 2130.6875
    },
    {
      "x": 561,
      "y": 2142.6875
    },
    "https://awoiaf.westeros.org/index.php/Nightsong"
  ],
  [
    {
      "x": 576,
      "y": 2154.6875
    },
    {
      "x": 657,
      "y": 2166.6875
    },
    "https://awoiaf.westeros.org/index.php/Vulture%27s_Roost"
  ],
  [
    {
      "x": 710,
      "y": 2125.6875
    },
    {
      "x": 752,
      "y": 2138.6875
    },
    "https://awoiaf.westeros.org/index.php/Wyl_(castle)"
  ],
  [
    {
      "x": 774,
      "y": 2198.6875
    },
    {
      "x": 858,
      "y": 2210.6875
    },
    "https://awoiaf.westeros.org/index.php/Ghaston_Grey"
  ],
  [
    {
      "x": 810,
      "y": 2230.6875
    },
    {
      "x": 879,
      "y": 2243.6875
    },
    "https://awoiaf.westeros.org/index.php/Tor"
  ],
  [
    {
      "x": 839,
      "y": 2292.6875
    },
    {
      "x": 912,
      "y": 2307.6875
    },
    "https://awoiaf.westeros.org/index.php/Godsgrace"
  ],
  [
    {
      "x": 796,
      "y": 2349.6875
    },
    {
      "x": 866,
      "y": 2361.6875
    },
    "https://awoiaf.westeros.org/index.php/House_Vaith"
  ],
  [
    {
      "x": 606,
      "y": 2343.6875
    },
    {
      "x": 681,
      "y": 2354.6875
    },
    "https://awoiaf.westeros.org/index.php/Hellholt"
  ],
  [
    {
      "x": 832,
      "y": 2379.6875
    },
    {
      "x": 908,
      "y": 2391.6875
    },
    "https://awoiaf.westeros.org/index.php/Salt_Shore"
  ],
  [
    {
      "x": 998,
      "y": 2325.6875
    },
    {
      "x": 1076,
      "y": 2340.6875
    },
    "https://awoiaf.westeros.org/index.php/Sunspear"
  ],
  [
    {
      "x": 982,
      "y": 2363.6875
    },
    {
      "x": 1061,
      "y": 2384.6875
    },
    "https://awoiaf.westeros.org/index.php/Lemonwood"
  ],
  [
    {
      "x": 958,
      "y": 2257.6875
    },
    {
      "x": 1034,
      "y": 2273.6875
    },
    "https://awoiaf.westeros.org/index.php/Ghost_Hill"
  ],
  [
    {
      "x": 1007,
      "y": 2120.6875
    },
    {
      "x": 1090,
      "y": 2136.6875
    },
    "https://awoiaf.westeros.org/index.php/Greenstone"
  ],
  [
    {
      "x": 801,
      "y": 2071.6875
    },
    {
      "x": 888,
      "y": 2089.6875
    },
    "https://awoiaf.westeros.org/index.php/Stonehelm"
  ],
  [
    {
      "x": 812,
      "y": 2022.6875
    },
    {
      "x": 895,
      "y": 2034.6875
    },
    "https://awoiaf.westeros.org/index.php/Crow%27s_Nest"
  ],
  [
    {
      "x": 877,
      "y": 1991.6875
    },
    {
      "x": 965,
      "y": 2007.6875
    },
    "https://awoiaf.westeros.org/index.php/Griffin%27s_Roost"
  ],
  [
    {
      "x": 914,
      "y": 1967.6875
    },
    {
      "x": 1025,
      "y": 1986.6875
    },
    "https://awoiaf.westeros.org/index.php/Storm%27s_End"
  ],
  [
    {
      "x": 963,
      "y": 1909.6875
    },
    {
      "x": 1044,
      "y": 1925.6875
    },
    "https://awoiaf.westeros.org/index.php/Evenfall_Hall"
  ],
  [
    {
      "x": 894,
      "y": 1856.6875
    },
    {
      "x": 972,
      "y": 1867.6875
    },
    "https://awoiaf.westeros.org/index.php/Haystack_Hall"
  ],
  [
    {
      "x": 984,
      "y": 2008.6875
    },
    {
      "x": 1068,
      "y": 2024.6875
    },
    "https://awoiaf.westeros.org/index.php/Rain_House"
  ]
]

for (i in rectangles){
  if (!("link" in rectangles[i])){
    rectangles[i].link = rectangles[i][2];
  }
}