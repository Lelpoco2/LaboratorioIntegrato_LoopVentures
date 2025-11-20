// Handles touched, errors, validations

import { useState, useEffect } from "react";

export function useFormValidation(formData, propertyType) {
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});

  const markTouched = (field) =>
    setTouched((prev) => ({ ...prev, [field]: true }));

  const isTouched = (field) => !!touched[field];
  const hasError = (field) => isTouched(field) && errors[field];

  useEffect(() => {
    const newErrors = {};

    // Conditional fields
    if (propertyType === "appartamento") {
      if (!formData.apartmentFloor)
        newErrors.apartmentFloor = "Campo obbligatorio";
    }

    // Generic fields
    if (!formData.surface) newErrors.surface = "Inserisci un numero intero maggiore di zero.";
    if (!formData.bathrooms) newErrors.bathrooms = "Campo obbligatorio";
    if (!formData.rooms) newErrors.rooms = "Campo obbligatorio";
    if (!formData.condition) newErrors.condition = "Campo obbligatorio";
    if (!formData.energyClass) newErrors.energyClass = "Campo obbligatorio";
    if (!formData.heating) newErrors.heating = "Campo obbligatorio";

    setErrors(newErrors);
  }, [formData, propertyType]);

  return { touched, markTouched, isTouched, hasError, errors };
}
