import {
  FETCH_COLLECTIONS_PENDING,
  FETCH_COLLECTIONS_SUCCESS,
  FETCH_COLLECTIONS_REJECTED,
  FETCH_PRODUCTS_PENDING,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_REJECTED,
} from '../actions/types';

const initialState = {
  fetchCollectionsPending: undefined,
  fetchCollectionsRejected: undefined,
  fetchCollectionsSuccess: undefined,
  fetchProductsPending: undefined,
  fetchProductsRejected: undefined,
  fetchProductsSuccess: undefined,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_PRODUCTS_PENDING: {
      const newState = {
        fetchProductsPending: action,
        fetchProductsRejected: undefined,
        fetchProductsSuccess: undefined,
      };
      return { ...state, ...newState };
    }
    case FETCH_PRODUCTS_REJECTED: {
      const newState = {
        fetchProductsPending: undefined,
        fetchProductsRejected: action,
        fetchProductsSuccess: undefined,
      };
      return { ...state, ...newState };
    }
    case FETCH_PRODUCTS_SUCCESS: {
      const newState = {
        fetchProductsPending: undefined,
        fetchProductsRejected: undefined,
        fetchProductsSuccess: action,
      };
      return { ...state, ...newState };
    }
    case FETCH_COLLECTIONS_PENDING: {
      const newState = {
        fetchCollectionsPending: action,
        fetchCollectionsRejected: undefined,
        fetchCollectionsSuccess: undefined,
      };
      return { ...state, ...newState };
    }
    case FETCH_COLLECTIONS_REJECTED: {
      const newState = {
        fetchCollectionsPending: undefined,
        fetchCollectionsRejected: action,
        fetchCollectionsSuccess: undefined,
      };
      return { ...state, ...newState };
    }
    case FETCH_COLLECTIONS_SUCCESS: {
      const newState = {
        fetchCollectionsPending: undefined,
        fetchCollectionsRejected: undefined,
        fetchCollectionsSuccess: action,
      };
      return { ...state, ...newState };
    }
    default:
      return state;
  }
}
