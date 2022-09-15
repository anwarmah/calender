import {React, useEffect} from 'react';
import Container from '@mui/material/Container';
import {Box, Button} from '@mui/material';
import Calendar from './calendar';
import { useDispatch } from 'react-redux';
import { getAll } from '../../actions/contactAction';
const Content = () =>{
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getAll());
    },[])
    return(
        <Container maxWidth="lg">
            <Box sx={{ bgcolor: '#fff', height: '100%',width:'100%', marginTop:'30px', marginBottom:'30px', boxShadow:'0px 0px 30px 0px rgb(82 63 105 / 5%)'}}>
                <Box
                    sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    bgcolor: 'background.flex',
                    backgroundColor:'#fff',
                    justifyContent:"space-between",
                    alignItems:"stretch",
                    borderBlockEnd:'solid 1px #EBEDF3',
                    height: '70px'
                    }}
                >
                    <Box sx={{ display: 'flex', flexDirection: 'row'}}>
                        <Box sx={{ marginTop:'25px', marginLeft:'27px', fontSize: '1.275rem' }}>On-Call Support</Box>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row'}}>
                        <Button className='detail-btn' sx={{background:'#F64E60' }}> Morning</Button>
                        <Button className='detail-btn' sx={{background:'#3699FF' }}> General</Button>
                        <Button className='detail-btn' sx={{background:'#12b548' }}> Secondary</Button>
                        <Button className='detail-btn' sx={{background:'#fc761c' }}> Night</Button>
                    </Box>
                </Box>
                <Box sx={{padding:'2rem'}}>
                    <Calendar />
                </Box>
            </Box>
        </Container>
    );
}
export default Content;
