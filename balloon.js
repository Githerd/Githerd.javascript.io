// script.js

document.addEventListener("DOMContentLoaded", 

function() {
const GWINDOW_WIDTH = 500;
const GWINDOW_HEIGHT = 300;
const BALLOON_WIDTH = 140;
const BALLOON_HEIGHT = 160;
const BALLOON_LABEL = "Submitted!";
const CORD_LENGHT= 100;

function RedBalloon () {
  let gw = Gwindow(GWINDOW_WIDTH,GWINDOW_HEIGHT);
  let cx = gw.getWidth () /2;
  let cy =gw.getHeight() / 2;
  let balloonX = cx- BALLOON_WIDTH /2;
  let ballonY = cy - ( BALLOON_HEIGHT + CORD_LENGHT) / 2;
  let balloon = GOval(balloonX, balloonY, BALLOON_WIDTH, BALLOON_HEIGHT);
  balloon.setFilled(true);
  balloon.setFillColor("Red");
  let cordY= balloonY + BALLOON_HEIGHT;
  let cord = GLine(cx, cordY, CX, cordY + CORD_LENGTH);
  let label = GLabel (BALLOON_LABEL);
  label.setFont ("bold 28px 'Helvetica Neue', 'Arial','Sans-Serif'");
  label.setColor("White");
  let labelX = cx - label.getwidth() / 2 ;
  let labelY =balloonY + (BALLOON_HEIGHT + label.getAscent()) / 2;
  gw.add(balloon);
  gw.add(cord);
  gw.add(label, labelX, labeY);
}
});
