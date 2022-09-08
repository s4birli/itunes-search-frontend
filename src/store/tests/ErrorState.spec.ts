import { createNewStore, AppStore } from '../configureStore';
import { getUnreadErrors, errorHappened, readErrors } from '../states/ErrorState';

describe('Social Tests', () => {
  let store: AppStore;

  beforeEach(() => {
    store = createNewStore();
  });

  const errorState = () => store.getState().error;

  describe('errorHappened reducer', () => {
    it('should save values into the state', async () => {
      const message = 'Test Error';
      const code = 404;

      await store.dispatch(errorHappened({ message, code }));

      expect(errorState().list).toHaveLength(1);
      expect(errorState().list[0]).toMatchObject({ message, code, id: 1, read: false });
    });

    it('should save values into the state, if code is not present', async () => {
      const message = 'Test Error';

      await store.dispatch(errorHappened({ message }));

      expect(errorState().list).toHaveLength(1);
      expect(errorState().list[0].message).toBe(message);
    });

    it('should not save values into the state, if message is empty', async () => {
      const message = '';

      await store.dispatch(errorHappened({ message }));

      expect(errorState().list).toHaveLength(0);
    });
  });

  describe('readErrors reducer', () => {
    beforeEach(async () => {
      const message = 'Test Error';
      const code = 404;

      for (let i = 0; i < 5; i++) {
        await store.dispatch(errorHappened({ message, code }));
      }
    });

    it('should set read to true for single id', async () => {
      await store.dispatch(readErrors([ { id: 2 } ]));

      errorState().list.forEach((e) => {
        expect(e.read).toBe(e.id === 2);
      });
    });

    it('should set read to true for multiple Ids', async () => {
      await store.dispatch(readErrors([ { id: 2 }, { id: 4 } ]));

      errorState().list.forEach((e) => {
        expect(e.read).toBe(e.id === 2 || e.id === 4);
      });
    });
  });

  describe('getUnreadErrors selector', () => {
    const errorsCount = 5;

    beforeEach(async () => {
      const message = 'Test Error';
      const code = 404;

      for (let i = 0; i < errorsCount; i++) {
        await store.dispatch(errorHappened({ message, code }));
      }
    });

    it('should return all data', async () => {
      const unreadErrors = getUnreadErrors(store.getState());

      expect(unreadErrors).toHaveLength(errorsCount);
    });

    it('should return just unread errors', async () => {
      await store.dispatch(readErrors([ { id: 2 } ]));

      const unreadErrors = getUnreadErrors(store.getState());

      expect(unreadErrors).toHaveLength(errorsCount - 1);

      unreadErrors.forEach((error) => {
        expect(error.read).toBe(false);
      });
    });
  });
});
export {};
