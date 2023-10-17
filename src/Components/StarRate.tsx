import React, { useState, useEffect } from "react";

interface StarRatingProps {
  value?: number; // The rating value to display
  readOnly?: boolean; // Whether the component is interactive or not
  onRate?: (rating: number) => void; // Callback to handle rating
}

const StarRating: React.FC<StarRatingProps> = ({
  value = 0,
  readOnly,
  onRate,
}) => {
  const [rating, setRating] = useState(value);
  const [hoverRating, setHoverRating] = useState(0);

  useEffect(() => {
    setRating(value);
  }, [value]);

  const onMouseEnter = (index: number) => {
    if (!readOnly) {
      setHoverRating(index);
    }
  };

  const onMouseLeave = () => {
    if (!readOnly) {
      setHoverRating(0);
    }
  };

  const onSaveRating = (index: number) => {
    if (!readOnly) {
      setRating(index);
      if (onRate) {
        onRate(index);
      }
    }
  };

  return (
    <div className="flex space-x-2">
      {[1, 2, 3, 4, 5].map((index) => {
        return (
          <StarIcon
            key={index}
            index={index}
            rating={rating}
            hoverRating={hoverRating}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onSaveRating={onSaveRating}
          />
        );
      })}
    </div>
  );
};

interface StarIconProps {
  index: number;
  rating: number;
  hoverRating: number;
  onMouseEnter: (index: number) => void;
  onMouseLeave: () => void;
  onSaveRating: (index: number) => void;
}

const StarIcon: React.FC<StarIconProps> = ({
  index,
  rating,
  hoverRating,
  onMouseEnter,
  onMouseLeave,
  onSaveRating,
}) => {
  const fillStar = index <= (hoverRating || rating);

  return (
    <span
      className={`star-icon text-xl cursor-pointer transition-colors duration-200 ${
        fillStar ? "text-yellow-400" : "text-gray-400"
      }`}
      onMouseEnter={() => onMouseEnter(index)}
      onMouseLeave={onMouseLeave}
      onClick={() => onSaveRating(index)}
    >
      {fillStar ? "★" : "☆"}
    </span>
  );
};

export default StarRating;
