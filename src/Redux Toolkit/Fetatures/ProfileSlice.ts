import { createSlice, createAsyncThunk ,PayloadAction } from "@reduxjs/toolkit";
import { getMyProfile, updateMyProfile } from "../../Services/ProfileService";
import { UserType } from "../../Pages/types/user";

interface ProfileState {
  user: UserType | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ProfileState = {
  user: null,
  status: "idle",
  error: null,
};

export const fetchProfile = createAsyncThunk<
  UserType, 
  void, 
  { rejectValue: string }
>("profile/fetchProfile", async (_, thunkAPI) => {
  try {
    return await getMyProfile();
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || error.message
    );
  }
});

export const updateProfile = createAsyncThunk<
  UserType,
  FormData,
  { rejectValue: string }
>("profile/updateProfile", async (formData, thunkAPI) => {
  try {
    return await updateMyProfile(formData);
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || error.message
    );
  }
});

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserType>) => {
      state.user = action.payload;
    },
    logout: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchProfile.fulfilled,
        (state, action: PayloadAction<UserType>) => {
          state.status = "succeeded";
          state.user = action.payload;
        }
      )
      .addCase(fetchProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Something went wrong";
      })
      .addCase(
        updateProfile.fulfilled,
        (state, action: PayloadAction<UserType>) => {
          state.user = action.payload;
        }
      );
  },
});

export const { setUser, logout } = profileSlice.actions;
export default profileSlice.reducer;
