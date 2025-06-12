d3.json("data/f1_drivers_2024.json").then(data => {
    console.log(data);
    const pointsMax = d3.max(data, d => d.total_points);
    const racesFinishedMax = d3.max(data, d => d.races_finished);
    const positionsGainedMax = d3.max(data, d => d.positions_gained);
    const podiumsMax = d3.max(data, d => d.podiums);
    const avgSpeedMax = d3.max(data, d => d.avg_speed);

    // Function to get the abbreviation of the driver's name
    function getDriverNameAbbreviation(driverName) {
        const parts = driverName.split(" ");
        const lastName = parts[parts.length - 1];
        return lastName.substring(0, 3).toUpperCase();
    }

    // Configuration for the variables to be visualized
    const config = [
        { key: "total_points", color: "#E10600", label: "Total Points" },
        { key: "races_finished", color: "#0078D4", label: "Races Finished" },
        { key: "positions_gained", color: "#00A86B", label: "Position Gained" },
        { key: "podiums", color: "#FFD700", label: "Podiums" },
        { key: "avg_speed", color: "#708090", label: "Avg Speed (km/h)" }
    ];

    // Normalize the data for visualization
    const normalizedData = data.map(item => {
        return {
            driver: item.driver,
            driver_name_abbreviation: getDriverNameAbbreviation(item.driver),
            total_points: (item.total_points / pointsMax) * 100,
            races_finished: (item.races_finished / racesFinishedMax) * 100,
            positions_gained: (item.positions_gained / positionsGainedMax) * 100,
            podiums: (item.podiums / podiumsMax) * 100,
            avg_speed: (item.avg_speed / avgSpeedMax) * 100,
            original: {
                total_points: item.total_points,
                races_finished: item.races_finished,
                positions_gained: item.positions_gained,
                podiums: item.podiums,
                avg_speed: item.avg_speed
            }
        };
    });

    // Create the SVG container
    const svg = d3.select("#svg-container")
        .append("svg")
        .attr("width", 1000)
        .attr("height", 900);

    // Create the legend
    const legend = svg.append("g")
        .attr("class", "legend")
        .attr("transform", "translate(850, 30)");

    // Add legend background
    const legendBg = legend.append("rect")
        .attr("x", -10)
        .attr("y", -10)
        .attr("width", 200)
        .attr("height", config.length * 22 + 15)
        .attr("fill", "rgba(255, 255, 255, 0.95)")
        .attr("stroke", "#ddd")
        .attr("stroke-width", 1)
        .attr("rx", 5);

    // Add legend items
    const legendItems = legend.selectAll(".legend-item")
        .data(config)
        .enter()
        .append("g")
        .attr("class", "legend-item")
        .attr("transform", (d, i) => `translate(0, ${i * 22})`)
        .style("cursor", "pointer");

    // Add invisible background for better click area
    legendItems.append("rect")
        .attr("x", -5)
        .attr("y", -2)
        .attr("width", 185)
        .attr("height", 20)
        .attr("fill", "transparent")
        .attr("rx", 3);

    // Add colored rectangles
    legendItems.append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", 15)
        .attr("height", 15)
        .attr("fill", d => d.color)
        .attr("rx", 2);

    // Add text labels
    legendItems.append("text")
        .attr("x", 20)
        .attr("y", 12)
        .attr("font-size", "12px")
        .attr("font-family", "Arial, sans-serif")
        .attr("fill", "#333")
        .text(d => d.label);

    // Add click and hover functionality to legend items
    legendItems
        .on("click", function(event, d) {
            const configIndex = config.findIndex(item => item.key === d.key);
            swapToFirst(configIndex);
        })
        .on("mouseover", function(event, d) {
            d3.select(this).select("rect:first-child")
                .attr("fill", "rgba(0, 0, 0, 0.1)");

            d3.select(this).select("text")
                .style("font-weight", "bold");
        })
        .on("mouseout", function(event, d) {
            d3.select(this).select("rect:first-child")
                .attr("fill", "transparent");

            d3.select(this).select("text")
                .style("font-weight", "normal");
        });

    // Create the tooltip for displaying information
    const tooltip = d3.select("body")
        .append("div")
        .attr("class", "tooltip");

    // Clona il template e lo aggiunge al tooltip
    const template = document.querySelector("#tooltip-template");
    tooltip.node().appendChild(template.content.cloneNode(true));

    // Define the X scale for positioning bars
    const scaleX = d3.scaleBand()
        .domain([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
        .range([50, 750])
        .padding(0.1);

    // Define the Y scale for bar heights
    const scaleY = d3.scaleLinear()
        .domain([0, 100])
        .range([0, 200])
        .nice();

    let currentOrder = [0, 1, 2, 3, 4];
    let isTransitioning = false;

    // Function to move a variable to the first position
    function swapToFirst(originalIndex) {
        if (isTransitioning) return;

        const currentPosition = currentOrder.indexOf(originalIndex);
        if (currentPosition === -1) return;

        const clickedItem = currentOrder.splice(currentPosition, 1)[0];
        currentOrder.unshift(clickedItem);
        redrawChart();
    }

    // Function to redraw the chart
    function redrawChart() {
        isTransitioning = true;
        tooltip.style("opacity", 0);

        const firstVariableKey = config[currentOrder[0]].key;
        const sortedData = [...normalizedData].sort((a, b) =>
            b[firstVariableKey] - a[firstVariableKey]
        );

        const bars = svg.selectAll("g.driver-bar")
            .data(sortedData, d => d.driver);

        bars.exit().remove();

        const barsEnter = bars.enter()
            .append("g")
            .attr("class", "driver-bar")
            .attr("transform", (d, i) => `translate(${scaleX(i)}, 0)`);

        const barsMerged = barsEnter.merge(bars);

        barsMerged.transition()
            .duration(800)
            .ease(d3.easeCubicOut)
            .attr("transform", (d, i) => `translate(${scaleX(i)}, 0)`);

        barsMerged.each(function (d, i) {
            const g = d3.select(this);
            g.selectAll("rect").remove();
            let currentY = 800;

            currentOrder.forEach((configIndex) => {
                const variableKey = config[configIndex].key;
                const value = d[variableKey];
                const barHeight = scaleY(value);
                currentY -= barHeight;

                g.append("rect")
                    .attr("x", 0)
                    .attr("width", scaleX.bandwidth() - 10)
                    .attr("y", currentY)
                    .attr("height", 0)
                    .attr("fill", config[configIndex].color)
                    .style("cursor", "pointer")
                    .on("click", () => {
                        swapToFirst(configIndex);
                    })
                    .on("mouseover", function (event) {
                        const variableLabel = config[configIndex].label;
                        const originalValue = d.original[variableKey];
                        const formattedValue = variableKey === 'avg_speed'
                            ? `${originalValue.toFixed(1)} km/h`
                            : originalValue;

                        // Use the tooltip to display information
                        tooltip.select(".tooltip-driver").text(d.driver);
                        tooltip.select(".tooltip-metric")
                            .text(variableLabel)
                            .style("color", config[configIndex].color);
                        tooltip.select(".tooltip-value").text(formattedValue);

                        tooltip
                            .style("left", (event.pageX + 15) + "px")
                            .style("top", (event.pageY - 10) + "px")
                            .transition()
                            .duration(200)
                            .style("opacity", 1);

                        d3.select(this)
                            .style("filter", "brightness(1.3)")
                            .style("stroke", "#fff")
                            .style("stroke-width", "2px");
                    })
                    .on("mousemove", function (event) {
                        d3.selectAll(".tooltip")
                            .style("left", (event.pageX + 15) + "px")
                            .style("top", (event.pageY - 10) + "px");
                    })
                    .on("mouseout", function () {
                        d3.selectAll(".tooltip")
                            .transition()
                            .duration(150)
                            .style("opacity", 0);

                        d3.select(this)
                            .style("filter", "none")
                            .style("stroke", "none");
                    })
                    .transition()
                    .duration(600)
                    .ease(d3.easeBackOut)
                    .attr("y", currentY)
                    .attr("height", barHeight);

                setTimeout(() => {
                    isTransitioning = false;
                }, 800);
            });
        });

        svg.selectAll("text.driver-label").remove();

        svg.selectAll("text.driver-label")
            .data(sortedData)
            .enter()
            .append("text")
            .attr("class", "driver-label")
            .attr("x", (d, i) => scaleX(i) + scaleX.bandwidth() / 2 - 7)
            .attr("y", 820)
            .attr("text-anchor", "middle")
            .style("font-size", "12px")
            .style("font-weight", "bold")
            .style("fill", "#333")
            .style("opacity", 0)
            .text(d => d.driver_name_abbreviation)
            .transition()
            .delay((d, i) => i * 50)
            .duration(400)
            .style("opacity", 1);
    }

    redrawChart();
});