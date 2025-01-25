import { useState } from "react";

export const Rating = () => {
  const [rating, setRating] = useState(0); // Current rating
  const [hoverRating, setHoverRating] = useState(0); // Rating when hovering over stars

  // Handle when a star is clicked
  const handleClick = async (newRating) => {
    setRating(newRating);

    // Send the new rating to the backend
    try {
      const response = await fetch("/api/update-rating", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ rating: newRating }),
      });

      if (response.ok) {
        console.log("Rating updated successfully!");
      } else {
        console.error("Failed to update rating.");
      }
    } catch (error) {
      console.error("Error updating rating:", error);
    }
  };

  // Handle when hovering over a star
  const handleMouseEnter = (newRating) => {
    setHoverRating(newRating);
  };

  // Handle when mouse leaves the stars
  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Rate this product:</h1>
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => handleClick(star)}
            onMouseEnter={() => handleMouseEnter(star)}
            onMouseLeave={handleMouseLeave}
            className={`text-3xl focus:outline-none ${
              star <= (hoverRating || rating)
                ? "text-yellow-500" // Filled star
                : "text-gray-300" // Empty star
            }`}
          >
            ★
          </button>
        ))}
      </div>
      <p className="mt-4 text-gray-600">Your rating: {rating} stars</p>
    </div>
  );
};