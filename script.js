      
let c = document.getElementById('cnv');
let ct = c.getContext('2d');
ct.clearRect(0, 0, c.width, c.height);
ct.beginPath();
ct.setLineDash([]);
ct.transform(1, 0, 0, -1, 0, c.height);
ct.strokeStyle='#118830';
let y0 = 350;
let x0 = 500;
const size = 50000;
let massPoints = grid(); 
for(let i = 0; i < massPoints.length; i++){
    ct.moveTo(massPoints[i][0].x/size + x0, massPoints[i][0].y/size + y0);
    for(let j = 0; j < massPoints[i].length; j++){
      ct.lineTo(massPoints[i][j].x/size + x0, massPoints[i][j].y/size + y0);
    }   
}

ct.stroke();

  const Ulaanbaatar = {
    x : 47,
    y : 106
  };
  const Islamabad = {
    x : 33,
    y : 73
  };
  const Maputo = {
    x : -25,
    y : 32
  }

    
function slerpCurves(city1, city2){
    let c = document.getElementById('cnv');
    let ct = c.getContext('2d');
    ct.beginPath();
    ct.setLineDash([]);
    ct.lineWidth=2;
    ct.strokeStyle='#640052';
    let p = slerp(city1, city2);
    let massPoints = [];
    for(let i = 0; i < p.length; i++){
        massPoints.push(bonne(p[i].x, p[i].y));
    }
    let y0 = 350;
		let x0 = 500;
		const size = 50000;
    ct.moveTo(massPoints[0].x/size + x0, massPoints[0].y/size + y0);
    for(let i= 0; i < 360; i += 40) {
        angle = i;
        let xn = 2 * Math.cos(angle * Math.PI/180);
        let yn = 2 * Math.sin(angle * Math.PI/180);
        ct.lineTo((massPoints[0].x/size + x0) + xn, (massPoints[0].y/size + y0) + yn);
    }
    ct.moveTo(massPoints[massPoints.length-1].x/size + x0, massPoints[massPoints.length-1].y/size + y0);
    for(let i= 0; i < 360; i += 40) {
        angle = i;
        let xn = 2 * Math.cos(angle * Math.PI/180);
        let yn = 2 * Math.sin(angle * Math.PI/180);
        ct.lineTo((massPoints[massPoints.length-1].x/size + x0) + xn, (massPoints[massPoints.length-1].y/size + y0) + yn);
    }
    ct.moveTo(massPoints[0].x/size + x0, massPoints[0].y/size + y0);
    for(let i = 1; i < massPoints.length; i++){
        ct.lineTo(massPoints[i].x/size + x0, massPoints[i].y/size + y0);
    }
    ct.stroke();
}


function slerp(p0,p1){
	let mas = [];
	let omg = Math.acos((p0.x * p1.x + p0.y*p1.y) / (Math.sqrt(p0.x*p0.x + p0.y*p0.y) * Math.sqrt(p1.x*p1.x + p1.y*p1.y)));
	for(let i = 0; i < 60; i++){
		let t = i/60;
		let x = Math.sin((1 - t) * omg) / Math.sin(omg)*p0.x + Math.sin(t * omg) / Math.sin(omg) * p1.x;
		let y = Math.sin((1 - t) * omg) / Math.sin(omg)*p0.y + Math.sin(t * omg) / Math.sin(omg) * p1.y;
		mas.push({
			x : x,
			y : y
		});
	}
	return mas;
}

function grid(){
    let mp = [];
    for(let i = -90; i <= 90; i += 20){
      let masTemp = [];
      for(let j = -180; j <= 180; j += 1){
        masTemp.push(bonne(i,j));
      }
      mp.push(masTemp);
    }
    for(let i = -180; i <= 180; i += 10){
      let masTemp = [];
      for(let j = -90; j <= 90; j += 1){
        masTemp.push(bonne(j,i));
      }
      mp.push(masTemp);
    }
    return mp;
  }

function bonne(phi,lambda) {
		const phi1 = 50;  
		const lambda0 = 0;
		const R = 6370997;
		let p = R * ( Math.cos(phi1* Math.PI / 180)/Math.sin(phi1* Math.PI / 180) + phi1*Math.PI/180 - phi*Math.PI/180 );
		let E = R * (lambda -  lambda0) * Math.cos(phi* Math.PI / 180) / p;
    let x = p * Math.sin(E* Math.PI / 180);
    let y = R * Math.cos(phi1* Math.PI / 180)/Math.sin(phi1* Math.PI / 180) - p * Math.cos(E* Math.PI / 180);
    return({
        x : x,
        y : y
      });
}
	
	
	slerpCurves(Ulaanbaatar, Islamabad);
	slerpCurves(Ulaanbaatar, Maputo);