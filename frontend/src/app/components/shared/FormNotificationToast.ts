import { toast } from 'react-toastify'

export const FormNotificationToast = () => {
  toast.success('Successful Operation', {
    position: 'top-right',
    autoClose: 1000
  })
}