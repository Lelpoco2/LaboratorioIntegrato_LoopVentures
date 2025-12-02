// useEvaluatorForm() stores all the logic.
// Keeps components clean and makes the form scalable.

import { useState } from "react";
import { buildBackendPayload } from "../../../utils/formMapper";

export default function useEvaluatorForm(initialData = {}) {
  // Start with initialData or empty object - we'll build it progressively
  const [formData, setFormData] = useState(initialData);

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Build the final JSON in the required backend format
  const buildJSON = () => {
    return buildBackendPayload(formData);
  };

  // Get current partial JSON (useful for debugging)
  const getPartialJSON = () => {
    return buildJSON();
  };

  // Get JSON string ready to send
  const getJSONString = () => {
    return JSON.stringify(buildJSON(), null, 2);
  };

  return { 
    formData, 
    updateField, 
    buildJSON,
    getPartialJSON,
    getJSONString
  };
}
