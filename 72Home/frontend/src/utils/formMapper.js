// formMapper.js
// Maps frontend form values to backend enum values

/**
 * Mapping configuration based on backend enums:
 * - BuildingType: INDEPENDENT_HOUSE, APARTMENT, VILLA
 * - Condition: NEW, GOOD, NEEDS_RENOVATION, BAD
 * - EnergeticClass: A4, A3, A2, A1, A, B, C, D, E, F, G
 * - HeatingType: CENTRALIZED, INDEPENDENT, NONE
 */

export const mapToBackendFormat = {
  // Property type mapping
  propertyType: {
    "casa": "INDEPENDENT_HOUSE",
    "appartamento": "APARTMENT",
    "villa": "VILLA"
  },
  
  // Condition mapping
  condition: {
    "new": "NEW",
    "excellent": "GOOD",
    "decent": "GOOD",
    "toberenovated": "NEEDS_RENOVATION",
    "bad": "BAD",
    "unknown": "GOOD" // Default fallback
  },
  
  // Heating mapping
  heating: {
    "autonomo": "INDEPENDENT",
    "centralizzato": "CENTRALIZED",
    "none": "NONE",
    "unknown": "NONE" // Default fallback
  }
};

/**
 * Builds the complete JSON payload for backend submission
 * @param {Object} formData - Raw form data from the evaluator
 * @returns {Object} JSON object matching EmailRequestDTO structure
 */
export const buildBackendPayload = (formData) => {
  const payload = {};

  // Build user object (Step 5 - Contact)
  if (formData.firstName || formData.lastName || formData.phone || formData.email) {
    payload.user = {};
    if (formData.firstName) payload.user.firstName = formData.firstName;
    if (formData.lastName) payload.user.lastName = formData.lastName;
    if (formData.phone) payload.user.phone = formData.phone;
    if (formData.email) payload.user.email = formData.email;
  }

  // Build property object (Steps 1-4)
  payload.property = {};

  // Step 1: Address
  if (formData.street) {
    payload.property.address = formData.street;
  }
  if (formData.streetNumber) {
    payload.property.civicNumber = formData.streetNumber;
  }
  if (formData.city) payload.property.city = formData.city;
  if (formData.zip) payload.property.zipCode = formData.zip;

  // Step 2: Property Type
  if (formData.propertyType) {
    payload.property.buildingType = mapToBackendFormat.propertyType[formData.propertyType] || "APARTMENT";
  }

  // Step 3: Features
  if (formData.surface) {
    payload.property.surfaceArea = parseFloat(formData.surface);
  }
  
  if (formData.rooms) {
    // Handle "5-or-more" format
    const roomValue = formData.rooms === "5-or-more" ? 5 : formData.rooms;
    payload.property.rooms = parseInt(roomValue) || 0;
  }
  
  if (formData.apartmentFloor !== undefined && formData.apartmentFloor !== "") {
    // Handle "4-or-more" and "Terra" formats
    let floorValue = formData.apartmentFloor;
    if (floorValue === "4-or-more") floorValue = 4;
    if (floorValue === "Terra") floorValue = 0;
    payload.property.floor = parseInt(floorValue) || 0;
  }
  
  if (formData.bathrooms) {
    // Handle "3-or-more" format
    const bathroomValue = formData.bathrooms === "3-or-more" ? 3 : formData.bathrooms;
    payload.property.bathrooms = parseInt(bathroomValue) || 0;
  }
  
  // Energy class - direct mapping (matches backend enum)
  if (formData.energyClass && formData.energyClass !== "unknown") {
    payload.property.energeticClass = formData.energyClass;
  }
  
  // Condition - mapped to backend enum
  if (formData.condition) {
    payload.property.condition = mapToBackendFormat.condition[formData.condition] || "GOOD";
  }
  
  // Heating - mapped to backend enum
  if (formData.heating) {
    payload.property.heatingType = mapToBackendFormat.heating[formData.heating] || "NONE";
  }

  // Step 4: Add-ons (boolean values)
  payload.property.hasBox = formData.garage || false;
  
  if (formData.garageSize && formData.garage) {
    payload.property.boxSurfaceArea = parseFloat(formData.garageSize);
  }
  
  payload.property.hasElevator = formData.elevator || false;
  payload.property.hasBalcony = formData.balcony || false;
  payload.property.hasGarden = formData.garden || false;
  payload.property.hasTerrace = formData.terrace || false;
  payload.property.hasCanteen = formData.canteen || false;

  return payload;
};
