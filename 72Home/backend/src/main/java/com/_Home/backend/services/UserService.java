package com._Home.backend.services;

import com._Home.backend.models.User;
import java.util.Map;
import java.util.List;

public interface UserService {
	List<Map<String, String>> getAllUsers();
	Map<String, String> insertUser(User user);
}
