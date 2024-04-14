import { generateDestinations } from '../mock/destinations.js';
import { generateOffers } from '../mock/offers.js';
import { generatePoint } from '../mock/point.js';
import { EVENT_COUNT, TYPES } from '../mock/const.js';
import { getRandomValue, getRandomInteger } from '../utils.js';

export default class MockService {
  constructor() {
    this.destinations = generateDestinations;
    this.offers = generateOffers;
    this.points = this.generatePoint();
  }

  generatePoint() {
    return Array.from({length: EVENT_COUNT}, () => {
      const type = getRandomValue(TYPES);
      const destination = getRandomValue(this.destinations);
      const destinationIDs = destination.id;
      const offersByType = this.offers.find((offerByType) => offerByType.type === type);
      const offersIDs = [];
      offersByType.offers.forEach((offer) => {
        if (getRandomInteger(0, 1)) {
          offersIDs.push(offer.id);
        }
      });
      return generatePoint(type, offersIDs, destinationIDs);
    });
  }

  getDestinations() {
    return this.destinations;
  }

  getOffers() {
    return this.offers;
  }

  getPoints() {
    return this.points;
  }
}
