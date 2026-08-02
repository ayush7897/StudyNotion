export default function GetAvgRating(ratingArr = []) {
    if (!ratingArr || ratingArr.length === 0) {
      return 0;
    }
  
    const totalReviewCount = ratingArr.reduce((acc, curr) => {
      return acc + curr.rating;
    }, 0);
  
    const avgReviewCount = totalReviewCount / ratingArr.length;
  
    return Math.round(avgReviewCount * 10) / 10;
  }