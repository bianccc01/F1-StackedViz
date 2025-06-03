d3.json("data/f1_drivers_2024.json").then(data => {
    console.log(data);
    const pointsMin = d3.min(data, d => d.total_points);
    const pointsMax = d3.max(data, d => d.total_points);
    const racesFinishedMin = d3.min(data, d => d.races_finished);
    const racesFinishedMax = d3.max(data, d => d.races_finished);
    const positionsGainedMin = d3.min(data, d => d.positions_gained);
    const positionsGainedMax = d3.max(data, d => d.positions_gained);
    const podiumsMin = d3.min(data, d => d.podiums);
    const podiumsMax = d3.max(data, d => d.podiums);
    const avgSpeedMin = d3.min(data, d => d.avg_speed);
    const avgSpeedMax = d3.max(data, d => d.avg_speed);

    // Take the first 3 letters of the driver surname and make it uppercase
    function getDriverNameAbbreviation(driverName) {
        const parts = driverName.split(" ");
        const lastName = parts[parts.length - 1];
        return lastName.substring(0, 3).toUpperCase();
    }

    const config = [
        { key: "total_points", color: "#E10600", label: "Total Points" },
        { key: "races_finished", color: "#0078D4", label: "Races Finished" },
        { key: "positions_gained", color: "#00A86B", label: "Position Gained" },
        { key: "podiums", color: "#FFD700", label: "Podiums" },
        { key: "avg_speed", color: "#708090", label: "Avg Speed (km/h)" }
    ];

    /* normalize data con proporzioni lineari dirette */
    const normalizedData = data.map(item => {
        return {
            driver: item.driver,
            driver_name_abbreviation: getDriverNameAbbreviation(item.driver),
            // ✅ Proporzione lineare diretta: valore * (100/valoreMassimo)
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
        }
    });

    const svg = d3.select("#svg-container")
        .append("svg")
        .attr("width", 800)
        .attr("height", 900);

    const scaleX = d3.scaleBand()
        .domain([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
        .range([50, 750])
        .padding(0.1);

    const scaleY = d3.scaleLinear()
        .domain([0, 100])
        .range([0, 200])
        .nice();

    let currentOrder = [0, 1, 2, 3, 4];

    function swapToFirst(originalIndex) {
        console.log("originalIndex:", originalIndex);
        console.log("currentOrder before:", currentOrder);

        const currentPosition = currentOrder.indexOf(originalIndex);
        console.log("currentPosition:", currentPosition);

        if (currentPosition === -1) {
            console.error("Element not found in currentOrder");
            return;
        }

        // Rimuovi l'elemento dalla posizione attuale
        const clickedItem = currentOrder.splice(currentPosition, 1)[0];

        // Metti l'elemento cliccato in PRIMA posizione (indice 0 = in basso)
        currentOrder.unshift(clickedItem);

        console.log("new currentOrder:", currentOrder);
        redrawChart();
    }

    function redrawChart() {
        console.log("Animating chart...");

        // ✅ RIMUOVI TUTTO PRIMA DI RIDISEGNARE
        svg.selectAll("rect").remove();
        svg.selectAll("text").remove();

        // Ordina per la variabile che è visualmente in basso (PRIMA nell'array)
        const firstVariableKey = config[currentOrder[0]].key;
        const sortedData = [...normalizedData].sort((a, b) =>
            b[firstVariableKey] - a[firstVariableKey]
        );

        // Crea tutti i rettangoli da zero
        sortedData.forEach((pilot, pilotIndex) => {
            let currentY = 800; // Inizia dal basso
            const barX = scaleX(pilotIndex);
            const barWidth = scaleX.bandwidth() - 10;

            // Costruisci la barra dal basso verso l'alto
            currentOrder.forEach((configIndex, stackIndex) => {
                const variableKey = config[configIndex].key;
                const value = pilot[variableKey];
                const barHeight = scaleY(value);

                currentY -= barHeight; // Sposta verso l'alto

                // Crea il rettangolo direttamente
                svg.append("rect")
                    .attr("x", barX)
                    .attr("y", currentY)
                    .attr("width", barWidth)
                    .attr("height", barHeight)
                    .attr("fill", config[configIndex].color)
                    .style("cursor", "pointer")
                    .style("opacity", 0)
                    .on("click", function() {
                        swapToFirst(configIndex);
                    })
                    .on("mouseover", function(event) {
                        // Tooltip
                        d3.selectAll(".tooltip").remove();

                        const variableLabel = config[configIndex].label;
                        const originalValue = pilot.original[variableKey];

                        const tooltip = d3.select("body")
                            .append("div")
                            .attr("class", "tooltip")
                            .style("position", "absolute")
                            .style("background", "rgba(0,0,0,0.9)")
                            .style("color", "white")
                            .style("padding", "10px 15px")
                            .style("border-radius", "8px")
                            .style("font-size", "13px")
                            .style("font-family", "Arial, sans-serif")
                            .style("pointer-events", "none")
                            .style("box-shadow", "0 4px 12px rgba(0,0,0,0.3)")
                            .style("border", `2px solid ${config[configIndex].color}`)
                            .style("opacity", 0)
                            .style("z-index", "1000");

                        let formattedValue;
                        if (variableKey === 'avg_speed') {
                            formattedValue = `${originalValue.toFixed(1)} km/h`;
                        } else {
                            formattedValue = originalValue.toString();
                        }

                        tooltip.html(`
                                <div style="font-weight: bold; margin-bottom: 4px;">${pilot.driver}</div>
                                <div style="color: ${config[configIndex].color}; font-weight: bold;">${variableLabel}</div>
                                <div style="font-size: 16px; font-weight: bold;">${formattedValue}</div>
                            `)
                            .style("left", (event.pageX + 15) + "px")
                            .style("top", (event.pageY - 10) + "px");

                        tooltip.transition()
                            .duration(200)
                            .style("opacity", 1);

                        d3.select(this)
                            .style("filter", "brightness(1.3)")
                            .style("stroke", "#fff")
                            .style("stroke-width", "2px");
                    })
                    .on("mousemove", function(event) {
                        d3.selectAll(".tooltip")
                            .style("left", (event.pageX + 15) + "px")
                            .style("top", (event.pageY - 10) + "px");
                    })
                    .on("mouseout", function() {
                        d3.selectAll(".tooltip")
                            .transition()
                            .duration(150)
                            .style("opacity", 0)
                            .remove();

                        d3.select(this)
                            .style("filter", "none")
                            .style("stroke", "none");
                    })
                    .transition()
                    .duration(600)
                    .ease(d3.easeBackOut)
                    .style("opacity", 1);
            });
        });

        // Aggiungi le etichette
        sortedData.forEach((pilot, i) => {
            const barX = scaleX(i);
            const barWidth = scaleX.bandwidth() - 10;

            svg.append("text")
                .attr("x", barX + barWidth / 2)
                .attr("y", 820)
                .attr("text-anchor", "middle")
                .style("font-size", "12px")
                .style("font-weight", "bold")
                .style("fill", "#333")
                .style("opacity", 0)
                .text(pilot.driver_name_abbreviation)
                .transition()
                .delay(i * 50)
                .duration(400)
                .style("opacity", 1);
        });
    }

    redrawChart();
});