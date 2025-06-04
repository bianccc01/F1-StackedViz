# F1 Drivers 2024 - Interactive Stacked Bar Chart

An interactive data visualization of Formula 1 drivers' 2024 season performance using D3.js stacked bar charts.

## 🏎️ Live Demo
[View Live Demo](https://bianccc01.github.io/F1-StackedViz/)

## 📊 Features

- **Interactive Stacked Bars**: Each bar represents a driver with five performance metrics stacked vertically
- **Dynamic Reordering**: Click on any section of a bar to move that metric to the bottom (primary sorting position)
- **Smooth Animations**: Fluid transitions when reordering variables with easing effects
- **Responsive Tooltips**: Hover over sections to view detailed information about each metric
- **Data-Driven Sorting**: Bars automatically reorder based on the selected primary metric
- **Normalized Visualization**: All metrics are scaled proportionally for fair comparison

## 🎯 Metrics Visualized

1. **Total Points** (Red) - Championship points earned
2. **Races Finished** (Blue) - Number of races completed
3. **Positions Gained** (Green) - Net positions gained during races
4. **Podiums** (Gold) - Number of podium finishes
5. **Average Speed** (Gray) - Average speed in km/h

## 🛠️ Technical Implementation

### Technologies Used
- **D3.js v7** - Data visualization and DOM manipulation
- **HTML5** - Structure and templating
- **CSS3** - Styling and layout
- **Vanilla JavaScript** - Interactive functionality

### Key D3.js Concepts Demonstrated
- **Scales**: `d3.scaleBand()` and `d3.scaleLinear()` for mapping data domains to visual ranges
- **Data Binding**: Dynamic data joins with enter/update/exit pattern
- **Transitions**: Smooth animations with custom easing functions
- **Event Handling**: Mouse events for interactivity
- **Data Transformation**: Normalization and sorting algorithms

### Architecture
```
├── index.html          # Main HTML structure
├── style.css           # Styling and layout
├── main.js             # Core visualization logic
└── data/
    └── f1_drivers_2024.json  # Dataset (10 drivers, 5 metrics each)
```

## 🚀 Getting Started

### Prerequisites
- Modern web browser with JavaScript enabled
- Local web server (recommended for development)

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/bianccc01/F1-StackedViz.git
   cd F1-StackedViz
   ```

2. **Serve locally** (choose one method)
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Or simply open index.html in your browser
   ```

3. **Open in browser**
   Navigate to `http://localhost:8000` or open `index.html` directly

## 🎮 How to Use

1. **View the Chart**: Each vertical bar represents one F1 driver
2. **Identify Metrics**: Different colored sections represent different performance metrics
3. **Click to Reorder**: Click on any colored section to make that metric the primary sorting criterion
4. **Explore Data**: Hover over sections to see detailed tooltips with exact values
5. **Watch Animations**: Enjoy smooth transitions as the chart reorganizes

## 📈 Data Structure

The visualization uses a multivariate dataset with:
- **10 data cases** (F1 drivers)
- **5 quantitative variables** per driver (all positive values)
- **Normalized scaling** for proportional representation

Example data point:
```json
{
  "driver": "Max Verstappen",
  "total_points": 575,
  "races_finished": 23,
  "positions_gained": 45,
  "podiums": 19,
  "avg_speed": 215.3
}
```

## 🎨 Design Decisions

- **Color Coding**: Each metric has a distinct color for easy identification
- **Stacked Layout**: Shows both individual values and total performance
- **Interactive Sorting**: Allows exploration of different performance perspectives
- **Responsive Design**: Adapts to different screen sizes
- **Smooth Transitions**: Enhanced user experience with 800ms animated transitions

## 🔧 Customization

To adapt this visualization for different datasets:

1. **Update the data file** in `/data/` directory
2. **Modify the configuration** in `main.js`:
   ```javascript
   const config = [
       { key: "metric1", color: "#color1", label: "Metric 1" },
       // Add your metrics here
   ];
   ```
3. **Adjust scales** if needed for your data range

## 📚 Educational Value

This project demonstrates:
- **Data Visualization Principles**: Effective use of visual encoding
- **Interactive Design**: User-centered interface design
- **D3.js Proficiency**: Advanced usage of D3's core concepts
- **JavaScript ES6+**: Modern JavaScript development practices
- **Responsive Web Design**: Cross-browser compatibility

## 🤝 Contributing

Feel free to fork this project and submit pull requests for improvements:
- Additional metrics or data sources
- Enhanced animations or interactions
- Performance optimizations
- Accessibility improvements

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🏁 Acknowledgments

- Formula 1 for inspiring the dataset theme
- D3.js community for excellent documentation and examples
- Modern web standards for enabling rich interactive experiences