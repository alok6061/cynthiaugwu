var timeout;
// this is gor smoth moving scrollbar
const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});
// this is for animation por moving nevbar
function firstPageAnim(){
    var tl=gsap.timeline();
    tl.from("#nav",{
        y: '-10',
        opacity:0,
        duration:1.5,
        ease:Expo.easeInOut
    })
    // this for  animation is present in main
     .to(".boundinglem",{
        y: 0,
        ease:Expo.easeInOut,
        duration:2,
        delay:-1,
        stagger: .2
    })
    .from("#herofooter",{
        y:'-10',
        opacity:0,
        duration:1.5,
        delay:-1,
        ease:Expo.easeInOut
     
    })
}
// this is for when we move mouse the circle change its shape
 

function circleChaptaKaro(){
    // define default value
    var xscale=1;
    var yscale=1;
    // define previous value
    var xprev=0;
    var yprev=0;

    window.addEventListener("mousemove",function(dets){
        xscale=gsap.utils.clamp(.8,1.2,dets.clientX-xprev);
        yscale=gsap.utils.clamp(.8,1.2,dets.clientY-yprev);
        xprev=dets.clientX;  
        yprev=dets.clientY;
        
        circleMouseFollower(xscale,yscale);

        timeout= this.setTimeout(function(){
            document.querySelector("#miniircle").style.transform=`translate(${dets.clientX}px, ${dets.clientY}px) scale(1, 1)`;

        }, 100);


        
    })
}
circleChaptaKaro();

function circleMouseFollower(xscale,yscale) {
    window.addEventListener("mousemove", function(dets){
        document.querySelector("#minicircle").style.transform=`translate(${dets.clientX}px,${dets.clientY}px)scale(${xscale},${yscale})`;
    })
}
circleChaptaKaro();
circleMouseFollower();
firstPageAnim();

document.querySelectorAll(".elem").forEach(function (elem) {
    var rotate = 0;
    var diffrot = 0;
    elem.addEventListener("mouseleave", function (dets) {
        gsap.to(elem.querySelector("img"), {
          opacity: 0,
          ease: Power3,
          duration: 0.5,
        });
      });
   
  
    elem.addEventListener("mousemove", function (dets) {
      var diff = dets.clientY - elem.getBoundingClientRect().top;
      diffrot = dets.clientX - rotate;
      rotate = dets.clientX;
    ;
      gsap.to(elem.querySelector("img"), {
        opacity: 1,
        ease: Power3,
        top: diff,
        left: dets.clientX,
        rotate: gsap.utils.clamp(-20, 20, diffrot * 0.1),
      });
    });
  });
  function updateTime() {
    let now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let ampm = hours >= 12 ? 'PM' : 'AM';

    // Convert 24-hour to 12-hour format
    hours = hours % 12 || 12;
    minutes = minutes < 10 ? '0' + minutes : minutes; // Add leading zero

    let timeString = `${hours}: ${minutes}  ${ampm} ET`;

    document.getElementById("time").innerText = timeString;
}

// Update time immediately and then every second
updateTime();
setInterval(updateTime, 1000);