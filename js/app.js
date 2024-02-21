

document.addEventListener("DOMContentLoaded", function () {
    const width = 400;
    const height = 400;
    const pointRadius = 3; // Adjust the point size
  
    const svg = d3.select("body")
      .append("svg")
      .attr("width", width * 2) // Double the width for two axes
      .attr("height", height);

    const rightAxis = new RightAxisDrawer(svg, width, height, pointRadius, width);
    
    
    const transferBtn = document.createElement("button");
    transferBtn.id="transferBtn"
    transferBtn.textContent = "Transfer Points to Left Axis";
    transferBtn.addEventListener("click", () => rightAxis.transferPointsToLeftAxis());

    document.body.appendChild(transferBtn);
    // Handle "Ctrl + Z" for undo for both axes
    
        // Create sliders for A, a, t0, and c
        const inputA = d3.select("body").append("in").append("div");
inputA.append("label").text("A: ");
const inputAField = inputA.append("input").attr("type", "text").attr("value", 1);

const inputa = d3.select("in").append("div")
inputa.append("label").text("a:  ");
const inputaField = inputa.append("input").attr("type", "text").attr("value", 1);

const inputt0 = d3.select("in").append("div");
inputt0.append("label").text("t0: ");
const inputt0Field = inputt0.append("input").attr("type", "text").attr("value", 0);

const inputC = d3.select("in").append("div");
inputC.append("label").text("c:  ");
const inputCField = inputC.append("input").attr("type", "text").attr("value", 0);


  // Create button and initial hidden value
  const oddEvenButton = document.createElement('button');
  oddEvenButton.id = 'toggleButton'; // Add ID to the button

   let hiddenValue = 0;
  // Set initial button text based on the hidden value
  oddEvenButton.textContent = hiddenValue % 2 === 0 ? 'Even' : 'Odd';

  // Add click event listener to the button
  oddEvenButton.addEventListener('click', () => {
    // Toggle the value between 0 and 1
    hiddenValue = 1 - hiddenValue;

    // Set the text content based on the updated hidden value
    oddEvenButton.textContent = hiddenValue % 2 === 0 ? 'Even' : 'Odd';
  });

  // Append the button to the body
  document.body.appendChild(oddEvenButton);


  function updateButtonPosition() {
    const lastSvgPosition = getLastSvgPosition(0);
    oddEvenButton.style.position = 'absolute';
    oddEvenButton.style.top = lastSvgPosition.top +50+ 'px';
    oddEvenButton.style.left = lastSvgPosition.left+410 + 'px';
  }

  // Function to get the position of the last SVG element

  updateButtonPosition();

  adjustLayout()

        
  });
  function adjustLayout() {
    const screenWidth = window.innerWidth;
    const allButtons = document.querySelectorAll('button');

    if (screenWidth <= 800) {
      const lastSvgPosition = getLastSvgPosition(1);
      
        allButtons[0].style.margin=10 +'px'
        allButtons[1].style.margin=10 +'px'
        
        // allButtons[0].style.position = 'absolute';
        // allButtons[0].style.top = lastSvgPosition.top +50+ 'px';
        // allButtons[0].style.left = lastSvgPosition.left+410 + 'px';
        // allButtons[1].style.position = 'absolute';
        // allButtons[1].style.top = lastSvgPosition.top +100+ 'px';
        // allButtons[1].style.left = lastSvgPosition.left+410 + 'px';
      }
 console.log(allButtons)
   
    } 
  
  function getLastSvgPosition(n) {
    if(n==0){
    const svgs = document.querySelectorAll('svg');
    const lastSvg = svgs[svgs.length - 1];

    if (lastSvg) {
      const rect = lastSvg.getBoundingClientRect();
      return {
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX,
      };
    }
  }
    const svgs = document.querySelectorAll('svg');
    const lastSvg = svgs[0];

    if (lastSvg) {
      const rect = lastSvg.getBoundingClientRect();
      return {
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX,
      };
    }
  
    // Default position if no SVG is found
    return {
      top: 0,
      left: 0,
    };
  }
