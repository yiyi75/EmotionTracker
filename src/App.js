// Inside App.js
import React, { useState } from "react";
import Header from "./components/Header";
import EmotionForm from "./components/EmotionForm";
import EmotionVisualization from "./components/EmotionVisualization";
import "./css/styles.css";

function App() {
  const [selectedEmotion, setSelectedEmotion] = useState("confused");
  const [emotionCounts, setEmotionCounts] = useState({
    confusedCount: 0,
    anxiousCount: 0,
    engagedCount: 0,
  });

  // Generate the random user ID here
  const randomUserId = generateRandomUserId();

  const handleEmotionSelection = (emotion) => {
    setSelectedEmotion(emotion);
  };

  const updateEmotionCounts = (emotion) => {
    // Create a new object to update the counts based on the selected emotion
    const newCounts = { ...emotionCounts };
    newCounts[emotion + "Count"] += 1; // Increment the count for the selected emotion
    setEmotionCounts(newCounts); // Update the state
  };

  return (
    <div className="App">
      <Header />
      <EmotionForm updateEmotionCounts={updateEmotionCounts} />
      <EmotionVisualization
        selectedEmotion={selectedEmotion}
        emotionCounts={emotionCounts}
        randomUserId={randomUserId}
      />
    </div>
  );
}

// Function to generate a random user ID
function generateRandomUserId() {
  // Try to retrieve userId from local storage
  const storedUserId = localStorage.getItem("randomUserId");

  if (storedUserId) {
    return storedUserId;
  }

  // If not in local storage, generate a new one
  const newUserId = Math.random().toString(36).substring(2, 10);
  localStorage.setItem("randomUserId", newUserId); // Store the new ID in local storage
  return newUserId;
}

export default App;
