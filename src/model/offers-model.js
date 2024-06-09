export default class OffersModel {
  #eventsApiService = null;
  #offers = null;

  constructor(eventsApiService) {
    this.#eventsApiService = eventsApiService;
  }

  async init() {
    this.#offers = await this.#eventsApiService.offers;
    return this.#offers;
  }

  get offers() {
    return this.#offers;
  }
}
