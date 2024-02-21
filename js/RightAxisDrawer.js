
class RightAxisDrawer {
    
    constructor(svg, width, height, pointRadius) {
     this.leftAxis = new LeftAxisDrawer( width, height, pointRadius, "id1");
     this.draw=new draw3(width, height, pointRadius, "id3");
      this.svg = svg;
      this.width = width;
      this.height = height;
      this.pointRadius = pointRadius;
        this.points=[]
        this.cor=[]//{x: -400, y: 200  }
       

      this.isMouseDown = false;
     
      this.lines = [];
      this.actionsStack = [];
  
      this.initialize();
    }
  
    initialize() {
      const { svg, width, height } = this;
      d3.select("body")
      .append("button")
      .text("Undo")
      .on("click", this.undoLastAction.bind(this));
      createGrid(svg, width, height,"id1");
        
      svg.on("mousemove", this.handleMouseMove.bind(this));
      svg.on("mousedown", this.handleMouseDown.bind(this));
      svg.on("mouseup", this.handleMouseUp.bind(this));
  
    }
    transferPointsToLeftAxis() {
        // Get points from the right axis
        const pointsToTransfer = this.cor;
        // console.log(pointsToTransfer)
        // Transfer points to the left axis
        this.leftAxis.receivePoints(pointsToTransfer);
        this.draw.draw3receveoints(pointsToTransfer)
    }
    undoLastAction() {
        const lastAction = this.actionsStack.pop();

        if (lastAction) {
            if (lastAction.type === "addPoint") {
                const removedPoint = this.points.pop();
                this.cor.pop();
                removedPoint.remove();
            } else if (lastAction.type === "addLine") {
                const removedLine = this.lines.pop();
                removedLine.remove();
            }

            // Transfer updated points to the left axis
            this.transferPointsToLeftAxis();
        }
    }
    handleMouseMove(event) {
      if (this.isMouseDown) {
        return;
      }
  
      const [x, y] = d3.pointer(event);
      const snappedX = Math.round(x / 20);
      const snappedY = Math.round(y / 20);
      this.svg.select(".temp-point").remove();
  
      this.svg.append("circle")
        .attr("class", "temp-point")
        .attr("cx", snappedX * 20) // Snap to grid and convert back to original coordinates
        .attr("cy", snappedY * 20)
        .attr("r", this.pointRadius)
        .style("fill", "red")
        .style("opacity", 0.3);
    }
  
    handleMouseDown(event) {
        this.isMouseDown = true;
      
        const [x, y] = d3.pointer(event);
        const snappedX = Math.round(x / 20);
        const snappedY = Math.round(y / 20);
      
        this.svg.select(".temp-point").remove();
      
        // Assuming addPoint returns the created point
        const point = addPoint(this.svg, snappedX * 20, snappedY * 20, this.pointRadius, "red");
      
        this.actionsStack.push({ type: "addPoint", data: { x: snappedX * 20, y: snappedY * 20 } });
      
        this.points.push(point); // Use this.points instead of points
        this.cor.push({x: snappedX * 20, y: snappedY * 20 })
      
        if (this.points.length > 1) {
          const lastIndex = this.points.length - 1;
          const secondLastIndex = lastIndex - 1;
          const secondLastPoint = this.points[secondLastIndex];
          const lastPoint = this.points[lastIndex];
      
          const line = this.svg.append("line")
            .attr("x1", secondLastPoint.attr("cx"))
            .attr("y1", secondLastPoint.attr("cy"))
            .attr("x2", lastPoint.attr("cx"))
            .attr("y2", lastPoint.attr("cy"))
            .attr("stroke", "blue");
      
          this.actionsStack.push({ type: "addLine", data: { line } });
      
          this.lines.push(line);
        }
      }
      
      handleMouseUp() {
        this.isMouseDown = false;
      }
      
  
    

  }
  
