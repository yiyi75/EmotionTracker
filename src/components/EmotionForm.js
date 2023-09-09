import React, { useState } from 'react';

function EmotionForm({ updateEmotionCounts }) {
  const [selectedEmotion, setSelectedEmotion] = useState('confused');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Call the updateEmotionCounts function with the selected emotion
    updateEmotionCounts(selectedEmotion);
  };

  return (
    <div className="form-container">
      <form id="emotionForm" onSubmit={handleFormSubmit}>
        <label htmlFor="emotion">I'm feeling...</label>
        <select
          id="emotion"
          name="emotion"
          value={selectedEmotion}
          onChange={(e) => setSelectedEmotion(e.target.value)}
        >
          <option value="confused">Confused</option>
          <option value="anxious">Anxious</option>
          <option value="engaged">Engaged</option>
          {/* Add more emotions as needed */}
        </select>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default EmotionForm;
