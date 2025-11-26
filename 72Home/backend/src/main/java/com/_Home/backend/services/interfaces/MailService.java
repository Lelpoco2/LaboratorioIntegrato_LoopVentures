package com._Home.backend.services.interfaces;


public interface MailService {
        void sendEvaluationEmail(String toEmail, String subject, String htmlBody);
}
