import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';

// Dictionary to store user data with example data
const users = {
  1: { user_id: 1, username: "user1", email: "user1@example.com", passwordhash: "$2a$10$VlR1BYH1H54kKDlmL/ts/.BkCnf4eEioVVnhRUUQWA6nRQNngRwPW", reset_token: null },
  2: { user_id: 2, username: "user2", email: "user2@example.com", passwordhash: "654321", reset_token: null }
};

// Dictionary to store file data with example data
const files = {
  1: { file_id: 1, file_name: "file1.txt", user_id: 1, folder_id: 1, size: 1024, is_deleted: false, is_version: false, file_path: "/path/to/file1.txt", upload_date: new Date("2023-01-15") },
  2: { file_id: 2, file_name: "file2.pdf", user_id: 1, folder_id: 2, size: 2048, is_deleted: false, is_version: false, file_path: "/path/to/file2.pdf", upload_date: new Date("2023-02-28") },
  3: { file_id: 3, file_name: "file3.jpg", user_id: 2, folder_id: null, size: 4096, is_deleted: false, is_version: false, file_path: "/path/to/file3.jpg", upload_date: new Date("2023-03-10") }
};

// Dictionary to store folder data with example data
const folders = {
  1: { folder_name: "Folder 1", user_id: 1, parent_folder: null, is_deleted: false, folder_path: "/path/to/Folder1", upload_date: new Date("2023-01-2") },
  2: { folder_name: "Folder 2", user_id: 1, parent_folder: null, is_deleted: false, folder_path: "/path/to/Folder2",upload_date: new Date("2023-01-1")}
};

// Dictionary to store file version data with example data
const fileVersions = {
  1: { file_id: 1, version_number: 1,upload_date: new Date("2023-04-10") },
  2: { file_id: 2, version_number: 1, upload_date: new Date("2023-05-10") },
  3: { file_id: 1, version_number: 2, upload_date: new Date("2023-06-10") }
};

// Dictionary to store shared file data with example data
const sharedFiles = {
  1: { file_id: 1, shared_with_user_id: 2, shared_by_user_id: 1, permission: "read" }
};

// Dictionary to store shared folder data with example data
const sharedFolders = {
  1: { folder_id: 1, shared_with_user_id: 2, shared_by_user_id: 1, permission: "read" }
};

async function registerUser(name, email, password) {
    try{
        const usersArray = Object.values(users);
        const existingUser = await usersArray.find(user => user.email === email);
        if (existingUser) {
            return "User with this email already exists.";
        }
        const id = uuidv4();
        const hashedPassword = await bcrypt.hashSync(password, 10);
        const newUser = {
            user_id: id, // Use the uuidv4 generated ID as the user_id
            username: name,
            email: email,
            passwordhash: hashedPassword,
            reset_token: null
        };
         users[id] = await newUser;  // Add the new user to the users array
        console.log(users)
        return "User registered successfully.";
    }catch(err){
        console.log("error",err)
    }
}

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
function changepass(email, newpass) {
  // Check if there's a user with the specified email
  const user = Object.values(users).find(user => user.email === email);
  if (user) {
    // Generate a reset token (assuming generateToken function is defined elsewhere)
    const resetToken = generateToken();

    user.reset_token = resetToken;

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
function logout(email) {

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
     if (files[fileId].user_id === userId) { // Check if the file belongs to the user
         files[fileId].folder_id = folderId;
         return true;
     }
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





async function getMySharedFiles(userId, sortBy = 'name', order = 'desc', size = 20, page = 1) {

try{
 const userSharedFiles = await Object.values(sharedFiles).filter(file => file.shared_with_user_id === userId);
 const sortedFiles =await  userSharedFiles.sort((a, b) => order === 'desc' ? b.file_id - a.file_id : a.file_id - b.file_id);
 const startIndex = (page - 1) * size;
 return sortedFiles.slice(startIndex, startIndex + size).map(file => files[file.file_id]);
 }catch(err){
    console.log(err)

 }
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








async function LogIn(email, password) {
try{
  for (let key in users) {
    if (users[key].email === email) {
      if (bcrypt.compareSync(password, users[key].passwordhash)) {
        return true;
      } else {
        return false; // Incorrect password
      }
    }
  }
  return false; // User not found
  }
  catch{
  console.log("LogIn function not working..")

  }
}











function getFileVersions(userId, fileId, size = 20, page = 1) {
  // Check if the user has access to the file
  if (files[fileId] && files[fileId].user_id === userId) {
    // Filter file versions for the specified file
    const fileVersionsList = Object.values(fileVersions).filter(version => version.file_id === fileId);
    
    // Sort file versions by version number in descending order
    fileVersionsList.sort((a, b) => b.version_number - a.version_number);
    
    // Calculate the start index based on the specified page and size
    const startIndex = (page - 1) * size;
    
    // Return a slice of file versions based on the calculated start index and size
    return fileVersionsList.slice(startIndex, startIndex + size);
  } else {
    // Return an empty array if the user doesn't have access to the file
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
        permissions: []
      };

      // Check if the file belongs to the user
      if (file.user_id === userId) {
        const user = users[userId]; // Retrieve user data
        fileDetails.owner = {
          userId: user.user_id, // Access user_id property
          username: user.username,
          email: user.email
        };
      }

      // Check if the file is shared with other users
      const sharedFileEntries = Object.values(sharedFiles).filter(sharedFile => sharedFile.file_id === fileId);
      for (const sharedFileEntry of sharedFileEntries) {
        if (sharedFileEntry.shared_with_user_id !== userId) {
          const sharedUser = users[sharedFileEntry.shared_with_user_id]; // Retrieve user data
          fileDetails.sharedWith.push({
            userId: sharedUser.user_id, // Access user_id property
            username: sharedUser.username,
            email: sharedUser.email
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


function getMyFiles(userId, sortBy = 'name', order = 'desc', size = 20, page = 1) {
  // Filter files owned by the user
  const userFiles = Object.values(files).filter(file => file.user_id === userId && !file.is_deleted);
  
  userFiles.sort((a, b) => {
    if (sortBy === 'name') {
      return order === 'desc' ? b.file_name.localeCompare(a.file_name) : a.file_name.localeCompare(b.file_name);
    } else if (sortBy === 'date') {
      return order === 'desc' ? new Date(b.upload_date) - new Date(a.upload_date) : new Date(a.upload_date) - new Date(b.upload_date);
    } else {
      return 0; // No sorting
    }
  });
  
  // Calculate the start index based on the specified page and size
  const startIndex = (page - 1) * size;
  
  // Return a slice of user files based on the calculated start index and size
  return userFiles.slice(startIndex, startIndex + size);
}

export { registerUser, LogIn ,getMyFiles,getMyDeletedFiles,getMySharedFiles};


