package com._Home.backend.services;

import com._Home.backend.models.User;
import java.util.List;

public interface UserService {
	List<User> getAllUsers();
	User insertUser(User user);
	User getUserById(Integer id);
	User updateUser(User user);
	void deleteUser(Integer id);
}
