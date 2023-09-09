import React, { useState, useEffect } from "react";

const EmotionFeedback = ({ selectedEmotion }) => {
  // Define feedback messages for each emotion
  const feedbackMessages = {
    confused: [
      "It's okay to feel confused. Let's work through it together.",
      "Confusion is just the first step towards understanding. Keep going!",
      // Add more feedback messages for the 'confused' emotion
    ],
    anxious: [
      "Feeling a bit anxious? Take a deep breath, you can do this!",
      "Anxiety is just a visitor; it won't stay forever. You've got the strength to overcome it.",
      // Add more feedback messages for the 'anxious' emotion
    ],
    engaged: [
      "Fantastic! Keep up the great work and stay engaged!",
      "Your enthusiasm is contagious! Keep up the great work and stay engaged.",
      // Add more feedback messages for the 'engaged' emotion
    ],
  };

  // Initialize the feedback message state
  const [feedbackMessage, setFeedbackMessage] = useState("");

  // Function to select a random feedback message
  const getRandomFeedback = () => {
    const messages = feedbackMessages[selectedEmotion];
    if (messages) {
      const randomIndex = Math.floor(Math.random() * messages.length);
      return messages[randomIndex];
    }
    return "";
  };

  // Use useEffect to update feedbackMessage whenever selectedEmotion changes
  useEffect(() => {
    const newFeedbackMessage = getRandomFeedback();
    setFeedbackMessage(newFeedbackMessage);
  }, [selectedEmotion]);

  return (
    <div id="feedbackMessage">
      <p>{feedbackMessage}</p>
    </div>
  );
};

export default EmotionFeedback;
