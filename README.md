# SORTABLE

## Overview
This SORTABLE Project is like a Superhero Database an interactive web application that allows users to explore and search through a comprehensive list of superheroes. This project provides a user-friendly interface to view detailed information about various superheroes, including their powers, physical attributes, and biographical data.

## Features
- **Data Loading**: Fetches superhero data from a remote JSON file.
- **Dynamic Table Rendering**: Displays superhero information in a responsive table format.
- **Pagination**: Allows users to navigate through the list of superheroes using page buttons.
- **Search Functionality**: Enables users to search for specific superheroes by name.
- **Flexible Page Size**: Users can adjust the number of superheroes displayed per page.
- **Detailed Information**: Each superhero entry includes:
  - Icon
  - Name
  - Full Name
  - Powerstats (Intelligence, Strength, Speed, Durability, Power, Combat)
  - Race
  - Gender
  - Height
  - Weight
  - Place of Birth
  - Alignment

## Technical Details
- **Frontend**: Built with vanilla JavaScript, HTML, and CSS.
- **Data Source**: Utilizes the superhero API from [akabab/superhero-api](https://github.com/akabab/superhero-api).
- **Responsive Design**: Adapts to different screen sizes for optimal viewing experience.

## How to Use
1. **Opening the Application**: 
   - Clone the repository and open `index.html` in a web browser, or
   - Deploy the files to a web server and access via the appropriate URL.

2. **Viewing Superheroes**:
   - The main page displays a table of superheroes with various details.
   - Use the pagination buttons at the bottom to navigate through the list.

3. **Searching**:
   - Use the search input at the top of the page to filter superheroes by name.
   - The table updates in real-time as you type.

4. **Adjusting Page Size**:
   - Select a different option from the dropdown menu to change the number of superheroes displayed per page.
   - Options include 10, 20, 50, 100, or All superheroes.

## File Structure
- `index.html`: The main HTML file that structures the web page.
- `sortable.js`: Contains all the JavaScript code for functionality.
- `styles.css`: Contain all the styling for the application.

## Development and Customization
- The project is built with vanilla JavaScript, making it easy to understand and modify.
- To add new features or modify existing ones, edit the `sortable.js` file.
- For styling changes, modify the CSS file (not provided in the given snippets).
- To change the data source, update the URL in the `fetch` call within `sortable.js`.

## Future Enhancements
- Implement sorting functionality for different columns.
- Add filters for attributes like alignment, race, or power levels.
- Implement a detailed view for each superhero.
- Add data visualization for superhero stats.


## Acknowledgments
- Superhero data provided by [akabab/superhero-api](https://github.com/akabab/superhero-api).