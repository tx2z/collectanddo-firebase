import { Collection, CollectionData } from './collection.model';

describe('Collection', () => {
  it('should create an instance of Collection', () => {
    expect(new Collection()).toBeTruthy();
  });
  it('should create an instance of CollectionData', () => {
    expect(new CollectionData()).toBeTruthy();
  });
});
