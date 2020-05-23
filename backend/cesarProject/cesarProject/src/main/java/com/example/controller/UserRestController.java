package com.example.controller;

import java.io.ByteArrayOutputStream;
import java.util.List;
import java.util.Optional;

import javax.annotation.Resource;
import javax.validation.Valid;
import javax.validation.constraints.PositiveOrZero;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.MediaType;


import com.example.entity.User;
import com.example.exception.BookNotFoundException;
import com.example.exception.UsernameNotFoundException;
import com.example.form.LoginForm;
import com.example.repository.UserRepository;
import com.example.response.LoginResponse;

import com.itextpdf.text.BaseColor;
import com.itextpdf.text.Chunk;
import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Font;
import com.itextpdf.text.FontFactory;
import com.itextpdf.text.pdf.PdfWriter;

@CrossOrigin(origins = "*", maxAge = 3600)

@RestController
public class UserRestController {
	
	@Resource
	private UserRepository userRepository;
	

	@GetMapping("/getUser/{0}")
	public User getUser(@PathVariable(value = "id")
						@PositiveOrZero(message = "Id must be greater or equal to 0") Long id) {
		Optional<User> user = userRepository.findById(id);
		if (user.isPresent()) {
			return user.get();
		} else {
			throw new BookNotFoundException("Book not found with id " + id);
		}
	}
	
	@PostMapping("/user")
	public User newUser(@Valid @RequestBody User newUser) {
		return userRepository.save(newUser);
	}
	
	@PostMapping("/logUser")
	public LoginResponse logUser(@RequestBody LoginForm loginForm) {
		String username = loginForm.getUsername();
		String password = loginForm.getPassword();
		
		User user = userRepository.findByUsername(username);
		if (user == null) throw new UsernameNotFoundException(username);
		
		System.out.print(password.getClass().getName());
		System.out.print(user.getPassword().getClass().getName());
		if (user.getPassword().equals(password) == false) {
			throw new UsernameNotFoundException(username);
		}
		
		LoginResponse response = new LoginResponse(user.getId(), user.getUsername());
		return response;
		
	}
	
	
	
}
