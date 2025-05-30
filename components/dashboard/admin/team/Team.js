// import React, { useEffect, useState } from "react";
// import {
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TablePagination,
//   Avatar,
//   Chip,
//   IconButton,
//   Tooltip,
//   useMediaQuery,
//   Box,
//   Button,
//   Modal,
//   TextField,
//   Stack,
//   Input,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogContentText,
//   DialogTitle,
// } from "@mui/material";
// import { Edit, Delete, Add } from "@mui/icons-material";
// import { styled, useTheme } from "@mui/material/styles";
// import { motion } from "framer-motion";
// import axios from "axios"; // For API calls
// import { toast } from "react-toastify";

// // Vibrant color palette
// const colors = {
//   headerBg: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//   rowHover:
//     "linear-gradient(90deg, rgba(102,126,234,0.1) 0%, rgba(118,75,162,0.1) 100%)",
//   engineer: "#4caf50",
//   designer: "#2196f3",
//   manager: "#ff9800",
//   executive: "#f44336",
//   other: "#9c27b0",
//   liked: "#e91e63",
//   edit: "#3f51b5",
//   delete: "#ff5252",
//   addButton: "#667eea",
// };

// // Modal style
// const modalStyle = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 600,
//   bgcolor: "background.paper",
//   borderRadius: "16px",
//   boxShadow: 24,
//   p: 4,
// };

// // Styled components
// const StyledPaper = styled(Paper)({
//   background: "linear-gradient(45deg, #f5f7fa 0%, #e0e5f0 100%)",
//   borderRadius: "16px",
//   boxShadow: "0 12px 40px rgba(102, 126, 234, 0.2)",
//   overflow: "hidden",
//   border: "1px solid rgba(255, 255, 255, 0.3)",
// });

// const StyledTableHeader = styled(TableHead)({
//   background: colors.headerBg,
// });

// const StyledHeaderCell = styled(TableCell)(({ theme }) => ({
//   color: "white !important",
//   fontWeight: "800 !important",
//   fontSize: theme.breakpoints.down("sm")
//     ? "12px !important"
//     : "16px !important",
//   fontFamily: '"Poppins", sans-serif !important',
//   textTransform: "uppercase",
//   letterSpacing: "1px",
//   padding: theme.breakpoints.down("sm") ? "8px !important" : "16px !important",
// }));

// const AnimatedTableRow = motion(
//   styled(TableRow)({
//     background: "transparent",
//     transition: "all 0.3s ease",
//     "&:hover": {
//       background: colors.rowHover,
//       transform: "translateY(-2px)",
//       boxShadow: "0 6px 12px rgba(0,0,0,0.1)",
//     },
//     "&:nth-of-type(odd)": {
//       background: "rgba(245, 247, 250, 0.6)",
//     },
//   })
// );

// const PositionChip = styled(Chip)(({ position, theme }) => {
//   let bgColor;
//   if (position.includes("Engineer")) bgColor = colors.engineer;
//   else if (position.includes("Designer")) bgColor = colors.designer;
//   else if (position.includes("Manager") || position.includes("Lead"))
//     bgColor = colors.manager;
//   else if (position.includes("CEO") || position.includes("CTO"))
//     bgColor = colors.executive;
//   else bgColor = colors.other;

//   return {
//     backgroundColor: bgColor,
//     color: "white !important",
//     fontWeight: "700",
//     fontSize: theme.breakpoints.down("sm") ? "10px" : "12px",
//     padding: "4px 8px",
//     borderRadius: "12px",
//     boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
//     height: theme.breakpoints.down("sm") ? "24px" : "auto",
//   };
// });

// // API configuration
// const API_BASE_URL = "https://your-api-endpoint.com/api"; // Replace with your API URL

// // Team member data
// const teamMembers = [
//   {
//     id: 1,
//     name: "Alex Johnson",
//     position: "Frontend Engineer",
//     image: "https://i.pravatar.cc/150?img=1",
//   },
//   {
//     id: 2,
//     name: "Maria Garcia",
//     position: "UX Designer",
//     image: "https://i.pravatar.cc/150?img=2",
//   },
//   {
//     id: 3,
//     name: "James Wilson",
//     position: "Product Manager",
//     image: "https://i.pravatar.cc/150?img=3",
//   },
//   {
//     id: 4,
//     name: "Sarah Lee",
//     position: "Backend Engineer",
//     image: "https://i.pravatar.cc/150?img=4",
//   },
//   {
//     id: 5,
//     name: "David Kim",
//     position: "CTO",
//     image: "https://i.pravatar.cc/150?img=5",
//   },
//   {
//     id: 6,
//     name: "Emma Davis",
//     position: "UI Designer",
//     image: "https://i.pravatar.cc/150?img=6",
//   },
//   {
//     id: 7,
//     name: "Michael Brown",
//     position: "DevOps Engineer",
//     image: "https://i.pravatar.cc/150?img=7",
//   },
//   {
//     id: 8,
//     name: "Sophia Martinez",
//     position: "Team Lead",
//     image: "https://i.pravatar.cc/150?img=8",
//   },
//   {
//     id: 9,
//     name: "Daniel Taylor",
//     position: "Fullstack Engineer",
//     image: "https://i.pravatar.cc/150?img=9",
//   },
//   {
//     id: 10,
//     name: "Olivia Anderson",
//     position: "HR Manager",
//     image: "https://i.pravatar.cc/150?img=10",
//   },
// ];

// export default function ModernEmployeeTable() {
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [employees, setEmployees] = useState([]);
//   const [openAddModal, setOpenAddModal] = useState(false);
//   const [openEditModal, setOpenEditModal] = useState(false);
//   const [openDeleteModal, setOpenDeleteModal] = useState(false);
//   const [currentMember, setCurrentMember] = useState(null);
//   const [newMember, setNewMember] = useState({
//     name: "",
//     position: "",
//     image: null,
//     previewImage: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const theme = useTheme();
//   const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

//   // API call to fetch employees (you would call this in useEffect)
//   useEffect(() => {
//     fetchEmployees();
//   }, []);

//   const fetchEmployees = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch(`${process.env.API}/admin/team`);

//       const data = await response.json();

//       setEmployees(data);
//     } catch (error) {
//       console.error("Error fetching employees:", error);
//       // Handle error (show toast, etc.)
//     } finally {
//       setLoading(false);
//     }
//   };


  
//   const handleEditClick = (employee) => {
//     setCurrentMember(employee);
//     setNewMember({
//       name: employee?.name,
//       position: employee?.position,
//       image: null,
//       previewImage: employee?.image,
//     });
//     setOpenEditModal(true);
//   };

//   const handleDeleteClick = (employee) => {
//     setCurrentMember(employee);
//     setOpenDeleteModal(true);
//   };

//   const handleDelete = async () => {
//     try {
//       setLoading(true);
//       await fetch(`${process.env.API}/admin/team/${currentMember._id}`, {
//         method: "DELETE",
//       });
//       setEmployees((prev) =>
//         prev.filter((emp) => emp._id !== currentMember._id)
//       );
//       setOpenDeleteModal(false);
//       toast.success("Team member deleted successfully");
//       // Show success message
//     } catch (error) {
//       console.error("Error deleting employee:", error);
//       // Handle error
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewMember((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setNewMember((prev) => ({
//           ...prev,
//           image: file,
//           previewImage: reader.result,
//         }));
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleAddMember = async () => {
//     if (!newMember.name || !newMember.position) return;

//     try {
//       setLoading(true);

//       let imageUrl = "";

//       // 🔼 1. Upload to Cloudinary
//       if (newMember.image) {
//         const imageData = new FormData();
//         imageData.append("file", newMember.image);
//         imageData.append("upload_preset", "ml_default"); // Attach the Cloudinary upload preset.

//         const cloudRes = await fetch(
//           `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
//           {
//             method: "POST",
//             body: imageData,
//           }
//         );

//         const cloudData = await cloudRes.json();
//         imageUrl = cloudData.secure_url;
//       }

//       // 🔽 2. Send data to your backend
//       const response = await fetch(`${process.env.API}/admin/team`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           name: newMember.name,
//           position: newMember.position,
//           image: imageUrl,
//         }),
//       });

//       const data = await response.json();
//       setEmployees((prev) => [...prev, data]);
//       handleCloseModal();
//       toast.success("Team memeber added successfully");

//       // Show success message if needed
//     } catch (error) {
//       console.error("Error adding employee:", error);
//       // Show error toast
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleUpdateMember = async () => {
//     if (!newMember.name || !newMember.position || !currentMember) return;

//     try {
//       setLoading(true);

//       let imageUrl = currentMember.image; // Start with old image URL

//       // 🔼 1. Upload new image if a new one was selected
//       if (newMember.image && typeof newMember.image !== "string") {
//         const imageData = new FormData();
//         imageData.append("file", newMember.image);
//         imageData.append("upload_preset", "ml_default"); // Your Cloudinary preset

//         const cloudRes = await fetch(
//           `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
//           {
//             method: "POST",
//             body: imageData,
//           }
//         );

//         const cloudData = await cloudRes.json();
//         imageUrl = cloudData.secure_url;
//       }

//       // 🔽 2. Update employee data in your backend
//       const response = await fetch(
//         `${process.env.API}/admin/team/${currentMember._id}`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             name: newMember.name,
//             position: newMember.position,
//             image: imageUrl,
//           }),
//         }
//       );

//       const updatedEmployee = await response.json();

//       setEmployees((prev) =>
//         prev.map((emp) =>
//           emp._id === currentMember._id ? updatedEmployee : emp
//         )
//       );
//       setOpenEditModal(false);
//       toast.success("Team member updated successfully!");
//     } catch (error) {
//       console.error("Error updating employee:", error);
//       toast.error("Failed to update team member.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCloseModal = () => {
//     setOpenAddModal(false);
//     setOpenEditModal(false);
//     setNewMember({
//       name: "",
//       position: "",
//       image: null,
//       previewImage: "",
//     });
//   };

//   // Pagination handlers
//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   return (
//     <>
//       <StyledPaper sx={{ width: "100%", p: isSmallScreen ? 1 : 3 }}>
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "flex-end",
//             mb: 2,
//           }}
//         >
//           <Button
//             variant="contained"
//             startIcon={<Add />}
//             onClick={() => setOpenAddModal(true)}
//             sx={{
//               backgroundColor: "#8A12FC",
//               input: { color: "white" },
//               "& .MuiOutlinedInput-root": {
//                 "& fieldset": {
//                   borderColor: "#8A12FC",
//                 },
//                 "&:hover fieldset": {
//                   borderColor: "#8A12FC",
//                   backgroundColor: "#8A12FC",
//                 },
//                 "&.Mui-focused fieldset": {
//                   borderColor: "#8A12FC",
//                 },
//               },
//             }}
//             disabled={loading}
//           >
//             Add Team Member
//           </Button>
//         </Box>

//         <TableContainer
//           sx={{
//             maxHeight: "70vh",
//             borderRadius: "12px",
//             "&::-webkit-scrollbar": {
//               width: "6px",
//               height: "6px",
//             },
//             "&::-webkit-scrollbar-thumb": {
//               background: "rgba(102,126,234,0.5)",
//               borderRadius: "4px",
//             },
//           }}
//         >
//           <Table
//             stickyHeader
//             aria-label="modern employee table"
//             size={isSmallScreen ? "small" : "medium"}
//           >
//             <StyledTableHeader>
//               <TableRow>
//                 {!isSmallScreen && <StyledHeaderCell>Profile</StyledHeaderCell>}
//                 <StyledHeaderCell>Name</StyledHeaderCell>
//                 <StyledHeaderCell>Position</StyledHeaderCell>
//                 <StyledHeaderCell>Actions</StyledHeaderCell>
//               </TableRow>
//             </StyledTableHeader>
//             <TableBody>
//               {employees
//                 .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                 .map((employee) => (
//                   <AnimatedTableRow
//                     key={employee?._id}
//                     hover
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.3 }}
//                   >
//                     {!isSmallScreen && (
//                       <TableCell>
//                         <Avatar
//                           src={employee.image}
//                           alt={employee.name}
//                           sx={{
//                             width: 56,
//                             height: 56,
//                             border: "3px solid white",
//                             boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
//                           }}
//                         />
//                       </TableCell>
//                     )}
//                     <TableCell
//                       sx={{
//                         fontWeight: "700",
//                         color: "#2d3748",
//                         fontSize: isSmallScreen ? "14px" : "16px",
//                         padding: isSmallScreen ? "8px" : "16px",
//                       }}
//                     >
//                       {employee.name}
//                     </TableCell>
//                     <TableCell>
//                       <PositionChip
//                         position={employee.position}
//                         label={
//                           isSmallScreen
//                             ? employee.position.split(" ").pop()
//                             : employee.position
//                         }
//                       />
//                     </TableCell>
//                     <TableCell>
//                       <Box
//                         sx={{
//                           display: "flex",
//                           gap: isSmallScreen ? "4px" : "8px",
//                         }}
//                       >
//                         <Tooltip title="Edit">
//                           <IconButton
//                             onClick={() => handleEditClick(employee)}
//                             sx={{ color: colors.edit }}
//                             size={isSmallScreen ? "small" : "medium"}
//                             disabled={loading}
//                           >
//                             <Edit
//                               fontSize={isSmallScreen ? "small" : "medium"}
//                             />
//                           </IconButton>
//                         </Tooltip>

//                         <Tooltip title="Delete">
//                           <IconButton
//                             onClick={() => handleDeleteClick(employee)}
//                             sx={{ color: colors.delete }}
//                             size={isSmallScreen ? "small" : "medium"}
//                             disabled={loading}
//                           >
//                             <Delete
//                               fontSize={isSmallScreen ? "small" : "medium"}
//                             />
//                           </IconButton>
//                         </Tooltip>
//                       </Box>
//                     </TableCell>
//                   </AnimatedTableRow>
//                 ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//         <TablePagination
//           rowsPerPageOptions={isSmallScreen ? [5, 10] : [5, 10, 25]}
//           component="div"
//           count={employees.length}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           onPageChange={handleChangePage}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//           sx={{
//             "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows":
//               {
//                 color: "#4a5568",
//                 fontWeight: "600",
//                 fontSize: isSmallScreen ? "12px" : "14px",
//               },
//             "& .MuiSvgIcon-root": {
//               color: "#667eea",
//             },
//           }}
//         />
//       </StyledPaper>

//       {/* Add Team Member Modal */}
//       <Modal
//         open={openAddModal}
//         onClose={handleCloseModal}
//         aria-labelledby="add-team-modal"
//         aria-describedby="add-team-form"
//       >
//         <Box sx={modalStyle}>
//           <h2
//             id="add-team-modal"
//             style={{
//               marginTop: 0,
//               marginBottom: "12px",
//               fontWeight: 700,
//               fontSize: "1.75rem",
//               lineHeight: 1.2,
//               color: "#1a202c", // dark gray
//               fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
//             }}
//           >
//             Add New Team Member
//           </h2>

//           <Stack spacing={3}>
//             <TextField
//               fullWidth
//               label="Name"
//               name="name"
//               value={newMember.name}
//               onChange={handleInputChange}
//               variant="outlined"
//               disabled={loading}
//               InputLabelProps={{
//                 style: { color: "#8A12FC" },
//               }}
//               sx={{
//                 mb: 3,
//                 input: { color: "black" },
//                 "& .MuiOutlinedInput-root": {
//                   "& fieldset": {
//                     borderColor: "#8A12FC",
//                   },
//                   "&:hover fieldset": {
//                     borderColor: "#8A12FC",
//                   },
//                   "&.Mui-focused fieldset": {
//                     borderColor: "#8A12FC",
//                   },
//                 },
//               }}
//             />

//             <TextField
//               fullWidth
//               label="Position"
//               name="position"
//               value={newMember.position}
//               onChange={handleInputChange}
//               variant="outlined"
//               disabled={loading}
//               InputLabelProps={{
//                 style: { color: "#8A12FC" },
//               }}
//               sx={{
//                 mb: 3,
//                 input: { color: "black" },
//                 "& .MuiOutlinedInput-root": {
//                   "& fieldset": {
//                     borderColor: "#8A12FC",
//                   },
//                   "&:hover fieldset": {
//                     borderColor: "#8A12FC",
//                   },
//                   "&.Mui-focused fieldset": {
//                     borderColor: "#8A12FC",
//                   },
//                 },
//               }}
//             />

//             <Box>
//               <Input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleImageUpload}
//                 id="add-image-upload"
//                 sx={{ display: "none" }}
//                 disabled={loading}
//               />
//               <label htmlFor="add-image-upload">
//                 <Button
//                   variant="contained"
//                   component="span"
//                   fullWidth
//                   disabled={loading}
//                   sx={{
//                     backgroundColor: "#8A12FC",
//                     input: { color: "white" },
//                     "& .MuiOutlinedInput-root": {
//                       "& fieldset": {
//                         borderColor: "#8A12FC",
//                       },
//                       "&:hover fieldset": {
//                         borderColor: "#8A12FC",
//                         backgroundColor: "#8A12FC",
//                       },
//                       "&.Mui-focused fieldset": {
//                         borderColor: "#8A12FC",
//                       },
//                     },
//                   }}
//                 >
//                   Upload Image
//                 </Button>
//               </label>
//               {newMember.previewImage && (
//                 <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
//                   <Avatar
//                     src={newMember.previewImage}
//                     alt="Preview"
//                     sx={{
//                       width: 100,
//                       height: 100,
//                       border: "3px solid white",
//                       boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
//                     }}
//                   />
//                 </Box>
//               )}
//             </Box>

//             <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
//               <Button
//                 variant="outlined"
//                 onClick={handleCloseModal}
//                 sx={{ borderRadius: "12px" }}
//                 disabled={loading}
//               >
//                 Cancel
//               </Button>
//               <Button
//                 variant="contained"
//                 onClick={handleAddMember}
//                 sx={{
//                   backgroundColor: "#8A12FC",
//                   input: { color: "white" },
//                   "& .MuiOutlinedInput-root": {
//                     "& fieldset": {
//                       borderColor: "#8A12FC",
//                     },
//                     "&:hover fieldset": {
//                       borderColor: "#8A12FC",
//                       backgroundColor: "#8A12FC",
//                     },
//                     "&.Mui-focused fieldset": {
//                       borderColor: "#8A12FC",
//                     },
//                   },
//                 }}
//                 disabled={loading}
//               >
//                 {loading ? "Adding..." : "Add Member"}
//               </Button>
//             </Box>
//           </Stack>
//         </Box>
//       </Modal>

//       {/* Edit Team Member Modal */}
//       <Modal
//         open={openEditModal}
//         onClose={handleCloseModal}
//         aria-labelledby="edit-team-modal"
//         aria-describedby="edit-team-form"
//       >
//         <Box sx={modalStyle}>
//           <h2
//             id="edit-team-modal"
//             style={{
//               marginTop: 0,
//               marginBottom: "12px",
//               fontWeight: 700,
//               fontSize: "1.75rem",
//               lineHeight: 1.2,
//               color: "#1a202c", // dark gray
//               fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
//             }}
//           >
//             Edit Team Member
//           </h2>
//           <Stack spacing={3}>
//             <TextField
//               fullWidth
//               label="Name"
//               name="name"
//               value={newMember?.name}
//               onChange={handleInputChange}
//               variant="outlined"
//               disabled={loading}
//               InputLabelProps={{
//                 style: { color: "#8A12FC" },
//               }}
//               sx={{
//                 mb: 3,
//                 input: { color: "black" },
//                 "& .MuiOutlinedInput-root": {
//                   "& fieldset": {
//                     borderColor: "#8A12FC",
//                   },
//                   "&:hover fieldset": {
//                     borderColor: "#8A12FC",
//                   },
//                   "&.Mui-focused fieldset": {
//                     borderColor: "#8A12FC",
//                   },
//                 },
//               }}
//             />

//             <TextField
//               fullWidth
//               label="Position"
//               name="position"
//               value={newMember?.position}
//               onChange={handleInputChange}
//               variant="outlined"
//               disabled={loading}
//               InputLabelProps={{
//                 style: { color: "#8A12FC" },
//               }}
//               sx={{
//                 mb: 3,
//                 input: { color: "black" },
//                 "& .MuiOutlinedInput-root": {
//                   "& fieldset": {
//                     borderColor: "#8A12FC",
//                   },
//                   "&:hover fieldset": {
//                     borderColor: "#8A12FC",
//                   },
//                   "&.Mui-focused fieldset": {
//                     borderColor: "#8A12FC",
//                   },
//                 },
//               }}
//             />

//             <Box>
//               <Input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleImageUpload}
//                 id="edit-image-upload"
//                 sx={{ display: "none" }}
//                 disabled={loading}
//               />
//               <label htmlFor="edit-image-upload">
//                 <Button
//                   variant="contained"
//                   component="span"
//                   fullWidth
//                   disabled={loading}
//                   sx={{
//                     backgroundColor: "#8A12FC",
//                     input: { color: "white" },
//                     "& .MuiOutlinedInput-root": {
//                       "& fieldset": {
//                         borderColor: "#8A12FC",
//                       },
//                       "&:hover fieldset": {
//                         borderColor: "#8A12FC",
//                         backgroundColor: "#8A12FC",
//                       },
//                       "&.Mui-focused fieldset": {
//                         borderColor: "#8A12FC",
//                       },
//                     },
//                   }}
//                 >
//                   Change Image
//                 </Button>
//               </label>
//               {(newMember.previewImage || currentMember?.image) && (
//                 <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
//                   <Avatar
//                     src={newMember.previewImage || currentMember?.image}
//                     alt="Preview"
//                     sx={{
//                       width: 100,
//                       height: 100,
//                       border: "3px solid white",
//                       boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
//                     }}
//                   />
//                 </Box>
//               )}
//             </Box>

//             <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
//               <Button
//                 variant="outlined"
//                 onClick={handleCloseModal}
//                 sx={{ borderRadius: "12px" }}
//                 disabled={loading}
//               >
//                 Cancel
//               </Button>
//               <Button
//                 variant="contained"
//                 onClick={handleUpdateMember}
//                 sx={{
//                   backgroundColor: "#8A12FC",
//                   input: { color: "white" },
//                   "& .MuiOutlinedInput-root": {
//                     "& fieldset": {
//                       borderColor: "#8A12FC",
//                     },
//                     "&:hover fieldset": {
//                       borderColor: "#8A12FC",
//                       backgroundColor: "#8A12FC",
//                     },
//                     "&.Mui-focused fieldset": {
//                       borderColor: "#8A12FC",
//                     },
//                   },
//                 }}
//                 disabled={loading}
//               >
//                 {loading ? "Updating..." : "Update Member"}
//               </Button>
//             </Box>
//           </Stack>
//         </Box>
//       </Modal>

//       {/* Delete Confirmation Dialog */}
//       <Dialog
//         open={openDeleteModal}
//         onClose={() => setOpenDeleteModal(false)}
//         aria-labelledby="delete-dialog-title"
//         aria-describedby="delete-dialog-description"
//       >
//         <DialogTitle id="delete-dialog-title">Confirm Delete</DialogTitle>
//         <DialogContent>
//           <DialogContentText id="delete-dialog-description">
//             Are you sure you want to delete {currentMember?.name}? This action
//             cannot be undone.
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button
//             onClick={() => setOpenDeleteModal(false)}
//             color="primary"
//             disabled={loading}
//           >
//             Cancel
//           </Button>
//           <Button
//             onClick={handleDelete}
//             color="error"
//             variant="contained"
//             disabled={loading}
//             autoFocus
//           >
//             {loading ? "Deleting..." : "Delete"}
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </>
//   );
// }










import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  TablePagination,
  Avatar,
  IconButton,
  Tooltip,
  useMediaQuery,
  Box,
  Button,
} from "@mui/material";
import { Edit, Delete, Add } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { toast } from "react-toastify";
import {
  StyledPaper,
  StyledTableHeader,
  StyledHeaderCell,
  AnimatedTableRow,
  PositionChip,
  colors,
} from "./styles";
import AddTeamModal from "./AddTeamModal";
import EditTeamModal from "./EditTeamModal";
import DeleteTeamModal from "./DeleteTeamModal";

export default function TeamTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [employees, setEmployees] = useState([]);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [currentMember, setCurrentMember] = useState(null);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.API}/admin/team`);
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error("Error fetching employees:", error);
      toast.error("Failed to fetch team members");
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (employee) => {
    setCurrentMember(employee);
    setOpenEditModal(true);
  };

  const handleDeleteClick = (employee) => {
    setCurrentMember(employee);
    setOpenDeleteModal(true);
  };

  const handleAddSuccess = (newMember) => {
    setEmployees((prev) => [...prev, newMember]);
    setOpenAddModal(false);
  };

  const handleEditSuccess = (updatedMember) => {
    setEmployees((prev) =>
      prev.map((emp) => (emp._id === updatedMember._id ? updatedMember : emp))
    );
    setOpenEditModal(false);
  };

  const handleDeleteSuccess = (deletedId) => {
    setEmployees((prev) => prev.filter((emp) => emp._id !== deletedId));
    setOpenDeleteModal(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <StyledPaper sx={{ width: "100%", p: isSmallScreen ? 1 : 3 }}>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => setOpenAddModal(true)}
            sx={{
              backgroundColor: "#8A12FC",
              "&:hover": { backgroundColor: "#7a0eeb" },
            }}
            disabled={loading}
          >
            Add Team Member
          </Button>
        </Box>

        <TableContainer
          sx={{
            maxHeight: "70vh",
            borderRadius: "12px",
            "&::-webkit-scrollbar": {
              width: "6px",
              height: "6px",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "rgba(102,126,234,0.5)",
              borderRadius: "4px",
            },
          }}
        >
          <Table
            stickyHeader
            aria-label="modern employee table"
            size={isSmallScreen ? "small" : "medium"}
          >
            <StyledTableHeader>
              <TableRow>
                {!isSmallScreen && <StyledHeaderCell>Profile</StyledHeaderCell>}
                <StyledHeaderCell>Name</StyledHeaderCell>
                <StyledHeaderCell>Position</StyledHeaderCell>
                <StyledHeaderCell>Actions</StyledHeaderCell>
              </TableRow>
            </StyledTableHeader>
            <TableBody>
              {employees
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((employee) => (
                  <AnimatedTableRow
                    key={employee?._id}
                    hover
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {!isSmallScreen && (
                      <TableCell>
                        <Avatar
                          src={employee.image}
                          alt={employee.name}
                          sx={{
                            width: 56,
                            height: 56,
                            border: "3px solid white",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                          }}
                        />
                      </TableCell>
                    )}
                    <TableCell
                      sx={{
                        fontWeight: "700",
                        color: "#2d3748",
                        fontSize: isSmallScreen ? "14px" : "16px",
                        padding: isSmallScreen ? "8px" : "16px",
                      }}
                    >
                      {employee.name}
                    </TableCell>
                    <TableCell>
                      <PositionChip
                        position={employee.position}
                        label={
                          isSmallScreen
                            ? employee.position.split(" ").pop()
                            : employee.position
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", gap: isSmallScreen ? "4px" : "8px" }}>
                        <Tooltip title="Edit">
                          <IconButton
                            onClick={() => handleEditClick(employee)}
                            sx={{ color: colors.edit }}
                            size={isSmallScreen ? "small" : "medium"}
                            disabled={loading}
                          >
                            <Edit fontSize={isSmallScreen ? "small" : "medium"} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton
                            onClick={() => handleDeleteClick(employee)}
                            sx={{ color: colors.delete }}
                            size={isSmallScreen ? "small" : "medium"}
                            disabled={loading}
                          >
                            <Delete fontSize={isSmallScreen ? "small" : "medium"} />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </AnimatedTableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={isSmallScreen ? [5, 10] : [5, 10, 25]}
          component="div"
          count={employees.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{
            "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows": {
              color: "#4a5568",
              fontWeight: "600",
              fontSize: isSmallScreen ? "12px" : "14px",
            },
            "& .MuiSvgIcon-root": {
              color: "#667eea",
            },
          }}
        />
      </StyledPaper>

      <AddTeamModal
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
        onSuccess={handleAddSuccess}
        loading={loading}
        setLoading={setLoading}
      />

      <EditTeamModal
        open={openEditModal}
        onClose={() => setOpenEditModal(false)}
        member={currentMember}
        onSuccess={handleEditSuccess}
        loading={loading}
        setLoading={setLoading}
      />

      <DeleteTeamModal
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        member={currentMember}
        onSuccess={handleDeleteSuccess}
        loading={loading}
        setLoading={setLoading}
      />
    </>
  );
}





