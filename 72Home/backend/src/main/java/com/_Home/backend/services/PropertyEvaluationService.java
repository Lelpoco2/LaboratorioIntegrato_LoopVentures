package com._Home.backend.services;

import java.util.List;

import com._Home.backend.models.Property;
import com._Home.backend.models.PropertyEvaluation;

public interface PropertyEvaluationService {

    List<PropertyEvaluation> getAllPropertyEvaluations();
    PropertyEvaluation savePropertyEvaluation(PropertyEvaluation propertyEvaluation);
    PropertyEvaluation getPropertyEvaluationById(Integer id);
    Double evaluateProperty(Property property);

    

}
