import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';

import { Calendar, momentLocalizer } from "react-big-calendar";
import { ToastContainer } from "react-toastify";

import moment from "moment";

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import CallDialog from "./callDialog";

import {callStructure} from '../../config/const';

import "../../style/calendar.css";
// import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-toastify/dist/ReactToastify.css";

import {
  getAll,
  delCall,
  selectCall
} from '../../actions/callAction';
import { Button } from "@mui/material";

moment.locale("en-GB");
const localizer = momentLocalizer(moment);
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ReactBigCalendar() {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getAll());
  }, [])
  const callsData = useSelector(selectCall);
  const [callData, setCallData] = useState(callStructure);
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const callList = callsData.map(({start, end, ...rest}) =>
  ({
        start: new Date(Date.parse(start)),
        end: new Date(Date.parse(end)),
      ...rest
  }));
  const callStyleGetter = (call, start, end, isSelected) => {
    var backgroundColor;
    if (call.type === "morning"){
      backgroundColor= '#F64E60';
    }else if(call.type === "general"){
      backgroundColor= '#3699FF';
    }else if (call.type === "secondary"){
      backgroundColor= '#12b548';
    }else if(call.type === "night"){
      backgroundColor= '#fc761c';
    }
    var style = {
        backgroundColor: backgroundColor,
        borderRadius: '0px',
        opacity: 0.8,
        color: 'white',
        border: '0px',
        display: 'block'
    };
    return {
        style: style
    };

  }
  const handleOpen = (calls) => {
    setCallData(callStructure);
    setCallData(f=>({ ...f, start: calls.start}));
    setCallData(f=>({ ...f, end: calls.end}))
    setOpen(true);
  }
  const showCall = (call) => {
    setCallData(call);
    setModalOpen(true);
  }
  const handleClose = () => {
    setModalOpen(false);
  }
  const deleteCall=()=>{
    dispatch(delCall(callData._id));
    setModalOpen(false);
  }
  const editCall = () =>{
    setOpen(true);
    setModalOpen(false);
  }
  return (
    <div className="App">
      <Calendar
        views={["month", "week", "day"]}
        selectable
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="month"
        events={callList}
        style={{ height: "100vh" }}
        onSelectEvent={showCall}
        onSelectSlot={handleOpen}
        eventPropGetter={callStyleGetter}
        titleAccessor = {(event)=>event.contact.name + ":" + event.status}
      />
      <CallDialog open = {open} callData = {callData}  setOpen = {setOpen} />
      <ToastContainer autoClose={2000} />
      <Modal
        open={modalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Name : {callData.contact.name}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Description : {callData.description}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duration : {new Date(Date.parse(callData.start)).toDateString()} ~ {new Date(Date.parse(callData.end)).toDateString()}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Call Type : {callData.type}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Call Status : {callData.status}
          </Typography>
          <Box sx= {{display: "flex", justifyContent: "right", marginTop: "15px", color: "#ffff",  paddingTop: "15px", borderTop: "solid 1px #dddd"}}>
            <Button onClick={editCall} sx={{background: "#3699FF", color: "#ffff", marginRight:"20px",'&:hover': { background: "#3699FF",}}}>Edit</Button>
            <Button onClick={deleteCall} sx={{background: "#F64E60", color: "#ffff", marginRight:"20px",'&:hover': { background: "#F64E60",}}}>Delete</Button>
            <Button onClick={handleClose}>Cancel</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
