
import { useState } from "react";
import { 
    Button,
    Dialog, DialogTitle, DialogContent, DialogActions,
    Divider
  } from "@mui/material";
import { useTranslation } from "react-i18next";

  const DeleteTEIDialog = ({open,handleTEICancel,handleDeleteTEI}) => {
    const { t } = useTranslation();
    return <Dialog
        open={open}
    >
        <DialogTitle>Delete Tracked Entity Instance</DialogTitle>
        <DialogContent>
            Delete this Tracked Entity Instance will delete its associate enrollments from other programs
        </DialogContent>
        <Divider />
        <DialogActions>
            <Button
                variant="outlined"
                size="small"
                style={{ width: "120px" }}
                onClick={() => {
                    handleTEICancel()
                }}
            >Cancel</Button>
            <Button
                variant="contained"
                size="small"
                color="error"
                style={{ width: "120px" }}
                onClick={() => {
                    handleDeleteTEI()
                }}
            >Delete</Button>
        </DialogActions>
    </Dialog>
  }

  const DeleteDialog= ({open, handleDeleteEnrollment, handleDeleteTEI, handleCancel}) => {
    const { t } = useTranslation();
    const [openTEI, setOpenTEI] = useState(false);
    return <><Dialog
        open={open}
        fullWidth
        maxWidth="sm"
    >
        <DialogTitle>Delete Confirmation</DialogTitle>
        <DialogContent>
            <table>
                <tr>
                    <td width="30%"><strong>Unenrollment</strong></td>
                    <td width="70%">Remove this profile from the program.</td>
                </tr>
                <tr>
                    <td><strong>Delete</strong></td>
                    <td>Permanently remove this profile.</td>
                </tr>
            </table>
        </DialogContent>
        <Divider />
        <DialogActions>
            <Button
                variant="outlined"
                size="small"
                onClick={() => {
                    handleCancel();
                }}
                style={{ width: "120px" }}
            >Cancel</Button>
            <Button
                variant="outlined"
                size="small"
                color="error"
                onClick={() => {
                    handleDeleteEnrollment();
                }}
                style={{ width: "120px" }}
            >Unenroll</Button>
            <Button
                variant="contained"
                size="small"
                color="error"
                onClick={() => {
                    setOpenTEI(true)
                }}
                style={{ width: "120px" }}
            >Delete</Button>
        </DialogActions>
    </Dialog>
    <DeleteTEIDialog 
        open={openTEI}
        handleTEICancel={() => setOpenTEI(false)}
        handleDeleteTEI={handleDeleteTEI}
    />
    </>
  }

  export default DeleteDialog;