export const signInWithEmailAndPassword = jest.fn(() => Promise.resolve());
export const auth = jest.fn();
export const doc = jest.fn((db, users, id) => Promise.resolve({}));
export const getDoc = jest.fn(() => Promise.resolve());
export const db = {};
