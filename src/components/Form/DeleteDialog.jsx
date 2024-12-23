import { 
    Button,
    Dialog, DialogTitle, DialogContent, DialogActions,
    Divider
  } from "@mui/material";
  import { useTranslation } from "react-i18next";

  const DeleteDialog= ({open, handleOk, handleCancel}) => {
    const { t } = useTranslation();
    return <Dialog
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
                    handleOk();
                }}
                style={{ width: "120px" }}
            >Unenroll</Button>
            <Button
                variant="contained"
                size="small"
                color="error"
                onClick={() => {
                    
                }}
                style={{ width: "120px" }}
            >Delete</Button>
        </DialogActions>
    </Dialog>
  }

  export default DeleteDialog;