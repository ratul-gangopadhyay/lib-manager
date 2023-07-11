import { every } from 'lodash';

export const allFieldsPopulated = (object) => every(object, Boolean);
