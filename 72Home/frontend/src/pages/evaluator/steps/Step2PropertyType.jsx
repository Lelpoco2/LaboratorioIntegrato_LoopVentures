import "../styles/evaluator.css";

export default function Step2PropertyType({ formData, updateField }) {
  return (
    <div className="step-card">
      <h2>L'immobile da valutare è:</h2>

      <button onClick={() => updateField("propertyType", "Apartment")}>
        Appartamento
      </button>

      <button onClick={() => updateField("propertyType", "Villa")}>
        Casa
      </button>

      <button onClick={() => updateField("propertyType", "Penthouse")}>
        Villa
      </button>
    </div>
  );
}