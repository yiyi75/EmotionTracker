# Emotion Tracker

![Emotion Tracker Logo](link_to_your_logo_image)

Emotion Tracker is a React application that allows users to track and visualize their current emotions. Users can select from a range of emotions such as confused, anxious, or energized, and view their chosen emotion along with the overall class emotion percentage.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

Follow these instructions to get the Emotion Tracker app up and running on your local machine.

### Prerequisites

Before you begin, make sure you have the following tools installed:

- [Node.js](https://nodejs.org/) - JavaScript runtime environment
- [npm](https://www.npmjs.com/) - Node Package Manager

### Installation

1. Clone this GitHub repository to your local machine:

   ```shell
   git clone https://github.com/yiyi75/EmotionTracker.git

2. Navigate to the project directory:
   cd EmotionTracker
3. Install the project dependencies using npm:
   npm install
4. To start the Emotion Tracker app locally, run the following command:
   npm start

Emotion Visualization

The core functionality of Emotion Tracker is implemented in the EmotionVisualization component. This component handles the tracking and visualization of emotions, including updating Firebase data.

Here is a brief overview of how it works:

- It calculates and displays the percentage of each emotion (e.g., confused, anxious, engaged) based on user input.

- It interacts with Firebase Realtime Database to store and retrieve emotion data.

- It provides visualizations in the form of thermometers for individual emotions and class emotions.

- The component automatically updates the visualizations when emotion counts change.

- Emotion data is stored by date and user ID, allowing users to track their emotions over time.


   
