// useEvaluatorForm() stores all the logic.
// Keeps components clean and makes the form scalable.

import { useState } from "react";

export default function useEvaluatorForm() {
  const [formData, setFormData] = useState({
    address: "",
    propertyType: "",
    features: {},
    addOns: [],
    contact: {},
  });

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return { formData, updateField };
}
