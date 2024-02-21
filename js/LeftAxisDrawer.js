class LeftAxisDrawer {
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

        createGrid(this.svg, width, height, gridId,"transformation");
    }
    clear() {
        // Remove existing points
        this.points.forEach(point => point.remove());
        this.points = [];
        // Remove existing lines
        this.lines.forEach(line => line.remove());
        this.lines = [];
    }

    receivePoints(points) {
        
            // points.push({x: 400, y:points[points.length-1].x })
        
        // points.push({x: 400, y: 200  })

        // Get the values from the input elements
        var A = document.querySelectorAll("[type=text]")[0].value
        var a = document.querySelectorAll("[type=text]")[1].value
        var t0 = document.querySelectorAll("[type=text]")[2].value
        var C = document.querySelectorAll("[type=text]")[3].value
        var gridSize = 40; // Grid size is constant at 20
       
        this.clear()
        points.forEach(({ x, y }, index) => {
            // Apply transformations
            let transformedX
            let transformedY
          
            x=(x-200)
            x=x*(1/a)
            x=x+200
            y=(y-200)
            y=y*(A)
            y=y+200
            
            transformedX =  (x - (1/a)*t0 * gridSize); // Consider grid size for time shift
            transformedY =  y - C * gridSize;
  
            const point = addPoint(this.svg, transformedX, transformedY, this.pointRadius, "green");
            this.points.push(point);
        
            // Draw lines between points
            if (index > 0) {
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
        });  
    }
}

