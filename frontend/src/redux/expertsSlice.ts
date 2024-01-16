import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import expertsApi from '../utils/expertsApi';

export const getExperts = createAsyncThunk('experts/getExperts', async (page?: number) => {
  try {
    return await expertsApi.getExperts(page);
  } catch (error) {
    return console.log(error);
  }
});

export const getExpertById = createAsyncThunk('experts/getExpertById', async (id: string) => {
  try {
    return await expertsApi.getExpert(id);
  } catch (error) {
    return console.log(error);

  }
})

interface Experts {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

interface ExpertsState {
  expertsList: Experts[],
  currentExpert: Experts;
  totalItems: number,
  currentPage: number,
  totalPages: number,
  likedExpertsId: number[],
  isLoadingAll: boolean,
  isLoadingCurrent: boolean,
}
const initialState: ExpertsState = {
  expertsList: [],
  currentExpert: { id: 0, email: '', first_name: '', last_name: '', avatar: '' },
  totalItems: 0,
  currentPage: 1,
  totalPages: 0,
  likedExpertsId: [],
  isLoadingAll: false,
  isLoadingCurrent: false,
}

const expertSlice = createSlice({
  name: 'experts',
  initialState,
  reducers: {
    clearState: (state) => {
      state.expertsList = [];
      state.currentExpert = { id: 0, email: '', first_name: '', last_name: '', avatar: '' };
      state.currentPage = 1;
      state.totalItems = 0;
      state.totalPages = 0;
      state.likedExpertsId = [];
      state.isLoadingAll = false;
      state.isLoadingCurrent = false;
    },
    loadMore: (state) => {
      if (state.currentPage !== state.totalPages)
        state.currentPage += 1;
    },

    addLike: (state, action) => {
      state.likedExpertsId.push(action.payload)
    },
    removeLike: (state, action) => {
      state.likedExpertsId = state.likedExpertsId.filter(id => id !== action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getExperts.pending, (state) => {
        state.isLoadingAll = true;
      })
      .addCase(getExperts.fulfilled, (state, action) => {
        state.isLoadingAll = false;

        if (state.currentPage === 1 && state.expertsList.length === 0)
          state.expertsList = action.payload.data;
        else
          state.expertsList = [...state.expertsList, ...action.payload.data]
        if (state.totalItems === 0)
          state.totalItems = action.payload.total;
        if (state.totalPages === 0)
          state.totalPages = action.payload.total_pages;
      })
      .addCase(getExperts.rejected, (state, action) => {
        state.isLoadingAll = false;
      });

    builder
      .addCase(getExpertById.pending, (state) => {
        state.isLoadingCurrent = true;
      })
      .addCase(getExpertById.fulfilled, (state, action) => {
        state.isLoadingCurrent = false;

        state.currentExpert = action.payload.data;
      })
      .addCase(getExpertById.rejected, (state, action) => {
        state.isLoadingCurrent = false;
      });
  },
});

export const { loadMore, clearState, addLike, removeLike } = expertSlice.actions;

export const expertsReducer = expertSlice.reducer;
