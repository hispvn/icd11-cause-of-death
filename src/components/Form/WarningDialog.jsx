import { 
    Button,
    Dialog, DialogTitle, DialogContent, DialogActions,
    Divider
  } from "@mui/material";

  const WarningDialog= ({open, handleOk, handleCancel}) => {
    return <Dialog
        open={open}
        fullWidth
        maxWidth="sm"
    >
        <DialogTitle>Warning!!!</DialogTitle>
        <DialogContent>Changes you made may not be saved.</DialogContent>
        <Divider />
        <DialogActions>
            <Button
                variant="outlined"
                size="large"
                onClick={() => {
                    handleCancel();
                }}
            >
                Stay
            </Button>
            <Button
                variant="contained"
                size="large"
                onClick={() => {
                    handleOk();
                }}
            >
                Leave
            </Button>
        </DialogActions>
    </Dialog>
  }

  export default WarningDialog;