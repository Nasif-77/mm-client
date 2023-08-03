import React, { useState } from 'react'
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import styled from '@emotion/styled';
import CreateForm from '../components/CreateForms/CreateForm';
import { IconButton } from '@mui/material';
import { QuestionMark } from '@mui/icons-material';

function CreateFormDrawer({ type, add, edit, data }) {

    const [slide, setSlide] = useState({
        right: false,
    });

    const CustomButton = styled(Button)
        `
color:white;
border-color:rgb(102, 108, 255);
background-color:rgb(102, 108, 255);
&:hover{
background-color:rgb(102, 78, 255);
}
`

    const toggleDrawer = (anchor, open) => () => {
        setSlide((prevState) => ({
            ...prevState,
            [anchor]: open,
        }));
    };



    const list = (anchor) => (
        <div style={{ width: "300px" }}>
            <IconButton onClick={toggleDrawer(anchor, false)} style={{ color: "black", margin: '2%', alignContent: "end" }}><CloseIcon /></IconButton>
            {edit ? <CreateForm edit type={type} data={data} /> : <CreateForm type={type} />}

        </div>
    );
    return (
        <>
            {type === 'QandA' ?
                <Button onClick={toggleDrawer('right', true)} sx={{ width: '25%' }} variant='contained' color='warning' endIcon={<QuestionMark />}>Ask</Button>
                :
                <CustomButton sx={{ margin: '1%' }} onClick={toggleDrawer('right', true)} variant='contained' color='secondary'>
                    {add ? <>Add {type === 'staffs' ? 'mentor' : type}</> : <>Edit</>}
                </CustomButton>}

            <SwipeableDrawer
                anchor="right"
                open={slide.right}
                onClose={toggleDrawer('right', false)}
                onOpen={toggleDrawer('right', true)}
            >
                {list('right')}
            </SwipeableDrawer>
        </>
    )
}

export default CreateFormDrawer
