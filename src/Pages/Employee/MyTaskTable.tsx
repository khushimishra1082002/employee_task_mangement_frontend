import React, { useEffect, useState } from "react";
import DataTable, { createTheme } from "react-data-table-component";
import { AiOutlineSearch } from "react-icons/ai";
import axios from "axios";
import { decodeToken } from "../../Utills/DecodeToken";
import TaskStatusUpdateModel from "../Models/TaskStatusUpdateModel";
import { getMyTasks } from "../../Services/EmployeeService";

type Task = {
  task_id: number;
  title: string;
  description: string;
  status: string;
  created_at: string;
  emp_id: number;
};

// Expandable Row Component
const ExpandedComponent = ({ data }) => (
  <div className="p-4 border-l-4 border-blue-500 bg-gray-50 dark:bg-gray-800">
    <p className="text-sm">
      <strong>Task title:</strong> {data.title}
    </p>
    <p className="text-sm">
      <strong>Details:</strong> {data.description}
    </p>
    <p className="text-sm">
      <strong>Status:</strong> {data.status}
    </p>
  </div>
);

const MyTaskTable = () => {
  const [theme, setTheme] = useState("light");
  const [openTaskStatusUpdateModel, setOpenTaskStatusUpdateModel] =
    useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  console.log("tasks", tasks);

  const [userId, setUserId] = useState<number | null>(null);
  const token = sessionStorage.getItem("token");
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  const [search, setSearch] = useState<string>("");

  // Decode token and fetch user ID
  useEffect(() => {
    const decoded = decodeToken(token);
    console.log("decoded", decoded);
    console.log(decoded?.role);
    if (decoded && decoded.id) {
      setUserId(decoded.id);
    } else {
      console.error("User ID not found in token");
    }
  }, [token]);

  const filteredData = tasks?.filter((task: Task) => {
    const searchLower = search.trim().toLowerCase();
    return (
      (task.title?.toLowerCase().includes(searchLower) ?? false) ||
      (task.description?.toLowerCase().includes(searchLower) ?? false) ||
      (task.status?.toLowerCase().includes(searchLower) ?? false)
    );
  });

 const fetchTasks = async (userId: number) => {
  try {
    if (!token) return;

  const response = await getMyTasks();
    setTasks(response.data.tasks || []);
  } catch (error: any) {
    console.error(
      "Error fetching tasks:",
      error.response?.data || error.message
    );
    setTasks([]); // safety
  }
};


  useEffect(() => {
    if (userId) {
      fetchTasks(userId);
    }
  }, [userId]);

  const handleUpdateTask = (id: number) => {
    console.log(id);
    setSelectedTaskId(id);
    setOpenTaskStatusUpdateModel(!openTaskStatusUpdateModel);
  };

  // Define Table Columns
  const columns = [
    {
      name: "TID",
      selector: (row: Task) => row.task_id,
      sortable: true,
      width: "80px",
    },
    {
      name: "Title",
      selector: (row: Task) => row.title,
      sortable: true,
      width: "180px",
    },
    {
      name: "Status",
      selector: (row: Task) => row.status,
      sortable: true,
      width: "140px",
    },
    {
      name: "Description",
      selector: (row: Task) => row.description,
      width: "220px",
    },
    {
      name: "Created_at",
      selector: (row: Task) => row.created_at,
      width: "140px",
    },
    {
      name: "Emp_id",
      selector: (row: Task) => row.emp_id,
      sortable: true,
      width: "90px",
    },
    {
      name: "Actions",
      cell: (row: Task) => (
        <button
          onClick={() => handleUpdateTask(row.task_id)}
          className="bg-yellow-500 text-white rounded-md p-2
           font-semibold hover:bg-yellow-600 transition"
        >
          Update Status
        </button>
      ),
      width: "160px",
    },
  ];

  // Custom Table Styles
  const customStyles = {
    rows: { style: { minHeight: "60px", fontFamily: "Open Sans, sans-serif" } },
    headCells: {
      style: {
        fontWeight: "500",
        fontSize: "14px",
        paddingLeft: "8px",
        fontFamily: "Inter, serif",
      },
    },
    cells: {
      style: { paddingLeft: "8px", fontFamily: "Roboto Flex, sans-serif" },
    },
  };

  return (
    <div
      className={`p-6 transition-all duration-300  bg-white space-y-4
      }`}
    >
      <h2 className="text-xl font-medium font-RobotoFlex"> My Tasks List</h2>

      {/* Search & Actions */}
      <div className="flex items-center gap-4 h-10 w-full mb-4">
        <div className="relative flex-grow">
          <input
            className="border border-gray-300 rounded-md font-RobotoFlex w-full pl-10 pr-3 py-2 focus:ring-2 focus:ring-blue-500 transition"
            type="text"
            placeholder="Search Tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <AiOutlineSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500 text-lg" />
        </div>
      </div>

      <DataTable
        columns={columns}
        data={filteredData}
        selectableRows
        expandableRows
        expandableRowsComponent={ExpandedComponent}
        pagination
        paginationPerPage={5}
        highlightOnHover
        pointerOnHover
        persistTableHead
        responsive
        fixedHeaderScrollHeight="300px"
        theme={theme}
        customStyles={customStyles}
      />

      <TaskStatusUpdateModel
        openTaskStatusUpdateModel={openTaskStatusUpdateModel}
        setOpenTaskStatusUpdateModel={setOpenTaskStatusUpdateModel}
        taskId={selectedTaskId}
        refetchTasks={() => userId && fetchTasks(userId)}
      />
    </div>
  );
};

export default MyTaskTable;
