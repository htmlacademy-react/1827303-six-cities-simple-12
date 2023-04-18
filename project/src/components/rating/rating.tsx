type RatingProps = {
  onChange: (data: number) => void;
  valueName: string;
  // rating: boolean[];
  id: number;
}

function Rating({onChange, valueName,
  // rating,
id}: RatingProps) {

  const handleStar = () => {
    const grade = 5 - id;
    onChange(grade);
  };

  return (
    <>
      <input className="form__rating-input visually-hidden" name="rating" value={valueName} id={`${id}-stars`} type="radio"
        onChange={handleStar}
        // checked={rating[id]}
      />
      <label htmlFor={`${id}-stars`} className="reviews__rating-label form__rating-label" title={valueName}>
        <svg className="form__star-image" width="37" height="33">
          <use xlinkHref="#icon-star"></use>
        </svg>
      </label>
    </>
  );
}

export default Rating;
