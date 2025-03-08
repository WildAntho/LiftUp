import StarRatings from "react-star-ratings";

type StarRatingProps = {
  rating: number;
  review: number;
};

export default function StarRating({ rating, review }: StarRatingProps) {
  return (
    <div className="flex justify-start items-end gap-2">
      <p className="text-xs text-gray-500 mb-[2px]">{rating}/5</p>
      <StarRatings
        rating={rating}
        starRatedColor="#facc15"
        numberOfStars={5}
        starDimension="15px"
        starSpacing="1px"
      />
      <p> • </p>
      <p className="text-xs text-gray-500 mb-[2px]">{review} avis</p>
    </div>
  );
}
