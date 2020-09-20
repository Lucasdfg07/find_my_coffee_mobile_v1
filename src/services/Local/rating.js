import Api from './api';

const RatingService = {
  show: (name) => Api.get(`/ratings/${name}`),
}

export default RatingService;