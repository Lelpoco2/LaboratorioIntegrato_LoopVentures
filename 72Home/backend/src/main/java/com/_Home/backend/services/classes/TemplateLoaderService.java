package com._Home.backend.services.classes;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.util.Map;

import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

@Service
public class TemplateLoaderService {

    public String loadTemplate(String templateName, Map<String, String> variables) throws IOException{

        ClassPathResource resource = new ClassPathResource("templates/" + templateName);

        String content = new String(Files.readAllBytes(resource.getFile().toPath()), StandardCharsets.UTF_8);

        for (Map.Entry<String, String> entry : variables.entrySet()) {
            String placeholder = "{{" + entry.getKey() + "}}";
            content = content.replace(placeholder, entry.getValue());
        }
        return content;
    
    }

}
