import Api from './api';

const RatingService = {
  show: (google_place_id) => Api.get(`/ratings/${google_place_id}`),
}

export default RatingService;