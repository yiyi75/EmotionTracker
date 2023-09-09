import React, { useEffect, useState } from "react";
import "../css/styles.css";
import { db } from "../firebase";
import { ref, onValue, update } from "firebase/database";

function EmotionVisualization({
  selectedEmotion,
  emotionCounts,
  randomUserId,
  updateEmotionCounts,
}) {
  // Destructure emotion counts
  const { confusedCount, anxiousCount, engagedCount } = emotionCounts;

  // Initialize state variables for fill heights
  const [confusedFillHeight, setConfusedFillHeight] = useState(0);
  const [anxiousFillHeight, setAnxiousFillHeight] = useState(0);
  const [engagedFillHeight, setEngagedFillHeight] = useState(0);

  // Calculate the total count of all emotions
  const totalEmotions = confusedCount + anxiousCount + engagedCount;

  useEffect(() => {
    // Update the fill percentages when emotion counts change
    const newConfusedFillHeight = (confusedCount / totalEmotions) * 100;
    const newAnxiousFillHeight = (anxiousCount / totalEmotions) * 100;
    const newEngagedFillHeight = (engagedCount / totalEmotions) * 100;

    // Update the state with the new fill heights
    setConfusedFillHeight(newConfusedFillHeight);
    setAnxiousFillHeight(newAnxiousFillHeight);
    setEngagedFillHeight(newEngagedFillHeight);
  }, [confusedCount, anxiousCount, engagedCount, totalEmotions]);

  // Use the 'db' reference to access the Firebase Realtime Database
  const databaseRef = ref(db, "emotions"); // This creates a reference to the 'emotions' node in your database

  // Function to format a date as 'YYYY-MM-DD'
  function formatDateToYYYYMMDD(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  // Get the current date in the user's local timezone and format it as 'YYYY-MM-DD'
  const currentDate = formatDateToYYYYMMDD(new Date());

  // Now you can use 'databaseRef' to read or write data from/to Firebase
  const updateFirebaseEmotions = () => {
    // Check if any of the emotion counts are greater than 0
    if (confusedCount > 0 || anxiousCount > 0 || engagedCount > 0) {
      // Create an object to represent the emotions data
      const emotionsData = {
        userId: randomUserId,
        confusedCount,
        anxiousCount,
        engagedCount,
      };

      // Create an object to specify the updates
      const updates = {};
      updates[`${currentDate}/${randomUserId}`] = emotionsData;

      // Use the 'update()' function on the root reference to write data to Firebase
      update(databaseRef, updates)
        .then(() => {
          console.log("Emotions data updated successfully in Firebase");
        })
        .catch((error) => {
          console.error("Error updating emotions data in Firebase: ", error);
        });
    } else {
      console.log("No emotion counts to update.");
    }
  };

  // Call the function to update Firebase data when the emotion counts change
  useEffect(() => {
    updateFirebaseEmotions();
  }, [confusedCount, anxiousCount, engagedCount]);

  // retrieve data for all dates and all users
  const emotionsRef = ref(db, "emotions/" + currentDate);

  const [confusedFillHeightClass, setConfusedFillHeightClass] = useState(0);
  const [anxiousFillHeightClass, setAnxiousFillHeightClass] = useState(0);
  const [engagedFillHeightClass, setEngagedFillHeightClass] = useState(0);

  const [confusedPercentageClass, setConfusedPercentageClass] = useState("0%");
  const [anxiousPercentageClass, setAnxiousPercentageClass] = useState("0%");
  const [engagedPercentageClass, setEngagedPercentageClass] = useState("0%");

  function updateVisualization(emotionData) {
    let totalConfusedCount = 0;
    let totalAnxiousCount = 0;
    let totalEngagedCount = 0;

    for (const userId in emotionData) {
      const userData = emotionData[userId];
      totalConfusedCount += userData.confusedCount || 0;
      totalAnxiousCount += userData.anxiousCount || 0;
      totalEngagedCount += userData.engagedCount || 0;
    }

    const totalEmotions =
      totalConfusedCount + totalAnxiousCount + totalEngagedCount;

    if (totalEmotions > 0) {
      const confusedFillPercentage = (totalConfusedCount / totalEmotions) * 100;
      const anxiousFillPercentage = (totalAnxiousCount / totalEmotions) * 100;
      const engagedFillPercentage = (totalEngagedCount / totalEmotions) * 100;

      setConfusedFillHeightClass(confusedFillPercentage);
      setAnxiousFillHeightClass(anxiousFillPercentage);
      setEngagedFillHeightClass(engagedFillPercentage);

      setConfusedPercentageClass(`${confusedFillPercentage.toFixed(0)}%`);
      setAnxiousPercentageClass(`${anxiousFillPercentage.toFixed(0)}%`);
      setEngagedPercentageClass(`${engagedFillPercentage.toFixed(0)}%`);
    } else {
      setConfusedFillHeightClass(0);
      setAnxiousFillHeightClass(0);
      setEngagedFillHeightClass(0);

      setConfusedPercentageClass("0%");
      setAnxiousPercentageClass("0%");
      setEngagedPercentageClass("0%");
    }
  }

  useEffect(() => {
    const handleDataChange = (snapshot) => {
      const emotionData = snapshot.val();
      if (emotionData) {
        updateVisualization(emotionData);
      }
    };

    const unsubscribe = onValue(emotionsRef, handleDataChange);

    // Cleanup the listener when the component unmounts
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="thermometer-container">
      <div className="individual_emotions">
        {/* Confused Thermometer */}
        <div className="thermometer">
          <div className="emoji-container">
            <img
              src={require("../emojis/confused.png")}
              alt="Confused Emoji"
              className="emoji"
            />
          </div>
          <div
            className="fill"
            id="confusedFill"
            style={{ height: `${confusedFillHeight}%` }}
          ></div>
          <div className="count-text">{confusedCount}</div>
        </div>

        {/* Anxious Thermometer */}
        <div className="thermometer">
          <div className="emoji-container">
            <img
              src={require("../emojis/anxious.png")}
              alt="Anxious Emoji"
              className="emoji"
            />
          </div>
          <div
            className="fill"
            id="anxiousFill"
            style={{ height: `${anxiousFillHeight}%` }}
          ></div>
          <div className="count-text">{anxiousCount}</div>
        </div>

        {/* Engaged Thermometer */}
        <div className="thermometer">
          <div className="emoji-container">
            <img
              src={require("../emojis/engaged.png")}
              alt="Engaged Emoji"
              className="emoji"
            />
          </div>
          <div
            className="fill"
            id="engagedFill"
            style={{ height: `${engagedFillHeight}%` }}
          ></div>
          <div className="count-text">{engagedCount}</div>
        </div>
        <h2>My Emotion</h2>
      </div>

      {/* Class Emotions Thermometers */}
      <div className="class_emotions">
        {/* Confused Thermometer */}
        <div className="thermometer">
          <div className="emoji-container">
            <img
              src={require("../emojis/confused.png")}
              alt="Confused Emoji"
              className="emoji"
            />
          </div>
          <div
            className="fill"
            id="confusedFill_class"
            style={{ height: `${confusedFillHeightClass}%` }}
          ></div>
          <div className="count-text" id="confusedCountText">
            {confusedPercentageClass}
          </div>
        </div>

        {/* Anxious Thermometer */}
        <div className="thermometer">
          <div className="emoji-container">
            <img
              src={require("../emojis/anxious.png")}
              alt="Anxious Emoji"
              className="emoji"
            />
          </div>
          <div
            className="fill"
            id="anxiousFill_class"
            style={{ height: `${anxiousFillHeightClass}%` }}
          ></div>
          <div className="count-text" id="anxiousCountText">
            {anxiousPercentageClass}
          </div>
        </div>

        {/* Engaged Thermometer */}
        <div className="thermometer">
          <div className="emoji-container">
            <img
              src={require("../emojis/engaged.png")}
              alt="Engaged Emoji"
              className="emoji"
            />
          </div>
          <div
            className="fill"
            id="engagedFill_class"
            style={{ height: `${engagedFillHeightClass}%` }}
          ></div>
          <div className="count-text" id="engagedCountText">
            {engagedPercentageClass}
          </div>
        </div>
        <h2>Class Emotions</h2>
      </div>
    </div>
  );
}

export default EmotionVisualization;
