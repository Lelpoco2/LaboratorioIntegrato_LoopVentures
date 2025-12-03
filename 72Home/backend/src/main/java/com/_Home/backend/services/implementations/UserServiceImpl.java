package com._Home.backend.services.implementations;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com._Home.backend.models.User;
import com._Home.backend.repos.UserRepo;
import com._Home.backend.services.interfaces.UserService;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepo userRepo;

	@Override
	public List<User> getAllUsers() {
		return userRepo.findAll();
	}

	@Override
	public User insertUser(User user) {
		return userRepo.save(user);
	}

	@Override
	public User getUserById(Integer id) {
		return userRepo.findById(id).orElse(null);
	}

	@Override
	public User getUserByPropertyId(Integer propertyId) {
		return userRepo.findByPropertyId(propertyId);
	}

	@Override
	public User updateUser(User user) {
		return userRepo.save(user);
	}

	@Override
	public void deleteUser(Integer id) {
		userRepo.deleteById(id);
	}

	
}
