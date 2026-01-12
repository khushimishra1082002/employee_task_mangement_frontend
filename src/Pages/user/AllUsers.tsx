import React, { useState, useEffect } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { FaEdit, FaPlus } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { AiOutlineSearch } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../Redux Toolkit/app/Store";
import { fetchUsers } from "../../Redux Toolkit/Fetatures/UserSlice";
import AddUserModel from "../Models/AddUserModel";
import DeleteUserModel from "../Models/DeleteUserModel";
import EditUserModel from "../Models/EditUserModel";
import { FaUserShield } from "react-icons/fa";
import ChangeRoleModal from "../Models/ChangeRoleModal";

// Define the User interface
interface User {
  _id: string; // ⭐ MongoDB id
  name: string;
  role: string;
  email: string;
  password: string;
}

// Define the ExpandedComponent props interface
interface ExpandedComponentProps {
  data: User;
}

const AllUsers: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [selectedUser, setSelectedUser] = useState<{
    id: string;
    role: string;
  } | null>(null);

  const [openAddUserModel, setOpenAddUserModel] = useState<boolean>(false);
  const [openChangeRoleModel, setOpenChangeRoleModel] =
    useState<boolean>(false);

  const [openDeleteUserModel, setOpenDeleteUserModel] =
    useState<boolean>(false);
  const [openEditUserModel, setOpenEditUserModel] = useState<boolean>(false);
  const [getDeleteId, setGetDeleteId] = useState<string | null>(null);
  const [getEditId, setEditId] = useState<string | null>(null);

  const [search, setSearch] = useState<string>("");

  const token = sessionStorage.getItem("token");
  console.log("token", token);
  const currentUserRole = sessionStorage.getItem("role");

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleDelete = (id: string) => {
    console.log("Delete ID:", id); // DEBUG
    setGetDeleteId(id);
    setOpenDeleteUserModel(true);
  };

  const handleEdit = (id: string) => {
    setEditId(id);
    setOpenEditUserModel(true);
  };

  const { users } = useSelector((state: RootState) => state.users);
  console.log("Users in Redux:", users);

  const columns: TableColumn<User>[] = [
    { name: "Id", selector: (row) => row._id, sortable: true, width: "100px" },
    {
      name: "Name",
      cell: (row) => <div className="capitalize">{row.name}</div>,
      sortable: true,
      width: "140px",
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
      width: "200px",
    },
    {
      name: "Password",
      selector: (row) => row.password,
      sortable: true,
      width: "160px",
    },
    {
      name: "Role",
      cell: (row) => <div className="capitalize">{row.role}</div>,
      sortable: true,
      width: "150px",
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

          {currentUserRole === "admin" && (
            <button
              onClick={() => {
                setSelectedUser({
                  id: row._id,
                  role: row.role,
                });
                setOpenChangeRoleModel(true);
              }}
              className="p-2 bg-yellow-600 text-white rounded-md"
              title="Change Role"
            >
              <FaUserShield />
            </button>
          )}
        </div>
      ),
      width: "130px",
    },
  ];

  if (!token) {
    return (
      <div className="p-4 text-center text-red-500 font-medium">
        Please log in to view the user list.
      </div>
    );
  }

  const ExpandedComponent: React.FC<ExpandedComponentProps> = ({ data }) => (
    <div className="p-4 border-l-4 border-blue-500 bg-gray-100 dark:bg-gray-800">
      <p className="text-sm">
        <strong>Email:</strong> {data.email}
      </p>
      <p className="text-sm">
        <strong>Role:</strong> {data.role}
      </p>
    </div>
  );

  const filteredData = users.filter((user: User) => {
    const searchLower = search.trim().toLowerCase();
    return (
      user.name.toLowerCase().includes(searchLower) ||
      user.email.toLowerCase().includes(searchLower) ||
      user.role.toLowerCase().includes(searchLower)
    );
  });

  return (
    <>
      <div className="p-6 transition-all duration-300 bg-white space-y-4">
        <h2 className="text-xl font-medium font-RobotoFlex">All User List</h2>

        {/* Search Bar */}
        <div className="flex justify-between gap-2 items-center mb-4">
          <div className="relative flex-grow">
            <input
              className="border border-gray-300 rounded-md font-RobotoFlex w-full pl-10 pr-3 py-2 focus:ring-2 focus:ring-blue-500 transition"
              type="text"
              placeholder="Search Users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <AiOutlineSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500 text-lg" />
          </div>
          <button
            onClick={() => setOpenAddUserModel(true)}
            className="flex items-center gap-1 bg-green-500 py-2 px-4 rounded text-white font-semibold font-Poppins"
          >
            <FaPlus className="text-xl" /> Create new user
          </button>
        </div>

        {/* Data Table */}
        <DataTable
          columns={columns}
          data={filteredData}
          pagination
          highlightOnHover
          responsive
          customStyles={customStyles}
          expandableRows
          expandableRowsComponent={ExpandedComponent}
          paginationPerPage={5}
        />
      </div>

      {/* Modals */}
      {openAddUserModel && (
        <AddUserModel
          openAddUserModel={openAddUserModel}
          setOpenAddUserModel={setOpenAddUserModel}
        />
      )}
      {openDeleteUserModel && getDeleteId !== null && (
        <DeleteUserModel
          openDeleteUserModel={openDeleteUserModel}
          setOpenDeleteUserModel={setOpenDeleteUserModel}
          getDeleteId={getDeleteId}
        />
      )}
      {openEditUserModel && getEditId !== null && (
        <EditUserModel
          openEditUserModel={openEditUserModel}
          setOpenEditUserModel={setOpenEditUserModel}
          getEditId={getEditId}
        />
      )}

      {openChangeRoleModel && (
        <ChangeRoleModal
          open={openChangeRoleModel}
          setOpen={setOpenChangeRoleModel}
          userId={selectedUser.id}
          currentRole={selectedUser.role}
        />
      )}
    </>
  );
};

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

export default AllUsers;
