package com._Home.backend.services.implementations;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com._Home.backend.services.interfaces.MailService;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;



@Service
public class MailServiceImpl implements MailService{

    @Autowired
    private JavaMailSender mailSender;

    @Override
    public void sendEvaluationEmail(String toEmail, String subject, String htmlBody) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setTo(toEmail);
            helper.setSubject(subject);
            helper.setText(htmlBody, true); 
            mailSender.send(message);

        } catch (MessagingException e) {
            throw new RuntimeException("Failed to create email message", e);
        }
    }

}
