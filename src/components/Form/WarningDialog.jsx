import { 
    Button,
    Dialog, DialogTitle, DialogContent, DialogActions,
    Divider
  } from "@mui/material";
  import { useTranslation } from "react-i18next";

  const WarningDialog= ({open, handleOk, handleCancel}) => {
    const { t } = useTranslation();
    return <Dialog
        open={open}
        fullWidth
        maxWidth="sm"
    >
        <DialogTitle>{t("warning")}</DialogTitle>
        <DialogContent>{t("changes_you_made_may_not_be_saved")}</DialogContent>
        <Divider />
        <DialogActions>
            <Button
                variant="outlined"
                size="large"
                onClick={() => {
                    handleCancel();
                }}
            >{
                t("stay")
            }</Button>
            <Button
                variant="contained"
                size="large"
                onClick={() => {
                    handleOk();
                }}
            >{
                t("leave")
            }</Button>
        </DialogActions>
    </Dialog>
  }

  export default WarningDialog;