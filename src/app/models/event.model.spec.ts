import { UserEventData, UserEvent, UserEventRange } from './event.model';

describe('Event', () => {
  it('should create an instance of EventData', () => {
    expect(new UserEventData()).toBeTruthy();
  });
  it('should create an instance of EventData', () => {
    expect(new UserEvent()).toBeTruthy();
  });
  it('should create an instance of EventData', () => {
    expect(new UserEventRange()).toBeTruthy();
  });
});
