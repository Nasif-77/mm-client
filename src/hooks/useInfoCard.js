import axios from "axios";
import { isAuth } from "../utils/isAuth";
import { useState } from "react";
import { toast } from 'react-toastify';

/* This custom hook is used to store some common states and functions of InfoCards Components */

function useInfoCard(type, userData) {  
    
    const [deleteDialog, setDeleteDialog] = useState(false)
    const [buttonDisable, setButtonDisable] = useState(false)

    const handleDeleteDialogOpen = () => {
        setDeleteDialog(true);
    };

    const handleDeleteDialogClose = () => {
        setDeleteDialog(false);
    };

    const deleteCard = async () => {
        const token = isAuth()
        
            try {
                const response = await axios.delete(`${process.env.REACT_APP_SERVER_URL}/api/admin/${type}/${userData._id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                if (response.status === 201) {
                    setButtonDisable(true)
                    toast.success("Deleted Successfully")
                    return setTimeout(() => {
                        window.location.reload()
                    }, 2000);
                }
            } catch (error) {
                alert('Something Went Wrong')
            }
        
    }



  return [deleteDialog, buttonDisable, handleDeleteDialogOpen, handleDeleteDialogClose, deleteCard]
}

export default useInfoCard