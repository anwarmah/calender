import { React, useEffect } from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, MenuItem, FormControl, InputLabel, Select } from '@mui/material';

import Autocomplete from '@mui/material/Autocomplete';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';

import Stack from '@mui/material/Stack';

import { toast, ToastContainer } from "react-toastify";

import { useSelector, useDispatch } from 'react-redux';

import { addCall } from '../../actions/callAction';
import { selectContact } from '../../actions/contactAction';

export default function CallDialog(props) {

  const dispatch = useDispatch();
  useEffect(()=>{
    setFormData({ 
      contact: props.callData.contact,
      description:props.callData.description, 
      start: props.callData.start, 
      end: props.callData.end,
      type: props.callData.type,
      status: props.callData.status,
      _id :props.callData._id
    });  
  }, [props])
  const contacts = useSelector(selectContact);
  const [formData, setFormData] = useState(props.callData);
  const [inputValue, setInputValue] = useState('');
  const [value, setValue] = useState(props.callData.contact);
  const handleSave=()=>{
    if(formData.contact === ""){
      toast.error("Contact User Required!");
    }else if(formData.type === ""){
      toast.error("Type Required!");
    }else{
      dispatch(addCall(formData));
      props.setOpen(false);
    }
  }
  return (
    <div>
      <Dialog open={props.open} onClose={()=> {props.setOpen(false)}}>
        <DialogTitle>Add Call</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add You call. You can add the call user, description and duration
          </DialogContentText>
          <Stack spacing={1}>
            <Autocomplete
              value={value}
              
              getOptionLabel={(option) => option.name ? option.name : ""}
              disableClearable
              
              isOptionEqualToValue={(option, value) => option.id === value._id}
              onChange={(event, newValue) => {
                setFormData(f => ({ ...f, contact: newValue._id}))
                setValue(newValue);
              }}
              inputValue={inputValue}
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
              }}
              id="controllable-states-demo"
              options={contacts}
              sx={{ width: '100%', marginTop:'15px' }}
              renderInput={(params) => <TextField {...params} label="Select Contact User" variant="standard"/>}
            />
            <TextField
              required
              margin="dense"
              id="description"
              label="Notes"
              type="text"
              fullWidth
              variant="standard"
              value={formData.description}
              onChange={evt => { setFormData(f => ({ ...f, description: evt.target.value})) }}
            />
          </Stack>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack spacing={1} sx={{marginTop: "20px"}}>
              <DateTimePicker
                label="Start"
                value={formData.start}
                // disabled
                sx= {{width:'100%'}}
                onChange={evt => { setFormData(f => ({ ...f, start: evt})) }}
                // onChange={(event, newValue) => {
                  // setFormData(f => ({ ...f, start: newValue.evt}))
                  // setValue(newValue);
                // }}
                renderInput={(params) => <TextField {...params} variant="standard"/>}
              />
              <DateTimePicker
                label="end"
                value={formData.end}
                // disabled
                sx= {{width:'100%'}}
                onChange={evt => { setFormData(f => ({ ...f, end: evt})) }}
                // onChange={(event, newValue) => {
                  // setFormData(f => ({ ...f, end: newValue.evt}))
                  // setValue(newValue);
                // }}
                renderInput={(params) => <TextField {...params} variant="standard"/>}
              />
            </Stack>
          </LocalizationProvider>
          <Box sx={{display: 'flex', justifyContent: 'between'}}>
            <FormControl variant="standard" sx={{ m: 1, width: '50%' }}>
              <InputLabel id="demo-simple-select-standard-label">Shift Type</InputLabel>
              <Select
                required
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={formData.type}
                onChange={evt => { setFormData(f => ({ ...f, type: evt.target.value})) }}
                label="Type"
                variant="standard"
              >
                <MenuItem value={'morning'}>Morning</MenuItem>
                <MenuItem value={'general'}>General</MenuItem>
                <MenuItem value={'secondary'}>Secondary</MenuItem>
                <MenuItem value={'night'}>Night</MenuItem>
              </Select>
            </FormControl>
            <FormControl variant="standard" sx={{ m: 1, width: '50%' }}>
              <InputLabel id="demo-simple-select-standard-label">Support Type</InputLabel>
              <Select
                required
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={formData.status}
                onChange={evt => { setFormData(f => ({ ...f, status: evt.target.value})) }}
                label="Status"
                variant="standard"
              >
                <MenuItem value={'primary'}>Primary</MenuItem>
                <MenuItem value={'secondary'}>Secondary</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSave}>Save</Button>
          <Button onClick={()=> {props.setOpen(false)}}>Cancel</Button>
        </DialogActions>
      </Dialog>
      <ToastContainer autoClose={2000} />
    </div>
  );
}