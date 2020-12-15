import { Action, scheduler } from '@action-streams/core';
import { startWith } from '@most/core';
import { currentTime } from '@most/scheduler';
import { createHashHistory, Location } from 'history';
import { create, event } from 'most-subject';

const history = createHashHistory();
const LocationActionType = 'location';

interface LocationAction extends Action {
  payload: Location;
  type: typeof LocationActionType;
}

const [sink, stream] = create<LocationAction>();

const toAction = (location: Location): LocationAction => ({
  payload: location,
  type: LocationActionType,
});

const location$ = startWith(toAction(history.location), stream);

history.listen(({ location }) => {
  event(currentTime(scheduler), toAction(location), sink);
});

export { Location, location$, LocationAction, LocationActionType };
