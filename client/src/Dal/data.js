import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
import axios from "axios";
import {
  Validate_email_format,
  Validate_match_password,
} from "../Validation/Validation.js";
// Dictionary to store user data with example data
const users = {
  1: {
    user_id: 1,
    username: "user1",
    email: "user1@example.com",
    passwordhash:
      "$2a$10$VlR1BYH1H54kKDlmL/ts/.BkCnf4eEioVVnhRUUQWA6nRQNngRwPW",
    reset_token: null,
  },
  2: {
    user_id: 2,
    username: "user2",
    email: "user2@example.com",
    passwordhash: "654321",
    reset_token: null,
  },
};

// Dictionary to store file data with example data
const files = {
  1: {
    file_id: 1,
    file_name: "file1.txt",
    user_id: 1,
    folder_id: 1,
    size: 1024,
    is_deleted: false,
    is_version: false,
    file_path: "/path/to/file1.txt",
    upload_date: new Date("2023-01-15"),
  },
  2: {
    file_id: 2,
    file_name: "file2.pdf",
    user_id: 1,
    folder_id: 2,
    size: 2048,
    is_deleted: false,
    is_version: false,
    file_path: "/path/to/file2.pdf",
    upload_date: new Date("2023-02-28"),
  },
  3: {
    file_id: 3,
    file_name: "file3.jpg",
    user_id: 2,
    folder_id: null,
    size: 4096,
    is_deleted: false,
    is_version: false,
    file_path: "/path/to/file3.jpg",
    upload_date: new Date("2023-03-10"),
  },
};

// Dictionary to store folder data with example data
const folders = {
  1: {
    folder_name: "Folder 1",
    user_id: 1,
    parent_folder: null,
    is_deleted: false,
    folder_path: "/path/to/Folder1",
    upload_date: new Date("2023-01-2"),
  },
  2: {
    folder_name: "Folder 2",
    user_id: 1,
    parent_folder: null,
    is_deleted: false,
    folder_path: "/path/to/Folder2",
    upload_date: new Date("2023-01-1"),
  },
};

// Dictionary to store file version data with example data
const fileVersions = {
  1: { file_id: 1, version_number: 1, upload_date: new Date("2023-04-10") },
  2: { file_id: 2, version_number: 1, upload_date: new Date("2023-05-10") },
  3: { file_id: 1, version_number: 2, upload_date: new Date("2023-06-10") },
};

// Dictionary to store shared file data with example data
const sharedFiles = {
  1: {
    file_id: 1,
    shared_with_user_id: 2,
    shared_by_user_id: 1,
    permission: "read",
  },
};

// Dictionary to store shared folder data with example data
const sharedFolders = {
  1: {
    folder_id: 1,
    shared_with_user_id: 2,
    shared_by_user_id: 1,
    permission: "read",
  },
};

async function registerUser(name, email, password) {
  try {
    const response = await fetch("http://127.0.0.1:8000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    });

    const data = await response.json(); // Parsing response JSON

    if (response.ok) {
      return "User registered successfully.";
    } else {
      throw new Error(data.detail); // Throw error with detail message
    }
  } catch (err) {
    console.error("Error registering user:", err);
    throw err; // Re-throwing the error so it can be caught by the caller
  }
}

// Function to generate a random token
function generateToken() {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}

// Function to send an email with a password reset link
function sendResetLink(email) {
  if (users[email]) {
    const resetToken = generateToken();
    users[email].reset_token = resetToken;
    console.log(
      `Email sent to ${email} with password reset link: /new_password?t=${resetToken}`
    );
    return true;
  }
  return false;
}

async function Forget_password(email) {
  // chick the foemate of the email
  if (!Validate_email_format(email)) return "Invalid email format";

  try {
    const response = await fetch(
      `http://127.0.0.1:8000/forgetpassword?user_email=${email}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      console.log(data.msg);

      return data.msg; // Assuming the response contains the success message or error details
    } else {
      throw new Error("Failed to change password. Please try again."); // Throw an error if the request was not successful
    }
  } catch (error) {
    console.error("An error occurred:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
}

// Function to retrieve recent files for a user
function getRecentFiles(
  userId,
  sortBy = "date",
  order = "desc",
  size = 20,
  page = 1
) {
  const userFiles = Object.values(files).filter(
    (file) => file.user_id === userId && !file.is_deleted
  );
  const sortedFiles = userFiles.sort((a, b) =>
    order === "desc"
      ? new Date(b.upload_date) - new Date(a.upload_date)
      : new Date(a.upload_date) - new Date(b.upload_date)
  );
  const startIndex = (page - 1) * size;
  return sortedFiles.slice(startIndex, startIndex + size);
}

// Function to add a file to a user's account
function addFile(userId, path, file) {
  const fileId = Object.keys(files).length + 1;
  files[fileId] = { ...file, user_id: userId, file_path: path };
  return true;
}

// Function to add a folder to a user's account
function addFolder(userId, path, folder) {
  const folderId = Object.keys(folders).length + 1;
  folders[folderId] = { ...folder, user_id: userId, folder_path: path };
  return true;
}

// Function to handle user logout
function logout(email) {
  return true;
}

async function getMyFolders(folderId) {
  try {
    const folders = await axios.get(`http://127.0.0.1:8000/move`);

    const userFolders = Object.values(folders).filter(
      (folder) => !folder.is_deleted && folder.id !== folderId
    );
    return userFolders;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function moveFile(fileId, targetFolderId) {
  try {
    const response = await axios.put(
      `http://127.0.0.1:8000/move/${fileId}/${targetFolderId}`
    );

    console.log(`File with ID ${fileId} moved successfully.`);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Function to handle file download
async function download(fileId) {
  try {
    const response = await axios.put(
      `http://127.0.0.1:8000/file/download/${fileId}`
    );

    console.log(`File with ID ${fileId} downloaded successfully.`);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function shareFile(userId, fileId, email, permission) {
  try {
    if (files[fileId] && users[email]) {
      const sharedFileId = Object.keys(sharedFiles).length + 1;
      sharedFiles[sharedFileId] = {
        file_id: fileId,
        shared_with_user_id: users[email].id,
        shared_by_user_id: userId,
        permission,
      };
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error occurred while sharing file:", error);
    throw error;
  }
}

function renameFile(userId, fileId, newName) {
  if (files[fileId]) {
    // Check if the file belongs to the user
    if (files[fileId].user_id === userId) {
      // Assuming you want to log the user ID along with the file renaming action
      console.log(`User ${userId} is renaming file ${fileId} to ${newName}`);

      // Update the file name
      files[fileId].file_name = newName;

      // Log the renaming action
      console.log(`File ${fileId} renamed to ${newName}`);

      // Return true to indicate success
      return true;
    } else {
      // If the file does not belong to the user, log an error and return false
      console.log(
        `User ${userId} does not have permission to rename file ${fileId}`
      );
      return false;
    }
  }
  // Return false if the file does not exist
  return false;
}

async function delete_file(file_id) {
  try {
    const response = await axios.delete(
      `http://127.0.0.1:8000/file/${file_id}`
    );

    console.log("The file deleted successfully");
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// async function delete_folder(folder_id) {
//   try {
//     const response = await axios.delete(
//       `http://127.0.0.1:8000/folder/${folder_id}`
//     );

//     console.log("The folder deleted successfully");
//     return response;
//   } catch (error) {
//     console.error(error);
//   }
// }

async function delete_folder(folder_id) {
  try {
    const response = await axios.delete(
      `http://127.0.0.1:8000/folder/${folder_id}`
    );
    console.log("The folder deleted successfully");
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function fileDeletion(file_id) {
  try {
    const response = await axios.delete(
      `http://127.0.0.1:8000/deleted/files/${file_id}`
    );

    console.log("The file permanently deleted successfully");
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function folderDeletion(folder_id) {
  try {
    const response = await axios.delete(
      `http://127.0.0.1:8000/deleted/folders/${folder_id}`
    );

    console.log("The folder permanently deleted successfully");
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getMySharedFiles() {
  try {
    const headers = {
      "Content-Type": "application/json",
    };

    const response = await fetch("http://127.0.0.1:8000/shared_files", {
      method: "GET",
      headers: headers,
      credentials: "include", // Include cookies in the request
    });

    const data = await response.json(); // Parsing response JSON

    if (response.ok) {
      return data;
    } else {
      // Handle non-OK response status codes
      if (response.status === 400) {
        // Handle 400 Bad Request error
        throw new Error("User ID cookie is missing");
      } else if (response.status === 500) {
        // Handle 500 Internal Server Error
        throw new Error("Internal Server Error");
      } else {
        // Handle other error cases
        throw new Error("Unexpected Error");
      }
    }
  } catch (err) {
    console.error("Error collecting data:", err);
    throw err;
  }
}

// Function to get files deleted by the user asynchronously
async function getMyDeletedFiles() {
    try {
        const headers = {
          "Content-Type": "application/json",
        };

        const response = await fetch("http://127.0.0.1:8000/deleted_files", {
          method: "GET",
          headers: headers,
          credentials: "include", // Include cookies in the request
        });

        const data = await response.json(); // Parsing response JSON

        if (response.ok) {
          return data;
        } else {
          // Handle non-OK response status codes
          if (response.status === 400) {
            // Handle 400 Bad Request error
            throw new Error("User ID cookie is missing");
          } else if (response.status === 500) {
            // Handle 500 Internal Server Error
            throw new Error("Internal Server Error");
          } else {
            // Handle other error cases
            throw new Error("Unexpected Error");
          }
        }
      } catch (err) {
        console.error("Error collecting data:", err);
        throw err;
      }
}

// Function to restore a deleted file
async function restoreDeletedFile(file_id) {
  try {
    const response = await axios.update(
      `http://127.0.0.1:8000/deleted/files/deleted/files/${file_id}/restore`
    );

    console.log("The file deleted successfully");
    return response;
  } catch (error) {
    console.error(error);
  }
}

// Function to restore a deleted folder
async function restoreDeletedFolder(folder_id) {
  try {
    const response = await axios.update(
      `http://127.0.0.1:8000/deleted/files/deleted/files/${folder_id}/restore`
    );

    console.log("The file deleted successfully");
    return response;
  } catch (error) {
    console.error(error);
  }
}

async function LogIn(email, password) {
  try {
    const response = await fetch("http://127.0.0.1:8000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    const data = await response.json(); // Parsing response JSON

    if (response.ok) {
      return "User logged in successfully.";
    } else {
      throw new Error(data.detail); // Throw error with detail message
    }
  } catch (err) {
    console.error("Error logging user:", err);
    throw err; // Re-throwing the error so it can be caught by the caller
  }
}

async function getFileVersions(fileId) {
  try {
    const response = await fetch(`http://127.0.0.1:8000/versions/${fileId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data.versions;
  } catch (error) {
    console.error("Error fetching file versions:", error);
    return [];
  }
}

async function getFileDetails(userId, fileId) {
  try {
    // Check if the user has access to the file
    if (files[fileId]) {
      const file = files[fileId]; // Retrieve file data
      const fileDetails = {
        owner: null,
        sharedWith: [],
        permissions: [],
      };

      // Check if the file belongs to the user
      if (file.user_id === userId) {
        const user = users[userId]; // Retrieve user data
        fileDetails.owner = {
          userId: user.user_id, // Access user_id property
          username: user.username,
          email: user.email,
        };
      }

      // Check if the file is shared with other users
      const sharedFileEntries = Object.values(sharedFiles).filter(
        (sharedFile) => sharedFile.file_id === fileId
      );
      for (const sharedFileEntry of sharedFileEntries) {
        if (sharedFileEntry.shared_with_user_id !== userId) {
          const sharedUser = users[sharedFileEntry.shared_with_user_id]; // Retrieve user data
          fileDetails.sharedWith.push({
            userId: sharedUser.user_id, // Access user_id property
            username: sharedUser.username,
            email: sharedUser.email,
          });
          fileDetails.permissions.push(sharedFileEntry.permission);
        }
      }

      return fileDetails;
    } else {
      return null; // Return null if the file doesn't exist
    }
  } catch (error) {
    console.error("An error occurred:", error);
    throw error; // Re-throw the error for handling elsewhere if needed
  }
}
async function getMyFiles() {
  try {
    const headers = {
      "Content-Type": "application/json",
    };

    const response = await fetch("http://127.0.0.1:8000/my_files", {
      method: "GET",
      headers: headers,
      credentials: "include", // Include cookies in the request
    });

    const data = await response.json(); // Parsing response JSON

    if (response.ok) {
      return data;
    } else {
      // Handle non-OK response status codes
      if (response.status === 400) {
        // Handle 400 Bad Request error
        throw new Error("User ID cookie is missing");
      } else if (response.status === 500) {
        // Handle 500 Internal Server Error
        throw new Error("Internal Server Error");
      } else {
        // Handle other error cases
        throw new Error("Unexpected Error");
      }
    }
  } catch (err) {
    console.error("Error collecting data:", err);
    throw err;
  }
}
async function Update_password(pass1, pass2, token) {
  // chick the foemate of the email
  if (!Validate_match_password(pass1, pass2)) return "Password not match";

  try {
    const response = await fetch("http://127.0.0.1:8000/new_password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pass1: pass1,
        pass2: pass2,
        token: token,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data.msg);

      return data.msg; // Assuming the response contains the success message or error details
    } else {
      throw new Error("Failed to change password. Please try again."); // Throw an error if the request was not successful
    }
  } catch (error) {
    console.error("An error occurred:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
}


export async function uploadFile(file, folderId) {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch(`http://127.0.0.1:8000/file/${folderId}/upload`, {
      method: 'POST',
      body: formData,
      credentials: "include",

    });

    if (response.ok) {
      const data = await response.json();
      console.log('File upload successful:', data);
      return data;
    } else {
      const errorData = await response.json();
      console.error('File upload failed:', errorData);
      throw new Error('File upload failed');
    }
  } catch (error) {
    console.error('An error occurred:', error);
    throw error;
  }
}

export {
  registerUser,
  LogIn,
  getMyFiles,
  getMyDeletedFiles,
  getMySharedFiles,
  fileDeletion,
  restoreDeletedFile,
  Forget_password,
  getFileVersions,
  getMyFolders,
  moveFile,
  Update_password,

  delete_file,
  folderDeletion,
  delete_folder,
  restoreDeletedFolder,
  download,
};
