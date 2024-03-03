from fastapi import Depends, FastAPI
app = FastAPI()


# DELETE /deleted/files/{file_id}
# Description: Delete a file forever.
# Parameters: File ID.
# Returns: JSON object containing the status of the delete operation.
# Security: Requires user authentication.

# {
#   "status": "success",
#   "msg": "File with ID 456 permanently deleted."
# }

# {
# "status": "fail",
# “msg” :"Unable to delete."
# }



