import { configureStore } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
import storage from 'redux-persist/lib/storage';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

const initialContacts = {
  items: [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  ],
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: initialContacts,
  reducers: {
    addContact(state, action) {
      const { name, number } = action.payload;
      const isInContacts = state.items.some(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      );

      if (isInContacts) return alert(`${name} is already in your contacts!`);

      state.items.push({ id: nanoid(), name, number });
    },
    deleteContact(state, action) {
      const index = state.items.findIndex(
        contact => contact.id === action.payload
      );
      state.items.splice(index, 1);
    },
  },
});

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    setFilter(state, action) {
      return (state = action.payload);
    },
  },
});

const persistConfig = {
  key: 'contacts',
  storage,
};

const persistedContactsReducer = persistReducer(
  persistConfig,
  contactsSlice.reducer
);

export const { addContact, deleteContact } = contactsSlice.actions;
export const { setFilter } = filterSlice.actions;

export const store = configureStore({
  reducer: {
    contacts: persistedContactsReducer,
    filter: filterSlice.reducer,
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REGISTER, REHYDRATE, PAUSE, PERSIST, PURGE],
      },
    });
  },
});

export const persistor = persistStore(store);
