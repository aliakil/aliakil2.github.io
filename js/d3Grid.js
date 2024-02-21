// js/d3Grid.js

function createGrid(svg, width, height, gridId, title) {
    const xScale = d3.scaleLinear()
        .domain([-5, 5])
        .range([0, width]);
  
    const yScale = d3.scaleLinear()
        .domain([-5, 5])
        .range([height, 0]);
  
    const xAxis = d3.axisBottom(xScale).ticks(11);
    const yAxis = d3.axisRight(yScale).ticks(11);
  
    // Append X-axis
    svg.append("g")
        .attr("class", `x-axis-${gridId}`)
        .attr("transform", `translate(0, ${height / 2})`)
        .call(xAxis);
  
    // Append Y-axis
    svg.append("g")
        .attr("class", `y-axis-${gridId}`)
        .attr("transform", `translate(${width / 2}, 0)`)
        .call(yAxis);
  
    // Append X-axis line
    svg.append("line")
        .attr("x1", 0)
        .attr("y1", height / 2)
        .attr("x2", width)
        .attr("y2", height / 2)
        .attr("stroke", "black")
        .attr("id", `${gridId}-x-axis-line`);
  
    // Append Y-axis line
    svg.append("line")
        .attr("x1", width / 2)
        .attr("y1", 0)
        .attr("x2", width / 2)
        .attr("y2", height)
        .attr("stroke", "black")
        .attr("id", `${gridId}-y-axis-line`);
  
    // Append title
    svg.append("text")
        .attr("x", width / 2)
        .attr("y", 20) // Adjust the Y position based on your preference
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("font-weight", "bold")
        .text(title);
  
    // Create the separate grid
    createSeparateGrid(svg, width, height, 0, 0, gridId);
  }
  

function createSeparateGrid(svg, width, height, xOffset, yOffset, gridId) {
  const gridSize = 20;

  // Create grid lines
  for (let x = xOffset; x <= width + xOffset; x += gridSize) {
      svg.append("line")
          .attr("x1", x)
          .attr("y1", yOffset)
          .attr("x2", x)
          .attr("y2", height + yOffset)
          .attr("stroke", "#ddd")
          .attr("stroke-width", 1)
          .attr("opacity", 0.5)
          .attr("pointer-events", "none")
          .attr("id", `${gridId}-grid-line-x-${x}`);
  }

  for (let y = yOffset; y <= height + yOffset; y += gridSize) {
      svg.append("line")
          .attr("x1", xOffset)
          .attr("y1", y)
          .attr("x2", width + xOffset)
          .attr("y2", y)
          .attr("stroke", "#ddd")
          .attr("stroke-width", 1)
          .attr("opacity", 0.5)
          .attr("pointer-events", "none")
          .attr("id", `${gridId}-grid-line-y-${y}`);
  }
}

function addPoint(svg, x, y, radius, color) {
  // Create a circle and append it to the SVG
  const point = svg.append("circle")
      .attr("cx", x)
      .attr("cy", y)
      .attr("r", radius)
      .style("fill", color);

  return point; // Return the created point
}
