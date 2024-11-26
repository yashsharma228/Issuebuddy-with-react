import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//create action
export const createUser = createAsyncThunk(
  "createUser",
  async (data, { rejectWithValue }) => {
    console.log("data", data);
    const response = await fetch(
      "https://6731af4a7aaf2a9aff118f16.mockapi.io/HostelProblem",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    try {
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

//read action
export const showUser = createAsyncThunk(
  "showUser",
  async (args, { rejectWithValue }) => {
    const response = await fetch(
      "https://6731af4a7aaf2a9aff118f16.mockapi.io/HostelProblem"
    );

    try {
      const result = await response.json();
      console.log(result);
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

//delete action
export const deleteUser = createAsyncThunk(
  "deleteUser",
  async (id, { rejectWithValue }) => {
    const response = await fetch(
      `https://6731af4a7aaf2a9aff118f16.mockapi.io/HostelProblem/${id}`,
      { method: "DELETE" }
    );

    try {
      const result = await response.json();
      console.log(result);
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

//update action
export const updateUser = createAsyncThunk(
  "updateUser",
  async (data, { rejectWithValue }) => {
    console.log("updated data", data);
    const response = await fetch(
      `https://6731af4a7aaf2a9aff118f16.mockapi.io/HostelProblem/${data.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    try {
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const userDetails = createSlice({
  name: "userDetails",
  initialState: {
    users: [],
    loading: false,
    error: null,
    searchData: [],
  },

  reducers: {
    searchUser: (state, action) => {
      console.log(action.payload);
      state.searchData = action.payload;
    },
  },

extraReducers: (builder) => {
  builder
    .addCase(createUser.pending, (state) => {
      state.loading = true;
    })
    .addCase(createUser.fulfilled, (state, action) => {
      state.loading = false;
      state.users.push(action.payload);
    })
    .addCase(createUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message || "Error occurred while creating user.";
    })
    .addCase(showUser.pending, (state) => {
      state.loading = true;
    })
    .addCase(showUser.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
    })
    .addCase(showUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Error occurred while fetching users.";
    })
    .addCase(deleteUser.pending, (state) => {
      state.loading = true;
    })
    .addCase(deleteUser.fulfilled, (state, action) => {
      state.loading = false;
      const { id } = action.payload;
      if (id) {
        state.users = state.users.filter((ele) => ele.id !== id);
      }
    })
    .addCase(deleteUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Error occurred while deleting user.";
    })
    .addCase(updateUser.pending, (state) => {
      state.loading = true;
    })
    .addCase(updateUser.fulfilled, (state, action) => {
      state.loading = false;
      state.users = state.users.map((ele) =>
        ele.id === action.payload.id ? action.payload : ele
      );
    })
    .addCase(updateUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message || "Error occurred while updating user.";
    });
},
});


export default userDetails.reducer;

export const { searchUser } = userDetails.actions;
