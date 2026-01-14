import React, { useState, useEffect } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { FaEdit, FaPlus } from "react-icons/fa";
import { MdDeleteForever, MdFilterList, MdRefresh } from "react-icons/md";
import { AiOutlineSearch } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../../Redux Toolkit/Fetatures/TaskSlice";
import { RootState, AppDispatch } from "../../Redux Toolkit/app/Store";
import { Link } from "react-router-dom";
import EditTaskModel from "../Models/EditTaskModel";
import DeleteTaskModel from "../Models/DeleteTaskModel";

// interface Task {
//   _id: string;
//   title: string;
//   description: string;
//   status: string;
//   assigned_to?: {
//     name?: string;
//   };
//   createdAt?: string;
// }

interface Task {
  _id: string;
  title: string;
  description: string;
  status: string;

  assigned_to?: {
    _id?: string;
    name?: string;
    email?: string;
  };

  createdAt?: string;
}


const AllTasks: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

const [selectedId, setSelectedId] = useState<string>("");

  const [selectedDeleteId, setSelectedDeleteId] = useState<string | null>(null);
  const [search, setSearch] = useState<string>("");
  const [EditTaskDetailModel, setEditTaskDetailModel] = useState(false);
  const [openDeleteModel, setOpenDeleteModel] = useState(false);

  const { tasks } = useSelector((state: RootState) => state.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleDelete = (id: string) => {
    setSelectedDeleteId(id);
    setOpenDeleteModel(true);
  };

  const filteredData = tasks.filter((task) => {
    const searchLower = search.trim().toLowerCase();

    return (
      task.title?.toLowerCase().includes(searchLower) ||
      task.description?.toLowerCase().includes(searchLower) ||
      task.status?.toLowerCase().includes(searchLower) ||
      task.assigned_to?.name?.toLowerCase().includes(searchLower)
    );
  });

  const ExpandedComponent = ({ data }: { data: Task }) => (
    <div className="p-4 border-l-4 border-blue-500 bg-gray-100 dark:bg-gray-800">
      <p className="text-sm">
        <strong>Details:</strong> {data.description}
      </p>
      <p className="text-sm">
        <strong>Status:</strong> {data.status}
      </p>
    </div>
  );

  const columns: TableColumn<Task>[] = [
    {
      name: "ID",
      selector: (row) => row._id,
      sortable: true,
      width: "220px",
    },
    {
      name: "Assigned To",
      selector: (row) => row.assigned_to?.name ?? "—",
      sortable: true,
      width: "160px",
    },
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
      width: "200px",
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
      width: "150px",
    },
    { name: "Description", selector: (row) => row.description, width: "160px" },
    {
      name: "Created At",
      selector: (row) =>
        row.createdAt ? new Date(row.createdAt).toLocaleString() : "—",
      sortable: true,
      width: "180px",
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleEdit(row._id)}
            className="p-2 bg-blue-500 text-white rounded-md flex justify-center items-center"
          >
            <FaEdit className="text-lg" />
          </button>
          <button
            onClick={() => handleDelete(row._id)} 
            className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            <MdDeleteForever className="text-lg" />
          </button>
        </div>
      ),
      width: "130px",
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

  const handleEdit = (id: string) => {
    setSelectedId(id);
    setEditTaskDetailModel(!EditTaskDetailModel);
  };

  return (
    <>
      <div>
        <div className={`p-6 transition-all duration-300  bg-white space-y-4`}>
          <h2 className="text-xl font-medium font-RobotoFlex">Tasks List</h2>
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
            <MdFilterList className="text-2xl cursor-pointer text-gray-600 hover:text-gray-900 transition" />
            <MdRefresh className="text-2xl cursor-pointer text-gray-600 hover:text-gray-900 transition" />
            <Link
              to="/dashboard/assignTasks"
              className="bg-green-500 text-white rounded px-5
               py-2 font-medium flex items-center gap-1 shadow-md hover:bg-green-600
                hover:scale-105 transition font-Poppins"
            >
              <FaPlus />
              Assign Task
            </Link>
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
            customStyles={customStyles}
          />
        </div>
        <div>
          {EditTaskDetailModel && (
            <EditTaskModel
              EditTaskDetailModel={EditTaskDetailModel}
              setEditTaskDetailModel={setEditTaskDetailModel}
              selectedId={selectedId}
            />
          )}
        </div>
        <div>
          {openDeleteModel && selectedDeleteId !== null && (
            <DeleteTaskModel
              openDeleteModel={openDeleteModel}
              setOpenDeleteModel={setOpenDeleteModel}
              selectedDeleteId={selectedDeleteId}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default AllTasks;
