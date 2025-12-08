import { useEffect, useState } from "react";
import { 
    Button,
    Dialog, DialogTitle, DialogContent, DialogActions,
    Divider
} from "@mui/material";
import moment from "moment";
import { Hooks, Components } from "tracker-capture-app-core";
const { useApi } = Hooks;
const { LoadingMask } = Components;
  
const UpdateDialog = ({open, handleCloseUpdate, metadataUpdatedDate}) => {
    const { metadataApi } = useApi();
    const [loading, setLoading] = useState(false);
    const [updatedDate, setUpdatedDate] = useState("Checking for updates...");

    useEffect(async () => {
        if (open) {
            setLoading(true);

            // Update for version 2.0.1
            if (moment(metadataUpdatedDate.metadataUpdatedDate, "YYYY-MM-DD").isBefore(moment("2025-05-05", "YYYY-MM-DD"))) {
                
                setUpdatedDate("2025-05-05");

                const programIndicators = await metadataApi.get(
                    "/api/programIndicators.json", 
                    { paging: false }, 
                    [
                        "fields=:owner",
                        `filter=program.id:eq:${metadataUpdatedDate.id}`,
                    ]
                );

                const options = await metadataApi.get(
                    "/api/options.json", 
                    { paging: false }, 
                    [
                        "fields=:owner",
                        `filter=id:eq:iuO3AfwamMA`,
                    ]
                );

                const updatedProgramIndicators = programIndicators.programIndicators
                .filter( indicator => indicator.filter && indicator.filter.includes("V{enrollment_date}"))
                .map(indicator => {
                    return {
                        ...indicator,
                        filter: indicator.filter ? indicator.filter.replaceAll("V{enrollment_date}","V{incident_date}") : undefined,
                    };
                });

                const updatedOptions = [{
                    ...options.options[0],
                    code: "DORIS mismatchs with the clinically selected cause of death",
                    name: "The clinically selected cause of death does not always match the one most relevant for prevention that is selected by DORIS"
                }]

                await metadataApi.push(`/api/metadata`, { 
                    programIndicators: updatedProgramIndicators,
                    options: updatedOptions
                })
                .then(response => {
                    
                });

                await metadataApi.push("/api/dataStore/WHO_ICD11_COD/program", {
                    id: metadataUpdatedDate.id,
                    metadataUpdatedDate: "2025-05-05",
                    version: "2.0.1"
                }, "PUT")
            }

            if (moment(metadataUpdatedDate.metadataUpdatedDate, "YYYY-MM-DD").isBefore(moment("2025-11-10", "YYYY-MM-DD"))) {
                await metadataApi.push("/api/dataStore/WHO_ICD11_COD/program", {
                    id: metadataUpdatedDate.id,
                    metadataUpdatedDate: "2025-11-10",
                    version: "2.0.1"
                }, "PUT")
            }

            setLoading(false);
        }
    }, [open])

    return (
        <Dialog
            open={open}
        >
            <DialogTitle>Metadata Update - version 2.0.1</DialogTitle>
            <DialogContent>
                {
                    loading ? (
                        <>
                            <div style={{ marginBottom: "10px" }}>
                                <strong>Last Updated:</strong> {updatedDate}
                            </div>
                            <div style={{ margin: "20px 200px" }}>
                                <LoadingMask />
                            </div>
                        </>
                    ) : (
                        <div style={{ marginBottom: "10px" }}>
                            <strong>Updated Done</strong>
                        </div>
                    )
                }
                
            </DialogContent>
            <Divider />
            <DialogActions>
                <Button
                    variant="outlined"
                    size="small"
                    onClick={() => {
                        handleCloseUpdate();
                    }}
                    style={{ width: "120px" }}
                    disabled={loading}
                >Close</Button>
            </DialogActions>
        </Dialog>
    )
}

export default UpdateDialog;