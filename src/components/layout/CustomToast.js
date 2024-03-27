import { useEffect } from 'react';
import { useToast } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

const CustomToast = () => {
    const toast = useToast();
    const toastOptions = useSelector((state) => state.toast.loadToast);

    useEffect(() => {
        if (toastOptions.title && toastOptions.description) {
            handleToast();
        }
    }, [toastOptions]); 

    const handleToast = () => {
        toast({
            title: toastOptions.title,
            description: toastOptions.description,
            status: toastOptions.status,
            duration: toastOptions.duration,
            isClosable: toastOptions.isClosable,
            position: toastOptions.position,
        });
    }

    return null; 
}

export default CustomToast;
