import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import expertsApi from '../utils/expertsApi';

export const getExperts = createAsyncThunk('experts/getExperts', async (page) => {
  try {
    return await expertsApi.getExperts();
  } catch (error) {
    return error;
  }
});

export const getExpertById = createAsyncThunk('experts/getExpertById', async (id: string) => {
  try {
    return await expertsApi.getExpert(id);
  } catch (error) {
    return error;

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
  startPage: number,
  totalPages: number,
  likedExpertsId: number[],
  isLoadingAll: boolean,
  isLoadingCurrent: boolean,
  error: string | null,
}
const initialState: ExpertsState = {
  expertsList: [],
  currentExpert: { id: 0, email: '', first_name: '', last_name: '', avatar: '' },
  totalItems: 0,
  startPage: 0,
  totalPages: 0,
  likedExpertsId: [],
  isLoadingAll: false,
  isLoadingCurrent: false,
  error: null,
}

const expertSlice = createSlice({
  name: 'experts',
  initialState,
  reducers: {
    clearState: (state) => {
      state.expertsList = [];
      state.startPage = 0;
      state.totalItems = 0;
      state.totalPages = 0;
    },
    loadMore: (state, action) => {
      state.startPage += 1;
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
        state.error = null;
      })
      .addCase(getExperts.fulfilled, (state, action) => {
        state.isLoadingAll = false;
        // if (action.payload)
        if (state.startPage === 0 && state.expertsList.length === 0)
          state.expertsList = [...state.expertsList, ...action.payload.data];
        if (state.totalItems === 0)
          state.totalItems = action.payload.total;
        if (state.totalPages === 0)
          state.totalPages = action.payload.total_pages;
      })
      .addCase(getExperts.rejected, (state, action) => {
        state.isLoadingAll = false;
        // state.error = action.payload;
      });

    builder
      .addCase(getExpertById.pending, (state) => {
        state.isLoadingCurrent = true;
        state.error = null;
      })
      .addCase(getExpertById.fulfilled, (state, action) => {
        state.isLoadingCurrent = false;
        // if (action.payload)

        state.currentExpert = action.payload.data;
      })
      .addCase(getExpertById.rejected, (state, action) => {
        state.isLoadingCurrent = false;
        // state.error = action.payload;
      });
  },
});

export const { loadMore, clearState, addLike, removeLike } = expertSlice.actions;

export default expertSlice.reducer;
