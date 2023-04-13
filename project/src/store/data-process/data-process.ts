import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../consts/consts';
import { DataProcess } from '../../types/state';
import { fetchCommentAction, fetchCurrentOfferAction, fetchNearOffersAction, fetchOffersAction, sendCommentAction } from '../api-actions';


function filterPrice(a: number, b: number) {
  return (a - b);
}

function filterRating(a: number, b: number) {
  return (a - b);
}

const initialState: DataProcess = {
  offers: [],
  getOffer: null,
  nearOffers: [],
  data: [],
  reviews: [],
  isOffersLoading: false,
  filterName: '',
  error: null,
};

export const dataProcess = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {
    changeOption: (state, action: PayloadAction<{filterName: string}>) => {
      const { filterName } = action.payload;

      if (filterName === 'Price: low to high') {
        const filterOffer = state.offers.sort((a, b) => filterPrice(a.price, b.price));
        state.offers = filterOffer;
      } else if (filterName === 'Price: high to low') {
        const filterOffer = state.offers.sort((a, b) => filterPrice(b.price, a.price));
        state.offers = filterOffer;
      } else if (filterName === 'Top rated first') {
        const filterOffer = state.offers.sort((a, b) => filterRating(b.rating, a.rating));
        state.offers = filterOffer;
      } else {
        const filterOffer = state.offers.sort((a, b) => filterPrice(a.id, b.id));
        state.offers = filterOffer;
      }

      state.filterName = filterName;
    },
    changeOfferList: (state, action: PayloadAction<{cityName: string}>) => {
      const { cityName } = action.payload;

      const newOffer = state.data.filter((оffer) => оffer.city.name === cityName);
      state.offers = newOffer;
    },
    // setError: (state, action: PayloadAction<string | null>) => {
    //   // const {err} = action.payload;
    //   state.error = action.payload;
    // }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isOffersLoading = true;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.data = action.payload;
        state.offers = action.payload;
        state.isOffersLoading = false;
      })
      .addCase(fetchCurrentOfferAction.fulfilled, (state, action) => {
        state.getOffer = action.payload;
      })
      .addCase(fetchNearOffersAction.fulfilled, (state, action) => {
        state.nearOffers = action.payload;
      })
      .addCase(fetchCommentAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
      })
      .addCase(sendCommentAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
      });
  }
});


export const { changeOption, changeOfferList,
  // setError
} = dataProcess.actions;
