import "../styles/Step3Features.css";
import Field from "../components/Field";
import { useFormValidation } from "../hooks/useFormValidation";
import { useEffect } from "react";

export default function Step3Features({
  propertyType,
  formData,
  updateField,
  setStepErrors,
}) {
  const { markTouched, isTouched, hasError, errors } =
    useFormValidation(formData, propertyType);

  // Passa errori allo step padre
  useEffect(() => setStepErrors(errors), [errors, setStepErrors]);

  return (
    <div className="step-card evaluator-card" style={{ marginTop: "40px" }}>
      <h3>Caratteristiche dell’immobile</h3>

      <div className="form-column">

        {/* APPARTAMENTO → campo condizionale */}
        {propertyType === "appartamento" && (
          <Field
            label="Piano dell'appartamento"
            touched={isTouched("apartmentFloor")}
            error={hasError("apartmentFloor") && errors.apartmentFloor}
          >
            <select
              value={formData.apartmentFloor || ""}
              onChange={(e) => updateField("apartmentFloor", e.target.value)}
              onBlur={() => markTouched("apartmentFloor")}
            >
              <option value="" disabled>Seleziona…</option>
              <option value="Terra">Terra</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4-or-more">4 o più</option>
            </select>
          </Field>
        )}

        {/* Numero di locali */}
        <Field
          label="Numero di locali"
          touched={isTouched("rooms")}
          error={hasError("rooms") && errors.rooms}
        >
          <select
            value={formData.rooms || ""}
            onChange={(e) => updateField("rooms", e.target.value)}
            onBlur={() => markTouched("rooms")}
          >
            <option value="" disabled>Seleziona…</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5-or-more">5 o più</option>
          </select>
        </Field>

        {/* Numero di bagni */}
        <Field
          label="Numero di bagni"
          touched={isTouched("bathrooms")}
          error={hasError("bathrooms") && errors.bathrooms}
        >
          <select
            value={formData.bathrooms || ""}
            onChange={(e) => updateField("bathrooms", e.target.value)}
            onBlur={() => markTouched("bathrooms")}
          >
            <option value="" disabled>Seleziona…</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3-or-more">3 o più</option>
          </select>
        </Field>

        {/* Superficie abitabile */}
        <Field
          label="Superficie abitabile (m²)"
          touched={isTouched("surface")}
          error={hasError("surface") && errors.surface}
        >
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="Es. 70"
            value={formData.surface || ""}
            onChange={(e) => {
              const v = e.target.value;
              if (!/^\d*$/.test(v)) return;
              if (v !== "" && Number(v) < 1) return;
              updateField("surface", v);
            }}
            onKeyDown={(e) => {
              if (["e", ".", ",", "+", "-", "E"].includes(e.key)) {
                e.preventDefault();
              }
            }}
            onBlur={() => markTouched("surface")}
          />
        </Field>

        {/* Condizioni */}
        <Field
          label="Condizioni"
          touched={isTouched("condition")}
          error={hasError("condition") && errors.condition}
        >
          <select
            value={formData.condition || ""}
            onChange={(e) => updateField("condition", e.target.value)}
            onBlur={() => markTouched("condition")}
          >
            <option value="" disabled>Seleziona…</option>
            <option value="new">Nuovo o Ristrutturato</option>
            <option value="excellent">Ottime condizioni</option>
            <option value="decent">Discreto</option>
            <option value="toberenovated">Da ristrutturare</option>
            <option value="unknown">Non lo so</option>
          </select>
        </Field>

        {/* Classe energetica */}
        <Field
          label="Classe energetica"
          touched={isTouched("energyClass")}
          error={hasError("energyClass") && errors.energyClass}
        >
          <select
            value={formData.energyClass || ""}
            onChange={(e) => updateField("energyClass", e.target.value)}
            onBlur={() => markTouched("energyClass")}
          >
            <option value="" disabled>Seleziona…</option>
            {["A4", "A3", "A2", "A1", "A", "B", "C", "D", "E", "F", "G"].map(
              (cls) => (
                <option key={cls} value={cls}>{cls}</option>
              )
            )}
            <option value="unknown">Non lo so</option>
          </select>
        </Field>

        {/* Riscaldamento */}
        <Field
          label="Riscaldamento"
          touched={isTouched("heating")}
          error={hasError("heating") && errors.heating}
        >
          <select
            value={formData.heating || ""}
            onChange={(e) => updateField("heating", e.target.value)}
            onBlur={() => markTouched("heating")}
          >
            <option value="" disabled>Seleziona…</option>
            <option value="autonomo">Autonomo</option>
            <option value="centralizzato">Centralizzato</option>
            <option value="unknown">Non lo so</option>
          </select>
        </Field>

      </div>
    </div>
  );
}
