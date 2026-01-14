// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { getAllTasks } from "../../Services/TaskService";

// export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
//   try {
//     const data = await getAllTasks();
//     console.log("All tasks:", data);
//     return data;
//   } catch (error) {
//     console.error(
//       "Failed to fetch tasks:",
//       error.response?.data || error.message
//     );
//     throw new Error(error.response?.data?.message || "Failed to fetch tasks");
//   }
// });

// const taskSlice = createSlice({
//   name: "tasks",
//   initialState: {
//     tasks: [],
//     status: "idle",
//     error: null,
//   },
//   reducers: {
//     addTask: (state, action) => {
//       console.log("Before adding task:", state.tasks);
//       state.tasks = [...state.tasks, action.payload];
//       console.log("After adding task:", state.tasks);
//     },
//   },

//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchTasks.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(fetchTasks.fulfilled, (state, action) => {
//         state.status = "succeeded";

//         // extract tasks array from API response
//         state.tasks = Array.isArray(action.payload?.tasks)
//           ? action.payload.tasks
//           : [];
//       })

//       .addCase(fetchTasks.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.error.message;
//       });
//   },
// });

// export const { addTask } = taskSlice.actions;
// export default taskSlice.reducer;

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getAllTasks } from "../../Services/TaskService";
import { Task } from "../../Pages/types/task";

interface TaskApiResponse {
  tasks: Task[];
}

interface TaskState {
  tasks: Task[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

/* ================= ASYNC THUNK ================= */

export const fetchTasks = createAsyncThunk<
  TaskApiResponse,      // return type
  void,                 // argument type
  { rejectValue: string }
>("tasks/fetchTasks", async (_, { rejectWithValue }) => {
  try {
    const data = await getAllTasks();
    console.log("All tasks:", data);
    return data;
  } catch (error: any) {
    console.error(
      "Failed to fetch tasks:",
      error.response?.data || error.message
    );
    return rejectWithValue(
      error.response?.data?.message || "Failed to fetch tasks"
    );
  }
});

/* ================= INITIAL STATE ================= */

const initialState: TaskState = {
  tasks: [],
  status: "idle",
  error: null,
};

/* ================= SLICE ================= */

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tasks = action.payload.tasks ?? [];
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Something went wrong";
      });
  },
});

/* ================= EXPORTS ================= */

export const { addTask } = taskSlice.actions;
export default taskSlice.reducer;

