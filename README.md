# F1 Drivers 2024 - Interactive Stacked Bar Chart

An interactive data visualization of Formula 1 drivers' 2024 season performance using D3.js stacked bar charts with horizontal layout and clickable legend.

## 🏎️ Live Demo
[View Live Demo](https://bianccc01.github.io/F1-StackedViz/)

## 📊 Features

- **Interactive Stacked Bars**: Each bar represents a driver with five performance metrics stacked vertically
- **Dynamic Reordering**: Click on any section of a bar OR legend item to move that metric to the bottom (primary sorting position)
- **Clickable Legend**: Interactive legend with hover effects for easy metric selection
- **Horizontal Layout**: Side-by-side layout with title on the left and chart on the right - no scrolling required
- **Smooth Animations**: Fluid transitions when reordering variables with easing effects (800ms duration)
- **Responsive Tooltips**: Hover over sections to view detailed information about each metric
- **Data-Driven Sorting**: Bars automatically reorder based on the selected primary metric
- **Normalized Visualization**: All metrics are scaled proportionally for fair comparison
## 🎯 Metrics Visualized

1. **Total Points** (Red #E10600) - Championship points earned
2. **Races Finished** (Blue #0078D4) - Number of races completed
3. **Positions Gained** (Green #00A86B) - Net positions gained during races
4. **Podiums** (Gold #FFD700) - Number of podium finishes
5. **Average Speed** (Gray #708090) - Average speed in km/h

## 🛠️ Technical Implementation

### Technologies Used
- **D3.js v7** - Data visualization and DOM manipulation
- **HTML5** - Structure and templating with flexbox layout
- **CSS3** - Styling, layout, and responsive design
- **Vanilla JavaScript** - Interactive functionality

### Key D3.js Concepts Demonstrated
- **Scales**: `d3.scaleBand()` and `d3.scaleLinear()` for mapping data domains to visual ranges
- **Data Binding**: Dynamic data joins with enter/update/exit pattern
- **Transitions**: Smooth animations with custom easing functions (`d3.easeCubicOut`, `d3.easeBackOut`)
- **Event Handling**: Mouse events for both bars and legend interactivity
- **Data Transformation**: Normalization and sorting algorithms
- **SVG Optimization**: Efficient rendering with optimized dimensions (700x700px)

### New Interactive Features
- **Legend Interactivity**: Click on legend items to reorder metrics
- **Dual Input Methods**: Both bar sections and legend items trigger the same reordering function
- **Enhanced UX**: Hover effects on legend items with background highlighting
- **Responsive Layout**: Flexbox-based horizontal layout prevents scrolling

### Architecture
```
├── index.html          # Main HTML structure with flexbox layout
├── style.css           # Styling, layout, and responsive design
├── main.js             # Core visualization logic with interactive legend
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

1. **View the Chart**: Each vertical bar represents one F1 driver, with the title and instructions on the left
2. **Identify Metrics**: Different colored sections represent different performance metrics (see legend)
3. **Click to Reorder**:
   - Click on any colored section in the bars, OR
   - Click on any item in the legend
   - Both actions make that metric the primary sorting criterion
4. **Explore Data**: Hover over sections to see detailed tooltips with exact values
5. **Watch Animations**: Enjoy smooth transitions as the chart reorganizes automatically
6. **No Scrolling**: Everything is visible in the viewport thanks to the horizontal layout

## 📈 Data Structure

The visualization uses a multivariate dataset with:
- **10 data cases** (F1 drivers)
- **5 quantitative variables** per driver (all positive values)
- **Normalized scaling** for proportional representation
- **Original values preserved** for accurate tooltip display

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

- **Color Coding**: Each metric has a distinct, F1-inspired color for easy identification
- **Stacked Layout**: Shows both individual values and total performance
- **Dual Interaction**: Both bars and legend items trigger the same reordering functionality
- **Horizontal Layout**: Title section (300px) + chart section (remaining space) with flexbox
- **Legend Positioning**: Top-right corner with semi-transparent background
- **Smooth Transitions**: Enhanced user experience with 800ms animated transitions
- **Viewport Optimization**: SVG sized to 700x700px to fit without scrolling
- **Responsive Tooltips**: Smart positioning that follows mouse movement

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
3. **Adjust SVG dimensions** in both CSS and JavaScript if needed
4. **Customize layout proportions** by modifying flexbox values in CSS

## 📚 Educational Value

This project demonstrates:
- **Advanced Data Visualization**: Effective use of visual encoding and interaction design
- **Modern Web Layout**: Flexbox-based responsive design without scrolling
- **Interactive Design**: Multiple input methods for the same functionality
- **D3.js Mastery**: Advanced usage of D3's core concepts including scales, transitions, and event handling
- **JavaScript ES6+**: Modern JavaScript development practices
- **UX Best Practices**: Intuitive interactions with clear visual feedback

## 🆕 Latest Updates

- ✅ **Interactive Legend**: Click on legend items to reorder metrics
- ✅ **Horizontal Layout**: Side-by-side design eliminates scrolling
- ✅ **Enhanced UX**: Hover effects and better visual feedback
- ✅ **Optimized Dimensions**: Perfect fit for most screen sizes
- ✅ **Dual Interaction Methods**: Both bars and legend trigger reordering

## 🤝 Contributing

Feel free to fork this project and submit pull requests for improvements:
- Additional metrics or data sources
- Enhanced animations or interactions
- Performance optimizations
- Accessibility improvements
- Mobile responsiveness enhancements

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🏁 Acknowledgments

- Formula 1 for inspiring the dataset theme
- D3.js community for excellent documentation and examples
- Modern web standards for enabling rich interactive experiences
- UX design principles for intuitive interaction patterns