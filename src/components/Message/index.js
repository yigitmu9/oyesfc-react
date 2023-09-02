import classes from "./message.module.css";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';

const Message = ({onClose, messageData}) => {

    return (
        <div className={classes.popupContainer} style={{display: "block", background: "#404040"}}>
            <div style={{  background: "#404040", display: "block"}}>
                { messageData.isValid ?
                    <CheckCircleOutlineIcon style={{marginBottom: "10px", width: "5rem", height: "5rem",  background: "#404040", color: "lightgray"}}></CheckCircleOutlineIcon>
                    :
                    <ReportProblemIcon style={{marginBottom: "10px", width: "5rem", height: "5rem",  background: "#404040", color: "lightgray"}}></ReportProblemIcon>
                }
                <h4 style={{marginBottom: "10px",  background: "#404040", color: "lightgray"}}>{messageData.message}</h4>
                <button onClick={onClose}>Ok</button>
            </div>
        </div>
    );
};

export default Message;