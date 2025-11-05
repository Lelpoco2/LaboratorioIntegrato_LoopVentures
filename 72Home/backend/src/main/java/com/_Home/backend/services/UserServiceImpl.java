package com._Home.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com._Home.backend.models.User;
import com._Home.backend.repos.UserRepo;
import java.util.Map;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepo userRepo;

	@Override
	public List<Map<String, String>> getAllUsers() {
		return userRepo.findAll().stream()
			.map(user -> Map.of(
				"id", user.getId() != null ? user.getId().toString() : "",
				"username", user.getUsername(),
				"email", user.getEmail(),
				"password", user.getPassword()
			))
			.toList();
	}

	@Override
	public Map<String, String> insertUser(User user) {
		User saved = userRepo.save(user);
		return Map.of(
			"user_name", saved.getUsername(),
			"email", saved.getEmail(),
			"message", "User inserted successfully"
		);
	}
}
