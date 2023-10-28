import * as yup from 'yup';

export const creatBookingValidationSchema = yup.object({
    roomId: yup.string().required(),
    checkInDate: yup.string().matches(/^\d{4}-\d{2}-\d{2}$/),
    checkOutDate: yup.string().matches(/^\d{4}-\d{2}-\d{2}$/)

    // add more validation such as:
    // checkInDate >= checkOutDate
    // checkInDate >= today
  });