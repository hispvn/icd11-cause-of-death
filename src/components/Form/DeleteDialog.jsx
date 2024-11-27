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
        <DialogTitle>Delete enrollment</DialogTitle>
        <DialogContent>Are you sure you want to delete the selected enrollment? This will delete all events associated with this enrollment.</DialogContent>
        <Divider />
        <DialogActions>
            <Button
                variant="outlined"
                size="large"
                onClick={() => {
                    handleCancel();
                }}
            >No</Button>
            <Button
                variant="contained"
                size="large"
                onClick={() => {
                    handleOk();
                }}
            >Yes</Button>
        </DialogActions>
    </Dialog>
  }

  export default DeleteDialog;