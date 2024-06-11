import NewEventButtonView from './view/new-point-view.js';
import { render, RenderPosition } from './framework/render.js';
import { DestinationsModel, FilterModel, OffersModel, EventsModel } from './model';
import { TripPresenter, FilterPresenter } from './presenter';
import EventsApiService from './service/points-api-service.js';

const AUTHORIZATION = 'Basic db65lk13jah';
const END_EVENT = 'https://21.objects.htmlacademy.pro/big-trip';

const tripMainContainer = document.querySelector('.trip-main');
const filterContainer = document.querySelector('.trip-controls__filters');
const tripEventsContainer = document.querySelector('.trip-events');
const eventsApiService = new EventsApiService(END_EVENT, AUTHORIZATION);
const filterModel = new FilterModel();
const destinationsModel = new DestinationsModel(eventsApiService);
const offersModel = new OffersModel(eventsApiService);
const eventsModel = new EventsModel({
  eventsApiService,
  destinationsModel,
  offersModel
});

const routePresenter = new TripPresenter({
  tripInfoContainer: tripMainContainer,
  tripEventsContainer,
  destinationsModel,
  offersModel,
  eventsModel,
  filterModel,
  onNewEventDestroy: handleNewEventFormClose
});

const filterPresenter = new FilterPresenter({
  filterContainer: filterContainer,
  filterModel,
  eventsModel
});

const newEventButtonComponent = new NewEventButtonView({
  onClick: handleNewEventButtonClick
});

function handleNewEventFormClose() {
  newEventButtonComponent.element.disabled = false;
}

function handleNewEventButtonClick() {
  routePresenter.createEvent();
  newEventButtonComponent.element.disabled = true;
}

render(newEventButtonComponent, tripMainContainer, RenderPosition.BEFOREEND);
routePresenter.init();
filterPresenter.init();
eventsModel.init();
