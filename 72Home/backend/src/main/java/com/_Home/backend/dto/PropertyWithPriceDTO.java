package com._Home.backend.dto;

import com._Home.backend.enums.BuildingType;
import com._Home.backend.enums.Condition;
import com._Home.backend.enums.EnergeticClass;
import com._Home.backend.enums.HeatingType;
import com._Home.backend.models.Property;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.text.DecimalFormat;
import java.text.DecimalFormatSymbols;
import java.util.Locale;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PropertyWithPriceDTO {
    private Integer id;
    private String address;
    private String civicNumber;
    private String city;
    private String zipCode;
    private Double surfaceArea;
    private Integer rooms;
    private Integer floor;
    private EnergeticClass energeticClass;
    private Condition condition;
    private Boolean hasBox;
    private Double boxSurfaceArea;
    private Boolean hasElevator;
    private Boolean hasBalcony;
    private Boolean hasGarden;
    private Boolean hasTerrace;
    private Boolean hasCanteen;
    private Integer bathrooms;
    private HeatingType heatingType;
    private BuildingType buildingType;
    private java.sql.Timestamp createdAt;
    
    // Fields for property assignment
    private Integer specialUserId;
    private Boolean taken;
    private String assignedAdministrator; // Nome completo dell'amministratore assegnato
    
    // Additional field for latest evaluation price (formatted)
    private String latestEvaluationPrice;

    /**
     * Formats price to nearest hundred with thousand separators
     * Example: 493450.0 -> "493.400", 270000.0 -> "270.000"
     */
    private static String formatPrice(Double price) {
        if (price == null) {
            return null;
        }
        // Round to nearest hundred
        long rounded = Math.round(price / 100.0) * 100;
        
        // Format with thousand separator (dot) using Italian locale
        DecimalFormatSymbols symbols = DecimalFormatSymbols.getInstance(Locale.ITALIAN);
        DecimalFormat formatter = new DecimalFormat("###,###,##0", symbols);
        return formatter.format(rounded);
    }

    public static PropertyWithPriceDTO fromProperty(Property property, Double latestPrice) {
        PropertyWithPriceDTO dto = new PropertyWithPriceDTO();
        dto.setId(property.getId());
        dto.setAddress(property.getAddress());
        dto.setCivicNumber(property.getCivicNumber());
        dto.setCity(property.getCity());
        dto.setZipCode(property.getZipCode());
        dto.setSurfaceArea(property.getSurfaceArea());
        dto.setRooms(property.getRooms());
        dto.setFloor(property.getFloor());
        dto.setEnergeticClass(property.getEnergeticClass());
        dto.setCondition(property.getCondition());
        dto.setHasBox(property.getHasBox());
        dto.setBoxSurfaceArea(property.getBoxSurfaceArea());
        dto.setHasElevator(property.getHasElevator());
        dto.setHasBalcony(property.getHasBalcony());
        dto.setHasGarden(property.getHasGarden());
        dto.setHasTerrace(property.getHasTerrace());
        dto.setHasCanteen(property.getHasCanteen());
        dto.setBathrooms(property.getBathrooms());
        dto.setHeatingType(property.getHeatingType());
        dto.setBuildingType(property.getBuildingType());
        dto.setCreatedAt(property.getCreatedAt());
        dto.setSpecialUserId(property.getSpecialUserId());
        dto.setTaken(property.getTaken());
        dto.setLatestEvaluationPrice(formatPrice(latestPrice));
        return dto;
    }
}
