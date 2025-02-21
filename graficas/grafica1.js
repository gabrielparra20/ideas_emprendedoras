// Datos de ejemplo: Participación de tipos de emprendimiento en Colombia
const data = [
    { label: 'Antojitos', value: 40 },
    { label: 'Emprendimiento Social', value: 30 },
    { label: 'Datos Abiertos de Emprendimiento', value: 20 },
    { label: 'Otros', value: 10 }
];

// Configuración del gráfico
const width = 500;
const height = 500;
const radius = Math.min(width, height) / 2;

// Crear el contenedor SVG
const svg = d3.select("#chart")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${width / 2},${height / 2})`);

// Escala de colores
const color = d3.scaleOrdinal(d3.schemeCategory10);

// Generador de arcos
const arc = d3.arc()
    .innerRadius(0)
    .outerRadius(radius);

// Generador de sectores
const pie = d3.pie()
    .value(d => d.value)
    .sort(null);

// Dibujar los sectores
const slices = svg.selectAll(".slice")
    .data(pie(data))
    .enter()
    .append("g")
    .attr("class", "slice");

slices.append("path")
    .attr("d", arc)
    .attr("fill", (d, i) => color(i))
    .attr("class", "slice");

// Etiquetas de texto
slices.append("text")
    .attr("transform", d => `translate(${arc.centroid(d)})`)
    .attr("dy", "0.35em")
    .attr("class", "label")
    .text(d => d.data.label)
    .style("text-anchor", "middle")
    .style("font-size", "12px");