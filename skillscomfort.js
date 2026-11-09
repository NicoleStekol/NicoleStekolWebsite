function SkillsAndComfortViz(){
    
    const margin = {top: 30, right: 30, bottom: 70, left: 60},
        width = 460 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    const svg = d3.select("#skillsandcomfortsviz")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // Parse the Data
    d3.csv("skills.csv").then( function(data) {
        // X axis
        const x = d3.scaleBand()
            .range([ 0, width ])
            .domain(data.map(d => d.Skill))
            .padding(0.2);
        svg.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(d3.axisBottom(x))
            .selectAll("text")
                .attr("transform", "translate(-10,0)rotate(-45)")
                .style("text-anchor", "end");

        // Add Y axis
        const y = d3.scaleLinear()
            .domain([0, 10])
            .range([ height, 0]);
        svg.append("g")
            .call(d3.axisLeft(y));
        
        // Add X axis label:
        svg.append("text")
            .attr("text-anchor", "middle")
            .attr("x", width/2)
            .attr("y", height + margin.top + 20)
            .text("Technical Skill");

        // Y axis label:
        svg.append("text")
            .attr("text-anchor", "middle")
            .attr("transform", "rotate(-90)")
            .attr("y", -margin.left+20)
            .attr("x", -height/2)
            .text("Comfort Level (1-10)")

        // Bars
        // Bars
    const bars = svg.selectAll("mybar")
    .data(data)      
    .join("rect")
        .attr("x", d => x(d.Skill))
        .attr("y", d => y(parseFloat(d.Comfort)))
        .attr("width", x.bandwidth())
        .attr("height", d => height - y(parseFloat(d.Comfort)))
        .attr("fill", "#87255B")
    
    const tooltipContainer = svg
        .append("g")
        .attr('visibility','hidden')
    
    const tooltipBox = tooltipContainer
        .append('rect')
        .attr('width',100)
        .attr('height',40)
        .attr('fill',"lightgray")
        .attr('opacity',"50%")
        .attr('rx',8)
            // .append("text")
            // .attr("class", "tooltip")
            // .attr("fill", "black")
            // .style("pointer-events", "none");
    
    const tooltipText = tooltipContainer
        .append('text')
        .attr("x",50)
        .attr('y',25)
        .attr("text-anchor", "middle")
        .attr('display','table-cell')
        .text("")

    bars.on("mouseover", (evt, d) => {
        const [mx, my] = d3.pointer(evt);
        const fixedYPos = my - 40;
        tooltipContainer
            .attr("transform", "translate(" + mx + ", " + fixedYPos + ")" )
            .style("visibility","initial");
        tooltipText
            .text(d.Comfort + "/10");
            
        })
        .on("mousemove", (evt, d) => {
            const [mx, my] = d3.pointer(evt);
            const fixedYPos = my - 40;
            tooltipContainer
                .attr("transform", "translate(" + mx + ", " + fixedYPos + ")" );
        })
        .on("mouseout", () => {
        // clear the tooltip
        tooltipText.text("");
        tooltipContainer.style("visibility","hidden")
        });
    })
}
