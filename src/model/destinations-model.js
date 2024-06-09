export default class DestinationsModel {
  #eventsApiService = null;
  #destinations = null;

  constructor(eventsApiService) {
    this.#eventsApiService = eventsApiService;
  }

  async init() {
    this.#destinations = await this.#eventsApiService.destinations;
    return this.#destinations;
  }

  get destinations() {
    return this.#destinations;
  }
}
