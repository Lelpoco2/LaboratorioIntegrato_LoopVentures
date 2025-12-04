package com._Home.backend.services.interfaces;

import java.util.List;
import java.util.Map;

import com._Home.backend.models.Property;
import com._Home.backend.models.PropertyEvaluation;

public interface PropertyEvaluationService {

    List<PropertyEvaluation> getAllPropertyEvaluations();
    PropertyEvaluation savePropertyEvaluation(PropertyEvaluation propertyEvaluation);
    PropertyEvaluation getPropertyEvaluationById(Integer id);
    Map<String, Double> evaluateProperty(Property property);

    

}
