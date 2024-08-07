import { useState } from 'react';
import {
  validateName,
  validateEmail,
  validatePassword,
  validatePasswordCheck
} from './validation';

export const useFormValidation = () => {
  const [errors, setErrors] = useState({});

  const validateField = (fieldName, value, additionalValue) => {
    let errorMessage = '';
    switch (fieldName) {
      case 'name':
        errorMessage = validateName(value);
        break;
      case 'email':
        errorMessage = validateEmail(value);
        break;
      case 'password':
        errorMessage = validatePassword(value);
        break;
      case 'passwordCheck':
        errorMessage = validatePasswordCheck(additionalValue, value);
        break;
      default:
        break;
    }
    setErrors((prev) => {
      if (errorMessage) {
        return { ...prev, [fieldName]: errorMessage };
      } else {
        const { [fieldName]: removed, ...rest } = prev;
        return rest;
      }
    });
  };

  return {
    errors,
    validateField
  };
};