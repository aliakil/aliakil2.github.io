
class draw3 {
  constructor(width, height, pointRadius, gridId) {
      this.width = width;
      this.height = height;
      this.pointRadius = pointRadius;
      this.points = [];
      this.lines = [];
      this.actionsStack = [];
      this.gridId = gridId;

      this.initialize();
  }
  initialize() {
      const { width, height, gridId } = this;

      this.svg = d3.select("body")
          .append("svg")
          .attr("width", width)
          .attr("height", height);

      createGrid(this.svg, width, height, gridId,"xeven/xodd");
  }
  clear() {
      // Remove existing points
      this.points.forEach(point => point.remove());
      this.points = [];
      // Remove existing lines
      this.lines.forEach(line => line.remove());
      this.lines = [];
  }
  
  draw3receveoints(points) {
      
          // points.push({x: 400, y:points[points.length-1].x })
      
      // points.push({x: 400, y: 200  })

      // Get the values from the input elements
      var A =1
      var a = -1
      var t0 = 0
      var C = 0
      var gridSize = 40; // Grid size is constant at 20
     
      this.clear()
      let points2=points
      
      var mappedPoints = points2.map(({ x, y }) => {
        // Perform the operations on each x and y
        x = (x - 200) * (1 / a) + 200 - (1 / a) * t0 * gridSize;
        y = (y - 200) * A + 200 - C * gridSize;
    
        // Return the modified x and y values as an object
        return { x, y };
    });
  let ponntsn = points.map(({ x, y }) => {
  // Perform the operations on each x and y
  x = (x - 200) / 40;
  y = (200 - y) / 40;

  // Return the modified x and y values as an object
  return { x, y };
});
  let  mappedPointsn = mappedPoints.map(({ x, y }) => {
    // Perform the operations on each x and y
    x=(x-200)/40
    y=(200-y)/40
    // Return the modified x and y values as an object
    return { x, y };
});

let a1=ponntsn


let a2=mappedPointsn.reverse()





let u=[...new Set([... new Set(a1.map(item=>item.x)),...new Set(a2.map(item=>item.x))])].sort(function(a,b){return a - b})
console.log(u)
let temp
let temp2
let calc
let meregepoints=[]
let toogle;
const averageY = (point1, point2,n) => {
  toogle =document.querySelector('#toggleButton').textContent ==='Even' ? 0:1
  if (toogle==1)
  {
  // return (point1.y + point2.y) / 2
  // if(point1.x<0)
  if (n==0)
  return (point1.y - point2.y) / 2
  // if(point2.x<0)  
  // return -(point1.y - point2.y) / 2
  return  (point2.y - point1.y) / 2
  }
  return (point1.y + point2.y) / 2
};
let n
let largerTemp;
let smallerTemp
u.forEach(x=>{

  temp = a1.filter(p => p.x === x);
  temp2 = a2.filter(p => p.x === x);
  if (temp.length === 0) {temp.push({ x: x, y: 0 });}
  if (temp2.length === 0) {temp2.push({ x: x, y: 0 });}
  
   if(temp.length >= temp2.length){
  largerTemp=temp;
  smallerTemp=temp2;
    n=0
   }else{
    smallerTemp=temp;
    largerTemp=temp2;
    n=1;
   }

  // Map the points in the larger array based on the conditions
  calc = largerTemp.map((point, index) => {
    if (index < smallerTemp.length) {
      // Both temp and temp2 have points at this index
      return {
        x: point.x,
        y: averageY(point, smallerTemp[index],n)
      };
    } else  {
      // temp[1] exists but temp2[1] does not
      return {
        x: point.x,
        y: averageY(point, smallerTemp[smallerTemp.length - 1],n)
      };
    } 
  });

  meregepoints=[...meregepoints,...calc]

})
 




// Determine the larger array between temp and temp2



console.log(meregepoints)
let mp = meregepoints.map(({ x, y }) => {
    // Perform the operations on each x and y
    x=(x*40)+200
    y=200-(y*40)
    // Return the modified x and y values as an object
    return { x, y };
});
// console.log(mp)  // points=points.reverse()

    
    // Now newArray contains the desired points
   
    for (let iss = 0; iss < mp.length; iss++) {
      // Create a green point for the transformed x value
      const point = addPoint(this.svg, mp[iss].x, mp[iss].y, this.pointRadius, "green");
      this.points.push(point);
      
      // Draw lines between points
      if (iss > 0) {
          const lastIndex = this.points.length - 2;
          const secondLastPoint = this.points[lastIndex];
          const line = this.svg.append("line")
              .attr("x1", secondLastPoint.attr("cx"))
              .attr("y1", secondLastPoint.attr("cy"))
              .attr("x2", point.attr("cx"))
              .attr("y2", point.attr("cy"))
              .attr("stroke", "green");
  
          this.lines.push(line);
      }
  }

  }
}

