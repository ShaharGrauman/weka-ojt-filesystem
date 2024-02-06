// Dictionary to store user data with example data
const users = {
  1: { username: "user1", email: "user1@example.com", reset_token: null },
  2: { username: "user2", email: "user2@example.com", reset_token: null }
};

// Dictionary to store file data with example data
const files = {
  1: { file_name: "file1.txt", type: "txt", user_id: 1, folder_id: 2, is_deleted: false, file_path: "/path/to/file1.txt", upload_date: new Date(), last_opened_date: null },
  2: { file_name: "file2.pdf", type: "pdf", user_id: 1, folder_id: null, is_deleted: false, file_path: "/path/to/file2.pdf", upload_date: new Date(), last_opened_date: null },
  3: { file_name: "file3.jpg", type: "jpg", user_id: 2, folder_id: null, is_deleted: false, file_path: "/path/to/file3.jpg", upload_date: new Date(), last_opened_date: null }
};

// Dictionary to store folder data with example data
const folders = {
  1: { folder_name: "Folder 1", user_id: 1, parent_folder: 2, is_deleted: false, folder_path: "/path/to/Folder1", last_opened_date: new Date() },
  2: { folder_name: "Folder 2", user_id: 1, parent_folder: null, is_deleted: false, folder_path: "/path/to/Folder2", last_opened_date: new Date() }
};

// Dictionary to store file version data with example data
const fileVersions = {
  1: { file_id: 1, version_number: 1, upload_date: new Date() },
  2: { file_id: 2, version_number: 1, upload_date: new Date() },
  3: { file_id: 3, version_number: 1, upload_date: new Date() }
};

// Dictionary to store shared file data with example data
const sharedFiles = {
  1: { file_id: 1, shared_with_user_id: 2, shared_by_user_id: 1, permission: "read" }
};

// Dictionary to store shared folder data with example data
const sharedFolders = {
  1: { folder_id: 1, shared_with_user_id: 2, shared_by_user_id: 1, permission: "read" }
};

// Function to generate a random token
function generateToken() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

// Function to send an email with a password reset link
function sendResetLink(email) {
  if (users[email]) {
      const resetToken = generateToken();
      users[email].reset_token = resetToken;
      console.log(`Email sent to ${email} with password reset link: /new_password?t=${resetToken}`);
      return true;
  }
  return false;
}

// Function to handle password change
function changePassword(email, newPassword) {
  if (users[email]) {
      users[email].password = newPassword;
      return true;
  }
  return false;
}

// Function to handle user signup
function signup(email, name, password) {
  if (!users[email]) {
      const id = Object.keys(users).length + 1;
      users[email] = { id, username: name, email, password };
      return true;
  }
  return false;
}

// Function to retrieve recent files for a user
function getRecentFiles(userId, sortBy = 'date', order = 'desc', size = 20, page = 1) {
  const userFiles = Object.values(files).filter(file => file.user_id === userId && !file.is_deleted);
  const sortedFiles = userFiles.sort((a, b) => order === 'desc' ? new Date(b.upload_date) - new Date(a.upload_date) : new Date(a.upload_date) - new Date(b.upload_date));
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
function logout(userId) {
  
  return true;
}

// Function to handle file download
function download(userId, fileId) {
  return true;
}

// Function to get folders owned by the user
function getMyFolders(userId) {
  const userFolders = Object.values(folders).filter(folder => folder.user_id === userId && !folder.is_deleted);
  console.log(`Folders owned by user ${userId}: `, userFolders);
  return userFolders;
}

// Function to move a file to a specified folder
function moveFile(userId, fileId, folderId) {
  if (files[fileId] && folders[folderId]) {
      files[fileId].folder_id = folderId;
      return true;
  }
  return false;
}


function shareFile(userId, fileId, email, permission) {
  if (files[fileId] && users[email]) {
      const sharedFileId = Object.keys(sharedFiles).length + 1;
      sharedFiles[sharedFileId] = { file_id: fileId, shared_with_user_id: users[email].id, shared_by_user_id: userId, permission };
      return true;
  }
  return false;
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
          console.log(`User ${userId} does not have permission to rename file ${fileId}`);
          return false;
      }
  }
  // Return false if the file does not exist
  return false;
}


function deleteFile(userId, fileId) {
  if (files[fileId]) {
      // Check if the file belongs to the user
      if (files[fileId].user_id === userId) {
          files[fileId].is_deleted = true;
          return true;
      } else {
          // If the file does not belong to the user, log an error and return false
          console.log(`User ${userId} does not have permission to delete file ${fileId}`);
          return false;
      }
  }
  // Return false if the file does not exist
  return false;
}


function getMySharedFiles(userId, sortBy = 'name', order = 'desc', size = 20, page = 1) {
  const userSharedFiles = Object.values(sharedFiles).filter(file => file.shared_with_user_id === userId);
  const sortedFiles = userSharedFiles.sort((a, b) => order === 'desc' ? b.file_id - a.file_id : a.file_id - b.file_id);
  const startIndex = (page - 1) * size;
  return sortedFiles.slice(startIndex, startIndex + size).map(file => files[file.file_id]);
}

// Function to get files deleted by the user
function getMyDeletedFiles(userId, sortBy = 'name', order = 'desc', size = 20, page = 1) {
  const userDeletedFiles = Object.values(files).filter(file => file.user_id === userId && file.is_deleted);
  const sortedFiles = userDeletedFiles.sort((a, b) => order === 'desc' ? new Date(b.upload_date) - new Date(a.upload_date) : new Date(a.upload_date) - new Date(b.upload_date));
  const startIndex = (page - 1) * size;
  return sortedFiles.slice(startIndex, startIndex + size);
}

// Function to restore a deleted file
function restoreDeletedFile(userId, fileId) {
  if (files[fileId] && files[fileId].user_id === userId && files[fileId].is_deleted) {
      files[fileId].is_deleted = false;

      return true;
  }
  return false;
}

// Function to permanently delete a file
function permanentDeleteFile(userId, fileId) {
  if (files[fileId] && files[fileId].user_id === userId && files[fileId].is_deleted) {
      delete files[fileId];

      return true;
  }
  return false;
}







