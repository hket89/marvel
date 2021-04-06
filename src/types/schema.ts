import * as yup from 'yup';

export const characterIdPathSchema = yup.object().shape({
  id: yup.number().required()
});
